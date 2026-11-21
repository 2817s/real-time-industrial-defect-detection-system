# Real-Time Industrial Defect Detection System

An AI-powered industrial surface defect detection system using **YOLOv8, OpenCV, FastAPI, React, and MongoDB**. The system detects and classifies surface defects in steel images, provides inspection results, and maintains prediction history and analytics through a web-based dashboard.

## Overview

Manual inspection of industrial metal surfaces can be time-consuming and inconsistent. This project uses deep learning-based object detection to automate the identification and localization of surface defects.

The application allows users to upload industrial surface images, receive defect predictions, visualize bounding boxes and confidence scores, and review historical inspection results.

## Key Features

- **AI-Based Defect Detection:** YOLOv8-based detection of six industrial surface defect categories.
- **Image Inspection:** Upload images and view detected defects with bounding boxes and confidence scores.
- **Interactive Dashboard:** View inspection statistics and recent detections.
- **Analytics:** Visualize defect distribution, detection trends, and model performance.
- **Prediction History:** Store and retrieve inspection records using MongoDB.
- **Reports:** Search, filter, refresh, and export inspection records as CSV.
- **System Settings:** View model configuration, API information, and backend connectivity.
- **GPU-First Inference:** Uses CUDA when available, with CPU fallback for CUDA out-of-memory errors.

## Technology Stack

| Component | Technologies |
|---|---|
| Programming Language | Python, JavaScript |
| Deep Learning | YOLOv8, PyTorch |
| Image Processing | OpenCV, Pillow |
| Backend | FastAPI, Uvicorn |
| Frontend | React, Vite |
| Database | MongoDB Atlas |
| Data Visualization | Recharts |
| API Communication | REST API |
| Development Tools | VS Code, Git, GitHub |

## Defect Categories

The system identifies the following six categories from the NEU-DET dataset:

1. Crazing
2. Inclusion
3. Patches
4. Pitted Surface
5. Rolled-in Scale
6. Scratches

## Model Performance

The selected model is based on YOLOv8n, fine-tuned using the NEU-DET dataset.

**Selected Experiment: Experiment 3 (800px image size)**

| Evaluation Metric | Result |
|---|---:|
| Precision | 66.9% |
| Recall | 68.5% |
| mAP@50 | 72.5% |
| mAP@50–95 | 36.9% |

These values represent the model's validation results for Experiment 3.

## Project Structure

```text
real-time-industrial-defect-detection-system/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config.py
│   │   └── main.py
│   ├── models/
│   ├── requirements.txt
│   └── API_CONTRACT.md
│
├── dataset/
│   └── dataset.yaml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   ├── package.json
│   └── index.html
│
├── scripts/
│   ├── dataset_inspector.py
│   ├── validate_dataset.py
│   └── xml_to_yolo.py
│
├── weights/
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Python 3.11
- Node.js and npm
- MongoDB Atlas account or compatible MongoDB instance
- NVIDIA GPU with compatible CUDA support (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/2817s/real-time-industrial-defect-detection-system.git
cd real-time-industrial-defect-detection-system
```

### 2. Backend Setup

Create and activate a Python virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

Install PyTorch and torchvision using the appropriate installation command for your system. For CUDA 12.8, the installation index is:

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128
```

Install the remaining backend dependencies:

```bash
pip install -r backend/requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DATABASE=defect_detection
```

Replace the connection string with your own MongoDB credentials. Never commit `.env` files or database credentials to GitHub.

### 4. Configure the Trained Model

Place the trained model file at:

```text
backend/models/defect_model_exp3_img800.pt
```

The trained model weights are excluded from the Git repository. Obtain the model file separately before starting the backend.

### 5. Start the Backend

Open a terminal:

```bash
cd backend
uvicorn app.main:app --reload
```

Backend address:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

### 6. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend address:

```text
http://localhost:5173
```

Keep both backend and frontend servers running while using the application.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Backend health check |
| POST | `/api/predict` | Upload an image and detect defects |
| GET | `/api/history` | Retrieve prediction history |
| GET | `/api/dashboard/stats` | Retrieve dashboard statistics |

Interactive API documentation is available through FastAPI Swagger UI at `/docs`.

## Database

MongoDB stores inspection metadata, including:

- Image filename
- Detected defect categories
- Detection confidence scores
- Bounding box coordinates
- Number of detections
- Prediction timestamp

Original uploaded images are processed temporarily and are not stored permanently in MongoDB.

## Dataset

The project uses the **NEU-DET (Northeastern University Surface Defect Database)** for model training and evaluation.

Dataset preparation utilities are available in the `scripts/` directory:

- `dataset_inspector.py`
- `validate_dataset.py`
- `xml_to_yolo.py`

The original and converted datasets are not included in the Git repository and must be obtained separately when reproducing model training.

## Future Scope

- ONNX model export and inference optimization.
- TensorRT acceleration for supported NVIDIA hardware.
- Prometheus and Grafana monitoring integration.
- Further model optimization and defect classification improvements.
- Deployment on industrial edge devices.
- Extended reporting and inspection capabilities.

## Project Information

**Project:** Real-Time Industrial Defect Detection System

**Domain:** Artificial Intelligence and Machine Learning

**Model:** YOLOv8n

**Dataset:** NEU-DET

**Repository:** https://github.com/2817s/real-time-industrial-defect-detection-system

---

*Developed as a Semester Group Project (SGP).*