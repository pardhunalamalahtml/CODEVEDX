
import { useCart } from "../Context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductCard({ product, onDetails }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <button
        className="product-image-button"
        onClick={() => onDetails(product)}
        aria-label={`View ${product.name} details`}
      >
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.visibility = "hidden";
          }}
        />
        <span className="image-category">{product.category}</span>
      </button>

      <div className="product-info">
        <div className="product-rating">
          <span>★</span> {product.rating} / 5
        </div>

        <h3>{product.name}</h3>
        <p className="product-description">
          {product.description}
        </p>

        <div className="product-card-bottom">
          <strong className="product-price">
            {formatPrice(product.price)}
          </strong>

          <button
            className="button button-primary add-button"
            onClick={() => addToCart(product)}
          >
            + Add
          </button>
        </div>

        <button
          className="details-link"
          onClick={() => onDetails(product)}
        >
          View product details →
        </button>
      </div>
    </article>
  );
}
