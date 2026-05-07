import { href, Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiYoutube, FiGithub, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 grid place-items-center shadow-lg shadow-brand-500/40">
                <span className="text-white font-bold font-display">S</span>
              </div>
              <span className="font-display font-bold text-xl">Shop</span>
            </Link>
            <p className="text-muted text-sm mt-4 max-w-sm">
              Premium tech products curated for makers, creators, and dreamers. Free shipping on orders over $50.
            </p>
            <div className="flex gap-2 mt-5">
              {[FiInstagram, FiTwitter, FiYoutube, FiGithub].map((Icon, i) => (
                <a key={i} href={`https://www.${["instagram", "twitter", "youtube", "github"][i]}.com/ayushyadav000`} className="w-9 h-9 grid place-items-center rounded-lg surface-2 hover:bg-brand-500 hover:text-white transition" aria-label="social">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Shop</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/shop" className="hover:text-brand-500">All Products</Link></li>
              <li><Link to="/shop?category=Audio" className="hover:text-brand-500">Audio</Link></li>
              <li><Link to="/shop?category=Phones" className="hover:text-brand-500">Phones</Link></li>
              <li><Link to="/shop?category=Computers" className="hover:text-brand-500">Computers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-brand-500">About</a></li>
              <li><a href="#" className="hover:text-brand-500">Careers</a></li>
              <li><a href="#" className="hover:text-brand-500">Press</a></li>
              <li><a href="#" className="hover:text-brand-500">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-brand-500">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-500">Shipping</a></li>
              <li><a href="#" className="hover:text-brand-500">Returns</a></li>
              <li><a href="#" className="hover:text-brand-500">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-app flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} Shop Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-brand-500">Privacy</a>
            <a href="#" className="hover:text-brand-500">Terms</a>
            <a href="#" className="hover:text-brand-500">Cookies</a>
          </div>
          <div className="flex items-center gap-2">
            <FiMail /> <span>ayush@shop.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
