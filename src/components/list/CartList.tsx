"use client";

import useCart from "@/zustand/cart";
import CartCard from "../card/cart/cartCard";

const CartList = () => {
  const { cart } = useCart();

  return (
    <div className="cartList">
      {cart.map((pr) => (
        <CartCard key={pr._id} {...pr} />
      ))}
    </div>
  );
};

export default CartList;
