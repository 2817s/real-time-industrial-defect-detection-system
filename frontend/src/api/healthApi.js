import api from "./axios";

/**
 * Check Backend Status
 */

export const checkBackendHealth = async () => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    console.error("Backend Health Check Failed:", error);
    throw error;
  }
};