
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import products from "./data/products";

function Storefront() {
  const [page, setPage] = useState({ name: "home" });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function openDetails(product) {
    setPage({ name: "details", product });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setPage({ name: "home" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Navbar page={page} setPage={setPage} />

      <main className="container">
        {page.name === "home" && (
          <>
            <section className="hero">
              <div className="hero-content">
                <span className="eyebrow">THE EVERYDAY EDIT</span>
                <h1>
                  Better products.
                  <br />
                  <span>Better everyday.</span>
                </h1>
                <p>
                  Discover thoughtfully selected tech and lifestyle
                  essentials for your everyday routine.
                </p>
                <button
                  className="button button-primary hero-button"
                  onClick={() =>
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Collection <span>→</span>
                </button>
              </div>

              <div className="hero-decoration">
                <div className="hero-orbit orbit-one" />
                <div className="hero-orbit orbit-two" />
                <div className="hero-product">✦</div>
                <span className="hero-caption">Find your next favorite.</span>
              </div>
            </section>

            <section id="products" className="products-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">CURATED FOR YOU</span>
                  <h2>Explore our collection</h2>
                  <p>
                    Everyday essentials, all in one place.
                  </p>
                </div>

                <span className="result-count">
                  {filteredProducts.length} products
                </span>
              </div>

              <div className="product-toolbar">
                <label className="search-box">
                  <span>⌕</span>
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>

                <select
                  aria-label="Filter by category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All categories" : item}
                    </option>
                  ))}
                </select>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onDetails={openDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <h3>No products found</h3>
                  <p>Try another search term or category.</p>
                  <button
                    className="button button-primary"
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        {page.name === "details" && (
          <ProductDetails
            product={page.product}
            onBack={goHome}
          />
        )}

        {page.name === "cart" && (
          <Cart onContinueShopping={goHome} />
        )}
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-icon">P</span>
          <strong>PardhuMart</strong>
        </div>
        <p>
          A React e-commerce frontend project built for learning.
        </p>
        <span>© {new Date().getFullYear()} PardhuMart</span>
      </footer>
    </>
  );
}

export default function App() {
  return <Storefront />;
}
