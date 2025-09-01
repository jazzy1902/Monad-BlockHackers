import React, { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaCoins,
  FaFilter,
  FaSync,
  FaGem,
} from "react-icons/fa";
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
    nftCount,
    cart,
    filteredProducts,
    categories,
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
    loading,
    balanceLoading,
    refreshTokenBalance,
  } = useMarketplace();

  const { isConnected, account } = useWeb3();
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

        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <TokenBalance>
            <FaCoins />
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {balanceLoading
                  ? "Loading..."
                  : userTokenBalance.toLocaleString()}
                <button
                  onClick={refreshTokenBalance}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    padding: "0.2rem",
                    borderRadius: "50%",
                    transition: "all 0.3s ease",
                  }}
                  title="Refresh balance"
                >
                  <FaSync
                    style={{
                      fontSize: "0.8rem",
                      animation: balanceLoading
                        ? "spin 1s linear infinite"
                        : "none",
                    }}
                  />
                </button>
              </div>
              <small>Spendable Units</small>
            </div>
          </TokenBalance>

          {nftCount > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "linear-gradient(135deg, #ff6b6b, #feca57)",
                color: "white",
                padding: "1rem 1.5rem",
                borderRadius: "15px",
                fontWeight: "600",
                border: "2px solid transparent",
              }}
            >
              <FaGem style={{ fontSize: "1.2rem" }} />
              <div>
                <div style={{ fontSize: "1.2rem" }}>{nftCount}</div>
                <small style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                  NFT{nftCount !== 1 ? "s" : ""} Owned
                </small>
              </div>
            </div>
          )}
        </div>
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
        <h3 style={{ marginBottom: "1rem" }}>💡 Your Solar Energy Stats:</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong>{userTokenBalance.toLocaleString()}</strong>
            <br />
            <small>Spendable Units</small>
          </div>
          <div>
            <strong>{nftCount}</strong>
            <br />
            {/* <small>NFTs Owned</small> */}
          </div>
        </div>
        <br />
        <p>• Generate solar energy and log it to earn more spendable units</p>
        <p>• NFTs represent your energy generation achievements</p>
        <p>• Maintain consistent energy production for bonus rewards</p>
        <br />
        <small>
          Balance API: 10.14.195.232:8000/api/balance | Wallet: {account}
          <br />
          Response format: total_spendable_units, nft_count, wallet
          <br />
          Last updated: 2025-08-30 12:31:32 | User: imangi-iit
          <br />
          🌱 Every purchase supports renewable energy initiatives
        </small>
      </div>

      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </MarketplaceContainer>
  );
};
