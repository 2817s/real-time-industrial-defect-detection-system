import api from "./axios";

/**
 * Fetch Analytics Summary
 * Backend Endpoint:
 * GET /api/analytics/summary
 */

export const getAnalyticsSummary = async () => {
  const response = await api.get("/analytics/summary");
  return response.data;
};