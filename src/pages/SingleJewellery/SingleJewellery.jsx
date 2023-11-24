import Header from "../../Components/Header/Header";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import Info from "../../Components/Info/Info";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Footer from "../../Components/Footer/Footer";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";
import Magnifier from "react-magnifier";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Navigation, FreeMode, Thumbs, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { ProductsContext } from "../../Contexts/ProductsContext";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext";
import supabase from "../../config/supabaseClient";

function SingleJewellery() {
  const { id } = useParams();
  const ref = useRef(null);
  const [jewellery, setJewellery] = useState({});
  const [jewelleryColors, setJewelleryColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { userFullName } = useContext(AuthContext);
  const {
    jewelleries,
    cartProducts,
    //   // sortedJewelleries,
    //   // setSortedJewelleries,
    //   // isLoading,
    //   // lowPriceSortedJewelleries,
    //   // heighPriceSortedJewelleries,
    //   // newestSortedJewelleries,
    //   // discountJewelleries,
  } = useContext(ProductsContext);

  const tableHead = [
    { id: "1", title: "مشخصات فنی" },
    { id: "2", title: "توضیحات" },
    { id: "3", title: "نظرات" },
  ];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeItem, setActiveItem] = useState(tableHead[0].id);

  useEffect(() => {
    const jewelleryId = id.replaceAll("_", " ");
    const choosenJewellery = jewelleries.find(
      (jewellery) => jewellery.brand === jewelleryId
    );
    setJewellery(choosenJewellery);

    const jewelleryColors = jewelleries.filter(
      (jewellery) =>
        jewellery.brand.split(".")[0] + "-" + jewellery.brand.split(".")[1] ===
        jewelleryId.split(".")[0] + "-" + jewelleryId.split(".")[1]
    );
    const jewelleryColorsArray = jewelleryColors.filter(
      (jewellery) => jewellery.brand !== jewelleryId
    );
    setJewelleryColors(jewelleryColorsArray);
    setIsLoading(false);
  }, [id]);

  const goToMoreinfo = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addToBag = async (jewellery) => {
    setAdding(true);
    cartProducts.map((item) => {
      if (item.brand === jewellery.brand) {
        Swal.fire({
          title: "این محصول در سبد خرید شما وجود دارد.",
          icon: "warning",
          confirmButtonText: "متوجه شدم",
          showCloseButton: true,
        });
      }
    });
    if (userFullName) {
      const { error } = await supabase.from("cart").insert(jewellery);
      if (error) {
        console.log(error);
        setAdding(false);
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "با موفقیت به سبد خرید اضافه شد",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setAdding(false);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "ابتدا باید وارد سایت شوید",
        confirmButtonText: "متوجه شدم",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <>
      <Header />
      {jewellery && !isLoading && (
        <>
          <Breadcrumb
            links={[
              {
                id: 1,
                title: "زیورآلات",
                to: "/jewellery",
              },
              {
                id: 2,
                title: jewellery.brand.toLowerCase().replaceAll(" ", "-"),
                to: `/all-products/${jewellery.brand.replaceAll(" ", "_")}`,
              },
            ]}
          />
          <HeaderIcons />
          <div className="container">
            <div className="single-product">
              <>
                <div className="single-product__toprow">
                  <div className="row gap-5 d-flex justify-content-around">
                    <div className="col-lg-5 col-12 flex-grow-1 single-product__col position-relative">
                      <Swiper
                        className="swiper4"
                        modules={[FreeMode, Navigation, Thumbs, EffectFade]}
                        thumbs={
                          thumbsSwiper ? { swiper: thumbsSwiper } : undefined
                        }
                        effect={"fade"}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                      >
                        <SwiperSlide>
                          <Magnifier
                            mgWidth={250}
                            mgHeight={250}
                            zoomFactor={0.6}
                            mgShowOverflow={false}
                            src={jewellery.src}
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <Magnifier
                            mgWidth={250}
                            mgHeight={250}
                            zoomFactor={0.6}
                            mgShowOverflow={false}
                            src={jewellery.src}
                          />
                        </SwiperSlide>
                      </Swiper>
                      <Swiper
                        className="swiper5"
                        slidesPerView={6}
                        navigation
                        onSwiper={setThumbsSwiper}
                        spaceBetween={20}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                      >
                        <SwiperSlide>
                          <img
                            className="single-product__swiper-img"
                            src={jewellery.src}
                            alt={jewellery.brand}
                          />
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <div className="col-lg-5 col-12 flex-grow-1 d-flex flex-column justify-content-between position-relative single-product__col p-5">
                      <div>
                        <div className="border-bottom py-3">
                          <p className="single-product__title">
                            {jewellery.title}
                          </p>
                          <p className="single-product__brand">
                            {jewellery.brand}
                          </p>
                          <div className="single-product__price w-100 mt-4 d-flex justify-content-between">
                            <p className="fs-5">
                              {jewellery.existing ? "موجود" : "ناموجود"}
                            </p>
                            <p className="text-black-50 persian-font">
                              {jewellery.existing
                                ? jewellery.price.toLocaleString() + " تومان"
                                : ""}
                            </p>
                          </div>
                        </div>
                        <div className="border-bottom py-5 d-flex w-100 justify-content-between">
                          <button
                            className="single-product__add-bag"
                            onClick={() => addToBag(jewellery)}
                          >
                            افزودن به سبد خرید{" "}
                            <FaShoppingCart
                              className={`${
                                adding
                                  ? "single-product__shoppingcart-icon"
                                  : ""
                              } fs-3`}
                            />
                          </button>
                          <button className="single-product__advice">
                            <Link
                              className="text-white"
                              to={"https://www.whatsapp.com/"}
                              target="_blank"
                            >
                              نیاز به مشاوره <BiSupport className="fs-2" />
                            </Link>
                          </button>
                        </div>
                      </div>
                      <button
                        className="single-product__moreinfobutton"
                        onClick={goToMoreinfo}
                      >
                        مشاهده مشخصات فنی
                        <RiArrowDropDownLine className="fs-2" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="single-product__moreinfo" ref={ref}>
                  <div className="container">
                    <div className="row">
                      <div className="col-7 col-md-6 col-lg-4 p-0">
                        <ul className="d-flex">
                          {tableHead.map((item) => (
                            <li
                              key={item.id}
                              id={item.id}
                              onClick={() => setActiveItem(item.id)}
                              className={`${
                                activeItem === item.id ? "active-item" : ""
                              } single-product__moreinfo-li`}
                            >
                              {item.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {activeItem === "1" && (
                        <div
                          style={{ height: "20rem" }}
                          className="single-product__table persian-font"
                        >
                          {activeItem === "1" && <></>}
                        </div>
                      )}
                      {activeItem === "2" && (
                        <div className="single-product__description">
                          <div className="single-product__description-content">
                            توضیحاتی ثبت نشده
                          </div>
                        </div>
                      )}
                      {activeItem === "3" && (
                        <div className="single-product__description">
                          <div className="single-product__description-content">
                            هنوز هیچ نظری ثب نشده است
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </>
      )}
      <ScrollUp />
      <Info />
      <FooterDown />
      <Footer />
      <Whatsapp />
    </>
  );
}

export default SingleJewellery;
