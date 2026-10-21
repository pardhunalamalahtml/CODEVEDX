
import { useCart } from "../Context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductDetails({ product, onBack }) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <section className="details-page">
      <button className="back-button" onClick={onBack}>
        ← Back to products
      </button>

      <div className="details-layout">
        <div className="details-image-wrap">
          <img
            className="details-image"
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="details-content">
          <span className="eyebrow">{product.category}</span>

          <h1>{product.name}</h1>

          <p className="details-rating">
            <span>★</span> {product.rating} / 5 customer rating
          </p>

          <h2 className="details-price">
            {formatPrice(product.price)}
          </h2>

          <p className="details-description">
            {product.description}
          </p>

          <ul className="benefits-list">
            <li>✓ Quality-focused product selection</li>
            <li>✓ Easy cart management</li>
            <li>✓ Transparent pricing</li>
          </ul>

          <button
            className="button button-primary details-add-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <p className="demo-notice">
            Demo storefront — no real payment is processed.
          </p>
        </div>
      </div>
    </section>
  );
}
