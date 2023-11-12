import CartList from "@/components/list/CartList";
import "./style.scss";

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
