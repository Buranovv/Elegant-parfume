import { CART, FAV } from "@/constants";
import UniversalData from "@/types/universalData";
import { create } from "zustand";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";
import request from "@/server";

interface initialState {
  cart: UniversalData[];
  fav: string[];
  loading: boolean;
  addToCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  deleteFromCart: (id: string) => void;
  addToFav: (id: string) => void;
  order: (comment: string, router: AppRouterInstance) => void;
}

const isLocalStorage = typeof localStorage !== "undefined";

const localCart = isLocalStorage ? localStorage.getItem(CART) : null;
const cart = localCart ? JSON.parse(localCart) : [];

const localFav = isLocalStorage ? localStorage.getItem(FAV) : null;
const fav = localFav ? JSON.parse(localFav) : [];

const useCart = create<initialState>()((set, get) => ({
  cart,
  fav,
  loading: false,
  addToCart: async (id) => {
    const { cart } = get();

    const productInCart = cart.find((pr) => pr._id === id);

    if (!productInCart) {
      const { data } = await request.get(`product/${id}`);
      let newCart;
      if (data.quantity > 0) {
        newCart = [...cart, { ...data, newQuantity: 1 }];
        toast.success("Mahsulot savatga qo`shildi!", { autoClose: 1000 });
      } else {
        newCart = cart;
        toast.info("Kechirasiz bu mahsulot tugagan!");
      }
      set({ cart: newCart });
      localStorage.setItem(CART, JSON.stringify(newCart));
    } else {
      toast.info("Mahsulot allaqachon savatga qo`wilgan!", { autoClose: 1000 });
    }
  },
  increaseQuantity: (id) => {
    const { cart } = get();

    const newCart = cart.map((pr) => {
      if (pr._id === id) {
        pr.newQuantity++;
      }
      return pr;
    });
    set({ cart: newCart });
    localStorage.setItem(CART, JSON.stringify(newCart));
  },
  decreaseQuantity: (id) => {
    const { cart } = get();
    let newCart;

    const productInCart = cart.find((pr) => pr._id === id);

    if (productInCart ? productInCart.newQuantity : 0 > 1) {
      newCart = cart.map((pr) => {
        if (pr._id === id) {
          pr.newQuantity--;
        }
        return pr;
      });
    } else {
      newCart = cart.filter((pr) => pr._id !== id);
    }
    set({ cart: newCart });
    localStorage.setItem(CART, JSON.stringify(newCart));
  },
  deleteFromCart: (id: string) => {
    const { cart } = get();
    const newCart = cart.filter((pr) => pr._id !== id);
    set({ cart: newCart });
    localStorage.setItem(CART, JSON.stringify(newCart));
  },
  addToFav: async (id) => {
    const { fav } = get();
    let newFav;

    const productInFav = fav.find((_id) => _id === id);

    if (!productInFav) {
      newFav = [...fav, id];
    } else {
      newFav = fav.filter((_id) => _id !== id);
    }
    set({ fav: newFav });
    localStorage.setItem(FAV, JSON.stringify(newFav));
  },
  order: async (comment, router) => {
    const { cart } = get();

    const obj = {
      cart: cart.map((pr) => ({
        product: pr._id,
        quantity: pr.newQuantity,
      })),
      comment,
    };

    try {
      set({ loading: true });
      await request.post("payment", obj);
      router.push("/orders");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCart;
