import { Link } from "react-router-dom";
import "./QuickSuggestions.css";

function QuickSuggestions() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-6">
          <Link to={"all-products/search/مردانه"} className="quick-suggestion__link">
            <div className="quick-suggestion__wrapper">
              <div className="quick-suggestion">
                <span className="quick-suggestion__circle"></span>
                <img
                  className="quick-suggestion__img"
                  width={200}
                  src="/images/quick-suggestions/mancircle.webp"
                  alt="men"
                />
              </div>
            </div>
            <p className="quick-suggestion__title">جستجوهای مردانه</p>
          </Link>
        </div>
        <div className="col-md-3 col-6">
          <Link className="quick-suggestion__link" to={"all-products/search/زنانه"}>
            <div className="quick-suggestion__wrapper">
              <div className="quick-suggestion">
                <span className="quick-suggestion__circle"></span>
                <img
                  className="quick-suggestion__img"
                  width={200}
                  src="/images/quick-suggestions/womancircle.webp"
                  alt="women"
                />
              </div>
            </div>
            <p className="quick-suggestion__title">جستجوهای زنانه</p>
          </Link>
        </div>
        <div className="col-md-3 col-6">
          <Link className="quick-suggestion__link" to={"all-products/search/ست"}>
            <div className="quick-suggestion__wrapper">
              <div className="quick-suggestion">
                <span className="quick-suggestion__circle"></span>
                <img
                  className="quick-suggestion__img"
                  width={200}
                  src="/images/quick-suggestions/setcircle.webp"
                  alt="set"
                />
              </div>
            </div>
            <p className="quick-suggestion__title">ساعت های ست</p>
          </Link>
        </div>
        <div className="col-md-3 col-6">
          <Link className="quick-suggestion__link" to={"all-products/search/هوشمند"}>
            <div className="quick-suggestion__wrapper">
              <div className="quick-suggestion">
                <span className="quick-suggestion__circle"></span>
                <img
                  className="quick-suggestion__img"
                  width={200}
                  src="/images/quick-suggestions/smartwatch.webp"
                  alt="smartwatch"
                />
              </div>
            </div>
            <p className="quick-suggestion__title">ساعت های هوشمند</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuickSuggestions;
