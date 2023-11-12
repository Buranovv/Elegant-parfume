"use client";

import { Fragment, useState } from "react";

import { poppins, spaceGrotesk } from "@/assets/fonts";
import Navlink from "@/components/shares/Navlink";
import useAuth from "@/zustand/auth";
import "./header.scss";
import Link from "next/link";

const Header = () => {
  const [togle, setTogle] = useState(false);

  const { isAuth } = useAuth();

  const togleOpen = () => {
    setTogle(true);
    document.body.style.overflow = "hidden";
  };
  const togleClose = () => {
    setTogle(false);
    document.body.style.overflow = "auto";
  };

  return (
    <Fragment>
      <header className={`header ${spaceGrotesk.className}`}>
        <div className="container">
          <div className="header__box">
            <Link href="/">
              <div draggable className="logo-box">
                <div className={poppins.className}>3legant.</div>
              </div>
            </Link>
            <nav className="header__nav">
              <ul className="header__list">
                <li className="header__item">
                  <Navlink className="header__link" href="/">
                    Home
                  </Navlink>
                </li>
                <li className="header__item">
                  <Navlink className="header__link" href="/products">
                    All products
                  </Navlink>
                </li>
                <li className="header__item">
                  <Navlink className="header__link" href="/about">
                    About us
                  </Navlink>
                </li>
              </ul>
              <div>
                {isAuth ? (
                  <Navlink href="/account" className="header__loginPage">
                    Account
                  </Navlink>
                ) : (
                  <Navlink href="/auth/login" className="header__loginPage">
                    Login
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
            Home
          </Navlink>
          <Navlink
            className="togle__link"
            href="/products"
            onClick={togleClose}
          >
            All products
          </Navlink>
          <Navlink className="togle__link" href="/about" onClick={togleClose}>
            About us
          </Navlink>
          {isAuth ? (
            <Navlink
              className="togle__link"
              style={{ backgroundColor: "var(lyt-txt-clr)" }}
              href="/account"
              onClick={togleClose}
            >
              Account
            </Navlink>
          ) : (
            <Navlink
              className="togle__link"
              style={{ backgroundColor: "var(lyt-txt-clr)" }}
              href="/auth/login"
              onClick={togleClose}
            >
              Login
            </Navlink>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
