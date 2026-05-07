import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import type { RootState } from "../store/store";

export default function Wishlist() {
  const ids = useSelector((s: RootState) => s.wishlist.ids);
  const products = PRODUCTS.filter(p => ids.includes(p.id));

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-6">Your Wishlist</h1>
      {products.length === 0 ? (
        <div className="surface rounded-3xl p-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-500/10 text-accent-500 grid place-items-center text-2xl">
            <FiHeart />
          </div>
          <h2 className="font-display text-xl font-bold mt-4">No favorites yet</h2>
          <p className="text-muted mt-1">Start adding products to your wishlist by tapping the heart icon.</p>
          <Link to="/shop" className="btn-primary inline-flex px-5 py-2.5 rounded-xl font-semibold mt-5">Browse products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
