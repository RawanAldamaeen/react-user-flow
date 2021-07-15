import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userVerifyCode, userForgetPassword } from "../store/userAction";
import { Field, Formik, Form } from "formik";
import * as yup from "yup";

const VerificationCodeForm = () => {
  const isPass = useSelector((state) => state.user.pass);
  const errorMsg = useSelector((state) => state.user.err_msg);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const resend = {
    email: localStorage.getItem("email"),
  };

  if (isPass) {
    localStorage.setItem("code", token);
  }

  const verificationCodeValidation = yup.object().shape({
    code: yup.string().required().length(10),
  });
  
  return (
    <div className="login d-flex align-items-center py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-7 mx-auto">
            <h3 className="display-4 mb-5">Verify Code</h3>
            <Formik
              initialValues={{ code: "" }}
              validationSchema={verificationCodeValidation}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              }) => (
                <Form>
                  <div className="form-group mb-3">
                    <label className="mb-2 pl-2"> Code: </label>
                    <Field
                      type="code"
                      name="code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.code}
                      className={
                        !errors.code && touched.code
                          ? "border border-success form-control rounded-pill shadow-sm px-4"
                          : errors.code && touched.code
                          ? "border border-danger form-control rounded-pill shadow-sm px-4"
                          : "form-control rounded-pill shadow-sm px-4"
                      }
                    />
                    {errors.code && touched.code ? (
                      <small className="text-danger p-1">{errors.code}</small>
                    ) : null}
                  </div>
                  <button
                    onClick={() => dispatch(userVerifyCode(values))}
                    type="submit"
                    disabled={!values.code}
                    className="btn btn-primary btn-block mb-2 mt-3  rounded-pill shadow-sm"
                  >
                    Submit
                  </button>
                  <div className="text-center d-flex justify-content-between mt-4"></div>

                  {isPass && token ? (
                    <Redirect to="/forgetPassword/reset" />
                  ) : isPass ? (
                    <div className="alert alert-success" role="alert">
                      Resend email successfuly
                    </div>
                  ) : errorMsg ? (
                    <div className="alert alert-danger" role="alert">
                      {errorMsg}
                    </div>
                  ) : null}
                </Form>
              )}
            </Formik>
            <p> Didn't recive email? 
              <Link
                className="font-italic text-muted ml-2"
                onClick={() => dispatch(userForgetPassword(resend))}
              >
                <u>Resend</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodeForm;
