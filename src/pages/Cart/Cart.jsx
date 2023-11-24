import Header from "../../Components/Header/Header";
import Info from "../../Components/Info/Info";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Footer from "../../Components/Footer/Footer";
import { useEffect, useState } from "react";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import { useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsContext";
import { useNavigate } from "react-router";
import supabase from "../../config/supabaseClient";
import Swal from "sweetalert2";
import EmptyBasket from "../../Components/EmptyBasket/EmptyBasket";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { cartProducts, totalPrice } = useContext(ProductsContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const deleteProduct = async (productId) => {
    const { error } = await supabase.from("cart").delete().eq("id", productId);
    if (error) {
      console.log(error);
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "با موفقیت از سبد خرید حذف شد",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const addProductNumber = async (product) => {
    const { error } = await supabase
      .from("cart")
      .update({ number: product.number + 1 })
      .eq("id", product.id);
    if (error) {
      console.log(error);
    }
  };

  const minusProductNumber = async (product) => {
    const { error } = await supabase
      .from("cart")
      .update({ number: product.number - 1 })
      .eq("id", product.id);
    if (error) {
      console.log(error);
    }
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="cart">
        {!isLoading && cartProducts.length !== 0 ? (
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-3 col-fixed persian-font margin-top">
                <div className="w-10 cart__pricecart d-flex flex-row flex-lg-column justify-content-between">
                  <div className="d-lg-flex d-none justify-content-between border-bottom p-3">
                    <p>قیمت کالاها</p>
                    <p>{totalPrice.toLocaleString()} تومان</p>
                  </div>
                  <div className="d-flex flex-column flex-lg-row justify-content-between p-3">
                    <p className="fw-bold mb-3">جمع</p>
                    <p>{totalPrice.toLocaleString()} تومان</p>
                  </div>
                  <button className="cart__process-button w-lg-100">
                    ادامه فرایند
                  </button>
                </div>
              </div>
              <div className="col-lg-9 col-12">
                <div className="cart__title d-flex align-items-center">
                  <FaArrowRight
                    className="text-secondary fs-3"
                    role="button"
                    onClick={goBack}
                  />
                  <h4 className="text-secondary fs-2 me-3">سبد خرید</h4>
                  <i className="cart__title-underline"></i>
                </div>
                <div className="cart__wrapper rounded-5">
                  {cartProducts.map((product) => (
                    <div
                      className="d-flex border-bottom text-start align-items-center flex-column flex-md-row"
                      key={product.id}
                    >
                      <img
                        width={280}
                        src={product.src}
                        alt={product.brand}
                        loading="lazy"
                      />
                      <div className="w-100 text-muted">
                        <div className="d-flex flex-column align-items-center align-items-md-baseline justify-content-center">
                          <p>{product.title}</p>
                          <p className="py-4 persian-font">
                            {product.brand.toLowerCase()}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between justify-content-md-start align-items-center">
                          <div className="cart__product-number my-md-0 my-3">
                            <button onClick={() => addProductNumber(product)}>
                              +
                            </button>
                            <p className="persian-font text-primary">
                              {product.number}
                            </p>
                            <button
                              disabled={product.number <= 1 && true}
                              onClick={() => minusProductNumber(product)}
                            >
                              -
                            </button>
                          </div>
                          <button
                            className="cart__delete-button"
                            onClick={() => deleteProduct(product.id)}
                          >
                            حذف <FaTrash />
                          </button>
                        </div>
                      </div>
                      <div className="w-100 persian-font text-muted my-md-0 my-3">
                        {product.price === null
                          ? "ناموجود"
                          : (
                              product.number * product.price
                            ).toLocaleString()}{" "}
                        {product.price === null ? "" : "تومان"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyBasket />
        )}
      </div>
      <Info />
      <FooterDown />
      <Footer />
    </>
  );
}

export default Cart;
