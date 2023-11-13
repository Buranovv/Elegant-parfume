import CartList from "@/components/list/CartList";
import { Metadata } from "next";
import "./style.scss";

export const metadata: Metadata = {
  title: "Elegant parfume | Cart",
  description: "Generated by create next app",
};

const CartPage = () => {
  return (
    <main className="publicMain">
      <div className="cartlist-box">
        <CartList />
      </div>
    </main>
  );
};

export default CartPage;
