import React, { useContext } from "react";
import FormInput from "../../components/FormInput/FormInput";
import { authService } from "../../services/auth.service";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../App";
import { pathDefault } from "../../common/path";
import { notiValidation } from "../../common/notiValidation";
import * as yup from "yup";

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleNotification } = useContext(NotificationContext);
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        authService
          .signIn({ ...values })
          .then((res) => {
            console.log(res);
            handleNotification(
              "Signin successfully. You will be redirected to Airbnb Homepage.",
              "success"
            );
            setTimeout(() => {
              navigate(pathDefault.homePage), 2000;
            });
          })
          .catch((err) => {
            handleNotification(err.response.data.content, "error");
          });
      },
      validationSchema: yup.object({
        email: yup
          .string()
          .required(notiValidation.empty)
          .email(notiValidation.email),
        password: yup
          .string()
          .required(notiValidation.empty)
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            notiValidation.password
          ),
      }),
    });
  return (
    <div>
      <div className="py-5 border-b-2 text-center font-bold text-lg">
        Sign in
      </div>
      <h2 className="text-center font-bold text-xl">Welcome to Airbnb</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <FormInput
            contentLabel={"Email"}
            classWrapper="w-1/2 p-5"
            placeholder={"Enter your email"}
            name={"email"}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.email}
            touched={touched.email}
          />
          <FormInput
            type="password"
            contentLabel={"Password"}
            classWrapper="w-1/2 p-5"
            placeholder={"Enter your password"}
            name={"password"}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.password}
            touched={touched.password}
          />

          <button
            type="submit"
            className="py-2 bg-[#F1295D] text-white font-bold border rounded-md w-full"
          >
            Signin
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
