import Search from "../../Components/Search/Search";
import HeaderSlider from "../../Components/HeaderSlider/HeaderSlider";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import QuickSuggestions from "../../Components/quickSuggestions/quickSuggestions";
import Banners from "../../Components/Banners/Banners";
import LastProducts from "../../Components/LastProducts/LastProducts";
import LastArticles from "../../Components/LastArticles/LastArticles";
import Brands from "../../Components/Brands/Brands";
import Info from "../../Components/Info/Info";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";

function Home() {
  return (
    <>
      <Header />
      <Search />
      <HeaderSlider />
      <HeaderIcons />
      <QuickSuggestions />
      <Banners />
      <LastProducts />
      <LastArticles />
      <Brands />
      <ScrollUp />
      <Info />
      <FooterDown />
      <Footer />
      <Whatsapp />
    </>
  );
}

export default Home;
