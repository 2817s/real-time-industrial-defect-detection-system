from datetime import datetime, timezone, timedelta

from pymongo import MongoClient

from app.config import MONGODB_URI, MONGODB_DATABASE


client = MongoClient(MONGODB_URI)

db = client[MONGODB_DATABASE]

predictions_collection = db["predictions"]


def test_mongodb_connection():
    client.admin.command("ping")
    return True


def save_prediction(filename: str, detections: list, count: int):
    document = {
        "filename": filename,
        "detections": detections,
        "count": count,
        "created_at": datetime.now(timezone.utc),
    }

    result = predictions_collection.insert_one(document)

    return str(result.inserted_id)


def get_prediction_history(limit: int = 50):
    predictions = predictions_collection.find(
        {},
        {"_id": 0},
    ).sort("created_at", -1).limit(limit)

    return list(predictions)


def get_dashboard_statistics():

    total_images = predictions_collection.count_documents({})

    pipeline = [
        {
            "$unwind": {
                "path": "$detections",
                "preserveNullAndEmptyArrays": True,
            }
        },
        {
            "$group": {
                "_id": None,
                "total_detections": {
                    "$sum": {
                        "$cond": [
                            {"$ne": ["$detections", None]},
                            1,
                            0,
                        ]
                    }
                },
                "average_confidence": {
                    "$avg": "$detections.confidence"
                },
                "highest_confidence": {
                    "$max": "$detections.confidence"
                },
                "defect_distribution": {
                    "$push": "$detections.class_name"
                },
            }
        },
    ]

    aggregation = list(predictions_collection.aggregate(pipeline))

    if aggregation:
        stats = aggregation[0]

        total_detections = stats.get("total_detections", 0)
        average_confidence = stats.get("average_confidence") or 0
        highest_confidence = stats.get("highest_confidence") or 0
        defect_names = stats.get("defect_distribution", [])
    else:
        total_detections = 0
        average_confidence = 0
        highest_confidence = 0
        defect_names = []

    classes = [
        "crazing",
        "inclusion",
        "patches",
        "pitted_surface",
        "rolled-in_scale",
        "scratches",
    ]

    defect_distribution = [
        {
            "name": name.replace("_", " ").title(),
            "value": defect_names.count(name),
        }
        for name in classes
    ]

    confidence_pipeline = [
        {"$unwind": "$detections"},
        {
            "$group": {
                "_id": "$detections.class_name",
                "confidence": {
                    "$avg": "$detections.confidence"
                },
            }
        },
    ]

    confidence_results = list(
        predictions_collection.aggregate(confidence_pipeline)
    )

    confidence_by_class = [
        {
            "defect": item["_id"].replace("_", " ").title(),
            "confidence": round(item["confidence"] * 100, 2),
        }
        for item in confidence_results
    ]

    today = datetime.now(timezone.utc).date()

    daily_trends = []

    for days_ago in range(6, -1, -1):
        current_date = today - timedelta(days=days_ago)

        start = datetime.combine(
            current_date,
            datetime.min.time(),
            tzinfo=timezone.utc,
        )

        end = start + timedelta(days=1)

        daily_records = list(
            predictions_collection.find(
                {
                    "created_at": {
                        "$gte": start,
                        "$lt": end,
                    }
                },
                {"count": 1},
            )
        )

        daily_trends.append({
            "day": current_date.strftime("%a"),
            "analyzed": len(daily_records),
            "defects": sum(
                record.get("count", 0)
                for record in daily_records
            ),
        })

    recent_predictions = list(
        predictions_collection.find(
            {},
            {"_id": 0},
        ).sort("created_at", -1).limit(5)
    )

    for record in recent_predictions:
        if record.get("created_at"):
            record["created_at"] = record["created_at"].isoformat()

    return {
        "images_analyzed": total_images,
        "defects_detected": total_detections,
        "average_confidence": round(average_confidence * 100, 2),
        "highest_confidence": round(highest_confidence * 100, 2),
        "defect_distribution": defect_distribution,
        "confidence_by_class": confidence_by_class,
        "detection_trend": daily_trends,
        "recent_predictions": recent_predictions,
        "model_metrics": {
            "map50": 72.5,
            "map50_95": 36.9,
        },
    }