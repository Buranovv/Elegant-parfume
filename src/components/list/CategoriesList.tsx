"use client";

import { Fragment, useEffect } from "react";
import Slider from "react-slick";
import useGetData from "@/zustand/getData";

import CategoriesCars from "../card/categoryCard/CategoriesCars";
import Loader from "../shares/loader/Loader";
import "./style.scss";

const CategoriesList = () => {
  const { getAllCategories, categories, loading } = useGetData();

  useEffect(() => {
    getAllCategories();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slideToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="section-content">
            <h3 className="section-title">Categories</h3>
          </div>
          <Slider {...settings}>
            {categories.map((ctgr, i) =>
              ctgr !== null ? (
                <div key={i} className="cCard-box">
                  <CategoriesCars {...ctgr} />
                </div>
              ) : null,
            )}
          </Slider>
        </Fragment>
      )}
    </div>
  );
};

export default CategoriesList;
