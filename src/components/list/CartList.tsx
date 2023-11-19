"use client";

import useCart from "@/zustand/cart";
import CartCard from "../card/cart/cartCard";
import { Fragment, useEffect, useState } from "react";
import UniversalData from "@/types/universalData";
import Image from "next/image";
import Link from "next/link";
import Loader from "../shares/loader/Loader";
import { inter } from "@/assets/fonts";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/navigation";

const CartList = () => {
  const router = useRouter();

  const { cart, order } = useCart();
  const [data, setData] = useState<UniversalData[]>([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    try {
      setLoading(true);
      setData(cart);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  let totalPrice = 0;
  data.forEach((pr) => {
    totalPrice += pr.newQuantity * pr.price;
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : loading === false && data.length > 0 ? (
        <div className="cartList">
          <div>
            <h2 style={{ marginBottom: "30px" }}>
              Savatingiz,{" "}
              <span style={{ opacity: "0.5" }}>
                {data.length} ta mahsulot(lar)
              </span>
            </h2>
            {data.map((pr) => (
              <CartCard key={pr._id} {...pr} />
            ))}
          </div>
          <div>
            <textarea
              rows={5}
              cols={50}
              placeholder="Izoh qoldiring..."
              style={{ fontSize: "15px", padding: "10px" }}
              className={inter.className}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div>
              <p>Jami: {totalPrice} so`m</p>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => order(comment, router)}
              >
                Yuborish
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty">
          <Image
            src="https://uzum.uz/static/img/shopocat.490a4a1.png"
            alt="cart image"
            width={128}
            height={128}
          />
          <h3>Savatda hozircha mahsulot yo`q</h3>
          <p>
            Bosh sahifadagi to’plamlardan boshlang yoki kerakli mahsulotni
            qidiruv orqali toping
          </p>
          <Link href="/">Bosh sahifa</Link>
        </div>
      )}
    </Fragment>
  );
};

export default CartList;
