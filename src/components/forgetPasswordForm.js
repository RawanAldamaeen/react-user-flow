import React from "react";
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { userForgetPassword } from "../store/userAction";
import { Field, Formik, Form } from "formik";
import * as yup from "yup";


const ForgetPasswordForm = () => {
  const isPass = useSelector((state) => state.user.pass);
  const errorMsg = useSelector((state) => state.user.err_msg);
  const dispatch = useDispatch();

  const ForgetPasswordValidation = yup.object().shape({
    email: yup.string().email().required(),
  });
  return (
    <div className="login d-flex align-items-center py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-7 mx-auto">
            <h3 className="display-4 mb-5">Forget Password</h3>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={ForgetPasswordValidation}
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
                  <button
                    onClick={() => dispatch(userForgetPassword(values))}
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-block mb-2 mt-3  rounded-pill shadow-sm"
                  >
                    Submit
                  </button>
                  <div className="text-center d-flex justify-content-between mt-4">
                    <p>
                      <Link to="/login" className="font-italic text-muted ml-2">
                        <u>Back to Login</u>
                      </Link>
                    </p>
                  </div>

                  {isPass ? (
                    <div className="alert alert-success" role="alert">
                      sucess
                    </div>
                  ) : errorMsg ? (
                    <div className="alert alert-danger" role="alert" key={errorMsg.type}>
                      {errorMsg[0].error}
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

export default ForgetPasswordForm;
