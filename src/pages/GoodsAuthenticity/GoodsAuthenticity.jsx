import { Link } from "react-router-dom";
import BlogButtons from "../../Components/BlogButtons/BlogButtons";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Header from "../../Components/Header/Header";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import Info from "../../Components/Info/Info";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";
import "./GoodsAuthenticity.css";

function GoodsAuthenticity() {
  return (
    <div className="goods-authenticity">
      <Header />
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "ضمانت اصالت کالا در گالری ساعت عقربه",
            to: "/service/blog/goods-authenticity",
          },
        ]}
      />
      <HeaderIcons />
      <div className="container ">
        <div className="row goods-authenticity__row">
          <div className="col-lg-8 col-12">
            <div className="goods-authenticity__content">
              <img
                src="/images/zemesalat.webp"
                alt="zemesalat"
                loading="lazy"
              />
              <div>
                <strong>ضمانت اصالت کالا در گالری ساعت عقربه</strong>
                <h4>
                  عقربه ضمانت اصالت کالا را چگونه برای مشتریان خود اثبات می‌کند؟
                </h4>
                <p>
                  اولین نکته‌ای که به آن تاکید می‌کنیم، این است که هر مشتری با
                  خرید هر نوع ساعت مچی چه به صورت حضوری و یا به صورت آنلاین از
                  گالری ساعت عقربه فاکتوری دریافت می‌کند که روی آن مهر ضمانت
                  اصالت کالا خورده و در صورت اثبات غیر اصل بودن ساعت می‌توان آن
                  را مرجوع کرد. <br /> مسئله دوم نمایندگی رسمی و مجوز ما از
                  اتحادیه ساعت می‌باشد که کاملا قابل استعلام از مراجع مربوط
                  می‌باشد. <br />
                  ((ما برندی که از شرکت وارد کننده، خدمات پس از فروش، نمایندگی
                  رسمی و کیفیت ساخت مدل‌های آن مطمئن نباشیم را در مجموعه خود کار
                  نمی‌کنیم و نخواهیم کرد)) <br />
                  نکته‌ی سوم و قابل تامل برای مشتریان فروشگاه‌های اینترنتی داشتن
                  نماد الکترونیک مربوط به آن سایت می باشد که معمولاً در انتهای
                  سایت قابل مشاهده است و با کلیک روی آن اطلاعات مربوط به صاحبان
                  فروشگاه در سایت اینماد قابل مشاهده است.
                </p>
                <h4>قیمت‌ها در عقربه چگونه است؟</h4>
                <p>
                  چیزی که برای عقربه بسیار مهم است فروش، طبق لیست قیمت شرکت و
                  نمایندگی آن برند در ایران می‌باشد. این مسئله هم موجب رضایت
                  خاطر مشتری خواهد شد و هم باعث پایدار بودن قیمت‌ها در تمامی
                  مجموعه سایت وشعب گالری ساعت عقربه می‌شود. <br />
                  <i className="fw-bold">
                    ((ما قیمت غیر واقعی ارائه نمی‌دهیم که بخواهیم تخفیف غیر
                    واقعی بدهیم))
                  </i>{" "}
                  <br />
                  یکی از دلایلی که عقربه از بهترین مقصد‌های خرید ساعت مچی با
                  ضمانت اصالت کالا می‌باشد این است که ما سال‌هاست در این صنف
                  فعالیت می‌کنیم و دارای فروشگاه‌های حضوری هستیم که این مسئله
                  باعث اعتماد بیشتر مشتریان ما شده است.
                </p>
                <h4>ساعت را با چه جعبه‌ای برای ما ارسال می‌کنید؟</h4>
                <p>
                  کلاً این سوال از پایه غلط است برای اینکه هر ساعت اورجینال و
                  دارای ضمانت اصالت، جعبه و مشخصات مربوط به خودش را دارد. این
                  مسئله مربوط به فروش ساعت های فیک و تقلبی که ضمانت اصالت کالا
                  ندارند می‌باشد. که به مشتری پیشنهاد جعبه‌های لوکس‌تر با
                  قیمت‌های بالاتر را می‌دهند. شما در صورت خرید از گالری ساعت
                  عقربه، ساعت را با ضمانت اصالت و تمامی متعلقاتش دریافت می‌کنید.
                </p>
                <Link
                  to={"/"}
                  className="return-guarantee__cyan-color d-block mt-5 fs-4 w-25"
                >
                  ضمانت اصالت کالا
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollUp />
      <Info />
      <FooterDown />
      <Footer />
      <Whatsapp />
    </div>
  );
}

export default GoodsAuthenticity;
