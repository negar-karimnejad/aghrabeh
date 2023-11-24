import { Link } from "react-router-dom";
import "./HeaderIcons.css";

function HeaderIcons() {
  return (
    <div className="container">
      <div className="header-icons">
        <div className="row">
          <div className="col-6 col-lg-3">
            <Link
              to={"/service/blog/7-days-return-guarantee"}
              className="header-icon-link"
            >
              <img
                width={35}
                src="/images/header-icons/7dayreturn.png"
                alt="7dayreturn"
              />{" "}
              ۷ روز ضمانت بازگشت
            </Link>
          </div>
          <div className="col-6 col-lg-3">
            <Link
              to={"/service/blog/fast-posting"}
              className="header-icon-link"
            >
              <img
                width={45}
                src="/images/header-icons/fdelivery.png"
                alt="fdelivery"
              />
              ارسال رایگان و فوری{" "}
            </Link>
          </div>
          <div className="col-6 col-lg-3">
            <Link
              to={"/service/blog/goods-authenticity"}
              className="header-icon-link"
            >
              <img
                width={50}
                src="/images/header-icons/check.png"
                alt="authenticity"
              />
              ضمانت اصالت کالا{" "}
            </Link>
          </div>
          <div className="col-6 col-lg-3">
            <Link
              to={"/service/blog/expert-advice"}
              className="header-icon-link"
            >
              <img
                width={35}
                src="/images/header-icons/mraghrabeh.svg"
                alt="expert-advice"
              />{" "}
              مشاوره تخصصی
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderIcons;
