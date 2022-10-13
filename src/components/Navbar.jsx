import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { selectTotalQTY, setOpenCart } from "../redux/CartSlice";

const NavBar = () => {
  const [navState, setNavState] = useState(false);
  const dispatch = useDispatch();

  const onCartToggle = () => {
    dispatch(setOpenCart({ cartState: true }));
  };

  const totalQTY = useSelector(selectTotalQTY);

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);

    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  return (
    <>
      <header
        className={
          !navState
            ? "absolute top-7 left-0 right-0 opacity-100 z-50"
            : "fixed top-0 left-0 right-0 flex items-center justify-center opacity-100 z-[200] blur-effect-theme py-5"
        }
      >
        <nav className="flex items-center justify-between nike-container">
          <div className="flex items-center">
            <img
              src={logo}
              alt=""
              className={
                navState ? "filter w-16 h-auto brightness-0" : "w-16 h-auto"
              }
            />
          </div>
          <ul className="flex items-center justify-center gap-2">
            <li className="grid items-center">
              <MagnifyingGlassIcon
                className={
                  navState
                    ? "icon-style text-slate-900 transition-all duration-300"
                    : "icon-style"
                }
              />
            </li>
            <li className="grid items-center">
              <HeartIcon
                className={
                  navState
                    ? "icon-style text-slate-900 transition-all duration-300"
                    : "icon-style"
                }
              />
            </li>
            <li className="grid items-center">
              <button
                type="button"
                className="border-none outline-none active:scale-110 transition-all duration-300 relative "
                onClick={onCartToggle}
              >
                <ShoppingBagIcon
                  className={
                    navState
                      ? "icon-style text-slate-900 transition-all duration-300"
                      : "icon-style"
                  }
                />
                <div
                  className={`absolute top-4 right-0  w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration:300 bg-white text-slate-900 shadow shadow-slate-100 ${
                    navState && "bg-black text-slate-50 shadow shadow-slate-900"
                  }`}
                >
                  {totalQTY}
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
