import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBox, FiHeart, FiHome, FiLogOut, FiMapPin, FiPackage, FiSettings, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleWishlist, type RootState } from "../store/store";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

const TABS = [
  { id: "overview", label: "Overview", icon: FiHome },
  { id: "orders", label: "Orders", icon: FiPackage },
  { id: "wishlist", label: "Wishlist", icon: FiHeart },
  { id: "addresses", label: "Addresses", icon: FiMapPin },
  { id: "profile", label: "Profile", icon: FiUser },
  { id: "settings", label: "Settings", icon: FiSettings },
];

const MOCK_ORDERS = [
  { id: "NX-19283", date: "Mar 12, 2026", total: 449, status: "Delivered", items: 1 },
  { id: "NX-19211", date: "Mar 04, 2026", total: 299, status: "Shipped", items: 1 },
  { id: "NX-19156", date: "Feb 21, 2026", total: 778, status: "Delivered", items: 2 },
  { id: "NX-18901", date: "Jan 18, 2026", total: 179, status: "Delivered", items: 1 },
];

export default function Dashboard() {
  const user = useSelector((s: RootState) => s.auth.user);
  const wishlistIds = useSelector((s: RootState) => s.wishlist.ids);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");

  if (!user) {
    return (
      <div className="pt-32 pb-16 max-w-2xl mx-auto px-4 text-center">
        <div className="surface rounded-3xl p-12">
          <h1 className="font-display text-2xl font-bold">Please sign in</h1>
          <p className="text-muted mt-2">You need an account to access your dashboard.</p>
          <Link to="/login" className="btn-primary inline-flex px-6 py-3 rounded-xl font-semibold mt-5">Sign in</Link>
        </div>
      </div>
    );
  }

  const wishProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="surface rounded-2xl p-5 h-fit lg:sticky lg:top-28">
          <div className="flex items-center gap-3 pb-4 border-b border-app">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 grid place-items-center text-white font-bold">
              {user.name[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="font-semibold truncate">{user.name}</div>
              <div className="text-xs text-muted truncate">{user.email}</div>
            </div>
          </div>
          <nav className="mt-3 space-y-1">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  tab === t.id ? "bg-brand-500/10 text-brand-500" : "hover:bg-[var(--surface-2)]"
                }`}
              >
                <t.icon /> {t.label}
              </button>
            ))}
            <button
              onClick={() => { dispatch(logout()); navigate("/"); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent-500/10 hover:text-accent-500 transition mt-3"
            >
              <FiLogOut /> Sign out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main>
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {tab === "overview" && (
              <div>
                <h1 className="font-display text-3xl font-bold">Hi, {user.name.split(" ")[0]} 👋</h1>
                <p className="text-muted mt-1">Here's a snapshot of your account.</p>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  {[
                    { label: "Orders", value: MOCK_ORDERS.length, icon: FiPackage, color: "from-brand-500 to-blue-400" },
                    { label: "Wishlist", value: wishProducts.length, icon: FiHeart, color: "from-rose-500 to-pink-400" },
                    { label: "Spent", value: `$${MOCK_ORDERS.reduce((a, o) => a + o.total, 0)}`, icon: FiBox, color: "from-emerald-500 to-teal-400" },
                  ].map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="surface rounded-2xl p-5">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} text-white grid place-items-center`}>
                        <s.icon />
                      </div>
                      <div className="text-3xl font-display font-bold mt-3">{s.value}</div>
                      <div className="text-sm text-muted">{s.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="surface rounded-2xl p-5 mt-6">
                  <h2 className="font-display font-bold text-lg mb-4">Recent Orders</h2>
                  <OrdersTable orders={MOCK_ORDERS.slice(0, 3)} />
                </div>
              </div>
            )}

            {tab === "orders" && (
              <div className="surface rounded-2xl p-6">
                <h1 className="font-display text-2xl font-bold mb-5">Order History</h1>
                <OrdersTable orders={MOCK_ORDERS} />
              </div>
            )}

            {tab === "wishlist" && (
              <div>
                <h1 className="font-display text-2xl font-bold mb-5">Your Wishlist</h1>
                {wishProducts.length === 0 ? (
                  <div className="surface rounded-2xl p-12 text-center">
                    <p className="text-muted">No items saved yet.</p>
                    <Link to="/shop" className="btn-primary inline-flex px-5 py-2.5 rounded-xl font-semibold mt-4">Browse products</Link>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishProducts.map((p, i) => (
                      <div key={p.id} className="relative">
                        <ProductCard product={p} index={i} />
                        <button
                          onClick={() => dispatch(toggleWishlist(p.id))}
                          className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-accent-500 text-white"
                        >Remove</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "addresses" && (
              <div className="surface rounded-2xl p-6">
                <h1 className="font-display text-2xl font-bold mb-5">Saved Addresses</h1>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { type: "Home", line: "221B Baker Street, NY 10001, USA" },
                    { type: "Work", line: "1 Hacker Way, Menlo Park, CA 94025" },
                  ].map((a) => (
                    <div key={a.type} className="surface-2 rounded-2xl p-5">
                      <div className="flex justify-between items-start">
                        <div className="font-semibold">{a.type}</div>
                        <button className="text-xs text-brand-500 font-semibold">Edit</button>
                      </div>
                      <p className="text-sm text-muted mt-2">{a.line}</p>
                    </div>
                  ))}
                  <button className="surface-2 rounded-2xl p-5 border-2 border-dashed border-app text-muted hover:text-brand-500 hover:border-brand-500 transition">
                    + Add new address
                  </button>
                </div>
              </div>
            )}

            {tab === "profile" && (
              <div className="surface rounded-2xl p-6">
                <h1 className="font-display text-2xl font-bold mb-5">Profile</h1>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name" defaultValue={user.name} />
                  <Field label="Email" defaultValue={user.email} />
                  <Field label="Phone" placeholder="+1 555 0100" />
                  <Field label="Date of birth" type="date" />
                </div>
                <button className="btn-primary px-6 py-3 rounded-xl font-semibold mt-6">Save changes</button>
              </div>
            )}

            {tab === "settings" && (
              <div className="surface rounded-2xl p-6">
                <h1 className="font-display text-2xl font-bold mb-5">Settings</h1>
                <div className="space-y-3">
                  {["Email notifications", "Order updates via SMS", "Marketing emails", "Two-factor authentication"].map((s, i) => (
                    <label key={s} className="surface-2 rounded-xl p-4 flex items-center justify-between cursor-pointer">
                      <span className="text-sm font-medium">{s}</span>
                      <input type="checkbox" defaultChecked={i < 2} className="w-5 h-5 accent-[var(--color-brand-500)]" />
                    </label>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function OrdersTable({ orders }: { orders: typeof MOCK_ORDERS }) {
  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm min-w-[480px]">
        <thead>
          <tr className="text-left text-muted text-xs uppercase tracking-wider">
            <th className="px-2 py-3">Order</th><th className="px-2 py-3">Date</th><th className="px-2 py-3">Items</th><th className="px-2 py-3">Total</th><th className="px-2 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t border-app">
              <td className="px-2 py-3 font-semibold">{o.id}</td>
              <td className="px-2 py-3 text-muted">{o.date}</td>
              <td className="px-2 py-3">{o.items}</td>
              <td className="px-2 py-3 font-semibold">${o.total}</td>
              <td className="px-2 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  o.status === "Delivered" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                }`}>{o.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Field({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted block mb-1.5">{label}</span>
      <input {...rest} className="w-full px-4 py-2.5 rounded-xl surface-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50" />
    </label>
  );
}
