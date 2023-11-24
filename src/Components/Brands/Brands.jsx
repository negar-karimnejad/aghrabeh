import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../Button/Button";
import "swiper/css";
import "./Brands.css";

function Brands() {
  const brandsImg = [
    { id: 1, src: "/images/brands/w-romanson.webp", alt: "romanson" },
    { id: 2, src: "/images/brands/w-citizen.webp ", alt: "citizen" },
    { id: 3, src: "/images/brands/mathettissot.jpg", alt: "mathettissot" },
    { id: 4, src: "/images/brands/w-casio.webp", alt: "casio" },
    { id: 5, src: "/images/brands/w-omax.webp", alt: "omax" },
    { id: 6, src: "/images/brands/w-seiko.webp", alt: "seiko" },
    { id: 7, src: "/images/brands/w-romanson.webp", alt: "romanson" },
    { id: 8, src: "/images/brands/w-citizen.webp ", alt: "citizen" },
    { id: 9, src: "/images/brands/mathettissot.jpg", alt: "mathettissot" },
    { id: 10, src: "/images/brands/w-casio.webp", alt: "casio" },
    { id: 11, src: "/images/brands/w-omax.webp", alt: "omax" },
    { id: 12, src: "/images/brands/w-seiko.webp", alt: "seiko" },
  ];
  return (
    <div className="brands">
      <div className="container">
        <div className="row">
          <div className="col-12 brands__header">
            <h3>برترین برندها</h3>
            <Link to={"/brands"}>
              <Button />
            </Link>
          </div>
          <div className="col-12">
            <Swiper
              className="swiper3"
              modules={[Autoplay]}
              loop={true}
              autoplay={{
                delay: 8000,
                disableOnInteraction: false,
              }}
              spaceBetween={50}
              slidesPerView={6}
              breakpoints={{
                0: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1000: {
                  slidesPerView: 6,
                },
              }}
            >
              {brandsImg.map((brand) => (
                <SwiperSlide key={brand.id}>
                  <Link to={""}>
                    <img src={brand.src} alt={brand.alt} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Brands;
