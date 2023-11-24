import { useEffect, useState } from "react";
import { useRoutes } from "react-router";
import { ProductsContext } from "./Contexts/ProductsContext";
import { AuthContext } from "./Contexts/AuthContext";
import supabase from "./config/supabaseClient";
import routes from "./routes";
import "./App.css";

function App() {
  const router = useRoutes(routes);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [lowPriceSortedProducts, setLowPriceSortedProducts] = useState([]);
  const [heighPriceSortedProducts, setHeighPriceSortedProducts] = useState([]);
  const [newestSortedProducts, setNewestSortedProducts] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);
  const [jewelleries, setJewelleries] = useState([]);
  const [sortedJewelleries, setSortedJewelleries] = useState([]);
  const [lowPriceSortedJewelleries, setLowPriceSortedJewelleries] = useState(
    []
  );
  const [heighPriceSortedJewelleries, setHeighPriceSortedJewelleries] =
    useState([]);
  const [discountJewelleries, setDiscountJewelleries] = useState([]);
  const [newestSortedJewelleries, setNewestSortedJewelleries] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [luxaryBrands, setLuxaryBrands] = useState([]);
  const [middleBrands, setMiddleBrands] = useState([]);
  const [ecoBrands, setEcoBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [features, setFeatures] = useState([]);
  const [userFullName, setUserFullName] = useState("");
  const [userToken, setUserToken] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [foundProducts, setFoundProducts] = useState([]);
  const [brandsPage, setBrandsPage] = useState([]);

  useEffect(() => {
    fetchJewelleries();
    fetchFeatures();
    fetchBrands();
    fetchBrandsPage();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [foundProducts]);

  useEffect(() => {
    fetchCart();
  }, [userFullName, cartProducts]);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (data) {
      setProducts(data);
      foundProducts.length !== 0
        ? setSortedProducts(foundProducts)
        : setSortedProducts([...data].sort((a, b) => a.id - b.id));
      setSortedProducts([...data].sort((a, b) => a.id - b.id));
      setLowPriceSortedProducts([...data].sort((a, b) => a.price - b.price));
      setHeighPriceSortedProducts([...data].sort((a, b) => b.price - a.price));
      setDiscountProducts([...data].sort((a, b) => b.id - a.id));
      setNewestSortedProducts(
        [...data].sort((a, b) => b.created_at - a.created_at)
      );
      setIsLoading(false);
    } else {
      setProducts(null);
      console.log(error);
    }
  };

  const fetchJewelleries = async () => {
    const { data, error } = await supabase.from("jewelleries").select("*");
    if (data) {
      setJewelleries(data);
      setSortedJewelleries([...data].sort((a, b) => a.id - b.id));
      setLowPriceSortedJewelleries([...data].sort((a, b) => a.price - b.price));
      setHeighPriceSortedJewelleries(
        [...data].sort((a, b) => b.price - a.price)
      );
      setDiscountJewelleries([...data].sort((a, b) => b.id - a.id));
      setNewestSortedJewelleries(
        [...data].sort((a, b) => b.created_at - a.created_at)
      );
      setIsLoading(false);
    } else {
      setJewelleries(null);
      console.log(error);
    }
  };

  const fetchFeatures = async () => {
    const { data, error } = await supabase.from("features").select("*");
    if (data) {
      setFeatures(data[0]);
    } else {
      setFeatures(null);
      console.log(error);
    }
  };

  const fetchCart = async () => {
    const { data, error } = await supabase.from("cart").select("*");
    if (data) {
      setCartProducts(data);
      let price = 0;
      data.map((product) => (price += product.price * product.number));
      setTotalPrice(price);
    } else {
      setCartProducts(null);
      console.log(error);
    }
  };

  const fetchBrands = async () => {
    const { data, error } = await supabase.from("brands").select("*");
    if (data) {
      setLuxaryBrands(data[2].brand);
      setMiddleBrands(data[0].brand);
      setEcoBrands(data[1].brand);
    } else {
      setLuxaryBrands(null);
      setMiddleBrands(null);
      setEcoBrands(null);
      console.log(error);
    }
  };
  const fetchBrandsPage = async () => {
    const { data, error } = await supabase.from("brandsPage").select("*");
    if (data) {
      setBrandsPage(data);
    } else {
      setBrandsPage(null);
      console.log(error);
    }
  };

  return (
    <>
      <div className="app">
        <AuthContext.Provider
          value={{ userFullName, setUserFullName, userToken, setUserToken }}
        >
          <ProductsContext.Provider
            value={{
              products,
              sortedProducts,
              cartProducts,
              foundProducts,
              luxaryBrands,
              middleBrands,
              ecoBrands,
              brandsPage,
              setFoundProducts,
              setCartProducts,
              setCartProducts,
              totalPrice,
              setSortedProducts,
              isLoading,
              lowPriceSortedProducts,
              heighPriceSortedProducts,
              newestSortedProducts,
              discountProducts,
              jewelleries,
              sortedJewelleries,
              setSortedJewelleries,
              lowPriceSortedJewelleries,
              heighPriceSortedJewelleries,
              discountJewelleries,
              newestSortedJewelleries,
              features,
            }}
          >
            {router}
          </ProductsContext.Provider>
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
