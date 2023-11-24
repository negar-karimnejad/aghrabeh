import { Link } from "react-router-dom";
import "./LastArticles.css";
import Button from "../Button/Button";

function LastArticles() {
  return (
    <div className="last-articles">
      <div className="container">
        <div className="row">
          <div className="col-12 last-articles__header">
            <h3>آخرین مقالات</h3>
            <Link to={"/service/blog"}>
              <Button />
            </Link>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-lg-4 col-sm-6 col-12 mt-5">
                <div className="card">
                  <img
                    className="last-articles__card-img"
                    src="/images/articles/LaxLaxmi.webp"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">بررسی برند ساعت لاکسمی</h5>
                    <Link
                      to={`/service/blog/بررسی برند ساعت لاکسمی`}
                      className="card-link"
                    >
                      مشاهده مطلب
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12 mt-5">
                <div className="card">
                  <img
                    className="last-articles__card-img"
                    src="/images/articles/GSHOCK.webp"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      مزایا و معایب ساعت های جی شاک
                    </h5>
                    <Link to={"/service/blog"} className="card-link">
                      مشاهده مطلب
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12 mt-5">
                <div className="card">
                  <img
                    className="last-articles__card-img"
                    src="/images/articles/BLOG.webp"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      نگاهی کلی به ساعت هوشمند ارو واچ
                    </h5>
                    <Link to={"/service/blog"} className="card-link">
                      مشاهده مطلب
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastArticles;
