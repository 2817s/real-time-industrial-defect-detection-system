from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.inference_service import predict_image
from app.schemas.prediction_schema import PredictionResponse
from app.services.mongodb import save_prediction, get_prediction_history


router = APIRouter()


UPLOAD_DIR = Path(__file__).resolve().parents[2] / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}


@router.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    """
    Upload an image and detect industrial surface defects.
    """

    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided.")

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported image format. Use JPG, JPEG, PNG, BMP, or WEBP.",
        )

    unique_filename = f"{uuid4().hex}{extension}"
    image_path = UPLOAD_DIR / unique_filename

    try:
        contents = await file.read()
        image_path.write_bytes(contents)

        detections = predict_image(str(image_path))

        count = len(detections)

        save_prediction(
            filename=file.filename,
            detections=detections,
            count=count,
        )

        return {
            "filename": file.filename,
            "detections": detections,
            "count": count,
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(exc)}",
        )

    finally:
        if image_path.exists():
            image_path.unlink()


@router.get("/history")
async def prediction_history(limit: int = 50):
    """
    Get recent prediction history.
    """

    if limit < 1 or limit > 100:
        raise HTTPException(
            status_code=400,
            detail="Limit must be between 1 and 100.",
        )

    return get_prediction_history(limit)