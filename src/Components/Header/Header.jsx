import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import supabase from "../../config/supabaseClient";
import { AuthContext } from "../../Contexts/AuthContext";
import { RiLoader2Fill } from "react-icons/ri";
import { TiChevronLeft } from "react-icons/ti";
import { ProductsContext } from "../../Contexts/ProductsContext";
import {
  FaChevronDown,
  FaUser,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Header.css";
import Swal from "sweetalert2";

function Header() {
  const [isShowNav, setIsShowNav] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { userFullName, setUserFullName } = useContext(AuthContext);
  const { cartProducts, totalPrice } = useContext(ProductsContext);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [userFullName]);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPos(position);
  };

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      const user = session.user.user_metadata;
      const token = session.access_token;
      const { fullName } = user;
      setUserFullName(fullName);
    }
  });

  const signOutUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
    } else {
      setUserFullName("");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "با موفقیت از حساب کاربری خارج شدید.",
      });
    }
  };
  const deleteProduct = async (productId) => {
    const { error } = await supabase.from("cart").delete().eq("id", productId);
    if (error) {
      console.log(error);
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "با موفقیت از سبد خرید حذف شد",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="header-container">
      <div className="header">
        <header className="container-fluid">
          <div className="row">
            <div className="col-4">
              <Link to={"/"}>
                <img
                  className="header__logo-img"
                  src="/images/logo.png"
                  alt="header-logo"
                />
              </Link>
              <div
                className="header__menu"
                onClick={() => setIsShowNav((prev) => !prev)}
              >
                <div className="toggler-menu"></div>
              </div>
            </div>
            <div className="col-4">
              <Link to={"/"}>
                <h2
                  className={`${
                    scrollPos ? "d-lg-none d-block" : ""
                  } header__heading`}
                >
                  فروشگاه ساعت عقربه
                </h2>
              </Link>
            </div>
            <div className="col-4">
              <div className="header__wrapper">
                <Link to={`${userFullName ? "" : "/login"}`}>
                  <div className="header__wrapper-animation">
                    {userFullName && (
                      <div className="header__userinfo">
                        <FaChevronDown className="header__wrapper-animation-arrow" />
                        <div className="header__userinfo-message">
                          <p className="mb-4 fs-5 w-75 text-center">
                            به گالری ساعت عقربه خوش آمدید
                          </p>
                          <div>
                            <div className="d-flex align-items-center border-bottom py-3">
                              <FaUser className="fs-4" />
                              <p className="mx-3 text-muted">{userFullName}</p>
                            </div>
                            <div className="header__myorders d-flex align-items-center border-bottom py-3">
                              <FaShoppingCart className="fs-4" />
                              <Link to={"/cart"}>
                                <p className="mx-3">سفارش های من</p>
                              </Link>
                            </div>
                            <div
                              className="header__logout d-flex align-items-center py-3"
                              onClick={signOutUser}
                            >
                              <FaSignOutAlt className="fs-4" />
                              <p className="mx-3">
                                خروج از حساب کاربری
                                {isLoading && (
                                  <RiLoader2Fill className="loading" />
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="header__login-button">
                    {userFullName ? (
                      <div className="fs-4 d-flex justify-content-end">
                        {userFullName}
                        <div className="header__userinfo">
                          <FaChevronDown className="header__wrapper-arrow" />
                          <div className="header__userinfo-message">
                            <p className="mb-4 text-secondary fs-5 w-75 text-center">
                              به گالری ساعت عقربه خوش آمدید
                            </p>
                            <div>
                              <div className="d-flex align-items-center border-bottom py-3">
                                <FaUser className="fs-4 text-dark" />
                                <p className="mx-3 text-muted">
                                  {userFullName}
                                </p>
                              </div>
                              <div className="header__myorders d-flex align-items-center border-bottom py-3">
                                <FaShoppingCart className="fs-4" />
                                <Link to={"/cart"}>
                                  <p className="mx-3">سفارش های من</p>
                                </Link>
                              </div>
                              <div
                                className="header__logout d-flex align-items-center py-3"
                                onClick={signOutUser}
                              >
                                <FaSignOutAlt className="fs-4" />
                                <p className="mx-3">
                                  خروج از حساب کاربری
                                  {isLoading && (
                                    <RiLoader2Fill className="loading" />
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      "ورود به حساب کاربری"
                    )}
                  </button>
                </Link>
                <div className="header__icon-wrapper">
                  <Link to={`${userFullName ? "/cart" : "/login"}`}>
                    <img
                      className="header__icon-svg"
                      src="/images/shopping-cart.svg"
                      alt="shopping-cart"
                    />
                  </Link>
                  {userFullName && cartProducts.length > 0 && (
                    <i className="header__cart-number persian-font">
                      {cartProducts.length}
                    </i>
                  )}
                  <div className="header__cart-message persian-font ">
                    {!userFullName || !cartProducts.length > 0 ? (
                      <>
                        <img
                          className="m-auto"
                          src="/images/emptyBasket.jpg"
                          alt="empty-basket"
                        />
                        <p className="mb-5 text-center">
                          سبد خرید شما خالی است
                        </p>
                      </>
                    ) : (
                      <div>
                        <div className="d-flex justify-content-between p-3 border-bottom">
                          <p>{cartProducts.length} محصول</p>
                          <Link to={"/cart"}>
                            <p className="text-primary">
                              ورود به صفحه سبد خرید
                              <TiChevronLeft />
                            </p>
                          </Link>
                        </div>
                        <div className="x">
                          {cartProducts.map((product) => (
                            <div key={product.id}>
                              <div className="d-flex justify-content-eventualy align-items-center px-3 border-bottom">
                                <img
                                  className="header__cart-product--src"
                                  src={product.src}
                                  alt="cart-products"
                                />
                                <div>
                                  <p className="fs-5">{product.title}</p>
                                  <div className="d-flex justify-content-between mt-5">
                                    <p>{product.number} عدد</p>
                                    <p
                                      className="header__cart-trash"
                                      onClick={() => deleteProduct(product.id)}
                                    >
                                      <span></span>
                                      <i className="header__cart-trash-i"></i>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="d-flex justify-content-between align-items-center p-3">
                            <div>
                              <p>مبلغ قابل پرداخت</p>
                              <p className="mt-2">
                                {totalPrice && totalPrice.toLocaleString()}{" "}
                                تومان
                              </p>
                            </div>
                            <Link to={"/cart"}>
                              <button className="header__cart-button">
                                ادامه فرآیند
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <Navbar
        isShowNav={isShowNav}
        setIsShowNav={setIsShowNav}
        scrollPos={scrollPos}
      />
    </div>
  );
}

export default Header;
