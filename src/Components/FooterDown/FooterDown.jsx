import { Link } from "react-router-dom";
import "./FooterDown.css";

function FooterDown() {
  return (
    <div className="footer-down">
      <h1>فروشگاه اینترنتی گالری ساعت عقربه</h1>
      <p>
        گالری ساعت عقربه با 40 سال تجربه در فروش ساعت های اصل و اورجینال نامی
        شناخته شده در بازار ساعت مچی ایران می باشد. <br />
        عقربه دارای نمایندگی بیش از سی برند مطرح روز دنیا و تنوعی بالغ بر 5000
        مدل ساعت مچی اصل و اورجینال در تمامی رنج های قیمتی از بهترین مقصد های
        شما برای خرید ساعت مچی می باشد. همچنین شما می توانید از مشاوره تخصصی و
        رایگان مستر عقربه برای یک خرید راحت و اسان بهره ببرید.
      </p>
      <div className="footer-down__enamadbox">
        <img
          src="/images/footer/logo-atehadie.webp"
          alt="atehadie"
          loading="lazy"
        />
        <Link to={"https://enamad.ir/"} target="_blank">
          <img src="/images/footer/enamad.webp" alt="enamad" loading="lazy" />
        </Link>
      </div>
    </div>
  );
}

export default FooterDown;
