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
      console.log(
        `[2025-08-30 12:31:32] 🔗 Nomad Network API: Fetching from: ${url}`
      );
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`[2025-08-30 12:31:32] ⚡ Nomad Network API Response:`, data);
      return data;
    } catch (error) {
      console.error(
        `[2025-08-30 12:31:32] ❌ Nomad Network API request failed:`,
        error
      );
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
      `[2025-08-30 12:31:32] 🌐 Nomad Network: Getting energy logs for wallet: ${wallet} (checksum address)`
    );
    console.log(
      `[2025-08-30 12:31:32] 🔗 Nomad API URL: ${API_BASE_URL}/api/getEnergyLogs?wallet=${wallet}&skip=${skip}&limit=${limit}`
    );
    return this.request(
      `/api/getEnergyLogs?wallet=${wallet}&skip=${skip}&limit=${limit}`
    );
  }

  // Get token balance for a specific wallet - EXPECTS total_spendable_units
  async getTokenBalance(wallet) {
    console.log(
      `[2025-08-30 12:31:32] 💰 Nomad Network: Getting token balance for wallet: ${wallet} (checksum address)`
    );
    console.log(
      `[2025-08-30 12:31:32] 🔗 Nomad API URL: ${API_BASE_URL}/api/balance?wallet=${wallet}`
    );
    console.log(
      `[2025-08-30 12:31:32] 📊 Expected response format: { wallet, nft_count, total_spendable_units }`
    );
    return this.request(`/api/balance?wallet=${wallet}`);
  }
}

export const apiService = new ApiService();
