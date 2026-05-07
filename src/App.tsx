import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation, Link } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp, FiShoppingBag } from "react-icons/fi";
import { useState } from "react";

import { ThemeProvider } from "./context/ThemeContext";
import { store, type RootState } from "./store/store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [pathname]);
  return null;
}

function FloatingButtons() {
  const [show, setShow] = useState(false);
  const cartCount = useSelector((s: RootState) => s.cart.items.reduce((a, i) => a + i.qty, 0));
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full btn-primary grid place-items-center shadow-2xl"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 z-40 sm:hidden"
          >
            <Link to="/cart" className="glass rounded-full px-4 py-2.5 flex items-center gap-2 shadow-2xl">
              <FiShoppingBag className="text-brand-500" />
              <span className="text-sm font-bold">{cartCount} in cart →</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PageRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Auth initial="login" />} />
          <Route path="/register" element={<Auth initial="register" />} />
          <Route path="/forgot" element={<Auth initial="forgot" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function NotFound() {
  return (
    <div className="pt-32 pb-16 max-w-2xl mx-auto px-4 text-center">
      <div className="surface rounded-3xl p-12">
        <div className="font-display text-7xl font-extrabold gradient-text">404</div>
        <h1 className="font-display text-2xl font-bold mt-3">Page not found</h1>
        <p className="text-muted mt-2">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary inline-flex px-5 py-2.5 rounded-xl font-semibold mt-5">Back to home</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="app-bg relative">
            <div className="relative z-10">
              <Navbar />
              <PageRoutes />
              <Footer />
              <FloatingButtons />
            </div>
          </div>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
}
