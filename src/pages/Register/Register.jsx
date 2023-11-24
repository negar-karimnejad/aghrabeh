import { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RiLoader2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validateFullName = (value) => {
    let errorMessage;
    if (!value) {
      errorMessage = "نام و نام خانوادگی ضروری است";
    } else if (value.length < 3 || value.length > 24) {
      errorMessage = "نام و نام خانوادگی باید بین 10 تا 24 کاراکتر باشد";
    }
    return errorMessage;
  };
  const validatePhone = (value) => {
    let errorMessage;
    if (!value) {
      errorMessage = "شماره تماس ضروری است";
    } else if (isNaN(value)) {
      errorMessage = "شماره تماس فقط باید شامل اعداد باشد";
    } else if (value.length !== 11) {
      errorMessage = "لطفا شماره تماس خود را به درستی وارد نمایید";
    }
    return errorMessage;
  };
  const validateEmail = (value) => {
    let errorMessage;
    if (!value) {
      errorMessage = "ایمیل ضروری است";
    }
    return errorMessage;
  };

  const validatePassword = (value) => {
    let errorMessage;
    if (!value) {
      errorMessage = "رمز عبور ضروری است";
    } else if (value.length < 7) {
      errorMessage = "رمز عبور باید بیشتر از 7 کاراکتر باشد";
    }
    return errorMessage;
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          fullName: values.fullName,
          phone: values.phone,
        },
      },
    });
    if (data) {
      setIsLoading(false);
    }
    if (error) {
      console.log("Error registering user:", error.message);
      return;
    }
    console.log("User registered successfully:", data);
    Swal.fire({
      icon: "success",
      title: "ثبت نام با موفقیت انجام شد",
      confirmButtonText: "اوکی",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <div className="login">
      <div id="login-form">
        <BiRightArrowAlt
          className="login__back-icon"
          onClick={() => navigate(-1)}
        />
        <img className="login__logo" src="/images/logo.png" alt="logo" />{" "}
        <h2>ورود / ثبت نام</h2>
        <Formik
          initialValues={{
            fullName: "",
            phone: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <label htmlFor="fullName">نام و نام خانوادگی</label>
            <br />
            <Field id="fullName" name="fullName" validate={validateFullName} />
            <ErrorMessage name="fullName" id="form_email_id" component="div" />
            <label htmlFor="phone">شماره تماس</label>
            <br />
            <Field
              id="phone"
              name="phone"
              validate={validatePhone}
              placeholder="۰۹*********"
            />
            <ErrorMessage name="phone" id="form_email_id" component="div" />
            <label htmlFor="email">ایمیل</label>
            <br />
            <Field
              type="email"
              id="email"
              name="email"
              validate={validateEmail}
            />
            <ErrorMessage name="email" id="form_email_id" component="div" />
            <label htmlFor="password">رمز عبور</label>
            <br />
            <Field
              type="password"
              id="password"
              name="password"
              validate={validatePassword}
            />
            <ErrorMessage name="password" id="form_email_id" component="div" />
            <br />
            <button
              type="submit"
              className="d-flex justify-content-center align-items-center"
            >
              تایید
              {isLoading && <RiLoader2Fill className="loading" />}
            </button>
          </Form>
        </Formik>
        <div className="login__new-member">
          <span className="login__new-member-text">
            قبلا ثبت‌نام کرده‌اید؟{" "}
          </span>
          <Link className="login__new-member-link" to="/login">
            وارد شوید
          </Link>
        </div>
        <p>
          با ثبت نام در سایت گالری ساعت عقربه قوانین استفاده از خدمات سایت و
          حریم خصوصی آن را میپذیرید.
        </p>
      </div>
    </div>
  );
}

export default Register;
