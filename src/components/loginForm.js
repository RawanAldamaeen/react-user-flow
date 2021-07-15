import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../store/userAction";
import { Field, Formik, Form } from "formik";
import * as yup from "yup";

const LoginForm = () => {
  const isLogged = useSelector((state) => state.user.logged);
  const errorMsg = useSelector((state) => state.user.err_msg);

  const dispatch = useDispatch();

  const LoginValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters")
      .required(),
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
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
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
                    ) : null}
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
                    ) : null}
                  </div>
                  <p>
                    <Link
                      to="/forgetPassword"
                      className="font-italic text-muted"
                    >
                      <u>Forget Password?</u>
                    </Link>
                  </p>
                  <button
                    onClick={() => dispatch(userLogin(values))}
                    type="submit"
                    className="btn btn-primary btn-block mb-2 mt-3  rounded-pill shadow-sm"
                  >
                    Login
                  </button>
                  <div className="text-center d-flex justify-content-between mt-4">
                    <p>
                      Don't have account?
                      <Link
                        to="/register"
                        className="font-italic text-muted ml-2"
                      >
                        <u>Sign up</u>
                      </Link>
                    </p>
                  </div>
                  {isLogged ? (
                    <Redirect to="/dashboard" />
                  ) : errorMsg ? (
                    <div className="alert alert-danger" role="alert">
                      {errorMsg}
                    </div>
                  ) : null}
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
