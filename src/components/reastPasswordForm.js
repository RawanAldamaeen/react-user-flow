import React from "react";
import {Redirect} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { userResetPassword } from "../store/userAction";
import { Field, Formik, Form } from "formik";
import * as yup from "yup";

const ReastPasswordForm = () => {
  const isPass = useSelector((state) => state.user.reset);
  const errorMsg = useSelector((state) => state.user.err_msg);
  const dispatch = useDispatch();

  const ReastPasswordValidation = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters")
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
  });

  return (
    <div className="login d-flex align-items-center py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-7 mx-auto">
            <h3 className="display-4 mb-5">Reset Password</h3>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={ReastPasswordValidation}
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

                  <button
                    onClick={() => dispatch(userResetPassword(values))}
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-block mb-2 mt-3  rounded-pill shadow-sm"
                  >
                    {!isSubmitting ? "Reset Password" : "loading..."}
                  </button>
                  {isPass ? (
                    <Redirect to="/login" />
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

export default ReastPasswordForm;

