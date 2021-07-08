import React from "react";
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { userRegister } from "../store/userAction";
import { Field, Formik, Form } from "formik";
import * as yup from "yup";

const RegisterForm = () => {
  const isAccapted = useSelector((state) => state.user.signed);
  const errorMsg = useSelector((state) => state.user.err_msg);
  const dispatch = useDispatch();

  const RegisterValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters")
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
    username: yup
      .string()
      .required()
      .matches(
        /^[-\w\.\$@\*\!]{5,20}$/,
        "usernamemust be between 5 and 20, and cannot have spaces"
      ),
    phone: yup
      .string()
      .required()
      .matches(/^[+]\d{10,12}$/, "uncorrect phone number")
      .min(10)
      .max(13),
  });

  return (
    <div className="login d-flex align-items-center py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-7 mx-auto">
            <h3 className="display-4 mb-5">Register</h3>
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
                username: "",
                phone: "+20",
              }}
              validationSchema={RegisterValidation}
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
                <Form>
                  <div className="form-group mb-3">
                    <label className="mb-2 pl-2"> Email: </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder={"someone@email.com"}
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
                  <div className="form-group mb-3">
                    <label className="mb-2 pl-2"> Confirm Password: </label>
                    <Field
                      type="Password"
                      name="confirmPassword"
                      placeholder="confirm Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                      className={
                        !errors.confirmPassword && touched.confirmPassword
                          ? "border border-success form-control rounded-pill shadow-sm px-4"
                          : errors.confirmPassword && touched.confirmPassword
                          ? "border border-danger form-control rounded-pill shadow-sm px-4"
                          : "form-control rounded-pill shadow-sm px-4"
                      }
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <small className="text-danger p-1">
                        {errors.confirmPassword}
                      </small>
                    ) : (
                      " "
                    )}{" "}
                  </div>
                  <div className="form-group mb-3">
                    <label className="mb-2 pl-2"> Username: </label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      className={
                        !errors.username && touched.username
                          ? "border border-success form-control rounded-pill shadow-sm px-4"
                          : errors.username && touched.username
                          ? "border border-danger form-control rounded-pill shadow-sm px-4"
                          : "form-control rounded-pill shadow-sm px-4"
                      }
                    />
                    {errors.username && touched.username ? (
                      <small className="text-danger p-1">
                        {errors.username}
                      </small>
                    ) : (
                      " "
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label className="mb-2 pl-2"> Phone Number: </label>
                    <Field
                      id="phone"
                      type="tel"
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      className={
                        !errors.phone && touched.phone
                          ? "border border-success form-control rounded-pill shadow-sm px-4"
                          : errors.phone && touched.phone
                          ? "border border-danger form-control rounded-pill shadow-sm px-4"
                          : "form-control rounded-pill shadow-sm px-4"
                      }
                    />
                    {errors.phone && touched.phone ? (
                      <small className="text-danger p-1">{errors.phone}</small>
                    ) : (
                      " "
                    )}
                  </div>

                  <button
                    onClick={() => dispatch(userRegister(values))}
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-block mb-2 mt-3  rounded-pill shadow-sm"
                  >
                    {!isSubmitting ? "Register" : "loading..."}
                  </button>
                  <div className="text-center d-flex justify-content-between mt-4">
                    <p>
                      Alredy have account?
                      <Link to="/login" className="font-italic text-muted ml-2">
                        <u>Login</u>
                      </Link>
                    </p>
                  </div>
                  {isAccapted ? (
                    <div className="alert alert-success" role="alert">
                      sucess
                    </div>
                  ) : errorMsg ? (
                    <div>
                      {errorMsg.map((error) => (
                        <div
                          className="alert alert-danger"
                          role="alert"
                          key={error.type}
                        >
                          {error.error}
                        </div>
                      ))}
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

export default RegisterForm;
