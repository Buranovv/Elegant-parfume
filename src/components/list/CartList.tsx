"use client";

import useCart from "@/zustand/cart";
import CartCard from "../card/cart/cartCard";
import { useEffect, useState } from "react";
import UniversalData from "@/types/universalData";

const CartList = () => {
  const { cart } = useCart();
  const [data, setData] = useState<UniversalData[]>([]);
  useEffect(() => {
    setData(cart);
  }, [cart]);
  return (
    <div className="cartList">
      {data.map((pr) => (
        <CartCard key={pr._id} {...pr} />
      ))}
    </div>
  );
};

export default CartList;
