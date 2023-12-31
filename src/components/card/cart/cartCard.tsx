import UniversalData from "@/types/universalData";
import useCart from "@/zustand/cart";
import Image from "next/image";

import "./style.scss";

const CartCard = ({
  _id,
  title,
  price,
  quantity,
  image,
  description,
  newQuantity,
}: UniversalData) => {
  const { increaseQuantity, decreaseQuantity, deleteFromCart } = useCart();

  const totalPrice = newQuantity * price;

  return (
    <div className="cart">
      <div className="cart__img-box">
        <Image
          src={image?.url ?? ""}
          width={100}
          height={100}
          alt="product image"
          priority
        />
      </div>
      <div className="cart__body">
        <div className="cart__content">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
        <div className="cart__btn-box">
          <button
            disabled={newQuantity === 1 ? true : false}
            onClick={() => decreaseQuantity(_id)}
          >
            -
          </button>
          <button>{newQuantity}</button>
          <button
            disabled={newQuantity === quantity ? true : false}
            onClick={() => increaseQuantity(_id)}
          >
            +
          </button>
        </div>
        <div className="cart__footer">
          <button onClick={() => deleteFromCart(_id)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.75 3.5C9.33579 3.5 9 3.83579 9 4.25V5H15V4.25C15 3.83579 14.6642 3.5 14.25 3.5H9.75ZM7.5 4.25V5H3.75C3.33579 5 3 5.33579 3 5.75C3 6.16421 3.33579 6.5 3.75 6.5H4.30005L5.62088 19.9681C5.73386 21.1202 6.70255 21.9985 7.86014 21.9985H16.1399C17.2975 21.9985 18.2661 21.1202 18.3791 19.9681L19.7 6.5H20.25C20.6642 6.5 21 6.16421 21 5.75C21 5.33579 20.6642 5 20.25 5H16.5V4.25C16.5 3.00736 15.4926 2 14.25 2H9.75C8.50736 2 7.5 3.00736 7.5 4.25ZM11 9.75C11 9.33579 10.6642 9 10.25 9C9.83579 9 9.5 9.33579 9.5 9.75V17.25C9.5 17.6642 9.83579 18 10.25 18C10.6642 18 11 17.6642 11 17.25V9.75ZM14.5 9.75C14.5 9.33579 14.1642 9 13.75 9C13.3358 9 13 9.33579 13 9.75V17.25C13 17.6642 13.3358 18 13.75 18C14.1642 18 14.5 17.6642 14.5 17.25V9.75Z"
                fill="black"
              ></path>
            </svg>
            delete
          </button>
          <p>{totalPrice} so`m</p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
