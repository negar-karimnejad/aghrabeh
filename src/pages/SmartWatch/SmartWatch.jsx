import { Link } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Header from "../../Components/Header/Header";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import Info from "../../Components/Info/Info";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import "./SmartWatch.css";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";

function SmartWatch() {
  return (
    <>
      <Header />
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "ساعت های هوشمند",
            to: "/smart-watch",
          },
        ]}
      />
      <HeaderIcons />
      <div className="container">
        <div className="smart-watch">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <Link to={""}>
                <div className="smart-watch__box">
                  <img
                    src="/images/smart-watch/daniel-brand-smart.jpg"
                    alt="daniel"
                  />
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <Link to={""}>
                <div className="smart-watch__box">
                  <img src="/images/smart-watch/APPLE.webp" alt="APPLE" />
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <Link to={""}>
                <div className="smart-watch__box">
                  <img src="/images/smart-watch/samsung.jpg" alt="samsung" />
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <Link to={""}>
                <div className="smart-watch__box">
                  <img src="/images/smart-watch/xiaomi.jpg" alt="xiaomi" />
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <Link to={""}>
                <div className="smart-watch__box">
                  <img src="/images/smart-watch/FESTINA.jpg" alt="FESTINA" />
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <Link to={""}>
                <div className="smart-watch__box">
                  <img
                    src="/images/smart-watch/ArrowWatch.jpg"
                    alt="ArrowWatch"
                  />
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

export default SmartWatch;
