import Header from "../../Components/Header/Header";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import Info from "../../Components/Info/Info";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";
import "./PopularSearch.css";

function PopularSearch() {
  return (
    <>
      <Header />
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "جستجوهای پرطرفدار",
            to: "/popular-search",
          },
        ]}
      />
      <HeaderIcons />
      <div className="container">
        <div className="popular-search">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <Link to={"/all-products/search/مردانه"}>
                <div className="popular-search__box">
                  <img src="/images/popular-search/mn.jpg" alt="men" />
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <Link to={"/all-products/search/زنانه"}>
                <div className="popular-search__box">
                  <img src="/images/popular-search/wmn.jpg" alt="women" />
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <Link to={"/all-products/search/ست"}>
                <div className="popular-search__box">
                  <img src="/images/popular-search/set.jpg" alt="set" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ScrollUp />
      <Info />
      <FooterDown />
      <Footer />
      <Whatsapp />
    </>
  );
}

export default PopularSearch;
