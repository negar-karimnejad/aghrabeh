import { BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import supabase from "../../config/supabaseClient";
import { Link } from "react-router-dom";
import { RiLoader2Fill } from "react-icons/ri";
import { useState } from "react";
import "./Login.css";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
      if (data) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "خوشحالیم که اینجایی :)",
        });
      }
      navigate(-1);
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
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
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
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
          <span className="login__new-member-text">کاربر جدید هستید؟ </span>
          <Link className="login__new-member-link" to="/register">
            ثبت نام
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
