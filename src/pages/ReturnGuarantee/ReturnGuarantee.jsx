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
import "./ReturnGuarantee.css";

function ReturnGuarantee() {
  return (
    <div className="return-guarantee">
      <Header />
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "۷ روز ضمانت بازگشت",
            to: "/service/blog/7-days-return-guarantee",
          },
        ]}
      />
      <HeaderIcons />
      <div className="container ">
        <div className="row return-guarantee__row">
          <div className="col-lg-8 col-12">
            <div className="return-guarantee__content">
              <img src="/images/7rooz.webp" alt="7rooz" loading="lazy" />
              <div>
                <strong>۷ روز ضمانت بازگشت</strong>
                <h4>۷ روز ضمانت بازگشت</h4>
                <p>
                  جمله معروف نصب شده در برخی فروشگاه‌ها شاید در خاطر خیلی از شما
                  مانده باشد که نوشته " لطفا در انتخاب خود دقت کنید ، جنس فروخته
                  شده پس گرفته نخواهد شد." <br /> چرا این جمله انرژی منفی همراه
                  خود دارد به جنبه‌های روانشناختی برمی‌گردد که از موضوع بحث ما
                  خارج است. اما در گالری ساعت عقربه چنین چیزی هرگز وجود ندارد .
                  ما به مشتریان خود این امکان را می‌هیم که حتی اگر بعد از خرید
                  در صورت وجود خط و خش بر روی شیشه یا بدنه ساعت و یا وجود ایراد
                  فنی در موتور ساعت بتوانند با ساعت را مرجوع و یا با مدلی دیگر
                  که مورد پسند ایشان است تعویض کنند. این امکان تنها مختص خرید
                  غیرحضوری نمی‌باشد حتی در خرید حضوری نیز این ضمانت بازگشت وجود
                  دارد و می‌توانید محصول را در صورت وجود ایرادهایی که در زیر به
                  آن‌ها اشاره می‌کنیم تا 7 روز پس از خرید مرجوع یا تعویض کنید.
                </p>
                <h4>۷ روز ضمانت بازگشت شامل چه مواردی می‌شود؟</h4>
                <p>
                  1- ایراد ظاهری (شکستگی و خط ) <br /> 2- مشکل فنی در موتور ساعت{" "}
                  <br />
                  3- مشکل فنی در عملکردهای مختلف ساعت <br />
                  4- در صورتی که محصول ارسال شده برای خریدار با ساعت خریداری شده
                  مغایرت داشته باشد. (دقت داشته باشید گاهی عکس های محصول تفاوت
                  های جزئی با واقعیت دارد ، برای همین می توانید از پشتیبانی
                  کارشناسان مستر عقربه استفاده کنید )
                </p>
                <h4 className="return-guarantee__cyan-color">
                  آیا این همان ضمانت اصلی ساعت است؟
                </h4>
                <p>
                  خیر، ضمانت بازگشت برای تمامی ساعت‌ها وجود دارد و فقط از طرف
                  گالری ساعت عقربه است و با ضمانت اصلی کالا که در کارت گارانتی
                  قید شده ، متفاوت است . ضمانتی که از طریق کارت گارانتی به ساعت
                  تعلق می‌گیرد معمولا 12 ماهه ، 24 ماهه یا 36 ماهه هستند و شامل
                  مواردی از گارانتی می‌شود که با موارد بالا متفاوت است .
                </p>
                <h4 className="return-guarantee__cyan-color">
                  آیا این ضمانت مخصوص شهر تهران است؟
                </h4>
                <p>
                  خیر ، 7 روز بازگشت کالا برای تمامی شهرهای ایران معتبر است و
                  فرقی نمی‌کند شما از کدام شهر از گالری ساعت عقربه خرید می‌کنید
                  . از تمامی نقاط کشور ضمانت بازگشت به مدت 7 روز ساعت‌مچی
                  خریداری شده قابلیت تعویض و مرجوع شدن راداراست.
                  <br /> نکته : در تمامی مراحل در خواست بازگشت یا تعویض محصول
                  ،مشتری باید با کارشناسان ما در ارتباط باشد و موارد درخواستی از
                  ایشان را برای کارشناس ارسال کنند .
                </p>
                <Link
                  to={"/"}
                  className="return-guarantee__cyan-color d-block mt-5 fs-4 w-25"
                >
                  ۷روز ضمانت بازگشت
                </Link>
                <BlogButtons />
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

export default ReturnGuarantee;
