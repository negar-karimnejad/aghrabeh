import { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Header from "../../Components/Header/Header";
import Info from "../../Components/Info/Info";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";
import "./Teamwork.css";

function Teamwork() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "به وقت رفاقت",
            to: "/service/teamwork",
          },
        ]}
      />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="teamwork">
              <h4>با یه ساعت شروع میشه!</h4>
              <p>
                وقتی شما عقربه رو لایق میدونید و بهش اعتماد می کنید که ساعت اصل
                خودتون رو از ما بخرید، ما هم برای اینکه بتونیم این رفاقت رو
                ادامه دار کنیم براتون هدایایی تدارک دیدیم که با هربار خرید برای
                شما فعال میشه
              </p>
            </div>
            <div className="teamwork__img col-6 col-md-10">
              <img
                className={`${loaded ? "goLeft" : ""} teamwork__img-img`}
                src="/images/teamwork/team.svg"
                alt="team"
              />
            </div>
            <div className="teamwork__soon">
              <h3>به زودی</h3>
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-4 teamwork__soon-wrapper">
                    <img
                      src="/images/teamwork/ESCAPEROOMIST.png"
                      alt="ESCAPEROOMIST"
                    />
                    <small>اسکیپ رومیست</small>
                  </div>
                  <div className="col-12 col-lg-4 teamwork__soon-wrapper">
                    <img src="/images/teamwork/JHONAR.png" alt="JHONAR" />
                    <small>جام هنر</small>
                  </div>
                  <div className="col-12 col-lg-4 teamwork__soon-wrapper">
                    <img
                      src="/images/teamwork/main-white.png"
                      alt="main-white"
                    />
                    <small>باغ ایرانی</small>
                  </div>
                </div>
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
    </>
  );
}

export default Teamwork;
