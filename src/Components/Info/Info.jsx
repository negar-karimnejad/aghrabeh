import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialMedia from "../SocialMedia/SocialMedia";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import "./Info.css";

function Info() {
  const navigate = useNavigate();
  const { userFullName } = useContext(AuthContext);

  const goToCart = () => {
    if (userFullName) {
      navigate("/cart");
    } else {
      Swal.fire({
        icon: "error",
        title: "ابتدا باید وارد سایت شوید",
        confirmButtonText: "متوجه شدم",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  return (
    <div className="info">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12 info__wrapper">
            <div className="info__wrapper-header">
              <img src="/images/info/information.webp" alt="information" loading="lazy" />
              <h3 className="info__wrapper-h3">درباره ما</h3>
            </div>
            <ul className="info__list">
              <Link to={"/contact-us"}>
                <li>تماس با ما</li>
              </Link>
              <li>حریم خصوصی</li>
              <li>قوانین و خدمات</li>
              <li>شرایط نگهداری کالا</li>
              <li>رویه های بازگرداندن کالا</li>
              <li>ثبت شکایات</li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 info__wrapper">
            <div className="info__wrapper-header">
              <img src="/images/info/client.webp" alt="client" loading="lazy" />
              <h3 className="info__wrapper-h3">خدمات</h3>
            </div>
            <ul className="info__list">
              <Link to={"/service/installment-buying"}>
                <li>خرید قسطی</li>
              </Link>
              <Link to={"service/special-buy"}>
                <li>سفارش اختصاصی</li>
              </Link>
              <li>لوازم جانبی</li>
              <Link to={"service/blog"}>
                <li>مقالات</li>
              </Link>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 info__wrapper">
            <div className="info__wrapper-header">
              <img src="/images/info/dashboard_1.webp" alt="dashboard" loading="lazy" />
              <h3 className="info__wrapper-h3">حساب من</h3>
            </div>
            <ul className="info__list">
              <li role="button" onClick={goToCart}>
                سفارشات من
              </li>
              <li>اطلاعات شخصی</li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 info__wrapper">
            <div className="info__wrapper-header">
              <img src="/images/info/contacts.webp" alt="contacts" loading="lazy" />
              <h3 className="info__wrapper-h3">ارتباط با ما</h3>
            </div>
            <ul className="info__list">
              <li>شماره تماس پشتیبانی فروش : 55697714</li>
              <li>
                شعبه مرکزی : تهران، خیابان ۱۵ خرداد، بازار بزرگ، پاساژ ساعت،
                پلاک ۲{" "}
              </li>
              <li>
                شعبه سعادت آباد : تهران، شهرک غرب بلوار فرحزادی، میدان کتاب
                ابتدای بلوار کوهستان، مجتمع تجاری اُپال، طبقه ۲، پلاک 211
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SocialMedia />
    </div>
  );
}
export default Info;