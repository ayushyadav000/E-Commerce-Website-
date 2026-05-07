import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiHeart, FiSearch, FiUser, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=Audio", label: "Audio" },
  { to: "/shop?category=Phones", label: "Phones" },
  { to: "/shop?category=Computers", label: "Computers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const cartCount = useSelector((s: RootState) => s.cart.items.reduce((a, i) => a + i.qty, 0));
  const wishCount = useSelector((s: RootState) => s.wishlist.ids.length);
  const user = useSelector((s: RootState) => s.auth.user);
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/shop?search=${encodeURIComponent(q.trim())}`);
      setSearchOpen(false);
      setOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300`}>
        <div className={`glass rounded-2xl px-4 sm:px-6 py-3 flex items-center gap-4 ${scrolled ? "shadow-lg" : ""}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 grid place-items-center shadow-lg shadow-brand-500/40">
              <span className="text-white font-bold font-display">S</span>
              <span className="absolute inset-0 rounded-xl bg-white/10" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight">Shop</span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "text-brand-500" : "hover:bg-[var(--surface-2)] text-muted"
                  }`
                }
                end={l.to === "/"}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Search (desktop) */}
          <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-md ml-auto">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search products, brands..."
                className="w-full pl-10 pr-4 py-2 rounded-xl surface-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            <button onClick={() => setSearchOpen(s => !s)} className="md:hidden p-2 rounded-lg hover:bg-[var(--surface-2)]" aria-label="Search">
              <FiSearch className="text-lg" />
            </button>
            <button onClick={toggle} className="p-2 rounded-lg hover:bg-[var(--surface-2)] transition" aria-label="Toggle theme">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block"
                >
                  {theme === "dark" ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-[var(--surface-2)] transition" aria-label="Wishlist">
              <FiHeart className="text-lg" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent-500 text-white text-[10px] font-bold rounded-full w-4 h-4 grid place-items-center">{wishCount}</span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-[var(--surface-2)] transition" aria-label="Cart">
              <FiShoppingBag className="text-lg" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-brand-500 text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 grid place-items-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <Link
              to={user ? "/dashboard" : "/login"}
              className="hidden sm:flex items-center gap-2 ml-1 px-3 py-2 rounded-lg btn-ghost text-sm font-medium"
            >
              <FiUser className="text-base" />
              <span className="hidden md:inline">{user ? user.name.split(" ")[0] : "Sign in"}</span>
            </Link>
            <button onClick={() => setOpen(o => !o)} className="lg:hidden p-2 rounded-lg hover:bg-[var(--surface-2)]" aria-label="Menu">
              {open ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              onSubmit={submitSearch}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden mt-2"
            >
              <div className="glass rounded-xl px-3 py-2 flex items-center gap-2">
                <FiSearch className="text-muted" />
                <input
                  autoFocus
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                />
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-2 glass rounded-2xl p-3"
            >
              <div className="flex flex-col">
                {links.map(l => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? "bg-brand-500/10 text-brand-500" : "hover:bg-[var(--surface-2)]"}`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <Link
                  to={user ? "/dashboard" : "/login"}
                  onClick={() => setOpen(false)}
                  className="sm:hidden mt-2 px-3 py-2.5 rounded-lg text-sm font-medium btn-ghost text-center"
                >
                  {user ? "Dashboard" : "Sign in / Register"}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
