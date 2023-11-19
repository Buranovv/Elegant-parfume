"use client";

import UniversalData from "@/types/universalData";
import { useEffect, useState, Fragment } from "react";
import ProductsCard from "../card/productCard/ProductsCard";
import useCart from "@/zustand/cart";
import Image from "next/image";
import Link from "next/link";
import { Grid } from "@mui/material";

const FavList = () => {
  const [data, setData] = useState<UniversalData[]>([]);
  const { fav } = useCart();

  useEffect(() => {
    setData(fav);
  }, [fav]);

  return (
    <Fragment>
      {fav.length > 0 ? (
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        >
          {data.map((pr, i) => (
            <Grid key={i} item lg={3} md={4} sm={6} xs={12}>
              <ProductsCard {...pr} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="empty">
          <Image
            src="https://uzum.uz/static/img/hearts.cf414be.png"
            alt="cart image"
            width={128}
            height={128}
            priority
          />
          <h3>Sizga yoqqanini qo`shing</h3>
          <p>
            Mahsulotdagi ♡ belgisini bosing. Akkauntga kiring va barcha
            saralanganlar saqlanib qoladi
          </p>
          <Link href="/auth/login">Akkountga kirish</Link>
        </div>
      )}
    </Fragment>
  );
};

export default FavList;
