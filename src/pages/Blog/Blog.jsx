import Header from "../../Components/Header/Header";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import Info from "../../Components/Info/Info";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Footer from "../../Components/Footer/Footer";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import { Link } from "react-router-dom";
import "./Blog.css";

function Blog() {
  const blogs = [
    {
      id: 1,
      src: " /images/blog/GSHOCK.webp",
      alt: "GSHOCK",
      title: "مزایا و معایب ساعت های جی شاک",
      caption:
        "ساعت‌های جی شاک یکی از محبوب‌ترین و پرفروش‌ترین ساعت‌های دیجیتال در جهان هستند. در این مقاله به بررسی مزایا و معایب خرید ساعت جی شاک خواهیم پرداخت.",
    },
    {
      id: 2,
      src: " /images/blog/BLOG.webp",
      alt: "arrow-watch",
      title: "نگاهی کلی به ساعت هوشمند ارو واچ",
      caption:
        "برند ارو واچ (Arrow Watch) یکی از برندهای جوان و نوظهور در صنعت ساعت هوشمند است که در سال ۲۰۱۹ تاسیس شده است. این برند با طراحی ساده و زیبا، امکانات کاربردی و کیفیت بالا، توانسته است در بازار ساعت‌های",
    },
    {
      id: 3,
      src: " /images/blog/2-2.webp",
      alt: "men-or-women",
      title: "تفاوت ساعت مچی زنانه و مردانه",
      caption:
        "مشتریان گاهی موقع خرید ساعت مچی به به این شک می افتند که آیا ساعتی که در حال خرید ان هستند مردانه است یا زنانه. ما در این مطلب کار کار شما رو راحت کردیم تا یک خرید راحت رو داشته",
    },
    {
      id: 4,
      src: " /images/blog/AGH-Logo.webp",
      alt: "solar",
      title: "زیر نور خورشید با ساعت جی شاک سولار",
      caption:
        " فکر کنید یک ساعت دارید که هم جی شاکه هم سولاره. این یعنی یک عمر ساعت. ساعت هایی که با این تکنولوژی کار می کنند مزیت های جالبی دارند که می توانید در اینجا مطالعه کنید.",
    },
  ];
  return (
    <>
      <div className="blog__container">
        <Header />
        <Breadcrumb
          links={[
            { id: 1, title: "خدمات", to: "/service" },
            { id: 2, title: "مقالات", to: "/service/blog" },
          ]}
        />
        <HeaderIcons />
        <div className="container">
          <div className="row gap-5 justify-content-lg-between">
            <div className="col-12">
              <div className="blog d-flex flex-lg-row flex-column">
                <Link to={`/service/blog/بررسی برند ساعت لاکسمی`}>
                  <img src="/images/blog/LaxLaxmi.webp" alt="LaxLaxmi" />
                </Link>
                <div className="px-4 d-lg-flex flex-lg-column align-items-lg-start">
                  <h4>بررسی برند ساعت لاکسمی</h4>
                  <p>
                    لاکسمی یکی از برندهای مطرح و نوپا صنعت ساعت سازی است که در
                    سال 2017 تأسیس شد. این برند، ساعت های بسیار زیبا و با کیفیتی
                    را برای مردان و زنان تولید می کند. در این مقاله نگاهی جامع و
                    کلی به این برند و ارائه ان در ایران می پردازیم.
                  </p>
                  <Link to={`/service/blog/بررسی برند ساعت لاکسمی`}>
                    <button>ادامه مطلب...</button>
                  </Link>
                </div>
              </div>
            </div>
            {blogs.map((blog) => (
              <div className="col-12 col-lg-5 flex-grow-1" key={blog.id}>
                <div className="flex-lg-row flex-column blog d-flex align-items-lg-center">
                  <Link to={""}>
                    <img src={blog.src} alt={blog.alt} loading="lazy" />
                  </Link>
                  <div className="col-12 col-lg-8 px-4 d-lg-flex flex-lg-column align-items-lg-start">
                    <h4>{blog.title}</h4>
                    <p>{blog.caption}</p>
                    <button>ادامه مطلب...</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ScrollUp />
        <Info />
        <FooterDown />
        <Footer />
        <Whatsapp />
      </div>
    </>
  );
}
export default Blog;
