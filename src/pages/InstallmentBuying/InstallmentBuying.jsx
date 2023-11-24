import { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import FooterDown from "../../Components/FooterDown/FooterDown";
import Header from "../../Components/Header/Header";
import HeaderIcons from "../../Components/HeaderIcons/HeaderIcons";
import Info from "../../Components/Info/Info";
import ScrollUp from "../../Components/ScrollUp/ScrollUp";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import "./InstallmentBuying.css";

function InstallmentBuying() {
  const buttonsList = [
    {
      id: "count",
      title: "تعداد اقساط",
      content:
        "شما می توانید بسته به نیاز خودتون باز پرداخت مبلغ مورد نظر رو در  اقساط 3 یا 6 ماهه پرداخت کنید",
    },
    {
      id: "prepayment",
      title: "پیش پرداخت و میزان اعتبار",
      content:
        "حداقل میزان پیش پرداخت برای هر فاکتور در خرید قسطی 30 درصد از مبلغ کل می باشد . سپس می توانید تا مبلغ 20 میلیون تومان اعتبار خرید قسطی روی هر فاکتور دریافت کنید.",
    },
    {
      id: "profit",
      title: "سود و نوع پرداخت",
      content:
        "نوع پرداخت در حال حاضر فقط به صورت چک های صیادی (جدید) امکان پذیر می باشد که شرایط و قوانین مربوط به چک رو در پایین حتما مطالعه کنید. سود بازپرداخت 2.5 درصد برای هر ماه به ازای مبلغ اعتبار درخواست دریافت می شود.",
    },
  ];

  const [active, setActive] = useState("count");
  const [selected, setSelected] = useState(buttonsList[0]);
  const [factorPrice, setFactorPrice] = useState(15000000);
  const [installmentsCount, setInstallmentsCount] = useState(4);
  const roundedPrepayment =
    Math.round(Math.round(factorPrice / 3) / 1000) * 1000;
  const totalPayment =
    Number(installmentsCount) * 50000 +
    Number(factorPrice) +
    Math.round(Math.round(factorPrice / 30) / 1000) * 1000;
  const factor =
    Math.round((totalPayment - roundedPrepayment) / installmentsCount / 1000) *
    1000;

  const clickHandler = (e) => {
    setSelected(buttonsList.find((item) => item.id === e.target.id));
  };

  return (
    <div className="installment-buying">
      <Header />
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "خرید قسطی",
            to: "/service/installment-buying",
          },
        ]}
      />
      <HeaderIcons />
      <div className="container ">
        <div className="row">
          <div className="col-12">
            <div className="installment-buying__container">
              <h2>
                خرید قسطی عقربه{" "}
                <img width={50} src="/images/aghsat.png" alt="aghsat" />
              </h2>
              <p className="text-center">
                امروزه یکی از راه های کنترل هزینه ها در زندگی پرداخت انها به
                صورت اقساطی می باشد. به همین جهت بسیاری از فروشگاه ها و مراکز
                خدماتی امکان خرید درلحظه و پرداخت ان به صورت اقساطی را برای
                مشتریان خود فراهم کرده اند. گالری ساعت عقربه در راستای رفاه حال
                شما مشتریان عزیز امکان فروش قسطی را در مجموعه خود راه اندازی
                کرده.
              </p>
            </div>
          </div>
          <div className="col-12">
            <h5>محاسبه آنلاین خرید قسطی در گالری عقربه</h5>
          </div>
          <div className="col-md-6 col-12">
            <div className="installment-buying__container">
              <label for="customRange1">
                <h3>مبلغ فاکتور</h3>
                <i>
                  <i className="persian-font">
                    {Number(factorPrice).toLocaleString()}
                  </i>{" "}
                  تومان
                </i>
              </label>
              <input
                type="range"
                className="form-range"
                max={30000000}
                min={3000000}
                step={1000000}
                dir="ltr"
                value={factorPrice}
                onChange={(e) => setFactorPrice(e.target.value)}
              />
              <div className="installment-buying__price-range">
                <div>۳۰,۰۰۰,۰۰۰</div>
                <div>۳,۰۰۰,۰۰۰</div>
              </div>
              <div className="installment-buying__factor-price">
                <input
                  type="number"
                  className="persian-font"
                  value={factorPrice}
                  onChange={() => setFactorPrice(e.target.value)}
                />
                <i>تومان</i>
              </div>
              <div className="installment-buying__input-warning">
                <i>
                  <BsFillQuestionCircleFill />
                </i>
                مبلغ فاکتور باید بین ۳,۰۰۰,۰۰۰ تا ۳۰,۰۰۰,۰۰۰ تومان باشد!
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="installment-buying__container">
              <label for="customRange1">
                <h3>تعداد اقساط</h3>
                <i>
                  <i className="persian-font">{installmentsCount}</i> ماه
                </i>
              </label>
              <input
                type="range"
                className="form-range"
                max={6}
                min={3}
                dir="ltr"
                value={installmentsCount}
                onChange={(e) => setInstallmentsCount(e.target.value)}
              />
              <div className="installment-buying__price-range">
                <div>۶ ماه</div>
                <div>۳ ماه</div>
              </div>
              <div className="installment-buying__factor-price">
                <input
                  type="number"
                  className="persian-font"
                  value={installmentsCount}
                  onChange={() => setInstallmentsCount(e.target.value)}
                />
                <i>ماه</i>
              </div>
              <div className="installment-buying__input-warning">
                <i>
                  <BsFillQuestionCircleFill />
                </i>
                عدد انتخابی باید ۳ تا ۶ باشد!{" "}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="installment-buying__container py-4">
              <h3>نتیجه</h3>
              <div className="row installment-buying__result">
                <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-between justify-content-lg-center my-4">
                  <div className="mx-4">حداقل مبلغ پیش پرداخت</div>
                  <div>
                    <i className="persian-font">
                      {roundedPrepayment.toLocaleString()}
                    </i>{" "}
                    تومان
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-between justify-content-lg-center my-4">
                  <div className="mx-4">مبلغ هر قسط</div>
                  <div>
                    {" "}
                    <i className="persian-font">
                      {factor.toLocaleString()}
                    </i>{" "}
                    تومان
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-between justify-content-lg-center my-4">
                  <div className="mx-4">مجموع پرداختی ها</div>
                  <div>
                    {" "}
                    <i className="persian-font">
                      {totalPayment.toLocaleString()}
                    </i>{" "}
                    تومان
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="installment-buying__container">
              <h3>شرایط و امکانات</h3>
              <div
                className="col-lg-6 col-11 installment-buying__container-btns"
                onClick={clickHandler}
              >
                {buttonsList.map((button) => (
                  <button
                    key={button.id}
                    id={button.id}
                    onClick={() => setActive(button.id)}
                    className={active === button.id ? "active" : ""}
                  >
                    {button.title}
                  </button>
                ))}
              </div>
              <p>{selected.content}</p>
            </div>
          </div>
          <div className="col-12">
            <div className="installment-buying__container">
              <h3>قوانین و خدمات</h3>
              <ul>
                <li>
                  تمامی مراحل خرید قسطی از عقربه چه قصد خرید حضوری و چه اینترنتی
                  را دارید فقط از طریق کارشناس تلفنی انجام میشود. (شماره تماس
                  55697714)
                </li>
                <li>
                  حداقل مبلغ فاکتور جهت دریافت خرید قسطی 3 میلیون تومان می باشد.
                </li>
                <li>
                  در خرید قسطی به هیچ وجه امکان تعویض یا مرجوع کردن کالا وجود
                  ندارد.
                </li>
                <li>
                  هزینه اعتبار سنجی (10.000 تومان ) به عهده صاحب چک میباشد که به
                  صورت جداگانه دریافت می شود.
                </li>
                <li>
                  شماره موبایل و فاکتور فروش ثبت شده برای خرید قسطی حتما باید به
                  نام صاحب چک باشد.
                </li>
                <li>
                  پس از اعتبار سنجی ، تائید صلاحیت برای فروش قسطی کاملا برعهده
                  کارشناسان مجموعه گالری ساعت عقربه می باشد و پس از ان به شما
                  اطلاع داده می شود.
                </li>
                <li>
                  پس از سفارش قطعی و پرداخت پیش پرداخت حداکثر تا 48 ساعت برای
                  ارسال مدارک و چک ها فرصت هست . درصورت عدم هماهنگی و دیرکرد
                  بابت ارسال مدارک از جانب مشتری گالری ساعت عقربه حق ابطال سفارش
                  را دارا است.
                </li>
                <li>
                  مدارک مورد نیاز برای ارسال : <br />
                  <br />
                  الف ) چک صیادی جدید ( تعداد و مبلغ و تاریخ هر چک از طریق
                  کارشناس به شما اعلام می شود) <br />
                  <br />
                  نکته: روی هر چک باید این جمله نوشته شود (بابت خرید ساعت مچی){" "}
                  <br />
                  <br />
                  ب) کپی کارت ملی و شناسنامه صاحب چک <br />
                </li>
              </ul>
              <span>
                در صورت داشتن هرگونه سوال با ما تماس بگیرید <br /> 021-55697714
              </span>
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

export default InstallmentBuying;
