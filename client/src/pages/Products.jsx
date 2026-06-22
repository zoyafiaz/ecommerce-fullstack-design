import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Products() {
  return (
    <div className="page">
      <section className="section">
        <h2>All Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Products;