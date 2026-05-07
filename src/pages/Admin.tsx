import { useState } from "react";
import { motion } from "framer-motion";
import { FiBarChart2, FiBox, FiDollarSign, FiEdit2, FiPackage, FiPlus, FiSearch, FiShoppingBag, FiTrash2, FiUpload, FiUsers } from "react-icons/fi";
import { PRODUCTS, type Product } from "../data/products";

const TABS = [
  { id: "overview", label: "Overview", icon: FiBarChart2 },
  { id: "products", label: "Products", icon: FiBox },
  { id: "orders", label: "Orders", icon: FiPackage },
  { id: "users", label: "Users", icon: FiUsers },
];

const STATS = [
  { label: "Revenue", value: "$184,302", delta: "+12.4%", icon: FiDollarSign, color: "from-emerald-500 to-teal-400" },
  { label: "Orders", value: "1,284", delta: "+8.1%", icon: FiShoppingBag, color: "from-brand-500 to-blue-400" },
  { label: "Customers", value: "9,420", delta: "+3.6%", icon: FiUsers, color: "from-violet-500 to-fuchsia-400" },
  { label: "Products", value: PRODUCTS.length.toString(), delta: "+2", icon: FiBox, color: "from-amber-500 to-orange-400" },
];

const SALES_DATA = [42, 55, 38, 70, 48, 80, 65, 90, 72, 88, 102, 95];

const ORDERS = [
  { id: "NX-19283", customer: "Sarah Chen", total: 449, status: "Delivered", date: "Mar 12" },
  { id: "NX-19282", customer: "Marcus Lee", total: 1499, status: "Processing", date: "Mar 12" },
  { id: "NX-19281", customer: "Priya Sharma", total: 299, status: "Shipped", date: "Mar 11" },
  { id: "NX-19280", customer: "Diego Torres", total: 178, status: "Delivered", date: "Mar 11" },
  { id: "NX-19279", customer: "Anna Kim", total: 599, status: "Cancelled", date: "Mar 10" },
];

const USERS = [
  { name: "Sarah Chen", email: "sarah@example.com", orders: 4, spent: 1248 },
  { name: "Marcus Lee", email: "marcus@example.com", orders: 7, spent: 3402 },
  { name: "Priya Sharma", email: "priya@example.com", orders: 2, spent: 778 },
  { name: "Diego Torres", email: "diego@example.com", orders: 9, spent: 4129 },
];

