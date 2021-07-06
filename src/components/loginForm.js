import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import * as yup from "yup";

const LoginForm = () => {
  const [EmailValid, setEmailValid] = useState({
    touched: false,
    isValid: false,
    errMsg: "",
  });

  const [passwordValid, setPasswordValid] = useState({
    touched: false,
    isValid: false,
    errMsg: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const checkEmailValidation = (event) => {
    let val = event.target.value.trim();
    let valid = { ...EmailValid };
    valid.touched = true;

    if (val.length <= 0) {
      valid.isValid = false;
    } else if (val.split(" ").length < 3) {
      valid.isValid = false;
    } else if (val.split(" ").length > 10) {
      valid.isValid = false;
    } else {
      valid.isValid = true;
      valid.errMsg = "";
    }
    setEmailValid({ ...valid });
  };
  const checkPasswordValidation = (event) => {
    let val = event.target.value.trim();
    let valid = { ...passwordValid };
    valid.touched = true;

    if (val.length <= 0) {
      valid.isValid = false;
    } else if (val.split(" ").length < 10) {
      valid.isValid = false;
    } else if (val.split(" ").length > 500) {
      valid.isValid = false;
    } else {
      valid.isValid = true;
      valid.errMsg = "";
    }
    setPasswordValid({ ...valid });
  };

  const handleSubmitForm = (values, { setSubmitting }) => {
    setIsLoading(true);
    console.log(values.email);
    console.log(values.password);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
    setIsLoading(false);
  };

  const LoginValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8, "Too Short!").max(16).required(),
  });
  return (
    <div className="login d-flex align-items-center py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-7 mx-auto">
            <h3 className="display-4 mb-5">Login</h3>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginValidation}
              onSubmit={handleSubmitForm}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="mb-2 pl-2"> Email: </label>
                    <Field
                      type="email"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      className={
                        !errors.email && touched.email
                          ? "border border-success form-control rounded-pill shadow-sm px-4"
                          : errors.email && touched.email
                          ? "border border-danger form-control rounded-pill shadow-sm px-4"
                          : "form-control rounded-pill shadow-sm px-4"
                      }
                    />
                    {errors.email && touched.email ? (
                      <small className="text-danger p-1">{errors.email}</small>
                    ) : (
                      " "
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label className="mb-2 pl-2"> Password: </label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      className={
                        !errors.password && touched.password
                          ? "border border-success form-control rounded-pill shadow-sm px-4"
                          : errors.password && touched.password
                          ? "border border-danger form-control rounded-pill shadow-sm px-4"
                          : "form-control rounded-pill shadow-sm px-4"
                      }
                    />
                    {errors.password && touched.password ? (
                      <small className="text-danger p-1">
                        {errors.password}
                      </small>
                    ) : (
                      " "
                    )}{" "}
                  </div>
                  <p>
                    <a href="#" className="font-italic text-muted">
                      <u>Forget Password?</u>
                    </a>
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-block mb-2 mt-3  rounded-pill shadow-sm"
                  >
                    {!isSubmitting ? "Login" : "loading..."}
                  </button>
                  <div className="text-center d-flex justify-content-between mt-4">
                    <p>
                      Don't have account?
                      <a href="#" className="font-italic text-muted ml-2">
                        <u>Sign up</u>
                      </a>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
