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
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Navigation, FreeMode, Thumbs, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductsContext } from "../../Contexts/ProductsContext";
import { AuthContext } from "../../Contexts/AuthContext";
import supabase from "../../config/supabaseClient";
import Swal from "sweetalert2";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import "./SingleProduct.css";

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ref = useRef(null);
  const { products, features, cartProducts } = useContext(ProductsContext);
  const [product, setProduct] = useState({});
  const [productColors, setproductColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const tableHead = [
    { id: "1", title: "مشخصات فنی" },
    { id: "2", title: "توضیحات" },
    { id: "3", title: "نظرات" },
  ];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeItem, setActiveItem] = useState(tableHead[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const productId = id.replaceAll("_", " ");
    const choosenProduct = products.find(
      (product) => product.brand === productId
    );
    setProduct(choosenProduct);

    const productColors = products.filter(
      (product) =>
        product.brand.split(".")[0] + "-" + product.brand.split(".")[1] ===
        productId.split(".")[0] + "-" + productId.split(".")[1]
    );
    const productColorsArray = productColors.filter(
      (product) => product.brand !== productId
    );
    setproductColors(productColorsArray);
    setIsLoading(false);
  }, [id]);

  const feature = Object.keys(features).map((key, index) => (
    <li key={index} className="bg-secondary single-product__feature">
      {features[key]}
    </li>
  ));

  const goToMoreinfo = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const { userFullName } = useContext(AuthContext);

  const addToBag = async (product) => {
    setAdding(true);
    cartProducts.map((item) => {
      if (item.brand === product.brand) {
        Swal.fire({
          title: "این محصول در سبد خرید شما وجود دارد.",
          icon: "warning",
          confirmButtonText: "متوجه شدم",
          showCloseButton: true,
        });
      }
    });
    if (userFullName) {
      const { error } = await supabase.from("cart").insert(product);
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
      {product && !isLoading && (
        <>
          <Breadcrumb
            links={[
              {
                id: 1,
                title: "همه محصولات",
                to: "/all-products",
              },
              {
                id: 2,
                title: product.name,
                to: "/all-products",
              },
              {
                id: 3,
                title: product.brand.toLowerCase().replaceAll(" ", "-"),
                to: `/all-products/${product.brand.replaceAll(" ", "_")}`,
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
                        loop={true}
                        effect={"fade"}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                      >
                        {product.pics.map((item, index) => (
                          <SwiperSlide key={index}>
                            <Magnifier
                              mgWidth={250}
                              mgHeight={250}
                              zoomFactor={0.6}
                              mgShowOverflow={false}
                              src={item}
                            />
                          </SwiperSlide>
                        ))}
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
                        {product.pics.map((item, index) => (
                          <SwiperSlide key={index}>
                            <img
                              className="single-product__swiper-img"
                              src={item}
                              alt={`slider${index}`}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className="col-lg-5 col-12 flex-grow-1 d-flex flex-column justify-content-between position-relative single-product__col p-5">
                      <div>
                        <div className="border-bottom py-3">
                          <p className="single-product__title">
                            {product.title}
                          </p>
                          <p className="single-product__brand">
                            {product.brand}
                          </p>
                          <div className="single-product__price w-100 mt-4 d-flex justify-content-between">
                            <p className="fs-5">
                              {product.existing ? "موجود" : "ناموجود"}
                            </p>
                            <p className="text-black-50 persian-font">
                              {product.existing
                                ? product.price.toLocaleString() + " تومان"
                                : ""}
                            </p>
                          </div>
                        </div>
                        <div className="border-bottom py-5 d-flex w-100 justify-content-between">
                          <button
                            className="single-product__add-bag"
                            onClick={() => addToBag(product)}
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
                              to={"https://www.whatsapp.com/"}
                              className="text-white"
                              target="_blank"
                            >
                              نیاز به مشاوره <BiSupport className="fs-2" />
                            </Link>
                          </button>
                        </div>
                        <ul>
                          <li>
                            <strong>گارانتی</strong> {product.warranty}
                          </li>
                          <li>
                            <strong>نوع کارکرد موتور</strong>{" "}
                            {product.engineType}
                          </li>
                          <li>
                            <strong>اصالت برند</strong>{" "}
                            {product.brandOriginality}
                          </li>
                          <li>
                            <strong>جنسیت</strong> {product.gender}
                          </li>
                        </ul>
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
                {productColors.length !== 0 && (
                  <div className="single-product__colors">
                    <div className="row">
                      <div className="single-product__colors-header">
                        <div className="col-12">
                          <h4>رنگ بندی محصول</h4>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="container">
                          <div className="row">
                            <Swiper
                              className="swiper6"
                              modules={[Navigation]}
                              loop={true}
                              navigation
                              spaceBetween={50}
                              slidesPerView={5}
                              breakpoints={{
                                0: {
                                  slidesPerView: 2,
                                },
                                768: {
                                  slidesPerView: 3,
                                },
                                1000: {
                                  slidesPerView: 4,
                                },
                              }}
                            >
                              {productColors.map((item) => (
                                <SwiperSlide key={item.id}>
                                  <Link
                                    to={`/all-products/${item.brand.replaceAll(
                                      " ",
                                      "_"
                                    )}`}
                                  >
                                    <div className="single-product__swiper-slider-wrapper">
                                      <img
                                        width={180}
                                        src={item.src}
                                        alt={item.brand}
                                        loading="lazy"
                                      />
                                      <p className="single-product__swiper6-title">
                                        {item.title}
                                      </p>
                                      <p className="single-product__swiper6-brand">
                                        {item.brand}
                                      </p>
                                      <p className="single-product__swiper6-price persian-font">
                                        {item.price.toLocaleString()} تومان
                                      </p>
                                    </div>
                                  </Link>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="py-1" ref={ref}>
                <div className="single-product__moreinfo" >
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
                        <div className="single-product__table persian-font">
                          {activeItem === "1" && (
                            <div className="d-flex">
                              <div className="col-4 text-white persian-font">
                                <ul>{feature}</ul>
                              </div>
                              <div className="col-8 persian-font">
                                <ul>
                                  <li className="single-product__feature text-muted">
                                    {product.strapMaterial}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.frameMaterial}
                                  </li>
                                  <li className="single-product__feature info-td mineral-td text-muted">
                                    {product.glassMaterial}
                                    <img
                                      className="mx-1"
                                      width={10}
                                      src="/images/single-product/info-i.svg"
                                      alt="info"
                                    />
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.frameForm}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.frameColor}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.strapColor}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.dialColor}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.dialShape}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.lockType}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.waterResistance}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.waterproofLevel}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.warranty}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.usageType}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.dialDiameter}
                                  </li>
                                  <li className="single-product__feature info-td quartz-td text-muted">
                                    {product.engineType}
                                    <img
                                      className="mx-1"
                                      width={10}
                                      src="/images/single-product/info-i.svg"
                                      alt="info"
                                    />
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.nightClockhand}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.brandOriginality}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.calendar}
                                  </li>
                                  <li className="single-product__feature text-muted">
                                    {product.gender}
                                  </li>
                                  <li className="single-product__feature text-muted border-0">
                                    {product.stopwatch}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
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

export default SingleProduct;
