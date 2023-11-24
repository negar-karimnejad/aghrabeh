import { Link } from "react-router-dom";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./LastProducts.css";

function LastProducts() {
  const { newestSortedProducts } = useContext(ProductsContext);

  return (
    <div className="container">
      <div className="last-products">
        <div className="row">
          <div className="last-products__header">
            <div className="col-12">
              <h3>جدیدترین ها</h3>
            </div>
          </div>
          <div className="col-12">
            <div className="container">
              <div className="row">
                <Swiper
                  className="swiper2"
                  modules={[A11y, Autoplay, Navigation]}
                  loop={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  navigation
                  spaceBetween={50}
                  slidesPerView={4}
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
                  {newestSortedProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <Link
                        to={`/all-products/${product.brand.replaceAll(
                          " ",
                          "_"
                        )}`}
                      >
                        <div className="last-products__swiper-slider-wrapper">
                          <img
                            width={230}
                            src={product.src}
                            alt={product.name}
                            loading="lazy"
                          />
                          <p className="last-products__swiper2-title">
                            {product.title}
                          </p>
                          <p className="last-products__swiper2-brand">
                            {product.brand.substring(0, 14) + "..."}
                          </p>
                          <p className="last-products__swiper2-price persian-font">
                            {product.existing
                              ? product.price.toLocaleString() + " تومان"
                              : ""}
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
    </div>
  );
}

export default LastProducts;
