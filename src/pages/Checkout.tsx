import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck, FiCreditCard, FiLock, FiTruck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, type RootState } from "../store/store";

export default function Checkout() {
  const items = useSelector((s: RootState) => s.cart.items);
  const coupon = useSelector((s: RootState) => s.cart.coupon);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [pay, setPay] = useState<"card" | "stripe" | "razorpay">("card");
  const [placed, setPlaced] = useState(false);

  const subtotal = items.reduce((a, i) => a + i.product.price * i.qty, 0);
  const discount = coupon ? (subtotal * coupon.discount) / 100 : 0;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  if (placed) {
    return (
      <div className="pt-32 pb-16 max-w-2xl mx-auto px-4 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="surface rounded-3xl p-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="w-20 h-20 mx-auto rounded-full bg-emerald-500 grid place-items-center text-white text-3xl">
            <FiCheck />
          </motion.div>
          <h1 className="font-display text-3xl font-bold mt-5">Order Confirmed!</h1>
          <p className="text-muted mt-2">Order #NX{Math.floor(Math.random() * 90000 + 10000)} has been placed successfully.</p>
          <p className="text-sm text-muted mt-1">A confirmation email is on its way.</p>
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={() => navigate("/dashboard")} className="btn-primary px-5 py-3 rounded-xl font-semibold">View orders</button>
            <button onClick={() => navigate("/shop")} className="btn-ghost px-5 py-3 rounded-xl font-semibold">Continue shopping</button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-16 max-w-2xl mx-auto px-4 text-center">
        <p className="text-muted">No items in cart.</p>
      </div>
    );
  }

  const steps = [
    { n: 1, label: "Address", icon: FiTruck },
    { n: 2, label: "Payment", icon: FiCreditCard },
    { n: 3, label: "Review", icon: FiCheck },
  ];

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Checkout</h1>
      <p className="text-muted text-sm mb-8 flex items-center gap-2"><FiLock /> Secure SSL encrypted checkout</p>

      {/* Steps */}
      <div className="flex items-center gap-2 sm:gap-4 mb-8">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center gap-2 sm:gap-4 flex-1">
            <div className={`flex items-center gap-2 ${step >= s.n ? "text-brand-500" : "text-muted"}`}>
              <div className={`w-9 h-9 rounded-full grid place-items-center font-bold text-sm transition ${step >= s.n ? "btn-primary" : "surface-2"}`}>
                {step > s.n ? <FiCheck /> : s.n}
              </div>
              <span className="font-semibold text-sm hidden sm:inline">{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${step > s.n ? "bg-brand-500" : "bg-[var(--border)]"}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="surface rounded-2xl p-6">
          {step === 1 && (
            <>
              <h2 className="font-display font-bold text-xl mb-5">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full name" placeholder="Ayush Yadav" />
                <Input label="Email" type="email" placeholder="ayush@example.com" />
                <Input label="Phone" placeholder="+1 555 0100" />
                <Input label="Country" placeholder="United States" />
                <div className="sm:col-span-2"><Input label="Street address" placeholder="221B Baker Street" /></div>
                <Input label="City" placeholder="New York" />
                <Input label="ZIP / Postal code" placeholder="10001" />
              </div>
              <button onClick={() => setStep(2)} className="btn-primary px-6 py-3 rounded-xl font-semibold mt-6">Continue to payment</button>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="font-display font-bold text-xl mb-5">Payment Method</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "card", label: "Credit Card", desc: "Visa, MC, Amex" },
                  { id: "stripe", label: "Stripe", desc: "Pay securely" },
                  { id: "razorpay", label: "Razorpay", desc: "UPI, Wallets" },
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPay(p.id as any)}
                    className={`rounded-xl p-4 text-left border-2 transition ${pay === p.id ? "border-brand-500 bg-brand-500/5" : "border-app surface-2"}`}
                  >
                    <div className="font-semibold text-sm">{p.label}</div>
                    <div className="text-xs text-muted mt-0.5">{p.desc}</div>
                  </button>
                ))}
              </div>
              {pay === "card" && (
                <div className="mt-6 space-y-4">
                  <Input label="Card number" placeholder="4242 4242 4242 4242" />
                  <div className="grid grid-cols-3 gap-4">
                    <Input label="Expiry" placeholder="MM/YY" />
                    <Input label="CVC" placeholder="123" />
                    <Input label="ZIP" placeholder="10001" />
                  </div>
                </div>
              )}
              {pay !== "card" && (
                <div className="mt-6 surface-2 rounded-xl p-5 text-sm text-muted">
                  You'll be redirected to {pay === "stripe" ? "Stripe" : "Razorpay"} to complete your payment securely.
                </div>
              )}
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="btn-ghost px-6 py-3 rounded-xl font-semibold">Back</button>
                <button onClick={() => setStep(3)} className="btn-primary px-6 py-3 rounded-xl font-semibold">Review order</button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="font-display font-bold text-xl mb-5">Review your order</h2>
              <div className="space-y-3">
                {items.map(({ product, qty }) => (
                  <div key={product.id} className="flex gap-3 items-center">
                    <img src={product.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{product.name}</div>
                      <div className="text-xs text-muted">Qty: {qty}</div>
                    </div>
                    <div className="font-display font-bold">${(product.price * qty).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="btn-ghost px-6 py-3 rounded-xl font-semibold">Back</button>
                <button
                  onClick={() => { dispatch(clearCart()); setPlaced(true); }}
                  className="btn-primary px-6 py-3 rounded-xl font-semibold flex-1"
                >
                  Place order — ${total.toFixed(2)}
                </button>
              </div>
            </>
          )}
        </motion.div>

        <aside className="surface rounded-2xl p-6 h-fit lg:sticky lg:top-28">
          <h3 className="font-display font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted">Items ({items.length})</span><span>${subtotal.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-500"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
            <div className="flex justify-between"><span className="text-muted">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-muted">Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-display font-bold text-lg pt-3 border-t border-app">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Input({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted block mb-1.5">{label}</span>
      <input {...rest} className="w-full px-4 py-2.5 rounded-xl surface-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50" />
    </label>
  );
}
