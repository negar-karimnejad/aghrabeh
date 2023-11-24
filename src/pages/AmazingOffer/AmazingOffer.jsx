import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Header from "../../Components/Header/Header";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import Info from "../../Components/Info/Info";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";
import "./AmazingOffer.css";

function AmazingOffer() {
  return (
    <div className="amazing-offer">
      <Header />
      <div className="amazing-offer__banner"></div>
      <Breadcrumb
        links={[{ id: 1, title: "پیشنهاد اسپایسی", to: "/amazing-offer" }]}
      />
      <HeaderIcons />
      <div className="container ">
        <div className="row amazing-offer__row">
          <div className="col-lg-6 col-12">
            <div className="amazing-offer__content">
              <img src="/images/amazing-offer/hulkapep.svg" alt="hulkapep" />
              <strong>دیر رسیدی، تخفیف ها تموم شد!</strong>
              <p>نگران نباش، تخفیف های جدید در حال بارگذاریه.</p>
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

export default AmazingOffer;
