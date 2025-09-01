import React, { createContext, useContext, useState, useEffect } from "react";
import { useWeb3 } from "./Web3Context";
import { apiService } from "../utils/api";

const MarketplaceContext = createContext();

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
};

// Mock product catalog (unchanged)
const PRODUCT_CATALOG = [
  {
    id: "solar_panel_100w",
    name: "100W Solar Panel",
    description:
      "High-efficiency monocrystalline solar panel perfect for home installations",
    category: "solar_equipment",
    tokenPrice: 2500,
    originalPrice: "$149.99",
    discount: "15% off",
    image: "🔆",
    inStock: true,
    rating: 4.8,
    reviews: 234,
    specifications: ["100W Output", "Monocrystalline", "25-year warranty"],
  },
  {
    id: "smart_inverter",
    name: "Smart Grid-Tie Inverter",
    description:
      "Intelligent inverter with WiFi monitoring and grid synchronization",
    category: "solar_equipment",
    tokenPrice: 4200,
    originalPrice: "$299.99",
    discount: "20% off",
    image: "⚡",
    inStock: true,
    rating: 4.9,
    reviews: 156,
    specifications: ["3000W Capacity", "WiFi Enabled", "Grid-tie Compatible"],
  },
  {
    id: "battery_pack",
    name: "Lithium Battery Pack",
    description: "12V 100Ah LiFePO4 battery for energy storage systems",
    category: "solar_equipment",
    tokenPrice: 6000,
    originalPrice: "$399.99",
    discount: "25% off",
    image: "🔋",
    inStock: true,
    rating: 4.7,
    reviews: 189,
    specifications: [
      "100Ah Capacity",
      "LiFePO4 Technology",
      "10-year lifespan",
    ],
  },
  {
    id: "led_bulb_pack",
    name: "Smart LED Bulb Pack (4x)",
    description: "Energy-efficient smart LED bulbs with app control",
    category: "eco_products",
    tokenPrice: 800,
    originalPrice: "$59.99",
    discount: "10% off",
    image: "💡",
    inStock: true,
    rating: 4.6,
    reviews: 445,
    specifications: ["9W LED", "Smart Control", "Color Changing"],
  },
  {
    id: "smart_thermostat",
    name: "Eco Smart Thermostat",
    description:
      "AI-powered thermostat that learns your preferences and saves energy",
    category: "eco_products",
    tokenPrice: 1500,
    originalPrice: "$129.99",
    discount: "12% off",
    image: "🌡️",
    inStock: true,
    rating: 4.8,
    reviews: 312,
    specifications: ["AI Learning", "WiFi Enabled", "Energy Savings"],
  },
  {
    id: "carbon_offset_1ton",
    name: "Carbon Offset Certificate (1 Ton)",
    description:
      "Verified carbon offset certificate supporting renewable energy projects",
    category: "certificates",
    tokenPrice: 500,
    originalPrice: "$25.00",
    discount: "0% off",
    image: "🌱",
    inStock: true,
    rating: 5.0,
    reviews: 89,
    specifications: [
      "1 Ton CO2 Offset",
      "Verified Project",
      "Digital Certificate",
    ],
  },
  {
    id: "amazon_gift_50",
    name: "$50 Amazon Gift Card",
    description: "Digital Amazon gift card delivered instantly to your email",
    category: "gift_cards",
    tokenPrice: 2000,
    originalPrice: "$50.00",
    discount: "0% off",
    image: "🎁",
    inStock: true,
    rating: 5.0,
    reviews: 1234,
    specifications: ["Digital Delivery", "Instant", "No Expiration"],
  },
  {
    id: "premium_features",
    name: "Premium App Features (1 Year)",
    description:
      "Unlock advanced analytics, custom reports, and priority support",
    category: "app_features",
    tokenPrice: 1200,
    originalPrice: "$99.99",
    discount: "30% off",
    image: "⭐",
    inStock: true,
    rating: 4.9,
    reviews: 567,
    specifications: [
      "Advanced Analytics",
      "Custom Reports",
      "Priority Support",
    ],
  },
];

const CATEGORIES = [
  { id: "all", name: "All Products", icon: "🛍️" },
  { id: "solar_equipment", name: "Solar Equipment", icon: "☀️" },
  { id: "eco_products", name: "Eco Products", icon: "🌿" },
  { id: "gift_cards", name: "Gift Cards", icon: "🎁" },
  { id: "certificates", name: "Certificates", icon: "📜" },
  { id: "app_features", name: "Premium Features", icon: "⭐" },
];

