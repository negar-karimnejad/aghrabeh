import "./Banners.css";

function Banners() {
  return (
    <div className="container">
      <div className="banners">
        <div className="row">
          <div className="col-12">
            <img
              src="/images/banners/Timberland(1400-400).webp"
              alt="Timberland"
            />
          </div>
          <div className="col-12 col-sm-6">
            <img src="/images/banners/Laxmi(700x400)-PC.webp" alt="Laxmi" />
          </div>
          <div className="col-12 col-sm-6">
            <img src="/images/banners/ArrowW(700-400)PC.webp" alt="ArrowW" />
          </div>
          <div className="col-12">
            <img
              src="/images/banners/Casio(1400-400)AdBanner.gif"
              alt="Casio"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banners;
