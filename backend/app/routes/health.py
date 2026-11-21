from fastapi import APIRouter, HTTPException

from app.services.mongodb import (
    test_mongodb_connection,
    get_dashboard_statistics,
)

router = APIRouter()


@router.get("/health")
def health_check():
    return {
        "success": True,
        "message": "Backend is running successfully"
    }


@router.get("/dashboard/stats")
def dashboard_statistics():
    try:
        test_mongodb_connection()

        return get_dashboard_statistics()

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to retrieve dashboard statistics: {str(exc)}",
        )