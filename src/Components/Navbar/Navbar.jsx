import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TiChevronLeft } from "react-icons/ti";
import { ProductsContext } from "../../Contexts/ProductsContext";
import "./Navbar.css";

function Navbar({ isShowNav, setIsShowNav, scrollPos }) {
  const [showDropdown, setShowDropdown] = useState("");
  const { luxaryBrands, middleBrands, ecoBrands } = useContext(ProductsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      const luxaryBrandsSearched = luxaryBrands.filter((brand) =>
        brand.includes(event.target.value)
      );
      const middleBrandsSearched = middleBrands.filter((brand) =>
        brand.includes(event.target.value)
      );
      const ecoBrandsSearched = ecoBrands.filter((brand) =>
        brand.includes(event.target.value)
      );
      setSearchResults(
        luxaryBrandsSearched.concat(middleBrandsSearched, ecoBrandsSearched)
      );
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {}, [searchTerm]);

  return (
    <>
      <nav className={`${scrollPos ? "sticky" : "navbar"} d-none d-lg-flex`}>
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to={"/all-products"} className="navbar__link">
              همه محصولات
            </Link>
          </li>
          <li className="navbar__item navbar__item2">
            <Link to={"/brands"} className="navbar__link">
              برندها
            </Link>
            <div className="navbar__dropdown navbar__dropdown2">
              <div className="row">
                <div className="col-12 navbar__dropdown2-topcol">
                  <input
                    className="navbar__dropdown-input"
                    type="text"
                    placeholder="جستجو در برندها (نام برند را به زبان فارسی تایپ کنید)"
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                  <CiSearch className="navbar__dropdown-icon" />
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-4">
                      <h4 className="navbar__dropdown-title">برندهای لاکچری</h4>
                      <ul className="navbar__dropdown-list row">
                        {luxaryBrands.map((brand) => (
                          <li
                            className="navbar__dropdown-item col-12"
                            key={brand}
                          >
                            <a
                              href="#"
                              className={`${
                                searchResults.includes(brand)
                                  ? "highlight-brand"
                                  : ""
                              } navbar__dropdown-link`}
                            >
                              {brand}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-4">
                      <h4 className="navbar__dropdown-title">
                        برندهای میان رده
                      </h4>
                      <ul className="navbar__dropdown-list row">
                        {middleBrands.map((brand) => (
                          <li
                            key={brand}
                            className="navbar__dropdown-item col-4"
                          >
                            <a
                              href="#"
                              className={`${
                                searchResults.includes(brand)
                                  ? "highlight-brand"
                                  : ""
                              } navbar__dropdown-link`}
                            >
                              {brand}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-4">
                      <h4 className="navbar__dropdown-title">
                        برندهای اقتصادی
                      </h4>
                      <ul className="navbar__dropdown-list row">
                        {ecoBrands.map((brand) => (
                          <li
                            key={brand}
                            className="navbar__dropdown-item col-6"
                          >
                            <a
                              href="#"
                              className={`${
                                searchResults.includes(brand)
                                  ? "highlight-brand"
                                  : ""
                              } navbar__dropdown-link`}
                            >
                              {brand}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="navbar__item navbar__item3">
            <Link to={"/smart-watch"} className="navbar__link">
              ساعت های هوشمند
            </Link>
            <div className="navbar__dropdown navbar__dropdown3">
              <ul className="navbar__dropdown-list row">
                <li className="navbar__dropdown-item col-6">
                  <a href="#" className="navbar__dropdown-link">
                    دنیل کلین
                  </a>
                </li>
                <li className="navbar__dropdown-item col-6">
                  <a href="#" className="navbar__dropdown-link">
                    فستینا
                  </a>
                </li>
                <li className="navbar__dropdown-item col-6">
                  <a href="#" className="navbar__dropdown-link">
                    شیائومی
                  </a>
                </li>
                <li className="navbar__dropdown-item col-6">
                  <a href="#" className="navbar__dropdown-link">
                    اپل واچ
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="navbar__item spicy">
            <Link to={"/amazing-offer"} className="navbar__link">
              پیشنهاد اسپایسی{" "}
              <img src="/images/chili.png" alt="chili" loading="lazy" />
            </Link>
          </li>
          <li className="navbar__item navbar__item5">
            <Link to={"/popular-search"} className="navbar__link">
              جستجوهای پرطرفدار
            </Link>
            <div className="navbar__dropdown navbar__dropdown5">
              <ul className="navbar__dropdown-list row">
                <li className="navbar__dropdown-item col-4">
                  <Link
                    to={"/all-products/search/مردانه"}
                    className="navbar__dropdown-link"
                  >
                    جستجو های مردانه
                  </Link>
                </li>
                <li className="navbar__dropdown-item col-4">
                  <Link
                    to={"/all-products/search/زنانه"}
                    className="navbar__dropdown-link"
                  >
                    جستجو های زنانه
                  </Link>
                </li>
                <li className="navbar__dropdown-item col-4">
                  <Link
                    to={"/all-products/search/ست"}
                    className="navbar__dropdown-link"
                  >
                    ساعت های ست
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="navbar__item navbar__item6">
            <Link to={"/jewellery"} className="navbar__link">
              زیورآلات
            </Link>
            <div className="navbar__dropdown navbar__dropdown6">
              <ul className="navbar__dropdown-list row">
                <li className="navbar__dropdown-item col-6">
                  <a href="#" className="navbar__dropdown-link">
                    دست بندهای پیرریکود{" "}
                  </a>
                </li>
                <li className="navbar__dropdown-item col-6">
                  <a href="#" className="navbar__dropdown-link">
                    دست بندهای دنیل کلین
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="navbar__item navbar__item7">
            <Link to={"/service"} className="navbar__link">
              خدمات
            </Link>
            <div className="navbar__dropdown navbar__dropdown7">
              <ul className="navbar__dropdown-list row">
                <li className="navbar__dropdown-item col-6">
                  <Link
                    to={"/service/installment-buying"}
                    className="navbar__dropdown-link"
                  >
                    خرید قسطی
                  </Link>
                </li>
                <li className="navbar__dropdown-item col-6">
                  <Link
                    to={"/service/special-buy"}
                    className="navbar__dropdown-link"
                  >
                    سفارش اختصاصی
                  </Link>
                </li>
                <li className="navbar__dropdown-item col-6">
                  <Link
                    to={"/service/teamwork"}
                    className="navbar__dropdown-link"
                  >
                    به وقت رفاقت
                  </Link>
                </li>
                <li className="navbar__dropdown-item col-6">
                  <Link to={"/service/blog"} className="navbar__dropdown-link">
                    مقالات
                  </Link>
                </li>
                <li className="navbar__dropdown-item col-6">
                  <a href="#" className="navbar__dropdown-link">
                    لوازم جانبی
                  </a>
                </li>
                <li className="navbar__dropdown-item col-6">
                  <a href="#" className="navbar__dropdown-link">
                    تیپ شما چیست
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="navbar__dropdown-overly"></div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-12 d-lg-none">
            <div
              className={`${
                isShowNav ? "navbar-mob__overly-animate" : "navbar-mob__overly"
              }`}
            ></div>
            <nav>
              <div
                className={`${
                  isShowNav
                    ? "navbar-mob__wrapper-animate"
                    : "navbar-mob__wrapper"
                }`}
              >
                <div
                  className="navbar-mobe__close"
                  onClick={() => setIsShowNav(false)}
                >
                  <i
                    className={`${
                      isShowNav ? "open-after" : ""
                    } navbar-mobe__close-after`}
                  ></i>
                  <i
                    className={`${
                      isShowNav ? "open-before" : ""
                    } navbar-mobe__close-before`}
                  ></i>
                </div>
                <div className="w-75">
                  <Link to={"/"}>
                    <div className="d-flex align-items-center my-5">
                      <img src="/images/logo.png" alt="logo" loading="lazy" />
                      <p className="text-white fs-4">گالری ساعت عقربه</p>
                    </div>
                  </Link>
                </div>
                <ul className="navbar-mob__list">
                  <li className="navbar-mob__item">
                    <Link to={"/all-products"} className="navbar-mob__link">
                      همه محصولات
                    </Link>
                  </li>
                  <li className="navbar-mob__item">
                    <div className="navbar-mob__link">
                      <div className="w-100 d-flex justify-content-between">
                        برندها
                        <TiChevronLeft
                          className={`${
                            showDropdown === "برندها"
                              ? "navbar-mob__rotate-icon"
                              : "navbar-mob__icon"
                          }`}
                          onClick={() =>
                            showDropdown === "برندها"
                              ? setShowDropdown("")
                              : setShowDropdown("برندها")
                          }
                        />
                      </div>
                    </div>
                  </li>
                  <div
                    className={`${
                      showDropdown === "برندها" ||
                      showDropdown === "لاکچری" ||
                      showDropdown === "میان" ||
                      showDropdown === "اقتصادی"
                        ? "navbar-mob__dropdown-animate"
                        : "navbar-mob__dropdown"
                    }`}
                  >
                    <ul className="navbar-mob__dropdown-list m-0">
                      <li className="navbar-mob__dropdown-item">
                        <a className="navbar-mob__dropdown-link mt-5" href="#">
                          برندهای لاکچری
                          <TiChevronLeft
                            className={`${
                              showDropdown === "لاکچری"
                                ? "navbar-mob__rotate-icon"
                                : "navbar-mob__icon"
                            }`}
                            onClick={() =>
                              showDropdown === "لاکچری"
                                ? setShowDropdown("برندها")
                                : setShowDropdown("لاکچری")
                            }
                          />
                        </a>
                        <ul
                          className={`${
                            showDropdown === "لاکچری"
                              ? "navbar-mob__dropdown-animate"
                              : "navbar-mob__dropdown"
                          } my-4`}
                        >
                          {luxaryBrands.map((brand) => (
                            <li
                              key={brand}
                              className="navbar-mob__dropdown-title m-0"
                            >
                              <a href="#" className="navbar-mob__dropdown-link">
                                {brand}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <a className="navbar-mob__dropdown-link mt-5" href="#">
                          برندهای میان رده
                          <TiChevronLeft
                            className={`${
                              showDropdown === "میان"
                                ? "navbar-mob__rotate-icon"
                                : "navbar-mob__icon"
                            }`}
                            onClick={() =>
                              showDropdown === "میان"
                                ? setShowDropdown("برندها")
                                : setShowDropdown("میان")
                            }
                          />
                        </a>
                        <ul
                          className={`${
                            showDropdown === "میان"
                              ? "navbar-mob__dropdown-animate"
                              : "navbar-mob__dropdown"
                          } my-4`}
                        >
                          {middleBrands.map((brand) => (
                            <li
                              key={brand}
                              className="navbar-mob__dropdown-title m-0"
                            >
                              <a href="#" className="navbar-mob__dropdown-link">
                                {brand}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <a className="navbar-mob__dropdown-link mt-5" href="#">
                          برندهای اقتصادی
                          <TiChevronLeft
                            className={`${
                              showDropdown === "اقتصادی"
                                ? "navbar-mob__rotate-icon"
                                : "navbar-mob__icon"
                            }`}
                            onClick={() =>
                              showDropdown === "اقتصادی"
                                ? setShowDropdown("برندها")
                                : setShowDropdown("اقتصادی")
                            }
                          />
                        </a>
                        <ul
                          className={`${
                            showDropdown === "اقتصادی"
                              ? "navbar-mob__dropdown-animate"
                              : "navbar-mob__dropdown"
                          } my-4`}
                        >
                          {ecoBrands.map((brand) => (
                            <li
                              key={brand}
                              className="navbar-mob__dropdown-title m-0"
                            >
                              <a href="#" className="navbar-mob__dropdown-link">
                                {brand}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <li className="navbar-mob__item">
                    <div className="navbar-mob__link">
                      <div className="w-100 d-flex justify-content-between">
                        ساعت های هوشمند
                        <TiChevronLeft
                          className={`${
                            showDropdown === "هوشمند"
                              ? "navbar-mob__rotate-icon"
                              : "navbar-mob__icon"
                          }`}
                          onClick={() =>
                            showDropdown === "هوشمند"
                              ? setShowDropdown("")
                              : setShowDropdown("هوشمند")
                          }
                        />
                      </div>
                    </div>
                  </li>
                  <div
                    className={`${
                      showDropdown === "هوشمند"
                        ? "navbar-mob__dropdown-animate"
                        : "navbar-mob__dropdown"
                    }`}
                  >
                    <ul className="navbar-mob__dropdown-list m-0">
                      <li className="navbar-mob__dropdown-item">
                        <a className="navbar-mob__dropdown-link" href="#">
                          ارو واچ
                        </a>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <a className="navbar-mob__dropdown-link" href="#">
                          دنیل کلین
                        </a>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <a className="navbar-mob__dropdown-link" href="#">
                          فستینا
                        </a>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <a className="navbar-mob__dropdown-link" href="#">
                          شیائومی
                        </a>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <a className="navbar-mob__dropdown-link" href="#">
                          اپل واچ
                        </a>
                      </li>
                    </ul>
                  </div>
                  <li className="navbar-mob__item">
                    <Link
                      to={"/amazing-offer"}
                      className="navbar-mob__link  d-flex flex-row justify-content-start"
                    >
                      پیشنهاد اسپایسی{" "}
                      <img src="/images/chili.png" alt="chili" loading="lazy" />
                    </Link>
                  </li>
                  <li className="navbar-mob__item">
                    <div className="navbar-mob__link">
                      <div className="w-100 d-flex justify-content-between">
                        جستجوهای پرطرفدار
                        <TiChevronLeft
                          className={`${
                            showDropdown === "پرطرفدار"
                              ? "navbar-mob__rotate-icon"
                              : "navbar-mob__icon"
                          }`}
                          onClick={() =>
                            showDropdown === "پرطرفدار"
                              ? setShowDropdown("")
                              : setShowDropdown("پرطرفدار")
                          }
                        />
                      </div>
                    </div>
                  </li>
                  <div
                    className={`${
                      showDropdown === "پرطرفدار"
                        ? "navbar-mob__dropdown-animate"
                        : "navbar-mob__dropdown"
                    }`}
                  >
                    <ul className="navbar-mob__dropdown-list m-0">
                      <li className="navbar-mob__dropdown-item">
                        <Link
                          className="navbar-mob__dropdown-link"
                          to={"/all-products/search/مردانه"}
                        >
                          مردانه
                        </Link>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <Link
                          className="navbar-mob__dropdown-link"
                          to={"/all-products/search/زنانه"}
                        >
                          زنانه
                        </Link>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <Link
                          className="navbar-mob__dropdown-link"
                          to={"/all-products/search/ست"}
                        >
                          ست
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <li className="navbar-mob__item">
                    <div className="navbar-mob__link">
                      <div className="w-100 d-flex justify-content-between">
                        زیورآلات
                        <TiChevronLeft
                          className={`${
                            showDropdown === "زیورآلات"
                              ? "navbar-mob__rotate-icon"
                              : "navbar-mob__icon"
                          }`}
                          onClick={() =>
                            showDropdown === "زیورآلات"
                              ? setShowDropdown("")
                              : setShowDropdown("زیورآلات")
                          }
                        />
                      </div>
                    </div>
                  </li>
                  <div
                    className={`${
                      showDropdown === "زیورآلات"
                        ? "navbar-mob__dropdown-animate"
                        : "navbar-mob__dropdown"
                    }`}
                  >
                    <ul className="navbar-mob__dropdown-list m-0">
                      <li className="navbar-mob__dropdown-item">
                        <Link
                          className="navbar-mob__dropdown-link"
                          to={"/jewellery"}
                        >
                          دست بندهای پیرریکود{" "}
                        </Link>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <Link
                          className="navbar-mob__dropdown-link"
                          to={"/jewellery"}
                        >
                          دست بندهای دنیل کلین{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <li className="navbar-mob__item border-0">
                    <div className="navbar-mob__link">
                      <div className="w-100 d-flex justify-content-between">
                        خدمات
                        <TiChevronLeft
                          className={`${
                            showDropdown === "خدمات"
                              ? "navbar-mob__rotate-icon"
                              : "navbar-mob__icon"
                          }`}
                          onClick={() =>
                            showDropdown === "خدمات"
                              ? setShowDropdown("")
                              : setShowDropdown("خدمات")
                          }
                        />
                      </div>
                    </div>
                  </li>
                  <div
                    className={`${
                      showDropdown === "خدمات"
                        ? "navbar-mob__dropdown-animate"
                        : "navbar-mob__dropdown"
                    }`}
                  >
                    <ul className="navbar-mob__dropdown-list m-0">
                      <li className="navbar-mob__dropdown-item">
                        <Link
                          to={"/service/installment-buying"}
                          className="navbar-mob__dropdown-link"
                          href="#"
                        >
                          خرید قسطی
                        </Link>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <Link
                          to={"/service/special-buy"}
                          className="navbar-mob__dropdown-link"
                          href="#"
                        >
                          سفارش اختصاصی
                        </Link>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <Link
                          to={"/service/teamwork"}
                          className="navbar-mob__dropdown-link"
                          href="#"
                        >
                          به وقت رفاقت
                        </Link>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <Link
                          to={"/service/blog"}
                          className="navbar-mob__dropdown-link"
                          href="#"
                        >
                          مقالات
                        </Link>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <a className="navbar-mob__dropdown-link" href="#">
                          لوازم جانبی
                        </a>
                      </li>
                      <li className="navbar-mob__dropdown-item">
                        <a className="navbar-mob__dropdown-link" href="#">
                          تیپ شما چیست
                        </a>
                      </li>
                    </ul>
                  </div>
                </ul>
              </div>
              <div className="navbar__dropdown-overly"></div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