export const MarketplaceProvider = ({ children }) => {
  const [userTokenBalance, setUserTokenBalance] = useState(0);
  const [nftCount, setNftCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);

  const { account, isConnected } = useWeb3();

  // Fetch real token balance from API
  const fetchTokenBalance = async () => {
    if (!account) {
      setUserTokenBalance(0);
      setNftCount(0);
      return;
    }

    try {
      setBalanceLoading(true);
      console.log(
        `[2025-08-30 12:31:32] Fetching token balance for wallet: ${account}`
      );

      const response = await apiService.getTokenBalance(account);

      console.log(`[2025-08-30 12:31:32] Balance API Response:`, response);

      if (response && typeof response.total_spendable_units !== "undefined") {
        const balance = parseInt(response.total_spendable_units || 0);
        // const nfts = parseInt(response.nft_count || 0);

        setUserTokenBalance(balance);
        // setNftCount(nfts);

        console.log(`[2025-08-30 12:31:32] Token balance updated:`, {
          wallet: response.wallet,
          total_spendable_units: balance,
          // nft_count: nfts,
          user: "imangi-iit",
        });

        // Save to localStorage as cache
        saveUserData({
          tokenBalance: balance,
          // nftCount: nfts,
          lastBalanceUpdate: "2025-08-30 12:31:32",
        });
      } else {
        console.warn("Invalid balance response format:", response);
        console.warn(
          "Expected fields: total_spendable_units, nft_count, wallet"
        );
        // Fallback to localStorage if API response is invalid
        loadCachedBalance();
      }
    } catch (error) {
      console.error("Error fetching token balance:", error);
      // Fallback to localStorage if API fails
      loadCachedBalance();
    } finally {
      setBalanceLoading(false);
    }
  };

  // Load cached balance from localStorage as fallback
  const loadCachedBalance = () => {
    if (!account) return;

    try {
      const storageKey = `marketplace_${account}`;
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        const data = JSON.parse(stored);
        if (data.tokenBalance !== undefined) {
          setUserTokenBalance(data.tokenBalance);
          setNftCount(data.nftCount || 0);
          console.log(`[2025-08-30 12:31:32] Loaded cached balance:`, {
            tokens: data.tokenBalance,
            // nfts: data.nftCount || 0,
            lastUpdate: data.lastBalanceUpdate || "unknown",
          });
        }
      }
    } catch (error) {
      console.error("Error loading cached balance:", error);
    }
  };

  // Load user data from localStorage
  const loadUserData = () => {
    if (!account) return;

    try {
      const storageKey = `marketplace_${account}`;
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        const data = JSON.parse(stored);
        setCart(data.cart || []);
        setOrders(data.orders || []);

        console.log(
          `[2025-08-30 12:31:32] Loaded marketplace data for ${account}:`,
          data
        );
      }
    } catch (error) {
      console.error("Error loading marketplace data:", error);
    }
  };

  // Save user data to localStorage
  const saveUserData = (data) => {
    if (!account) return;

    try {
      const storageKey = `marketplace_${account}`;
      const currentData = localStorage.getItem(storageKey);
      let existingData = {};

      if (currentData) {
        existingData = JSON.parse(currentData);
      }

      const saveData = {
        ...existingData,
        tokenBalance: userTokenBalance,
        nftCount: nftCount,
        cart,
        orders,
        lastUpdated: "2025-08-30 12:31:32",
        ...data,
      };

      localStorage.setItem(storageKey, JSON.stringify(saveData));
      console.log(
        `[2025-08-30 12:31:32] Saved marketplace data for ${account}:`,
        saveData
      );
    } catch (error) {
      console.error("Error saving marketplace data:", error);
    }
  };

  // Refresh token balance (can be called manually)
  const refreshTokenBalance = async () => {
    console.log(
      `[2025-08-30 12:31:32] Manual refresh triggered by user: imangi-iit`
    );
    await fetchTokenBalance();
  };

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newItem = { ...product, quantity };
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    saveUserData({ cart: updatedCart });
    console.log(`[2025-08-30 12:31:32] Added ${product.name} to cart`);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    saveUserData({ cart: updatedCart });
  };

  // Update cart item quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    saveUserData({ cart: updatedCart });
  };

  // Calculate cart total in tokens
  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.tokenPrice * item.quantity,
      0
    );
  };

  // Process order/redemption
  const redeemCart = async () => {
    const cartTotal = getCartTotal();

    if (cartTotal > userTokenBalance) {
      throw new Error("Insufficient token balance");
    }

    if (cart.length === 0) {
      throw new Error("Cart is empty");
    }

    setLoading(true);

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create new order
      const newOrder = {
        id: `order_${Date.now()}`,
        items: [...cart],
        totalTokens: cartTotal,
        status: "confirmed",
        orderDate: "2025-08-30",
        orderTime: "12:31:32",
        estimatedDelivery: "2025-09-06", // 7 days from now
      };

      // Update balances and clear cart
      const newBalance = userTokenBalance - cartTotal;
      setUserTokenBalance(newBalance);
      setOrders([newOrder, ...orders]);
      setCart([]);

      // Save to localStorage
      saveUserData({
        tokenBalance: newBalance,
        cart: [],
        orders: [newOrder, ...orders],
      });

      console.log(
        `[2025-08-30 12:31:32] Order processed successfully:`,
        newOrder
      );
      return newOrder;
    } catch (error) {
      console.error("Error processing order:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on category and search
  const getFilteredProducts = () => {
    let filtered = PRODUCT_CATALOG;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  // Load data when account changes
  useEffect(() => {
    if (isConnected && account) {
      loadUserData();
      fetchTokenBalance(); // Fetch real balance from API
    } else {
      // Reset state when disconnected
      setUserTokenBalance(0);
      setNftCount(0);
      setCart([]);
      setOrders([]);
    }
  }, [account, isConnected]);

  // Auto-refresh balance every 30 seconds
  useEffect(() => {
    if (!isConnected || !account) return;

    const interval = setInterval(() => {
      fetchTokenBalance();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [account, isConnected]);

  const value = {
    // State
    userTokenBalance,
    nftCount,
    cart,
    orders,
    selectedCategory,
    searchQuery,
    loading,
    balanceLoading,

    // Product data
    products: PRODUCT_CATALOG,
    categories: CATEGORIES,
    filteredProducts: getFilteredProducts(),

    // Methods
    addToCart,
    removeFromCart,
    updateCartQuantity,
    redeemCart,
    getCartTotal,
    setSelectedCategory,
    setSearchQuery,
    refreshTokenBalance,
    fetchTokenBalance,

    // Utilities
    formatTokens: (amount) => amount.toLocaleString(),
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};
