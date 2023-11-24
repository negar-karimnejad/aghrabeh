import "./EmptyBasket.css";

function EmptyBasket() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="cart__empty">
            <img src="/images/sad.svg" alt="Empty Cart" loading="lazy" />
            <div className="cart__empty-content">
              <p>سبد خرید شما خالی است</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyBasket;
