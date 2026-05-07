import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiMinus, FiPlus, FiShoppingBag, FiTag, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { applyCoupon, removeFromCart, updateQty, type RootState } from "../store/store";

export default function Cart() {
  const items = useSelector((s: RootState) => s.cart.items);
  const coupon = useSelector((s: RootState) => s.cart.coupon);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const subtotal = items.reduce((a, i) => a + i.product.price * i.qty, 0);
  const discount = coupon ? (subtotal * coupon.discount) / 100 : 0;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-16 max-w-3xl mx-auto px-4 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="surface rounded-3xl p-12">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-brand-500/10 text-brand-500 grid place-items-center text-3xl">
            <FiShoppingBag />
          </div>
          <h1 className="font-display text-3xl font-bold mt-5">Your cart is empty</h1>
          <p className="text-muted mt-2">Looks like you haven't added anything yet. Start exploring our collection.</p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold mt-6">
            Continue shopping <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-3">
          <AnimatePresence>
            {items.map(({ product, qty }) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100, height: 0 }}
                transition={{ duration: 0.3 }}
                className="surface rounded-2xl p-4 flex gap-4 items-center"
              >
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img src={product.image} alt={product.name} className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted">{product.brand}</p>
                  <Link to={`/product/${product.id}`} className="font-semibold hover:text-brand-500 line-clamp-1">{product.name}</Link>
                  <p className="text-sm text-muted mt-0.5">{product.category}</p>
                  <div className="flex items-center justify-between mt-2 gap-3 flex-wrap">
                    <div className="surface-2 rounded-lg flex items-center">
                      <button onClick={() => dispatch(updateQty({ id: product.id, qty: qty - 1 }))} className="p-2 hover:bg-[var(--surface)]"><FiMinus className="text-sm" /></button>
                      <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                      <button onClick={() => dispatch(updateQty({ id: product.id, qty: qty + 1 }))} className="p-2 hover:bg-[var(--surface)]"><FiPlus className="text-sm" /></button>
                    </div>
                    <div className="font-display font-bold">${(product.price * qty).toFixed(2)}</div>
                  </div>
                </div>
                <button onClick={() => dispatch(removeFromCart(product.id))} className="self-start p-2 rounded-lg hover:bg-accent-500/10 hover:text-accent-500 transition" aria-label="remove">
                  <FiTrash2 />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <motion.aside layout className="surface rounded-2xl p-6 h-fit lg:sticky lg:top-28">
          <h3 className="font-display font-bold text-lg mb-4">Order Summary</h3>

          <div className="flex items-center gap-2 surface-2 rounded-xl p-2 mb-4">
            <FiTag className="text-muted ml-2" />
            <input
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
            <button
              onClick={() => dispatch(applyCoupon(code))}
              className="btn-primary text-xs px-3 py-2 rounded-lg font-semibold"
            >Apply</button>
          </div>
          {coupon && (
            <div className="text-xs text-emerald-500 font-semibold mb-3">✓ {coupon.code} applied — {coupon.discount}% off</div>
          )}
          <div className="text-xs text-muted mb-4">Try: <code className="text-brand-500">NEXORA10</code>, <code className="text-brand-500">WELCOME20</code>, <code className="text-brand-500">BLACKFRIDAY</code></div>

          <div className="space-y-2 text-sm border-t border-app pt-4">
            <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-500"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
            <div className="flex justify-between"><span className="text-muted">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-muted">Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-display font-bold text-lg pt-3 border-t border-app">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/checkout")}
            className="btn-primary w-full py-3.5 rounded-xl font-semibold mt-5 flex items-center justify-center gap-2"
          >
            Proceed to Checkout <FiArrowRight />
          </motion.button>
          <Link to="/shop" className="block text-center text-sm text-muted hover:text-brand-500 mt-3">← Continue shopping</Link>
        </motion.aside>
      </div>
    </div>
  );
}
