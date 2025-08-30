import React from "react";
import { FaStar, FaShoppingCart, FaCheck } from "react-icons/fa";
import { useMarketplace } from "../../context/MarketplaceContext";
import {
  ProductCardContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductPrice,
  TokenPrice,
  OriginalPrice,
  ProductRating,
  ProductSpecs,
  SpecItem,
  AddToCartButton,
  InCartIndicator,
} from "./ProductCard.styles";

export const ProductCard = ({ product }) => {
  const { addToCart, cart, userTokenBalance } = useMarketplace();

  const isInCart = cart.some((item) => item.id === product.id);
  const canAfford = userTokenBalance >= product.tokenPrice;

  const handleAddToCart = () => {
    if (canAfford && !isInCart) {
      addToCart(product);
    }
  };

  return (
    <ProductCardContainer>
      <ProductImage>{product.image}</ProductImage>

      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>

        <ProductPrice>
          <TokenPrice $canAfford={canAfford}>
            {product.tokenPrice.toLocaleString()} tokens
          </TokenPrice>
          <OriginalPrice>
            {product.originalPrice}{" "}
            {product.discount && `(${product.discount})`}
          </OriginalPrice>
        </ProductPrice>

        <ProductRating>
          <FaStar style={{ color: "#FFD700" }} />
          <span>{product.rating}</span>
          <span>({product.reviews} reviews)</span>
        </ProductRating>

        <ProductSpecs>
          {product.specifications.map((spec, index) => (
            <SpecItem key={index}>{spec}</SpecItem>
          ))}
        </ProductSpecs>

        {isInCart ? (
          <InCartIndicator>
            <FaCheck />
            Added to Cart
          </InCartIndicator>
        ) : (
          <AddToCartButton
            onClick={handleAddToCart}
            disabled={!canAfford}
            $canAfford={canAfford}
          >
            <FaShoppingCart />
            {canAfford ? "Add to Cart" : "Insufficient Tokens"}
          </AddToCartButton>
        )}
      </ProductInfo>
    </ProductCardContainer>
  );
};
