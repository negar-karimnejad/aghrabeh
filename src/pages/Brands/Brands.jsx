import { Link } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Header from "../../Components/Header/Header";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import Info from "../../Components/Info/Info";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import { GoSearch } from "react-icons/go";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../Contexts/ProductsContext";
import supabase from "../../config/supabaseClient";
import "./Brands.css";

function Brands() {
  const [inputValue, setInputValue] = useState("");
  const [allBrands, setAllBrands] = useState([]);
  const { brandsPage } = useContext(ProductsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAllBrands(brandsPage);
  }, []);

  useEffect(() => {}, [inputValue]);

  const changeHandler = async (e) => {
    setInputValue(e.target.value);
    if (inputValue.length > 0) {
      await supabase
        .from("brandsPage")
        .select("*")
        .ilike("title", `%${e.target.value}%`)
        .then((response) => {
          setAllBrands(response.data);
        })
        .catch((error) => {
          console.log("Error searching products:", error);
        });
    } else {
      setAllBrands(brandsPage);
    }
  };

  return (
    <>
      <Header />
      <Breadcrumb links={[{ id: 1, title: "برندها", to: "/brands" }]} />
      <HeaderIcons />
      <div className="container">
        <div className="brands-page">
          <div className="row">
            <div className=" col-sm-4 col-12">
              <div className="brandsــserach">
                <GoSearch className="brands__search-icon" />
                <input
                  type="text"
                  placeholder="جستجو در برندها"
                  value={inputValue}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="col-8">
              <div className="brandsــtitle">
                <p>برندهای گالری ساعت عقربه</p>
              </div>
            </div>
          </div>
          <div className="row">
            {allBrands.map((brand) => (
              <div key={brand.alt} className="col-12 col-lg-4 col-md-6">
                <Link>
                  <div className="brand-page">
                    <p>{brand.title}</p>
                    <img src={brand.src} alt={brand.alt} />
                  </div>
                </Link>
              </div>
            ))}
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
export default Brands;
