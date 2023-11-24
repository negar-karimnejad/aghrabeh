import { useState, useContext, useEffect } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Header from "../../Components/Header/Header";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import Info from "../../Components/Info/Info";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";
import { FaChevronDown, FaSlidersH } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import { ProductsContext } from "../../Contexts/ProductsContext";
import supabase from "../../config/supabaseClient";
import "./AllProducts.css";

function AllProducts() {
  const [isShowOrderingList, setIsShowOrderingList] = useState(false);
  const [isShowFilterList, setIsShowFilterList] = useState(false);
  const [isActive, setIsActive] = useState("محدوده قیمت");
  const [accordion, setAccordion] = useState(true);
  const [priceRangeFrom, setPriceRangeFrom] = useState(0);
  const [priceRangeTo, setPriceRangeTo] = useState(550000000);
  const { id } = useParams();

  const {
    products,
    isLoading,
    sortedProducts,
    setSortedProducts,
    lowPriceSortedProducts,
    heighPriceSortedProducts,
    newestSortedProducts,
    discountProducts,
  } = useContext(ProductsContext);

  useEffect(() => {
    if (id) {
      supabase
        .from("products")
        .select("*")
        .ilike("title", `%${id}%`)
        .then((response) => {
          setSortedProducts(response.data);
        })
        .catch((error) => {
          console.log("Error searching products:", error);
        });
    } else if (id === undefined) {
      setSortedProducts(products.sort((a, b) => a.id - b.id));
    }
  }, [id]);

  const sortingBy = [
    { id: "1", title: "ارزان ترین", sortBy: lowPriceSortedProducts },
    { id: "2", title: "گران ترین", sortBy: heighPriceSortedProducts },
    { id: "3", title: "جدیدترین", sortBy: newestSortedProducts },
    { id: "4", title: "بیشترین تخفیف", sortBy: discountProducts },
  ];
  const brandsArray = [
    { id: "casio", name: "casio", title: "کاسیو", type: "checkbox" },
    { id: "protrek", name: "protrek", title: "پروترک", type: "checkbox" },
    { id: "baby-g", name: "baby-g", title: "بی‌بی‌جی", type: "checkbox" },
    {
      id: "pierre-ricaud",
      name: "pierre-ricaud",
      title: "پیرریکود",
      type: "checkbox",
    },
    {
      id: "david-guner",
      name: "david-guner",
      title: "دیوید گانر",
      type: "checkbox",
    },
    { id: "g-shock", name: "g-shock", title: "جی شاک", type: "checkbox" },
    { id: "picto", name: "picto", title: "پیکتو", type: "checkbox" },
    { id: "larus", name: "larus", title: "لاروس", type: "checkbox" },
    {
      id: "fredrick",
      name: "fredrick",
      title: "فردریک کنستانت",
      type: "checkbox",
    },
    {
      id: "cover",
      name: "cover",
      title: "کاور",
      type: "checkbox",
    },
    {
      id: "kandino",
      name: "kandino",
      title: "کاندینو",
      type: "checkbox",
    },
  ];
  const genderArray = [
    { id: "men", name: "men", title: "مردانه", type: "checkbox" },
    { id: "women", name: "women", title: "زنانه", type: "checkbox" },
    { id: "girl", name: "girl", title: "دخترانه", type: "checkbox" },
    { id: "boy", name: "boy", title: "پسرانه", type: "checkbox" },
    { id: "set", name: "set", title: "ست", type: "checkbox" },
  ];
  const [filterBrandSearch, setFilterBrandSearch] = useState("");
  const [filterBrands, setFilterBrands] = useState(brandsArray);

  const searchBrands = (e) => {
    setFilterBrandSearch(e.target.value);
    const searchValue = brandsArray.filter((brand) =>
      brand.title.includes(e.target.value)
    );
    e.target.value
      ? setFilterBrands(searchValue)
      : setFilterBrands(brandsArray);
  };
  const submitPriceRange = (e) => {
    e.preventDefault();
    const choosenProducts = products.filter(
      (product) =>
        product.price <= priceRangeTo && product.price >= priceRangeFrom
    );
    choosenProducts
      ? setSortedProducts(choosenProducts.sort((a, b) => a.price - b.price))
      : setSortedProducts(null);
    setIsShowFilterList(false);
  };

  const submitBrandFilter = (checked, brandTitle) => {
    const brandFilter = [];
    let brandTitleIndex = brandFilter.indexOf(brandTitle);
    checked
      ? brandFilter.push(brandTitle)
      : brandFilter.splice(brandTitleIndex, 1);

    const choosenProducts = products.filter((product) =>
      brandFilter.includes(product.name)
    );
    choosenProducts.length !== 0
      ? setSortedProducts(choosenProducts)
      : setSortedProducts(products);
    setIsShowFilterList(false);
  };

  const submitGenderFilter = (checked, genderTitle) => {
    const genderFilter = [];
    let genderTitleIndex = genderFilter.indexOf(genderTitle);
    console.log(genderFilter);
    checked
      ? genderFilter.push(genderTitle)
      : genderFilter.splice(genderTitleIndex, 1);
    const choosenProducts = products.filter((product) =>
      genderFilter.includes(product.gender)
    );
    choosenProducts.length !== 0
      ? setSortedProducts(choosenProducts)
      : setSortedProducts(products);
    setIsShowFilterList(false);
  };

  return (
    <>
      <div className="all-products">
        <div
          className={`${
            isShowOrderingList ? "order-show" : "order-hide"
          } mob-order-list d-lg-none d-flex`}
        >
          <div className=" mob-order-list-inner">
            <i onClick={() => setIsShowOrderingList(false)}>
              <GrFormClose />
            </i>
            <p>
              <RiBarChartHorizontalFill /> مرتب سازی بر اساس:
            </p>
            <ul>
              {sortingBy.map((item) => (
                <li
                  key={item.id}
                  className={`${isActive === item.id ? "actived" : ""}`}
                  onClick={() =>
                    setSortedProducts(item.sortBy) +
                    setIsActive(item.id) +
                    setIsShowOrderingList(false)
                  }
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`${
            isShowFilterList ? "mob-filter-list" : "d-none"
          } d-lg-none d-block`}
        >
          <div className="all-products__filters container">
            <div
              className="w-100 all-products__filter all-products__filters-heading"
              onClick={() => setIsShowFilterList(false)}
            >
              فیلترها
              <div className="lines">
                <div className="first-line line"></div>
                <div className="second-line line"></div>
                <div className="third-line line"></div>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("محدوده قیمت")
                }
              >
                محدوده قیمت
                <FaChevronDown
                  className={`${
                    accordion && isActive === "محدوده قیمت" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <div
                  className={`${
                    accordion && isActive === "محدوده قیمت"
                      ? "d-block"
                      : "d-none"
                  } border-top d-flex flex-column`}
                >
                  <form className="all-products__filter-range-form">
                    <input
                      type="range"
                      className="form-range"
                      min={0}
                      max={550000000}
                      step={100000}
                      value={priceRangeFrom}
                      onChange={(e) => setPriceRangeFrom(e.target.value)}
                    />
                    <input
                      type="range"
                      className="form-range"
                      min={0}
                      max={550000000}
                      step={1000000}
                      value={priceRangeTo}
                      onChange={(e) => setPriceRangeTo(e.target.value)}
                    />
                  </form>
                  <form onSubmit={submitPriceRange}>
                    <div className="d-flex justify-content-between">
                      <div className="ms-4 d-flex flex-column align-items-center">
                        <span>از</span>
                        <input
                          type="number"
                          className="no-arrows w-100 my-1 text-center rounded-2 border-1 px-2 pt-2 border border-muted persian-font fs-5"
                          value={priceRangeFrom}
                          onChange={(e) => setPriceRangeFrom(e.target.value)}
                        />
                        <span>تومان</span>
                      </div>
                      <div className="me-4 d-flex flex-column align-items-center">
                        <span>تا</span>
                        <input
                          type="number"
                          className="no-arrows w-100 my-1 text-center rounded-2 border-1 px-2 pt-2 border border-muted persian-font fs-5"
                          value={priceRangeTo}
                          onChange={(e) => setPriceRangeTo(e.target.value)}
                        />
                        <span>تومان</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="all-products__range-submit"
                    >
                      اعمال محدوده قیمت
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div className="w-100 h-100 d-flex justify-content-between align-items-center">
                برند
                <div className="d-flex align-items-center">
                  <div className="brand-input">
                    <input
                      type="text"
                      placeholder="جستجوی برند"
                      value={filterBrandSearch}
                      onChange={searchBrands}
                    />
                    <BiSearch className="brand-search-icon" />
                  </div>
                  <FaChevronDown
                    className={`${
                      accordion && isActive === "برند" ? "rotate" : ""
                    } all-products__filter-icon`}
                    onClick={() =>
                      setAccordion((prev) => !prev) + setIsActive("برند")
                    }
                  />
                </div>
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "برند" ? "d-block" : "d-none"
                  } border-top`}
                >
                  {filterBrands.map((brand) => (
                    <div key={brand.id}>
                      <input
                        className="filter__checkbox-input"
                        type={brand.type}
                        role={brand.type}
                        id={brand.id}
                        onChange={(e) =>
                          submitBrandFilter(e.target.checked, brand.title)
                        }
                      />
                      <label
                        className="filter__checkbox-label my-3 mx-4"
                        htmlFor={brand.id}
                      >
                        {brand.title}
                      </label>
                      <br />
                    </div>
                  ))}
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("جنسیت")
                }
              >
                جنسیت
                <FaChevronDown
                  className={`${
                    accordion && isActive === "جنسیت" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "جنسیت" ? "d-block" : "d-none"
                  } border-top`}
                >
                  {genderArray.map((gender) => (
                    <div key={gender.id}>
                      <input
                        className="filter__checkbox-input"
                        type={gender.type}
                        name={gender.name}
                        role={gender.type}
                        id={gender.id}
                        onChange={(e) =>
                          submitGenderFilter(e.target.checked, gender.title)
                        }
                      />
                      <label
                        className="filter__checkbox-label my-3 mx-4"
                        htmlFor={gender.id}
                      >
                        {gender.title}
                      </label>
                      <br />
                    </div>
                  ))}
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("جنس بند")
                }
              >
                جنس بند
                <FaChevronDown
                  className={`${
                    accordion && isActive === "جنس بند" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "جنس بند" ? "d-block" : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="charm"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="charm"
                  >
                    چرم
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="felezi"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="felezi"
                  >
                    فلزی استیل
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="titanium"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="titanium"
                  >
                    تیتانیوم
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="rozin"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="rozin"
                  >
                    رزین سیلیکون
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="parche"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="parche"
                  >
                    پارچه ای
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="seramik"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="seramik"
                  >
                    استیل سرامیکی
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("جنس شیشه")
                }
              >
                جنس شیشه
                <FaChevronDown
                  className={`${
                    accordion && isActive === "جنس شیشه" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "جنس شیشه" ? "d-block" : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="mineral"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="mineral"
                  >
                    معدنی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="hardlex"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="hardlex"
                  >
                    هاردلکس
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="yaghut"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="yaghut"
                  >
                    یاقوت
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="rosin"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="rosin"
                  >
                    رزین
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="talgh"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="talgh"
                  >
                    طلق
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("فرم قاب")
                }
              >
                فرم قاب
                <FaChevronDown
                  className={`${
                    accordion && isActive === "فرم قاب" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "فرم قاب" ? "d-block" : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="circle"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="circle"
                  >
                    گرد
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="mostatil"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="mostatil"
                  >
                    مستطیل
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="square"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="square"
                  >
                    مربع
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="beizi"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="beizi"
                  >
                    بیضی
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("رنگ قاب")
                }
              >
                رنگ قاب
                <FaChevronDown
                  className={`${
                    accordion && isActive === "رنگ قاب" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "رنگ قاب" ? "d-block" : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="rozgold"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="rozgold"
                  >
                    رزگلد
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="silver"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="silver"
                  >
                    نقره ای
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="black"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="black"
                  >
                    مشکی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="gray"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="gray"
                  >
                    خاکستری
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="blue"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="blue"
                  >
                    آبی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="red"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="red"
                  >
                    قرمز
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="white"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="white"
                  >
                    سفید
                  </label>
                  <br />

                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="yellow"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="yellow"
                  >
                    زرد
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="dark-blue"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="dark-blue"
                  >
                    سرمه ای
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="gold"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="gold"
                  >
                    طلایی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="pink"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="pink"
                  >
                    صورتی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="green"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="green"
                  >
                    سبز
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="brown"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="brown"
                  >
                    قهوه ای
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="purple"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="purple"
                  >
                    بنفش
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="orange"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="orange"
                  >
                    نارنجی
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("رنگ بند")
                }
              >
                رنگ بند
                <FaChevronDown
                  className={`${
                    accordion && isActive === "رنگ بند" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "رنگ بند" ? "d-block" : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="rozgold1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="rozgold1"
                  >
                    رزگلد
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="silver1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="silver1"
                  >
                    نقره ای
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="black1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="black1"
                  >
                    مشکی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="gray1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="gray1"
                  >
                    خاکستری
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="blue1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="blue1"
                  >
                    آبی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="red1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="red1"
                  >
                    قرمز
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="white1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="white1"
                  >
                    سفید
                  </label>
                  <br />

                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="yellow1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="yellow1"
                  >
                    زرد
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="dark-blue1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="dark-blue1"
                  >
                    سرمه ای
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="gold1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="gold1"
                  >
                    طلایی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="pink1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="pink1"
                  >
                    صورتی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="green1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="green1"
                  >
                    سبز
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="brown1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="brown1"
                  >
                    قهوه ای
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="purple1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="purple1"
                  >
                    بنفش
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="orange1"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="orange1"
                  >
                    نارنجی
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("رنگ صفحه")
                }
              >
                رنگ صفحه
                <FaChevronDown
                  className={`${
                    accordion && isActive === "رنگ صفحه" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "رنگ صفحه" ? "d-block" : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="rozgold2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="rozgold2"
                  >
                    رزگلد
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="silver2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="silver2"
                  >
                    نقره ای
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="black2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="black2"
                  >
                    مشکی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="gray2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="gray2"
                  >
                    خاکستری
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="blue2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="blue2"
                  >
                    آبی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="red2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="red2"
                  >
                    قرمز
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="white2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="white2"
                  >
                    سفید
                  </label>
                  <br />

                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="yellow2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="yellow2"
                  >
                    زرد
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="dark-blue2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="dark-blue2"
                  >
                    سرمه ای
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="gold2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="gold2"
                  >
                    طلایی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="pink2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="pink2"
                  >
                    صورتی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="green2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="green2"
                  >
                    سبز
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="brown2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="brown2"
                  >
                    قهوه ای
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="purple2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="purple2"
                  >
                    بنفش
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="orange2"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="orange2"
                  >
                    نارنجی
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("شکل صفحه")
                }
              >
                شکل صفحه
                <FaChevronDown
                  className={`${
                    accordion && isActive === "شکل صفحه" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "شکل صفحه" ? "d-block" : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="tak-aghrabeh"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="tak-aghrabeh"
                  >
                    تک عقربه
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="se-aghrabeh"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="se-aghrabeh"
                  >
                    سه عقربه
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="digital"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="digital"
                  >
                    دیجیتالی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="digital-aghrabeh"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="digital-aghrabeh"
                  >
                    دیجیتال عقربه ای
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("نوع قفل")
                }
              >
                نوع قفل
                <FaChevronDown
                  className={`${
                    accordion && isActive === "نوع قفل" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "نوع قفل" ? "d-block" : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="sagaki"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="sagaki"
                  >
                    سگکی ساده
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="zamendar"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="zamendar"
                  >
                    کلیپسی ضامن دار
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="tasho"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="tasho"
                  >
                    تاشو با محافظ
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="keshi"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="keshi"
                  >
                    کشی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="nastband"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="nastband"
                  >
                    دست بندی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="makhfi"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="makhfi"
                  >
                    قفل مخفی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="etesali"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="etesali"
                  >
                    اتصالی
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) +
                  setIsActive("مقاومت در برابر آب")
                }
              >
                مقاومت در برابر آب
                <FaChevronDown
                  className={`${
                    accordion && isActive === "مقاومت در برابر آب"
                      ? "rotate"
                      : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "مقاومت در برابر آب"
                      ? "d-block"
                      : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="positive"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="positive"
                  >
                    دارد
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="negative"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="negative"
                  >
                    ندارد
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("میزان ضد آبی")
                }
              >
                میزان ضد آبی
                <FaChevronDown
                  className={`${
                    accordion && isActive === "میزان ضد آبی" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "میزان ضد آبی"
                      ? "d-block"
                      : "d-none"
                  } border-top persian-font`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="one"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="one"
                  >
                    1ATM
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="three"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="three"
                  >
                    3ATM
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="five"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="five"
                  >
                    5ATM
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="ten"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="ten"
                  >
                    10ATM
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="twenty"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="twenty"
                  >
                    20ATM
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("نوع کاربری")
                }
              >
                نوع کاربری
                <FaChevronDown
                  className={`${
                    accordion && isActive === "نوع کاربری" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "نوع کاربری"
                      ? "d-block"
                      : "d-none"
                  } border-top persian-font`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="daily"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="daily"
                  >
                    روزمره
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="majlesi"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="majlesi"
                  >
                    مجلسی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="sport"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="sport"
                  >
                    اسپرت
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="varzeshi"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="varzeshi"
                  >
                    ورزشی
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="classic"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="classic"
                  >
                    کلاسیک
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) +
                  setIsActive("نوع کارکرد موتور")
                }
              >
                نوع کارکرد موتور
                <FaChevronDown
                  className={`${
                    accordion && isActive === "نوع کارکرد موتور" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "نوع کارکرد موتور"
                      ? "d-block"
                      : "d-none"
                  } border-top persian-font`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="quarts"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="quarts"
                  >
                    کوارتز
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="kentik"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="kentik"
                  >
                    کنتیک
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="outomatic"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="outomatic"
                  >
                    اتوماتک
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="solar"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="solar"
                  >
                    سولار
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="echodrive"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="echodrive"
                  >
                    اکودرایو
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("عقربه شب نما")
                }
              >
                عقربه شب نما
                <FaChevronDown
                  className={`${
                    accordion && isActive === "عقربه شب نما" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "عقربه شب نما"
                      ? "d-block"
                      : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="has"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="has"
                  >
                    دارد
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="dont"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="dont"
                  >
                    ندارد
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) + setIsActive("تقویم")
                }
              >
                تقویم
                <FaChevronDown
                  className={`${
                    accordion && isActive === "تقویم" ? "rotate" : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "تقویم" ? "d-block" : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="with"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="with"
                  >
                    دارد
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="without"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="without"
                  >
                    ندارد
                  </label>
                  <br />
                </form>
              </div>
            </div>
            <div className="w-100 all-products__filter">
              <div
                className="w-100 d-flex justify-content-between align-items-center"
                onClick={() =>
                  setAccordion((prev) => !prev) +
                  setIsActive("زمان سنج (کرنومتر)")
                }
              >
                زمان سنج (کرنومتر)
                <FaChevronDown
                  className={`${
                    accordion && isActive === "زمان سنج (کرنومتر)"
                      ? "rotate"
                      : ""
                  } all-products__filter-icon`}
                />
              </div>
              <div className="all-products__filter-formwrapper">
                <form
                  className={`${
                    accordion && isActive === "زمان سنج (کرنومتر)"
                      ? "d-block"
                      : "d-none"
                  } border-top`}
                >
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="yes"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="yes"
                  >
                    دارد
                  </label>
                  <br />
                  <input
                    className="filter__checkbox-input"
                    type="checkbox"
                    name=""
                    role="checkbox"
                    id="no"
                  />
                  <label
                    className="filter__checkbox-label my-3 mx-4"
                    htmlFor="no"
                  >
                    ندارد
                  </label>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
        <Header />
        <Breadcrumb
          links={[{ id: 1, title: "همه محصولات", to: "/all-products" }]}
        />
        <HeaderIcons />
        <div className="container">
          <div className="all-products__container">
            <div className="row">
              <div className="col-lg-3 d-lg-flex d-none">
                <div className="all-products__filters">
                  <div className="all-products__filter all-products__filters-heading">
                    فیلترها
                    <div className="lines">
                      <div className="first-line line"></div>
                      <div className="second-line line"></div>
                      <div className="third-line line"></div>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) +
                        setIsActive("محدوده قیمت")
                      }
                    >
                      محدوده قیمت
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "محدوده قیمت"
                            ? "rotate"
                            : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <div
                        className={`${
                          accordion && isActive === "محدوده قیمت"
                            ? "d-block"
                            : "d-none"
                        } border-top d-flex flex-column`}
                      >
                        <form className="all-products__filter-range-form">
                          <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={550000000}
                            step={100000}
                            value={priceRangeFrom}
                            onChange={(e) => setPriceRangeFrom(e.target.value)}
                          />
                          <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={550000000}
                            step={1000000}
                            value={priceRangeTo}
                            onChange={(e) => setPriceRangeTo(e.target.value)}
                          />
                        </form>
                        <form onSubmit={submitPriceRange}>
                          <div className="d-flex">
                            <div className="ms-4 d-flex flex-column align-items-center">
                              <span>از</span>
                              <input
                                type="number"
                                className="no-arrows w-100 my-1 text-center rounded-2 border-1 px-2 pt-2 border border-muted persian-font fs-5"
                                value={priceRangeFrom}
                                onChange={(e) =>
                                  setPriceRangeFrom(e.target.value)
                                }
                              />
                              <span>تومان</span>
                            </div>
                            <div className="me-4 d-flex flex-column align-items-center">
                              <span>تا</span>
                              <input
                                type="number"
                                className="no-arrows w-100 my-1 text-center rounded-2 border-1 px-2 pt-2 border border-muted persian-font fs-5"
                                value={priceRangeTo}
                                onChange={(e) =>
                                  setPriceRangeTo(e.target.value)
                                }
                              />
                              <span>تومان</span>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="all-products__range-submit"
                          >
                            اعمال محدوده قیمت
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div className="w-100 h-100 d-flex justify-content-between align-items-center">
                      برند
                      <div className="d-flex align-items-center">
                        <div className="brand-input">
                          <input
                            type="text"
                            placeholder="جستجوی برند"
                            value={filterBrandSearch}
                            onChange={searchBrands}
                          />
                          <BiSearch className="brand-search-icon" />
                        </div>
                        <FaChevronDown
                          className={`${
                            accordion && isActive === "برند" ? "rotate" : ""
                          } all-products__filter-icon`}
                          onClick={() =>
                            setAccordion((prev) => !prev) + setIsActive("برند")
                          }
                        />
                      </div>
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "برند"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        {filterBrands.map((brand) => (
                          <div key={brand.id}>
                            <input
                              className="filter__checkbox-input"
                              type={brand.type}
                              role={brand.type}
                              id={brand.id}
                              onChange={(e) =>
                                submitBrandFilter(e.target.checked, brand.title)
                              }
                            />
                            <label
                              className="filter__checkbox-label my-3 mx-4"
                              htmlFor={brand.id}
                            >
                              {brand.title}
                            </label>
                            <br />
                          </div>
                        ))}
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) + setIsActive("جنسیت")
                      }
                    >
                      جنسیت
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "جنسیت" ? "rotate" : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "جنسیت"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        {genderArray.map((gender) => (
                          <div key={gender.id}>
                            <input
                              className="filter__checkbox-input"
                              type={gender.type}
                              name={gender.name}
                              role={gender.type}
                              id={gender.id}
                              onChange={(e) =>
                                submitGenderFilter(
                                  e.target.checked,
                                  gender.title
                                )
                              }
                            />
                            <label
                              className="filter__checkbox-label my-3 mx-4"
                              htmlFor={gender.id}
                            >
                              {gender.title}
                            </label>
                            <br />
                          </div>
                        ))}
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) + setIsActive("جنس بند")
                      }
                    >
                      جنس بند
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "جنس بند" ? "rotate" : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "جنس بند"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="charm"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="charm"
                        >
                          چرم
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="felezi"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="felezi"
                        >
                          فلزی استیل
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="titanium"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="titanium"
                        >
                          تیتانیوم
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="rozin"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="rozin"
                        >
                          رزین سیلیکون
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="parche"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="parche"
                        >
                          پارچه ای
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="seramik"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="seramik"
                        >
                          استیل سرامیکی
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) + setIsActive("جنس شیشه")
                      }
                    >
                      جنس شیشه
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "جنس شیشه" ? "rotate" : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "جنس شیشه"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="mineral"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="mineral"
                        >
                          معدنی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="hardlex"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="hardlex"
                        >
                          هاردلکس
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="yaghut"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="yaghut"
                        >
                          یاقوت
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="rosin"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="rosin"
                        >
                          رزین
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="talgh"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="talgh"
                        >
                          طلق
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) + setIsActive("فرم قاب")
                      }
                    >
                      فرم قاب
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "فرم قاب" ? "rotate" : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "فرم قاب"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="circle"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="circle"
                        >
                          گرد
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="mostatil"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="mostatil"
                        >
                          مستطیل
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="square"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="square"
                        >
                          مربع
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="beizi"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="beizi"
                        >
                          بیضی
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) + setIsActive("رنگ قاب")
                      }
                    >
                      رنگ قاب
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "رنگ قاب" ? "rotate" : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "رنگ قاب"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="rozgold"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="rozgold"
                        >
                          رزگلد
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="silver"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="silver"
                        >
                          نقره ای
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="black"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="black"
                        >
                          مشکی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="gray"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="gray"
                        >
                          خاکستری
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="blue"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="blue"
                        >
                          آبی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="red"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="red"
                        >
                          قرمز
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="white"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="white"
                        >
                          سفید
                        </label>
                        <br />

                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="yellow"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="yellow"
                        >
                          زرد
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="dark-blue"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="dark-blue"
                        >
                          سرمه ای
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="gold"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="gold"
                        >
                          طلایی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="pink"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="pink"
                        >
                          صورتی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="green"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="green"
                        >
                          سبز
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="brown"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="brown"
                        >
                          قهوه ای
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="purple"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="purple"
                        >
                          بنفش
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="orange"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="orange"
                        >
                          نارنجی
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) + setIsActive("رنگ بند")
                      }
                    >
                      رنگ بند
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "رنگ بند" ? "rotate" : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "رنگ بند"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="rozgold1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="rozgold1"
                        >
                          رزگلد
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="silver1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="silver1"
                        >
                          نقره ای
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="black1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="black1"
                        >
                          مشکی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="gray1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="gray1"
                        >
                          خاکستری
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="blue1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="blue1"
                        >
                          آبی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="red1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="red1"
                        >
                          قرمز
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="white1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="white1"
                        >
                          سفید
                        </label>
                        <br />

                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="yellow1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="yellow1"
                        >
                          زرد
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="dark-blue1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="dark-blue1"
                        >
                          سرمه ای
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="gold1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="gold1"
                        >
                          طلایی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="pink1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="pink1"
                        >
                          صورتی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="green1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="green1"
                        >
                          سبز
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="brown1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="brown1"
                        >
                          قهوه ای
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="purple1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="purple1"
                        >
                          بنفش
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="orange1"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="orange1"
                        >
                          نارنجی
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) + setIsActive("رنگ صفحه")
                      }
                    >
                      رنگ صفحه
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "رنگ صفحه" ? "rotate" : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "رنگ صفحه"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="rozgold2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="rozgold2"
                        >
                          رزگلد
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="silver2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="silver2"
                        >
                          نقره ای
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="black2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="black2"
                        >
                          مشکی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="gray2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="gray2"
                        >
                          خاکستری
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="blue2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="blue2"
                        >
                          آبی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="red2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="red2"
                        >
                          قرمز
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="white2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="white2"
                        >
                          سفید
                        </label>
                        <br />

                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="yellow2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="yellow2"
                        >
                          زرد
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="dark-blue2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="dark-blue2"
                        >
                          سرمه ای
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="gold2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="gold2"
                        >
                          طلایی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="pink2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="pink2"
                        >
                          صورتی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="green2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="green2"
                        >
                          سبز
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="brown2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="brown2"
                        >
                          قهوه ای
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="purple2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="purple2"
                        >
                          بنفش
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="orange2"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="orange2"
                        >
                          نارنجی
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) + setIsActive("شکل صفحه")
                      }
                    >
                      شکل صفحه
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "شکل صفحه" ? "rotate" : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "شکل صفحه"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="tak-aghrabeh"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="tak-aghrabeh"
                        >
                          تک عقربه
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="se-aghrabeh"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="se-aghrabeh"
                        >
                          سه عقربه
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="digital"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="digital"
                        >
                          دیجیتالی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="digital-aghrabeh"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="digital-aghrabeh"
                        >
                          دیجیتال عقربه ای
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) + setIsActive("نوع قفل")
                      }
                    >
                      نوع قفل
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "نوع قفل" ? "rotate" : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "نوع قفل"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="sagaki"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="sagaki"
                        >
                          سگکی ساده
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="zamendar"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="zamendar"
                        >
                          کلیپسی ضامن دار
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="tasho"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="tasho"
                        >
                          تاشو با محافظ
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="keshi"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="keshi"
                        >
                          کشی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="nastband"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="nastband"
                        >
                          دست بندی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="makhfi"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="makhfi"
                        >
                          قفل مخفی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="etesali"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="etesali"
                        >
                          اتصالی
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) +
                        setIsActive("مقاومت در برابر آب")
                      }
                    >
                      مقاومت در برابر آب
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "مقاومت در برابر آب"
                            ? "rotate"
                            : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "مقاومت در برابر آب"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="positive"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="positive"
                        >
                          دارد
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="negative"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="negative"
                        >
                          ندارد
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) +
                        setIsActive("میزان ضد آبی")
                      }
                    >
                      میزان ضد آبی
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "میزان ضد آبی"
                            ? "rotate"
                            : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "میزان ضد آبی"
                            ? "d-block"
                            : "d-none"
                        } border-top persian-font`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="one"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="one"
                        >
                          1ATM
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="three"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="three"
                        >
                          3ATM
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="five"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="five"
                        >
                          5ATM
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="ten"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="ten"
                        >
                          10ATM
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="twenty"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="twenty"
                        >
                          20ATM
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) +
                        setIsActive("نوع کاربری")
                      }
                    >
                      نوع کاربری
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "نوع کاربری" ? "rotate" : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "نوع کاربری"
                            ? "d-block"
                            : "d-none"
                        } border-top persian-font`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="daily"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="daily"
                        >
                          روزمره
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="majlesi"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="majlesi"
                        >
                          مجلسی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="sport"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="sport"
                        >
                          اسپرت
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="varzeshi"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="varzeshi"
                        >
                          ورزشی
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="classic"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="classic"
                        >
                          کلاسیک
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) +
                        setIsActive("نوع کارکرد موتور")
                      }
                    >
                      نوع کارکرد موتور
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "نوع کارکرد موتور"
                            ? "rotate"
                            : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "نوع کارکرد موتور"
                            ? "d-block"
                            : "d-none"
                        } border-top persian-font`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="quarts"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="quarts"
                        >
                          کوارتز
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="kentik"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="kentik"
                        >
                          کنتیک
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="outomatic"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="outomatic"
                        >
                          اتوماتک
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="solar"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="solar"
                        >
                          سولار
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="echodrive"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="echodrive"
                        >
                          اکودرایو
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) +
                        setIsActive("عقربه شب نما")
                      }
                    >
                      عقربه شب نما
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "عقربه شب نما"
                            ? "rotate"
                            : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "عقربه شب نما"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="has"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="has"
                        >
                          دارد
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="dont"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="dont"
                        >
                          ندارد
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) + setIsActive("تقویم")
                      }
                    >
                      تقویم
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "تقویم" ? "rotate" : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "تقویم"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="with"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="with"
                        >
                          دارد
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="without"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="without"
                        >
                          ندارد
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div className="all-products__filter">
                    <div
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() =>
                        setAccordion((prev) => !prev) +
                        setIsActive("زمان سنج (کرنومتر)")
                      }
                    >
                      زمان سنج (کرنومتر)
                      <FaChevronDown
                        className={`${
                          accordion && isActive === "زمان سنج (کرنومتر)"
                            ? "rotate"
                            : ""
                        } all-products__filter-icon`}
                      />
                    </div>
                    <div className="all-products__filter-formwrapper">
                      <form
                        className={`${
                          accordion && isActive === "زمان سنج (کرنومتر)"
                            ? "d-block"
                            : "d-none"
                        } border-top`}
                      >
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="yes"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="yes"
                        >
                          دارد
                        </label>
                        <br />
                        <input
                          className="filter__checkbox-input"
                          type="checkbox"
                          name=""
                          role="checkbox"
                          id="no"
                        />
                        <label
                          className="filter__checkbox-label my-3 mx-4"
                          htmlFor="no"
                        >
                          ندارد
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-lg-none d-flex">
                <div
                  className="all-products__mob-filters"
                  onClick={() => setIsShowFilterList(true)}
                >
                  <FaSlidersH className="m-2" /> فیلترها
                </div>
                <div
                  className="all-products__mob-ordering"
                  onClick={() => setIsShowOrderingList(true)}
                >
                  <RiBarChartHorizontalFill />
                  مرتب سازی بر اساس
                </div>
              </div>
              <div className="col-12 col-lg-9">
                <div className="all-products__ordering d-lg-flex d-none">
                  <div className="all-products__ordering-title">
                    <p>مرتب سازی بر اساس:</p>
                    <div></div>
                  </div>
                  <ul>
                    {sortingBy.map((item) => (
                      <li
                        key={item.id}
                        className={`${isActive === item.id ? "actived" : ""}`}
                        onClick={() =>
                          setSortedProducts(item.sortBy) + setIsActive(item.id)
                        }
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="row row-gap-4">
                  {!isLoading && sortedProducts ? (
                    sortedProducts.map((product) => (
                      <div
                        className="col-12 col-sm-6 col-lg-4 col-xl-3"
                        key={product.id}
                      >
                        <Link
                          to={`/all-products/${product.brand.replaceAll(
                            " ",
                            "_"
                          )}`}
                        >
                          <div className="all-products__product">
                              <img src={product.src} alt={product.name} className="w-100"/>
                            <div className="w-100">
                              <p className="all-products__product-title">
                                {product.title}
                              </p>
                              <p className="all-products__product-brand persian-font">
                                {product.brand}
                              </p>
                              <p className="all-products__product-price persian-font fw-bold">
                                {product.existing
                                  ? product.price.toLocaleString() + " تومان"
                                  : "ناموجود"}{" "}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-center mt-5">...Loading</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollUp />
        <Info />
        <FooterDown />
        <Footer />
        <Whatsapp />
      </div>
    </>
  );
}

export default AllProducts;
