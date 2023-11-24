import { ImMobile } from "react-icons/im";
import { BsFolder2 } from "react-icons/bs";
import { AiFillPicture } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AiOutlineCloud } from "react-icons/ai";
import { useState } from "react";
import "./SpecialBuy.css";

function SpecialBuy() {
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneWarn, setPhoneWarn] = useState(false);
  const [fullnameWarn, setFullnameWarn] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [successPosted, setSuccessPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fullnameValue = (e) => {
    setFullname(e.target.value);
    if (fullname) {
      setFullnameWarn(false);
    } else {
      setFullnameWarn(true);
    }
  };

  const phoneValue = (e) => {
    setPhone(e.target.value);
    if (phone) {
      setPhoneWarn(false);
    } else {
      setPhoneWarn(true);
    }
  };

  const firstSubmitHandler = () => {
    if (phone.length === 11) {
      setPhoneWarn(false);
    } else {
      setPhoneWarn(true);
    }

    if (fullname.length >= 3) {
      setFullnameWarn(false);
    } else {
      setFullnameWarn(true);
    }

    if (phone.length === 11 && fullname.length >= 3) {
      setStepOne(false);
      setStepTwo(true);
    }
  };
  const secondSubmitHandler = () => {
    setStepTwo(false);
    setStepThree(true);
  };

  const thirdSubmitHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSuccessPosted(true);
    }, 3000);
  };

  const secondBackButton = () => {
    setStepOne(true);
    setStepTwo(false);
    setStepThree(false);
  };

  const thirdBackButton = () => {
    setStepTwo(true);
    setStepThree(false);
  };

  return (
    <>
      {successPosted && (
        <div className="posted-overly">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-6">
                <div className="posted-overly__wrapper">
                  <img src="/images/success.svg" width={60} alt="success" />
                  <h4>سفارش شما با موفقیت ثبت شد</h4>
                  <p>
                    کارشناسان عقربه پس از بررسی سفارش شما نتیجه را به اطلاع شما
                    خواهند رساند.
                  </p>
                  <Link to={"/"}>
                    <button>بازگشت به صفحه اول</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!successPosted && (
        <div className="special-buy">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <div className="col-12 col-md-10 special-buy__col">
                  <img
                    src="/images/SPACIALOFFER.svg"
                    alt="SPACIALOFFER"
                    loading="lazy"
                  />
                  <h2>سفارش اختصاصی عقربه</h2>
                  <p className="special-buy__caption">
                    اگر دنبال یک ساعت اصل از یه برند خاص و کمیاب در ایران هستید،
                    می توانید از سرویس سفارش اختصاصی عقربه استفاده کنید . ما پس
                    از بررسی و هماهنگی در سطح ایران و جهان، ساعت مد نظر را تهیه
                    کرده و به شما تحویل میدهیم. بدیهیست که ضمانت اصل بودن مثل
                    همیشه همراه عقربه است.
                  </p>
                  <div className="special-buy__step-form">
                    <div className="special-buy__wrapper step-one">
                      <div className="special-buy__icon green-bg-color">
                        <ImMobile className="text-white" />
                      </div>
                      <p className="green-color">اطلاعات تماس</p>
                      <i className="special-buy__wrapper-before green-bg-color"></i>
                    </div>
                    <div className="special-buy__wrapper step-two">
                      <div
                        className={`${
                          stepTwo || stepThree ? "green-bg-color" : ""
                        } special-buy__icon`}
                      >
                        <BsFolder2
                          className={`${
                            stepTwo || stepThree ? "text-white" : ""
                          } `}
                        />
                      </div>
                      <p
                        className={`${
                          stepTwo || stepThree ? "green-color" : ""
                        }`}
                      >
                        مشخصات ساعت
                      </p>
                      <i
                        className={`${
                          stepTwo || stepThree ? "green-bg-color" : ""
                        } special-buy__wrapper-before`}
                      ></i>
                    </div>

                    <div className="special-buy__wrapper step-three">
                      <div
                        className={`${
                          stepThree ? "green-bg-color" : ""
                        } special-buy__icon`}
                      >
                        <AiFillPicture
                          className={`${stepThree ? "text-white" : ""} `}
                        />
                      </div>
                      <p className={`${stepThree ? "green-color" : ""}`}>عکس</p>
                      <i
                        className={`${
                          stepThree ? "green-bg-color" : ""
                        } special-buy__wrapper-before `}
                      ></i>
                    </div>
                  </div>
                  <div className="special-buy__info">
                    {stepOne && (
                      <>
                        <div className="row special-buy__forms">
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <h4>اطلاعات تماس</h4>
                            <p className="my-3">
                              یک شماره تماس در دسترس و همچنین نام و نام خانوادگی
                              خود را وارد کنید تا عقربه بتونه خیلی راحت باهاتون
                              ارتباط برقرار کنه
                            </p>
                          </div>
                          <form
                            action=""
                            className="special-buy__form col-10 col-lg-4"
                          >
                            <label htmlFor="">
                              شماره تماس خود را وارد کنید*
                            </label>
                            <input
                              type="number"
                              placeholder="به عنوان مثال: 09123456789"
                              className="persian-font special-buy__phone-input"
                              required
                              onChange={phoneValue}
                            />
                            {phoneWarn && (
                              <i>لطفا شماره تماس خود را به درستی وارد کنید</i>
                            )}
                          </form>
                          <form
                            action=""
                            className="special-buy__form col-10 col-lg-4"
                          >
                            <label htmlFor="">
                              نام و نام خانوادگی خود را وارد کنید
                            </label>
                            <input
                              type="text"
                              className="special-buy__fullname-input"
                              onChange={fullnameValue}
                            />
                            {fullnameWarn && (
                              <i>
                                لطفا نام و نام خانوادگی خود را به درستی وارد
                                کنید
                              </i>
                            )}
                          </form>
                        </div>
                        <div className="row w-100">
                          <div className="col-12 special-buy__buttons">
                            <Link to={"/"}>
                              <button className="col-5 mx-2 special-buy__back-button">
                                بازگشت به صفحه اول
                              </button>
                            </Link>
                            <button
                              onClick={firstSubmitHandler}
                              className="col-5 mx-2 special-buy__forward-button"
                            >
                              ادامه
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    {stepTwo && (
                      <>
                        <div className="row special-buy__forms">
                          <h4>مشخصات سفارش درخواستی</h4>
                          <form action="" className="special-buy__form col-12">
                            <input
                              type="text"
                              placeholder="مدل ساعت درخواستی خود را وارد کنید"
                              className="w-100 border-secondary rounded-2"
                            />
                          </form>
                          <form action="" className="special-buy__form col-12">
                            <textarea
                              rows={4}
                              className="w-100 p-3 fs-4 rounded-2"
                              placeholder="توضیحات تکمیلی"
                            ></textarea>
                          </form>
                        </div>
                        <div className="row w-100">
                          <div className="col-12 special-buy__buttons">
                            <button
                              className="col-5 mx-2 special-buy__back-button"
                              onClick={secondBackButton}
                            >
                              بازگشت{" "}
                            </button>
                            <button
                              onClick={secondSubmitHandler}
                              className="col-5 mx-2 special-buy__forward-button"
                            >
                              ادامه
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    {stepThree && (
                      <>
                        <div className="row special-buy__forms">
                          <h4>عکس ساعت</h4>
                          <p className="w-100 special-buy__step-third-p">
                            عکس ساعت مورد نظرتان را برای عقربه بارگذاری کنید تا
                            سریعا سفارش شما پیگیری شود
                          </p>
                          <button className="special-buy__step-upload-button">
                            <input type="file" />
                            <AiOutlineCloud className="fs-1" /> بارگذاری فایل
                          </button>
                        </div>
                        <div className="row w-100 mb-5">
                          <div className="col-12 special-buy__buttons">
                            <button
                              className="col-5 mx-2 special-buy__back-button"
                              onClick={thirdBackButton}
                            >
                              بازگشت{" "}
                            </button>
                            <button
                              onClick={thirdSubmitHandler}
                              className="col-5 mx-2 special-buy__forward-button"
                            >
                              {isLoading ? "...Loading" : "ارسال"}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <strong>Powered by aghrabeh</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SpecialBuy;
