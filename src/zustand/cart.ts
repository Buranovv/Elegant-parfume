import { CART } from "@/constants";
import request from "@/server";
import UniversalData from "@/types/universalData";
import { create } from "zustand";
import { toast } from "react-toastify";

interface initialState {
  cart: UniversalData[];
  addToCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  deleteFromCart: (id: string) => void;
}

const isLocalStorage = typeof localStorage !== "undefined";
const localCart = isLocalStorage ? localStorage.getItem(CART) : null;
const cart = localCart ? JSON.parse(localCart) : [];

const useCart = create<initialState>()((set, get) => ({
  cart,
  addToCart: async (id) => {
    const { cart } = get();
    const { data } = await request.get(`product/${id}`);
    let newCart;

    const productInCart = cart.find((pr) => pr._id === id);

    if (productInCart) {
      const newQuantity = productInCart.newQuantity || 0;

      newCart = cart.map((pr) => {
        if (pr._id === id) {
          pr.newQuantity = newQuantity + 1;
        }
        return pr;
      });
    } else {
      data.newQuantity = 1;
      newCart = [...cart, data];
    }
    toast.success("Mahsulot savatga qo`shildi!", { autoClose: 1000 });
    set({ cart: newCart });
    localStorage.setItem(CART, JSON.stringify(newCart));
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
}));

export default useCart;
