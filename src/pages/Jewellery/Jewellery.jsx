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
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../Contexts/ProductsContext";
import "./Jewellery.css";

function Jewellery() {
  const [isShowOrderingList, setIsShowOrderingList] = useState(false);
  const [isShowFilterList, setIsShowFilterList] = useState(false);
  const [isActive, setIsActive] = useState("محدوده قیمت");
  const [accordion, setAccordion] = useState(true);
  const [priceRangeFrom, setPriceRangeFrom] = useState(0);
  const [priceRangeTo, setPriceRangeTo] = useState(550000000);
  const {
    jewelleries,
    isLoading,
    sortedJewelleries,
    setSortedJewelleries,
    lowPriceSortedJewelleries,
    heighPriceSortedJewelleries,
    newestSortedJewelleries,
    discountJewelleries,
  } = useContext(ProductsContext);

  const sortingBy = [
    { id: "1", title: "ارزان ترین", sortBy: lowPriceSortedJewelleries },
    { id: "2", title: "گران ترین", sortBy: heighPriceSortedJewelleries },
    { id: "3", title: "جدیدترین", sortBy: newestSortedJewelleries },
    { id: "4", title: "بیشترین تخفیف", sortBy: discountJewelleries },
  ];
  const submitPriceRange = (e) => {
    e.preventDefault();
    const priceRangeJewelleries = jewelleries.filter(
      (jewellery) =>
        jewellery.price <= priceRangeTo && jewellery.price >= priceRangeFrom
    );
    const choosenJewelleries = priceRangeJewelleries.filter(
      (jewellery) => jewellery.price !== null
    );
    choosenJewelleries
      ? setSortedJewelleries(
          choosenJewelleries.sort((a, b) => a.price - b.price)
        )
      : setSortedJewelleries(null);
    setIsShowFilterList(false);
  };

  return (
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
                  setSortedJewelleries(item.sortBy) +
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
                  accordion && isActive === "محدوده قیمت" ? "d-block" : "d-none"
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
                    id="x"
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
                  <button type="submit" className="all-products__range-submit">
                    اعمال محدوده قیمت
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Header />
      <Breadcrumb links={[{ id: 1, title: "زیورآلات", to: "/jewellery" }]} />
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
                        setSortedJewelleries(item.sortBy) + setIsActive(item.id)
                      }
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="row row-gap-4">
                {!isLoading &&
                  sortedJewelleries &&
                  sortedJewelleries.map((jewellery) => (
                    <div
                      className="col-12 col-sm-6 col-lg-4 col-xl-3"
                      key={jewellery.id}
                    >
                      <Link
                        to={`/jewellery/${jewellery.brand.replaceAll(
                          " ",
                          "_"
                        )}`}
                      >
                        <div className="all-products__product">
                          <img
                            src={jewellery.src}
                            alt={jewellery.brand}
                            className="w-100"
                            loading="lazy"
                          />
                          <div className="w-100">
                            <p className="all-products__product-title">
                              {jewellery.title}
                            </p>
                            <p className="all-products__product-brand persian-font">
                              {jewellery.brand}
                            </p>
                            <p className="all-products__product-price persian-font fw-bold">
                              {jewellery.existing
                                ? jewellery.price.toLocaleString() + " تومان"
                                : "ناموجود"}{" "}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                {isLoading && sortedJewelleries && (
                  <p className="text-center mt-5">...Loading</p>
                )}
                {/* {!sortedJewelleries && (
                  <p>هیچ دستبندی با این رنج قیمت وجود ندارد</p>
                )} */}
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
  );
}

export default Jewellery;
