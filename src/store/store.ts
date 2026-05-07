import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../data/products";

export type CartItem = { product: Product; qty: number };

type CartState = {
  items: CartItem[];
  coupon: { code: string; discount: number } | null;
};

const loadCart = (): CartState => {
  try {
    const raw = localStorage.getItem("nexora_cart");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { items: [], coupon: null };
};

const saveCart = (state: CartState) => {
  try { localStorage.setItem("nexora_cart", JSON.stringify(state)); } catch {}
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(),
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; qty?: number }>) => {
      const { product, qty = 1 } = action.payload;
      const existing = state.items.find(i => i.product.id === product.id);
      if (existing) existing.qty += qty;
      else state.items.push({ product, qty });
      saveCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.product.id !== action.payload);
      saveCart(state);
    },
    updateQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const item = state.items.find(i => i.product.id === action.payload.id);
      if (item) item.qty = Math.max(1, action.payload.qty);
      saveCart(state);
    },
    clearCart: (state) => { state.items = []; state.coupon = null; saveCart(state); },
    applyCoupon: (state, action: PayloadAction<string>) => {
      const code = action.payload.trim().toUpperCase();
      const valid: Record<string, number> = { Shop10: 10, WELCOME20: 20, BLACKFRIDAY: 30 };
      if (valid[code]) state.coupon = { code, discount: valid[code] };
      else state.coupon = null;
      saveCart(state);
    },
  },
});

type WishlistState = { ids: string[] };
const loadWishlist = (): WishlistState => {
  try {
    const raw = localStorage.getItem("shop_wishlist");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { ids: [] };
};
const saveWishlist = (s: WishlistState) => { try { localStorage.setItem("nexora_wishlist", JSON.stringify(s)); } catch {} };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlist(),
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.ids.includes(id)) state.ids = state.ids.filter(x => x !== id);
      else state.ids.push(id);
      saveWishlist(state);
    },
  },
});

type User = { name: string; email: string } | null;
type AuthState = { user: User };
const loadAuth = (): AuthState => {
  try {
    const raw = localStorage.getItem("nexora_auth");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { user: null };
};
const saveAuth = (s: AuthState) => { try { localStorage.setItem("nexora_auth", JSON.stringify(s)); } catch {} };

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuth(),
  reducers: {
    login: (state, action: PayloadAction<User>) => { state.user = action.payload; saveAuth(state); },
    logout: (state) => { state.user = null; saveAuth(state); },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart, applyCoupon } = cartSlice.actions;
export const { toggleWishlist } = wishlistSlice.actions;
export const { login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
