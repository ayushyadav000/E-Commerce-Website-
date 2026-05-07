import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiMinus, FiPlus, FiShield, FiShoppingBag, FiStar, FiTruck, FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS } from "../data/products";
import { addToCart, toggleWishlist, type RootState } from "../store/store";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id) ?? PRODUCTS[0];
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wished = useSelector((s: RootState) => s.wishlist.ids.includes(product.id));

  const gallery = product.gallery ?? [product.image];
  const related = useMemo(() => PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4), [product]);

  const reviews = [
    { name: "Alex M.", rating: 5, date: "2 days ago", text: "Outstanding quality. Lives up to every word." },
    { name: "Jamie L.", rating: 4, date: "1 week ago", text: "Great product, fast shipping. Would buy again." },
    { name: "Sam K.", rating: 5, date: "3 weeks ago", text: "Beautifully packaged and works flawlessly." },
  ];

  const handleAdd = () => dispatch(addToCart({ product, qty }));
  const handleBuy = () => { dispatch(addToCart({ product, qty })); navigate("/checkout"); };

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-muted mb-6">
        <Link to="/" className="hover:text-brand-500">Home</Link> / <Link to="/shop" className="hover:text-brand-500">Shop</Link> / <Link to={`/shop?category=${product.category}`} className="hover:text-brand-500">{product.category}</Link> / <span className="text-[var(--text)]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
          <div
            className="relative surface rounded-3xl overflow-hidden aspect-square cursor-zoom-in"
            onMouseMove={(e) => {
              const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
              setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
            }}
            onMouseLeave={() => setZoom(z => ({ ...z, on: false }))}
          >
            <img
              src={gallery[active]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300"
              style={zoom.on ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : {}}
            />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition ${active === i ? "border-brand-500" : "border-transparent surface"}`}
                >
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div>
            <p className="text-brand-500 text-xs font-bold tracking-wider uppercase">{product.brand}</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">{product.name}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm">
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} className={i < Math.round(product.rating) ? "fill-current" : ""} />
                ))}
              </div>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-muted">· {product.reviews.toLocaleString()} reviews</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold">${product.price}</span>
            {product.oldPrice && (
              <>
                <span className="text-muted line-through">${product.oldPrice}</span>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-accent-500 text-white">
                  Save ${product.oldPrice - product.price}
                </span>
              </>
            )}
          </div>

          <p className="text-muted leading-relaxed">{product.description}</p>

          <ul className="grid grid-cols-2 gap-2">
            {product.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <FiCheck className="text-emerald-500" /> {f}
              </li>
            ))}
          </ul>

          {product.colors && (
            <div>
              <div className="text-xs font-bold tracking-wider uppercase text-muted mb-2">Color</div>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setColor(i)}
                    style={{ background: c }}
                    className={`w-9 h-9 rounded-full border-2 transition ${color === i ? "border-brand-500 scale-110" : "border-app"}`}
                    aria-label="color"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="surface-2 rounded-xl flex items-center">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-3 hover:bg-[var(--surface)]"><FiMinus /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="p-3 hover:bg-[var(--surface)]"><FiPlus /></button>
            </div>
            <span className="text-sm text-muted">{product.stock} in stock</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleAdd} className="btn-primary px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2">
              <FiShoppingBag /> Add to Cart
            </motion.button>
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleBuy} className="btn-ghost px-6 py-3.5 rounded-xl font-semibold">
              Buy Now
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleWishlist(product.id))}
              className={`w-12 h-12 rounded-xl grid place-items-center transition ${wished ? "bg-accent-500 text-white" : "btn-ghost"}`}
              aria-label="wishlist"
            >
              <FiHeart className={wished ? "fill-current" : ""} />
            </motion.button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-app">
            <div className="flex items-center gap-3 text-sm"><FiTruck className="text-brand-500 text-lg" /> Free shipping over $50</div>
            <div className="flex items-center gap-3 text-sm"><FiShield className="text-brand-500 text-lg" /> 2-year warranty</div>
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold mb-5">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="surface rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-muted">{r.date}</div>
              </div>
              <div className="flex text-amber-500 mt-1">
                {Array.from({ length: r.rating }).map((_, k) => <FiStar key={k} className="fill-current" />)}
              </div>
              <p className="text-sm text-muted mt-3">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold mb-5">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
