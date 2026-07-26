# Backend API Contract

## Health

GET /api/health

Response

{
  "success": true,
  "message": "Backend is running successfully"
}

---

## Prediction

POST /api/predict

Content-Type:
multipart/form-data

Field Name:
file

Supported Formats:
jpg
jpeg
png

Planned Response:
...