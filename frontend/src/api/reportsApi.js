import api from "./axios";

/**
 * Fetch Inspection History
 * Backend Endpoint:
 * GET /api/history
 */

export const getInspectionHistory = async () => {
  const response = await api.get("/history");
  return response.data;
};