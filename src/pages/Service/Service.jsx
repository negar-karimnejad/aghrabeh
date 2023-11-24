import React from "react";
import Header from "../../Components/Header/Header";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import Info from "../../Components/Info/Info";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Footer from "../../Components/Footer/Footer";
import Services from "../../Components/Services/Services";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";

function Service() {
  return (
    <>
      <Header />
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "خدمات",
            to: "/service",
          },
        ]}
      />
      <HeaderIcons />
      <Services />
      <ScrollUp />
      <Info />
      <FooterDown />
      <Footer />
      <Whatsapp />
    </>
  );
}

export default Service;
