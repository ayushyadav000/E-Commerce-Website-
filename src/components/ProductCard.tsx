import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../data/products";
import { addToCart, toggleWishlist, type RootState } from "../store/store";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const dispatch = useDispatch();
  const wished = useSelector((s: RootState) => s.wishlist.ids.includes(product.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      className="group surface rounded-2xl overflow-hidden card-hover relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[var(--surface-2)] to-[var(--surface)]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.new && <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-white">NEW</span>}
            {product.bestseller && <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-white">BESTSELLER</span>}
            {product.oldPrice && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-accent-500 text-white">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => { e.preventDefault(); dispatch(toggleWishlist(product.id)); }}
        className={`absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center backdrop-blur-md transition-all ${
          wished ? "bg-accent-500 text-white" : "bg-white/70 dark:bg-black/40 text-[var(--text)] hover:bg-white"
        }`}
        aria-label="Wishlist"
      >
        <FiHeart className={wished ? "fill-current" : ""} />
      </button>

      <div className="p-4">
        <div className="text-[11px] uppercase tracking-wider text-muted">{product.brand}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold mt-1 line-clamp-1 group-hover:text-brand-500 transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1.5 text-xs text-muted">
          <FiStar className="text-amber-500 fill-amber-500" />
          <span className="font-medium text-[var(--text)]">{product.rating}</span>
          <span>({product.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-lg">${product.price}</span>
              {product.oldPrice && <span className="text-xs text-muted line-through">${product.oldPrice}</span>}
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.preventDefault(); dispatch(addToCart({ product })); }}
            className="w-10 h-10 rounded-xl btn-primary grid place-items-center"
            aria-label="Add to cart"
          >
            <FiShoppingBag />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
