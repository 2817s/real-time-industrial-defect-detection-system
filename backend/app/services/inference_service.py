import gc
from pathlib import Path

import torch
from ultralytics import YOLO

from app.config import MODEL_PATH


# Load the trained YOLO model once when the backend starts
model = YOLO(MODEL_PATH)


def _run_prediction(image_path: str, confidence: float, device):
    """
    Execute YOLO inference on the specified device.
    """

    results = model.predict(
        source=image_path,
        conf=confidence,
        imgsz=800,
        device=device,
        batch=1,
        half=False,
        verbose=False,
    )

    return results[0]


def predict_image(image_path: str, confidence: float = 0.25):
    """
    Run defect detection on a single image.

    Uses GPU first and automatically falls back to CPU
    if CUDA runs out of memory.

    Args:
        image_path: Path to the input image.
        confidence: Minimum confidence threshold.

    Returns:
        List of detected defects.
    """

    try:
        # First attempt: NVIDIA GPU
        result = _run_prediction(
            image_path=image_path,
            confidence=confidence,
            device=0,
        )

    except (torch.cuda.OutOfMemoryError, RuntimeError) as error:

        error_message = str(error).lower()

        # Only fall back for CUDA memory errors.
        if "out of memory" not in error_message or "cuda" not in error_message:
            raise

        print(
            "WARNING: CUDA out of memory. "
            "Switching to CPU inference..."
        )

        # Release unused GPU memory
        gc.collect()

        if torch.cuda.is_available():
            torch.cuda.empty_cache()

        # Second attempt: CPU
        result = _run_prediction(
            image_path=image_path,
            confidence=confidence,
            device="cpu",
        )

        print("CPU inference completed successfully.")

    detections = []

    for box in result.boxes:
        class_id = int(box.cls[0])
        confidence_score = float(box.conf[0])

        coordinates = box.xyxy[0].tolist()

        detections.append({
            "class_id": class_id,
            "class_name": model.names[class_id],
            "confidence": round(confidence_score, 4),
            "bbox": [
                round(float(value), 2)
                for value in coordinates
            ],
        })

    return detections