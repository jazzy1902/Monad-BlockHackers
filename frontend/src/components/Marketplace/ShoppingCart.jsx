import React, { useState } from "react";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaCreditCard,
  FaSpinner,
} from "react-icons/fa";
import { useMarketplace } from "../../context/MarketplaceContext";
import {
  CartContainer,
  CartHeader,
  CartItems,
  CartItem,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemPrice,
  QuantityControls,
  QuantityButton,
  QuantityDisplay,
  RemoveButton,
  CartSummary,
  TotalTokens,
  UserBalance,
  CheckoutButton,
  EmptyCart,
  LoadingOverlay,
} from "./ShoppingCart.styles";

export const ShoppingCart = ({ isOpen, onClose }) => {
  const {
    cart,
    userTokenBalance,
    getCartTotal,
    updateCartQuantity,
    removeFromCart,
    redeemCart,
    loading,
  } = useMarketplace();

  const [processingOrder, setProcessingOrder] = useState(false);

  const cartTotal = getCartTotal();
  const canCheckout = cartTotal > 0 && cartTotal <= userTokenBalance;

  const handleCheckout = async () => {
    try {
      setProcessingOrder(true);
      const order = await redeemCart();

      // Show success message
      alert(
        `🎉 Order Successful!\n\nOrder ID: ${
          order.id
        }\nTotal: ${order.totalTokens.toLocaleString()} tokens\n\nYour items will be processed within 24 hours.`
      );

      onClose();
    } catch (error) {
      alert(`❌ Order Failed\n\n${error.message}`);
    } finally {
      setProcessingOrder(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <CartContainer>
        <CartHeader>
          <h3>
            <FaShoppingCart />
            Shopping Cart ({cart.length})
          </h3>
          <button onClick={onClose}>✕</button>
        </CartHeader>

        {cart.length === 0 ? (
          <EmptyCart>
            <FaShoppingCart style={{ fontSize: "3rem", opacity: 0.3 }} />
            <p>Your cart is empty</p>
            <small>Add some products to get started!</small>
          </EmptyCart>
        ) : (
          <>
            <CartItems>
              {cart.map((item) => (
                <CartItem key={item.id}>
                  <ItemImage>{item.image}</ItemImage>

                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>
                      {item.tokenPrice.toLocaleString()} tokens each
                    </ItemPrice>
                  </ItemInfo>

                  <QuantityControls>
                    <QuantityButton
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <FaPlus />
                    </QuantityButton>
                  </QuantityControls>

                  <RemoveButton onClick={() => removeFromCart(item.id)}>
                    <FaTrash />
                  </RemoveButton>
                </CartItem>
              ))}
            </CartItems>

            <CartSummary>
              <TotalTokens>
                Total: {cartTotal.toLocaleString()} tokens
              </TotalTokens>
              <UserBalance $sufficient={cartTotal <= userTokenBalance}>
                Your Balance: {userTokenBalance.toLocaleString()} tokens
              </UserBalance>

              <CheckoutButton
                onClick={handleCheckout}
                disabled={!canCheckout || processingOrder}
                $canCheckout={canCheckout}
              >
                {processingOrder ? (
                  <>
                    <FaSpinner
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCreditCard />
                    {canCheckout ? "Redeem Items" : "Insufficient Tokens"}
                  </>
                )}
              </CheckoutButton>
            </CartSummary>
          </>
        )}

        {(loading || processingOrder) && (
          <LoadingOverlay>
            <FaSpinner
              style={{ animation: "spin 1s linear infinite", fontSize: "2rem" }}
            />
            <p>Processing your order...</p>
          </LoadingOverlay>
        )}
      </CartContainer>

      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 999,
        }}
        onClick={onClose}
      />
    </>
  );
};
