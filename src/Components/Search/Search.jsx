import { HiSearch } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../Contexts/ProductsContext";
import { Link } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import "./Search.css";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchLoading, setSearchLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { setFoundProducts, foundProducts } = useContext(ProductsContext);

  useEffect(() => {}, [searchValue]);

  const changeHandler = async (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length > 0) {
      await supabase
        .from("products")
        .select("*")
        .ilike("title", `%${e.target.value}%`)
        .then((response) => {
          setFoundProducts(response.data);
          setSearchLoading(false);
          foundProducts.length === 0 ? setNotFound(true) : setNotFound(false);
        })
        .catch((error) => {
          console.log("Error searching products:", error);
        });
    } else {
      setFoundProducts([]);
    }
  };

  return (
    <div className="container">
      <div className="search">
        <div className="search__wrapper">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className="search__input"
              placeholder="جستجو در همه محصولات"
              type="text"
              value={searchValue}
              onChange={changeHandler}
            />
            <button type="submit" className="search__icon">
              <HiSearch />
            </button>
          </form>
        </div>
      </div>
      {searchValue.length !== 0 && (
        <>
          <i className="search__overlay"></i>
          <div className="search__dropDown">
            <h4 className="border-bottom p-3 fw-bold text-muted fs-3">
              محصولات
            </h4>
            {searchLoading ? (
              <div className="d-flex flex-column align-items-center justify-content-center my-4">
                <div className="search__loading"></div>
                <p className="mt-4">لطفا صبر کنید ...</p>
              </div>
            ) : !notFound ? (
              <div className="d-flex align-items-center justify-content-center my-4">
                <img
                  width={100}
                  className="rounded-circle ms-4"
                  src="/images/show-all.svg"
                  alt="show-all"
                />
                <div>
                  <p className="fs-4">
                    برای جستجوی عبارت{" "}
                    <span className="text-danger fw-bold">{searchValue}</span> ,
                    تعداد{" "}
                    <span className="fw-bold">{foundProducts.length}</span>{" "}
                    نتیجه یافت شد.
                  </p>
                  <Link to={`/all-products/search/${searchValue}`}>
                    <button>مشاهده همه نتایج</button>{" "}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <img
                  width={100}
                  className="rounded-circle"
                  src="/images/notfound.png"
                  alt="notfound"
                />
                <p>هیچ محصولی یافت نشد</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
