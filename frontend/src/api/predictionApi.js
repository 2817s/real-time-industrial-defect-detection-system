import api from "./axios";

/**
 * Upload image for AI prediction
 * Backend Endpoint:
 * POST /api/predict
 */

export const predictDefect = async (imageFile) => {
  const formData = new FormData();

  // Backend expects "file"
  formData.append("file", imageFile);

  const response = await api.post("/predict", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};