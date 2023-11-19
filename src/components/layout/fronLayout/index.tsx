"use client";

import { Fragment, useState, useEffect } from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { poppins, spaceGrotesk } from "@/assets/fonts";
import Navlink from "@/components/shares/Navlink";
import useAuth from "@/zustand/auth";
import useCart from "@/zustand/cart";
import Link from "next/link";
import "./header.scss";

const Header = () => {
  const [togle, setTogle] = useState(false);
  const [auth, setAuth] = useState(false);
  const [total, setTotal] = useState(0);

  const { cart, fav } = useCart();
  const { isAuth } = useAuth();

  const togleOpen = () => {
    setTogle(true);
    document.body.style.overflow = "hidden";
  };
  const togleClose = () => {
    setTogle(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    setTotal(cart.length);
    setAuth(isAuth);
  }, [cart, isAuth]);

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <Fragment>
      <header className={`header ${spaceGrotesk.className}`}>
        <div className="container">
          <div className="header__box">
            <Link href="/">
              <div draggable className="logo-box">
                <div className={poppins.className}>3legant.com</div>
              </div>
            </Link>
            <nav className="header__nav">
              <ul className="header__list" draggable>
                <li className="header__item">
                  <Navlink className="header__link" href="/">
                    Bosh sahifa
                  </Navlink>
                </li>
                <li className="header__item">
                  <Navlink className="header__link" href="/products">
                    Mahsulotlar
                  </Navlink>
                </li>
                <li className="header__item">
                  <Navlink className="header__link" href="/about">
                    Biz haqimizda
                  </Navlink>
                </li>
                <li className="header__item">
                  <Navlink className="header__link cart" href="/cart">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={total} color="secondary">
                        <ShoppingCartIcon />
                      </StyledBadge>
                    </IconButton>
                  </Navlink>
                </li>
                <li className="header__item">
                  <Navlink className="header__link cart" href="/favourites">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={fav.length} color="secondary">
                        <FavoriteIcon />
                      </StyledBadge>
                    </IconButton>
                  </Navlink>
                </li>
              </ul>
              <div draggable>
                {auth ? (
                  <Navlink href="/account" className="header__loginPage">
                    Akkount
                  </Navlink>
                ) : (
                  <Navlink href="/auth/login" className="header__loginPage">
                    Kirish
                  </Navlink>
                )}
              </div>
            </nav>

            <div className="togle__menu" onClick={togleOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
              >
                <rect width="20" height="3" fill="white" />
                <rect y="7" width="20" height="3" fill="white" />
                <rect y="14" width="20" height="3" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <div className={togle ? "shadow" : ""} onClick={togleClose}></div>

      <div className={`togle ${togle ? "show" : ""}`}>
        <div className="togle__list">
          <div className="togle__close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              onClick={togleClose}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99989 6.37869L2.98948 0.368286L0.868164 2.48961L6.87857 8.50001L0.868164 14.5104L2.98948 16.6317L8.99989 10.6213L15.0103 16.6317L17.1316 14.5104L11.1212 8.50001L17.1316 2.48961L15.0103 0.368286L8.99989 6.37869Z"
                fill="white"
              />
            </svg>
          </div>
          <Navlink className="togle__link" href="/" onClick={togleClose}>
            Bosh sahifa
          </Navlink>
          <Navlink
            className="togle__link"
            href="/products"
            onClick={togleClose}
          >
            Mahsulotlar
          </Navlink>
          <Navlink className="togle__link" href="/about" onClick={togleClose}>
            Biz haqimizda
          </Navlink>
          <Navlink className="togle__link" href="/cart" onClick={togleClose}>
            Savatcha
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={total} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Navlink>
          <Navlink
            className="togle__link"
            href="/favourites"
            onClick={togleClose}
          >
            Savatcha
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={fav.length} color="secondary">
                <FavoriteIcon />
              </StyledBadge>
            </IconButton>
          </Navlink>
          {auth ? (
            <Navlink
              className="togle__link"
              style={{ backgroundColor: "var(lyt-txt-clr)" }}
              href="/account"
              onClick={togleClose}
            >
              Akkount
            </Navlink>
          ) : (
            <Navlink
              className="togle__link"
              style={{ backgroundColor: "var(lyt-txt-clr)" }}
              href="/auth/login"
              onClick={togleClose}
            >
              Kirish
            </Navlink>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
