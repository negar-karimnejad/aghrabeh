import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Service from "./pages/Service/Service";
import PopularSearch from "./pages/PopularSearch/PopularSearch";
import AmazingOffer from "./pages/AmazingOffer/AmazingOffer";
import SmartWatch from "./pages/SmartWatch/SmartWatch";
import Brands from "./pages/Brands/Brands";
import AllProducts from "./pages/AllProducts/AllProducts";
import Jewellery from "./pages/Jewellery/Jewellery";
import ReturnGuarantee from "./pages/ReturnGuarantee/ReturnGuarantee";
import FastPosting from "./pages/FastPosting/FastPosting";
import GoodsAuthenticity from "./pages/GoodsAuthenticity/GoodsAuthenticity";
import ExpertAdvice from "./pages/ExpertAdvice/ExpertAdvice";
import InstallmentBuying from "./pages/InstallmentBuying/InstallmentBuying";
import SpecialBuy from "./pages/SpecialBuy/SpecialBuy";
import Teamwork from "./pages/Teamwork/Teamwork";
import Blog from "./pages/Blog/Blog";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import SingleJewellery from "./pages/SingleJewellery/SingleJewellery";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import SingleBlog from "./pages/SingleBlog/SingleBlog";
import Contact from "./pages/Contact/Contact";
import { Children } from "react";
import SearchProducts from "./pages/SearchProducts/SearchProducts";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/all-products",
    element: <AllProducts />,
    children: [{ path: "/all-products/search/:id", element: <SearchProducts /> }],
  },
  { path: "/all-products/:id", element: <SingleProduct /> },
  { path: "/brands", element: <Brands /> },
  { path: "/smart-watch", element: <SmartWatch /> },
  { path: "/amazing-offer", element: <AmazingOffer /> },
  { path: "/popular-search", element: <PopularSearch /> },
  {
    path: "/jewellery",
    element: <Jewellery />,
  },
  { path: "/jewellery/:id", element: <SingleJewellery /> },
  { path: "/service", element: <Service /> },
  {
    path: "/service/blog/7-days-return-guarantee",
    element: <ReturnGuarantee />,
  },
  { path: "/service/blog/fast-posting", element: <FastPosting /> },
  { path: "/service/blog/goods-authenticity", element: <GoodsAuthenticity /> },
  { path: "/service/blog/expert-advice", element: <ExpertAdvice /> },
  { path: "/service/installment-buying", element: <InstallmentBuying /> },
  { path: "/service/special-buy", element: <SpecialBuy /> },
  { path: "/service/teamwork", element: <Teamwork /> },
  { path: "/service/blog", element: <Blog /> },
  { path: "/service/blog/:id", element: <SingleBlog /> },
  { path: "cart", element: <Cart /> },
  { path: "/contact-us", element: <Contact /> },
];

export default routes;
