const API_BASE_URL = "http://10.14.195.232:8000";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`[2025-08-30 11:43:35] Fetching from: ${url}`);
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`[2025-08-30 11:43:35] API Response:`, data);
      return data;
    } catch (error) {
      console.error(`[2025-08-30 11:43:35] API request failed:`, error);
      throw error;
    }
  }

  // Get leaderboard data
  async getLeaderboard(limit = 10) {
    return this.request(`/api/leaderboard?limit=${limit}`);
  }

  // Get energy logs for a specific wallet - SEND CHECKSUM ADDRESS
  async getEnergyLogs(wallet, skip = 0, limit = 100) {
    console.log(
      `[2025-08-30 11:43:35] API: Getting energy logs for wallet: ${wallet} (checksum address)`
    );
    console.log(
      `[2025-08-30 11:43:35] API URL will be: ${API_BASE_URL}/api/getEnergyLogs?wallet=${wallet}&skip=${skip}&limit=${limit}`
    );
    return this.request(
      `/api/getEnergyLogs?wallet=${wallet}&skip=${skip}&limit=${limit}`
    );
  }
}

export const apiService = new ApiService();
