import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./HeaderSlider.css";

function HeaderSlider() {
  const headerSliders = [
    { id: 1, src: "/images/header-slider/slider1.webp", alt: "slider1" },
    { id: 2, src: "/images/header-slider/slider2.gif", alt: "slider2" },
    { id: 3, src: "/images/header-slider/slider3.webp", alt: "slider3" },
    { id: 4, src: "/images/header-slider/slider4.gif", alt: "slider4" },
  ];
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Swiper
              className="swiper1"
              modules={[Navigation, Pagination, A11y, Autoplay]}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {headerSliders.map((slider) => (
                <SwiperSlide key={slider.id}>
                  <img
                    className="header__swiper-img"
                    src={slider.src}
                    alt={slider.alt}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
export default HeaderSlider;