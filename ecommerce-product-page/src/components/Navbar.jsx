
import { useCart } from "../Context/CartContext";

export default function Navbar({ page, setPage }) {
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <button
        className="brand"
        onClick={() => setPage({ name: "home" })}
      >
        <span className="brand-icon">P</span>
        PardhuMart
      </button>

      <nav className="nav-links">
        <button
          className={page.name === "home" ? "nav-link active" : "nav-link"}
          onClick={() => setPage({ name: "home" })}
        >
          Products
        </button>

        <button
          className={page.name === "cart" ? "nav-link active" : "nav-link"}
          onClick={() => setPage({ name: "cart" })}
        >
          Cart
          <span className="cart-badge">{cartCount}</span>
        </button>
      </nav>
    </header>
  );
}
