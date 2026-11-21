from pathlib import Path

from dotenv import load_dotenv
import os


load_dotenv()


APP_NAME = "Real-Time Industrial Defect Detection System"
APP_VERSION = "1.0.0"
API_PREFIX = "/api"

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "models" / "defect_model_exp3_img800.pt"

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DATABASE = os.getenv("MONGODB_DATABASE", "defect_detection")
