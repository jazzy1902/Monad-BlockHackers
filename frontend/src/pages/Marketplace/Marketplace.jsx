import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaCoins, FaFilter } from "react-icons/fa";
import { useMarketplace } from "../../context/MarketplaceContext";
import { useWeb3 } from "../../context/Web3Context";
import { ProductCard } from "../../components/Marketplace/ProductCard";
import { ShoppingCart } from "../../components/Marketplace/ShoppingCart";
import {
  MarketplaceContainer,
  MarketplaceHeader,
  PageTitle,
  TokenBalance,
  SearchAndFilter,
  SearchBox,
  CategoryFilter,
  CategoryButton,
  ProductGrid,
  CartSection,
  CartButton,
  CartBadge,
  EmptyState,
  LoadingState,
} from "./Marketplace.styles";

export const Marketplace = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    userTokenBalance,
    cart,
    filteredProducts,
    categories,
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
    loading,
  } = useMarketplace();

  const { isConnected } = useWeb3();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (!isConnected) {
    return (
      <MarketplaceContainer>
        <EmptyState>
          <FaShoppingCart style={{ fontSize: "4rem", opacity: 0.3 }} />
          <h2>Connect Your Wallet</h2>
          <p>Please connect your MetaMask wallet to access the marketplace</p>
        </EmptyState>
      </MarketplaceContainer>
    );
  }

  if (loading) {
    return (
      <MarketplaceContainer>
        <LoadingState>
          <div>Loading marketplace...</div>
        </LoadingState>
      </MarketplaceContainer>
    );
  }

  return (
    <MarketplaceContainer>
      <MarketplaceHeader>
        <div>
          <PageTitle>🛍️ Solar Marketplace</PageTitle>
          <p>Redeem your earned tokens for eco-friendly products and rewards</p>
        </div>

        <TokenBalance>
          <FaCoins />
          <div>
            <div>{userTokenBalance.toLocaleString()}</div>
            <small>Available Tokens</small>
          </div>
        </TokenBalance>
      </MarketplaceHeader>

      <SearchAndFilter>
        <SearchBox>
          <FaSearch />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBox>

        <CategoryFilter>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              $isActive={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon} {category.name}
            </CategoryButton>
          ))}
        </CategoryFilter>
      </SearchAndFilter>

      <CartSection>
        <CartButton onClick={() => setIsCartOpen(true)}>
          <FaShoppingCart />
          Cart ({cartItemCount})
          {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
        </CartButton>
      </CartSection>

      {filteredProducts.length === 0 ? (
        <EmptyState>
          <FaFilter style={{ fontSize: "3rem", opacity: 0.3 }} />
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </EmptyState>
      ) : (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      )}

      <div
        style={{
          textAlign: "center",
          marginTop: "3rem",
          padding: "2rem",
          background: "rgba(76, 175, 80, 0.1)",
          borderRadius: "15px",
          color: "#666",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>💡 How to earn more tokens:</h3>
        <p>• Generate 3+ kWh of solar energy daily</p>
        <p>• Maintain your energy generation streak</p>
        <p>• Open the app daily to stay engaged</p>
        <p>• Complete special challenges and achievements</p>
        <br />
        <small>
          Last updated: 2025-08-30 11:54:38 UTC | User: imangi-iit
          <br />
          🌱 Every purchase supports renewable energy initiatives
        </small>
      </div>

      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </MarketplaceContainer>
  );
};
