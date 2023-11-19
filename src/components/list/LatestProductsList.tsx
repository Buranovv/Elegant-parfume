"use client";

import { Fragment, useEffect } from "react";
import Slider from "react-slick";
import useGetData from "@/zustand/getData";
import ProductsCard from "../card/productCard/ProductsCard";

import Link from "next/link";
import Loader from "../shares/loader/Loader";
import "./style.scss";

const LatestProductsList = () => {
  const { getLatestProducts, latestProducts, loading } = useGetData();

  useEffect(() => {
    getLatestProducts();
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 625,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="latestProducts">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="section-content">
            <h3 className="section-title" draggable>
              Yangi mahsulotlar
            </h3>
            <Link href="/products" draggable>
              View all
            </Link>
          </div>
          <Slider {...settings}>
            {latestProducts.map((pr, i) =>
              pr !== null ? (
                <div key={i} className="card-box">
                  <ProductsCard {...pr} />
                </div>
              ) : null,
            )}
          </Slider>
        </Fragment>
      )}
    </div>
  );
};

export default LatestProductsList;
