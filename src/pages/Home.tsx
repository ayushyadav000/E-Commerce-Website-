import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiAward, FiStar } from "react-icons/fi";
import { CATEGORIES, HERO_SLIDES, PRODUCTS, TESTIMONIALS } from "../data/products";
import ProductCard from "../components/ProductCard";

function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);
  const slide = HERO_SLIDES[i];
  return (
    <section className="relative pt-28 pb-10 sm:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2rem] overflow-hidden surface min-h-[480px] sm:min-h-[560px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-90`}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />

          <div className="relative grid md:grid-cols-2 gap-6 items-center p-6 sm:p-10 lg:p-16 min-h-[480px] sm:min-h-[560px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i + "text"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-white"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold tracking-wider">
                  {slide.eyebrow.toUpperCase()}
                </span>
                <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl mt-4 leading-[1.05]">
                  {slide.title}
                </h1>
                <p className="text-xl sm:text-2xl mt-2 font-light opacity-95">{slide.subtitle}</p>
                <p className="mt-4 max-w-md text-white/85">{slide.description}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to={`/product/${slide.productId}`} className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition flex items-center gap-2">
                    {slide.cta} <FiArrowRight />
                  </Link>
                  <Link to="/shop" className="px-6 py-3 rounded-xl bg-white/15 backdrop-blur text-white font-semibold hover:bg-white/25 transition border border-white/30">
                    Browse all
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={i + "img"}
                initial={{ opacity: 0, scale: 0.9, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="hidden md:flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-3xl blur-3xl" />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="relative w-full max-w-md rounded-3xl shadow-2xl floaty object-cover aspect-[4/5]"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = ["Free Shipping over $50", "30-day Returns", "2-year Warranty", "Premium Packaging", "Carbon Neutral", "24/7 Support"];
  const dup = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-app py-3 surface-2 mt-10">
      <div className="flex gap-12 marquee-track whitespace-nowrap" style={{ width: "max-content" }}>
        {dup.map((t, i) => (
          <span key={i} className="text-sm font-medium text-muted flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturesGrid() {
  const features = [
    { icon: FiTruck, title: "Free Shipping", desc: "On orders over $50" },
    { icon: FiShield, title: "Secure Payments", desc: "256-bit SSL & PCI" },
    { icon: FiRefreshCw, title: "Easy Returns", desc: "30-day money back" },
    { icon: FiAward, title: "2-Year Warranty", desc: "Premium quality assured" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="surface rounded-2xl p-5 card-hover"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-500/10 text-brand-500 grid place-items-center">
              <f.icon className="text-lg" />
            </div>
            <div className="font-semibold mt-3">{f.title}</div>
            <div className="text-sm text-muted">{f.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-brand-500 text-xs font-bold tracking-wider uppercase">Browse by Category</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1">Find your fit</h2>
        </div>
        <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand-500 hover:gap-2 transition-all">
          View all <FiArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {CATEGORIES.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to={`/shop?category=${c.id}`}
              className="group surface rounded-2xl p-5 flex flex-col items-center text-center card-hover h-full"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">{c.icon}</div>
              <div className="font-semibold text-sm mt-2">{c.name}</div>
              <div className="text-[11px] text-muted mt-0.5">{c.count} items</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedSection({ title, eyebrow, products }: { title: string; eyebrow: string; products: typeof PRODUCTS }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-brand-500 text-xs font-bold tracking-wider uppercase">{eyebrow}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1">{title}</h2>
        </div>
        <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand-500 hover:gap-2 transition-all">
          See more <FiArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="relative rounded-3xl overflow-hidden surface p-8 sm:p-12 lg:p-16">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="relative grid md:grid-cols-2 gap-6 items-center text-white">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wider">LIMITED OFFER</span>
            <h3 className="font-display text-3xl sm:text-5xl font-extrabold mt-3 leading-tight">Save up to 30% this week</h3>
            <p className="mt-3 text-white/85 max-w-md">Use code <span className="font-bold bg-white text-brand-700 px-2 py-0.5 rounded">BLACKFRIDAY</span> at checkout. Limited stock available.</p>
            <Link to="/shop" className="inline-flex mt-6 px-6 py-3 rounded-xl bg-white text-brand-700 font-semibold hover:bg-slate-100 transition items-center gap-2">
              Shop the sale <FiArrowRight />
            </Link>
          </div>
          <div className="hidden md:flex justify-end gap-4">
            {PRODUCTS.filter(p => p.oldPrice).slice(0, 2).map((p, i) => (
              <motion.img
                key={p.id}
                src={p.image}
                alt={p.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                className={`w-44 h-56 object-cover rounded-2xl shadow-2xl ${i === 1 ? "translate-y-6" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-brand-500 text-xs font-bold tracking-wider uppercase">Loved by thousands</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1">What our customers say</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="surface rounded-2xl p-5 card-hover"
          >
            <div className="flex gap-0.5 text-amber-500">
              {Array.from({ length: t.rating }).map((_, k) => <FiStar key={k} className="fill-current" />)}
            </div>
            <p className="text-sm mt-3 leading-relaxed">"{t.text}"</p>
            <div className="mt-4 flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="surface rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent-500/20 blur-3xl rounded-full" />
        <div className="relative">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Join the <span className="gradient-text">Shop</span> club</h2>
          <p className="text-muted mt-2 max-w-md mx-auto">Get 10% off your first order, plus early access to launches and exclusive drops.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-xl surface-2 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
            <button type="submit" className="btn-primary px-6 py-3 rounded-xl font-semibold">
              {done ? "Subscribed ✓" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <MarqueeStrip />
      <FeaturesGrid />
      <CategoriesSection />
      <FeaturedSection eyebrow="Featured" title="Trending now" products={PRODUCTS.filter(p => p.trending)} />
      <PromoBanner />
      <FeaturedSection eyebrow="Best Sellers" title="Most loved" products={PRODUCTS.filter(p => p.bestseller)} />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
