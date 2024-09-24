// import React from "react";
import { useFormik } from "formik";
import FormInput from "../../components/FormInput/FormInput";
import * as yup from "yup";
import { notiValidation } from "../../common/notiValidation";
import { authService } from "../../services/auth.service";
import { useContext } from "react";
import { NotificationContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { handleNotification } = useContext(NotificationContext);
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        phone: "",
        birthday: "",
        gender: "",
        role: "USER",
      },
      onSubmit: (values) => {
        authService
          .signUp({ ...values })
          .then((res) => {
            console.log(res);
            handleNotification(
              "Account registered successfully. You will be redirected to login page.",
              "success"
            );
            setTimeout(() => {
              navigate(pathDefault.login), 2000;
            });
          })
          .catch((err) => {
            handleNotification(err.response.data.content, "error");
          });
      },
      validationSchema: yup.object({
        name: yup
          .string()
          .required(notiValidation.empty)
          .matches(/^[a-zA-ZÀ-ỹà-ỹ\s]+$/, notiValidation.notAllowNumber),
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
        phone: yup
          .string()
          .required(notiValidation.empty)
          .matches(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, notiValidation.phone),
        birthday: yup.string().required(notiValidation.empty),
        gender: yup.string().required(notiValidation.empty),
      }),
    });
  return (
    <div>
      <div className="py-5 border-b-2 text-center font-bold text-lg">
        Sign up
      </div>
      <h2 className="text-center font-bold text-xl">Welcome to Airbnb</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <FormInput
            contentLabel={"Full name"}
            classWrapper="w-1/2 p-5 p-5"
            placeholder={"Enter your name"}
            name={"name"}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.name}
            touched={touched.name}
          />
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
          <div className="w-1/2">
            <FormInput
              contentLabel={"Phone number"}
              classWrapper="p-5"
              placeholder={"Vietnam (+84)"}
              name={"phone"}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.phone}
              touched={touched.phone}
            />
            <div className="text-sm px-5">
              We’ll call or text you to confirm your number. Standard message
              and data rates apply.{" "}
              <span className="underline font-bold">Privacy Policy</span>
            </div>
          </div>

          <FormInput
            type="date"
            contentLabel={"Date of birth"}
            classWrapper="w-1/2 p-5"
            placeholder={"Enter your date of birth"}
            name={"birthday"}
            value={values.birthday}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.birthday}
            touched={touched.birthday}
          />
          <div className="p-5 w-1/2">
            <label className="block mb-2 text-sm font-medium">Gender</label>
            <select
              name="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Choose an option</option>
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
            {errors.gender && touched.gender ? (
              <p className="text-red-500">{errors.gender}</p>
            ) : null}
          </div>
          <button
            type="submit"
            className="py-2 bg-[#F1295D] text-white font-bold border rounded-md w-full"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
