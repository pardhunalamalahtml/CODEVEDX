
import { useCart } from "../Context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function Cart({ onContinueShopping }) {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const shipping = cartTotal === 0 || cartTotal >= 5000 ? 0 : 40;
  const grandTotal = cartTotal + shipping;

  if (cartItems.length === 0) {
    return (
      <section className="empty-cart">
        <div className="empty-cart-icon">🛍️</div>
        <h1>Your cart is empty</h1>
        <p>
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          className="button button-primary"
          onClick={onContinueShopping}
        >
          Explore Products
        </button>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="section-heading cart-heading">
        <div>
          <span className="eyebrow">YOUR SELECTION</span>
          <h1>Shopping Cart</h1>
          <p>Review your products before checkout.</p>
        </div>

        <button className="clear-button" onClick={clearCart}>
          Clear cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <span className="cart-item-category">
                  {item.category}
                </span>
                <h3>{item.name}</h3>
                <strong>{formatPrice(item.price)}</strong>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

              <div className="quantity-control">
                <button
                  aria-label={`Decrease ${item.name} quantity`}
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  aria-label={`Increase ${item.name} quantity`}
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <strong className="line-total">
                {formatPrice(item.price * item.quantity)}
              </strong>
            </article>
          ))}
        </div>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? "FREE" : formatPrice(shipping)}
            </span>
          </div>

          <p className="shipping-note">
            {cartTotal >= 5000
              ? "You've unlocked free shipping!"
              : `Add ${formatPrice(5000 - cartTotal)} more for free shipping.`}
          </p>

          <div className="summary-total">
            <span>Total</span>
            <strong>{formatPrice(grandTotal)}</strong>
          </div>

          <button
            className="button button-primary checkout-button"
            onClick={() =>
              window.alert(
                "This is a demo project. Online payments are not enabled."
              )
            }
          >
            Proceed to Checkout
          </button>

          <button
            className="continue-button"
            onClick={onContinueShopping}
          >
            ← Continue shopping
          </button>
        </aside>
      </div>
    </section>
  );
}
