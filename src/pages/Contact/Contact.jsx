import { useRef, useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import Info from "../../Components/Info/Info";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Footer from "../../Components/Footer/Footer";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";
import React from "./Contact.css";
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import "@neshan-maps-platform/react-openlayers/dist/style.css";

function Contact() {
  const mapRef = useRef(null);

  const [ol, setOl] = useState();
  const [olMap, setOlMap] = useState();

  const onInit = (ol, map) => {
    setOl(ol);
    setOlMap(map);

    setTimeout(() => {
      const view = map.getView();
      view.animate({
        center: ol.proj.fromLonLat([51.36281969540723, 35.69672648316882]),
        zoom: 12,
        duration: 1000,
      });
    }, 2000);
  };
  const onIn = (ol, map) => {
    setOl(ol);
    setOlMap(map);

    setTimeout(() => {
      const view = map.getView();
      view.animate({
        center: ol.proj.fromLonLat([51.3811, 35.7863]),
        zoom: 12,
        duration: 1000,
      });
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (mapRef.current?.map) {
        mapRef.current?.map.setMapType("standard-night");
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Header />
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "تماس با ما",
            to: "/contact-us",
          },
        ]}
      />
      <HeaderIcons />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="contact">
              <div className="text-center">
                <h4 className="fw-bold fs-2 mb-5">گالری ساعت عقربه</h4>
                <h3 className="mb-4">
                  امکان خرید حضوری و اینترنتی بهترین برند های ساعت مچی با ضمانت
                  اصل بودن کالا
                </h3>
                <p className="mb-4 fs-4">
                  <strong>شعبه مرکزی</strong> : تهران، محله بازار، خیابان بازار
                  بزرگ، بن‌بست پاساژ ساعت، ساختمان گالری ساعت عقربه، پلاک ۲،
                  طبقه همکف، واحد ۲
                </p>
                <p className="mb-4 fs-4">
                  <strong>شعبه سعادت آباد</strong> : تهران، شهرک غرب بلوار
                  فرحزادی، میدان کتاب ابتدای بلوار کوهستان، مجتمع تجاری اُپال،
                  طبقه ۲، پلاک 211
                </p>
                <p className="mb-4 fs-4">
                  <strong>شماره تماس</strong> : 02155697714
                </p>
                <p className="mb-4 fs-4">
                  <strong>تلفن همراه</strong> : 09012686386
                </p>
                <p className="mb-4 fs-4">
                  <strong>ایمیل</strong> : info@mraghrabeh.com
                </p>
              </div>
              <div className="mt-5">
                <div className="d-flex justify-content-around">
                  <div>
                    <h4 className="fs-1 p-4">شعبه مرکزی</h4>
                    <div className="contact__map">
                      <NeshanMap
                        mapKey="web.4fa33f9955634137ba7f734503d84371"
                        defaultType="neshan"
                        center={{ latitude: 35.7665394, longitude: 51.4749824 }}
                        style={{ height: "48vh", width: "100%" }}
                        onInit={onInit}
                        zoom={13}
                      ></NeshanMap>
                    </div>
                  </div>
                  <div>
                    <h4 className="fs-1 p-4">شعبه سعادت آباد</h4>
                    <div className="contact__map">
                      <NeshanMap
                        mapKey="web.4fa33f9955634137ba7f734503d84371"
                        defaultType="neshan"
                        center={{ latitude: 34.7665394, longitude: 35.4749824 }}
                        style={{ height: "48vh", width: "100%" }}
                        onInit={onIn}
                        zoom={13}
                      ></NeshanMap>
                    </div>
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

export default Contact;
