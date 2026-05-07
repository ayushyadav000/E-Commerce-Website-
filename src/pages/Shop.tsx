import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFilter, FiX, FiSearch, FiSliders } from "react-icons/fi";
import { CATEGORIES, PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

const SORT = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low → High" },
  { id: "price-desc", label: "Price: High → Low" },
  { id: "rating", label: "Top Rated" },
  { id: "newest", label: "Newest" },
];

const PAGE_SIZE = 8;

function Skeletons() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="surface rounded-2xl overflow-hidden">
          <div className="skeleton aspect-square" />
          <div className="p-4 space-y-2">
            <div className="skeleton h-3 w-1/3" />
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? "");
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const p: Record<string, string> = {};
    if (search) p.search = search;
    if (category) p.category = category;
    setParams(p, { replace: true });
    setPage(1);
  }, [search, category, setParams]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (category) list = list.filter(p => p.category === category);
    list = list.filter(p => p.price <= maxPrice);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.sort((a, b) => Number(!!b.new) - Number(!!a.new)); break;
    }
    return list;
  }, [search, category, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const FilterBody = (
    <div className="space-y-6">
      <div>
        <h4 className="text-xs font-bold tracking-wider uppercase text-muted mb-3">Search</h4>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2.5 rounded-xl surface-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          />
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold tracking-wider uppercase text-muted mb-3">Categories</h4>
        <div className="space-y-1">
          <button
            onClick={() => setCategory("")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm flex justify-between items-center ${category === "" ? "bg-brand-500/10 text-brand-500 font-semibold" : "hover:bg-[var(--surface-2)]"}`}
          >
            <span>All</span><span className="text-xs text-muted">{PRODUCTS.length}</span>
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex justify-between items-center ${category === c.id ? "bg-brand-500/10 text-brand-500 font-semibold" : "hover:bg-[var(--surface-2)]"}`}
            >
              <span>{c.icon} {c.name}</span><span className="text-xs text-muted">{c.count}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold tracking-wider uppercase text-muted mb-3">Max Price</h4>
        <input
          type="range"
          min={100} max={2500} step={50}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--color-brand-500)]"
        />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>$100</span>
          <span className="font-semibold text-[var(--text)]">${maxPrice}</span>
          <span>$2500</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-brand-500 text-xs font-bold tracking-wider uppercase">Shop</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">{category || "All Products"}</h1>
          <p className="text-muted mt-1 text-sm">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="surface-2 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          >
            {SORT.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <button onClick={() => setDrawerOpen(true)} className="lg:hidden btn-ghost px-3 py-2 rounded-xl text-sm flex items-center gap-2">
            <FiSliders /> Filters
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block surface rounded-2xl p-5 h-fit sticky top-28">{FilterBody}</aside>
        <main>
          {loading ? <Skeletons /> : (
            pageItems.length ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {pageItems.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10 gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition ${page === i + 1 ? "btn-primary" : "btn-ghost"}`}
                      >{i + 1}</button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="surface rounded-2xl p-12 text-center">
                <FiFilter className="mx-auto text-3xl text-muted" />
                <h3 className="font-display text-xl font-bold mt-3">No products match your filters</h3>
                <p className="text-muted text-sm mt-1">Try adjusting your search or category.</p>
                <button onClick={() => { setSearch(""); setCategory(""); setMaxPrice(2500); }} className="btn-primary px-5 py-2.5 rounded-xl text-sm mt-5">Reset filters</button>
              </div>
            )
          )}
        </main>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 24 }} className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm surface p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-display font-bold text-lg">Filters</h3>
              <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-lg hover:bg-[var(--surface-2)]"><FiX /></button>
            </div>
            {FilterBody}
            <button onClick={() => setDrawerOpen(false)} className="btn-primary w-full py-3 rounded-xl mt-6">Apply</button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