export default function Admin() {
  const [tab, setTab] = useState("overview");
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const onSave = (p: Product) => {
    setProducts(prev => editing ? prev.map(x => x.id === p.id ? p : x) : [p, ...prev]);
    setShowForm(false); setEditing(null);
  };

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-brand-500 text-xs font-bold tracking-wider uppercase">Admin</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">Dashboard</h1>
        </div>
        <div className="flex gap-2 surface rounded-xl p-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition ${
                tab === t.id ? "btn-primary" : "hover:bg-[var(--surface-2)]"
              }`}
            >
              <t.icon /> <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        {tab === "overview" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="surface rounded-2xl p-5">
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} text-white grid place-items-center`}>
                      <s.icon />
                    </div>
                    <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{s.delta}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-bold mt-3">{s.value}</div>
                  <div className="text-sm text-muted">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-4 mt-6">
              <div className="surface rounded-2xl p-5 lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display font-bold">Sales — last 12 months</h3>
                  <span className="text-xs text-muted">Total $184,302</span>
                </div>
                <BarChart data={SALES_DATA} />
              </div>
              <div className="surface rounded-2xl p-5">
                <h3 className="font-display font-bold mb-4">Top Categories</h3>
                <div className="space-y-3">
                  {["Audio", "Phones", "Computers", "Wearables"].map((c, i) => {
                    const pct = [78, 64, 52, 41][i];
                    return (
                      <div key={c}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{c}</span>
                          <span className="text-muted">{pct}%</span>
                        </div>
                        <div className="h-2 surface-2 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="surface rounded-2xl p-5 mt-6">
              <h3 className="font-display font-bold mb-4">Recent Orders</h3>
              <OrdersTable orders={ORDERS.slice(0, 5)} />
            </div>
          </>
        )}

        {tab === "products" && (
          <div className="surface rounded-2xl p-5">
            <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
              <div className="relative flex-1 max-w-xs">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 rounded-xl surface-2 text-sm focus:outline-none" />
              </div>
              <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold">
                <FiPlus /> Add Product
              </button>
            </div>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="text-left text-muted text-xs uppercase tracking-wider">
                    <th className="px-2 py-3">Product</th><th className="px-2 py-3">Category</th><th className="px-2 py-3">Price</th><th className="px-2 py-3">Stock</th><th className="px-2 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="border-t border-app">
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt="" className="w-10 h-10 object-cover rounded-lg" />
                          <div>
                            <div className="font-semibold line-clamp-1">{p.name}</div>
                            <div className="text-xs text-muted">{p.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-muted">{p.category}</td>
                      <td className="px-2 py-3 font-semibold">${p.price}</td>
                      <td className="px-2 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${p.stock > 20 ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>{p.stock}</span>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => { setEditing(p); setShowForm(true); }} className="p-2 rounded-lg hover:bg-[var(--surface-2)]"><FiEdit2 /></button>
                          <button onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))} className="p-2 rounded-lg hover:bg-accent-500/10 hover:text-accent-500"><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="surface rounded-2xl p-5">
            <h3 className="font-display font-bold mb-4">All Orders</h3>
            <OrdersTable orders={ORDERS} />
          </div>
        )}

        {tab === "users" && (
          <div className="surface rounded-2xl p-5">
            <h3 className="font-display font-bold mb-4">Users</h3>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="text-left text-muted text-xs uppercase tracking-wider">
                    <th className="px-2 py-3">User</th><th className="px-2 py-3">Email</th><th className="px-2 py-3">Orders</th><th className="px-2 py-3">Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {USERS.map(u => (
                    <tr key={u.email} className="border-t border-app">
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 grid place-items-center text-white font-bold text-xs">{u.name[0]}</div>
                          <span className="font-semibold">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-muted">{u.email}</td>
                      <td className="px-2 py-3">{u.orders}</td>
                      <td className="px-2 py-3 font-semibold">${u.spent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {showForm && <ProductForm product={editing} onClose={() => { setShowForm(false); setEditing(null); }} onSave={onSave} />}
    </div>
  );
}

function BarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <div className="flex items-end gap-2 h-48">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(v / max) * 100}%` }}
            transition={{ duration: 0.8, delay: i * 0.04, ease: "easeOut" }}
            className="w-full rounded-t-lg bg-gradient-to-t from-brand-500 to-accent-500"
          />
          <span className="text-[10px] text-muted">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function OrdersTable({ orders }: { orders: typeof ORDERS }) {
  const cls = (s: string) =>
    s === "Delivered" ? "bg-emerald-500/10 text-emerald-500"
    : s === "Shipped" ? "bg-blue-500/10 text-blue-500"
    : s === "Processing" ? "bg-amber-500/10 text-amber-500"
    : "bg-rose-500/10 text-rose-500";
  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm min-w-[520px]">
        <thead>
          <tr className="text-left text-muted text-xs uppercase tracking-wider">
            <th className="px-2 py-3">Order</th><th className="px-2 py-3">Customer</th><th className="px-2 py-3">Total</th><th className="px-2 py-3">Status</th><th className="px-2 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t border-app">
              <td className="px-2 py-3 font-semibold">{o.id}</td>
              <td className="px-2 py-3">{o.customer}</td>
              <td className="px-2 py-3 font-semibold">${o.total}</td>
              <td className="px-2 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cls(o.status)}`}>{o.status}</span></td>
              <td className="px-2 py-3 text-muted">{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductForm({ product, onClose, onSave }: { product: Product | null; onClose: () => void; onSave: (p: Product) => void }) {
  const [form, setForm] = useState<Product>(product ?? {
    id: "p" + Math.floor(Math.random() * 9999),
    name: "", brand: "Nexora", category: "Audio", price: 0, rating: 4.5, reviews: 0, stock: 10,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "", features: [],
  });

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} className="surface rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="font-display text-2xl font-bold mb-5">{product ? "Edit" : "Add"} Product</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
          <Input label="Brand" value={form.brand} onChange={v => setForm({ ...form, brand: v })} />
          <div>
            <label className="text-xs font-semibold text-muted block mb-1.5">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as any })} className="w-full px-4 py-2.5 rounded-xl surface-2 text-sm focus:outline-none">
              {["Audio", "Wearables", "Computers", "Phones", "Cameras", "Gaming", "Home"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <Input label="Price" type="number" value={String(form.price)} onChange={v => setForm({ ...form, price: Number(v) })} />
          <Input label="Stock" type="number" value={String(form.stock)} onChange={v => setForm({ ...form, stock: Number(v) })} />
          <Input label="Image URL" value={form.image} onChange={v => setForm({ ...form, image: v })} />
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted block mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-xl surface-2 text-sm focus:outline-none resize-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted block mb-1.5">Product image</label>
            <div className="surface-2 rounded-xl border-2 border-dashed border-app p-6 text-center hover:border-brand-500 transition cursor-pointer">
              <FiUpload className="mx-auto text-2xl text-muted" />
              <p className="text-sm mt-2">Drop an image here or click to upload</p>
              <p className="text-xs text-muted">Cloudinary integration ready</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-6">
          <button onClick={onClose} className="btn-ghost px-5 py-2.5 rounded-xl font-semibold text-sm">Cancel</button>
          <button onClick={() => onSave(form)} className="btn-primary px-5 py-2.5 rounded-xl font-semibold text-sm">{product ? "Save changes" : "Create product"}</button>
        </div>
      </motion.div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted block mb-1.5">{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full px-4 py-2.5 rounded-xl surface-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50" />
    </label>
  );
}
