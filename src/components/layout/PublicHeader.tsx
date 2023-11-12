import { Fragment } from "react";
import Navlink from "../shares/Navlink";
import { poppins, spaceGrotesk } from "@/assets/fonts";

import Link from "next/link";
import "./pHeader.scss";

const PublicHeader = () => {
  return (
    <Fragment>
      <header className={`publicHeader ${spaceGrotesk.className}`}>
        <div className="container">
          <nav className="publicHeader__nav">
            <div>
              <div className={poppins.className}>3legant.</div>
            </div>
            <ul className="publicHeader__nav__list">
              <li className="publicHeader__nav__list__item">
                <Navlink
                  href="/"
                  className="publicHeader__nav__list__item__link"
                >
                  Home
                </Navlink>
              </li>
              <li className="publicHeader__nav__list__item">
                <Navlink
                  href="/products"
                  className="publicHeader__nav__list__item__link"
                >
                  Products
                </Navlink>
              </li>
              <li className="publicHeader__nav__list__item">
                <Navlink
                  href="/about"
                  className="publicHeader__nav__list__item__link"
                >
                  About us
                </Navlink>
              </li>
            </ul>
            <div className="publicHeader__navigationBar">
              <div>
                <Link href="/account">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18.5588 19.5488C17.5654 16.8918 15.0036 15 12 15C8.99638 15 6.4346 16.8918 5.44117 19.5488M18.5588 19.5488C20.6672 17.7154 22 15.0134 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.0134 3.33285 17.7154 5.44117 19.5488M18.5588 19.5488C16.8031 21.0756 14.5095 22 12 22C9.49052 22 7.19694 21.0756 5.44117 19.5488M15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z"
                      stroke="#141718"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
              <div>
                <Link href="/cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 6L9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7V6"
                      stroke="#141718"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.6115 3H8.38851C6.43316 3 4.7644 4.41365 4.44294 6.3424L2.77627 16.3424C2.36992 18.7805 4.25009 21 6.72185 21H17.2782C19.7499 21 21.6301 18.7805 21.2237 16.3424L19.5571 6.3424C19.2356 4.41365 17.5669 3 15.6115 3Z"
                      stroke="#141718"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </Fragment>
  );
};

export default PublicHeader;
