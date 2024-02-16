import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// components
import Input from "../components/Input";
// images
import welcoemImage from "../assets/welcomePageImage.jpg";
import logos from "../assets/APP-LOGO-LIGHT.png";
// icons
import email from "../assets/icons/email.svg";
import password from "../assets/icons/password.svg";
import user from "../assets/icons/user.svg";
import profile from "../assets/profile.png";
import usersStore from "../stores/usersStore";
import { registerFormValidation } from "../helper/inputValidation";

interface FormValues {
  email: string;
  userName: string;
  password: string;
  profilePicture: File | null;
}

function RegistrationPage(): React.JSX.Element {
  const navigate = useNavigate();
  const store = usersStore();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      userName: "",
      password: "",
      profilePicture: null,
    },
    validate: registerFormValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("userName", values.userName);
      formData.append("password", values.password);
      formData.append("profilePicture", values.profilePicture || "");
      store.sendRegisterVerificationMail(formData, navigate);
    },
  });

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setValues({
      ...formik.values,
      profilePicture: e.target.files ? e.target.files[0] : null,
    });
  };

  return (
    <div className="RegistrationPage">
      <div className="welcome">
        <div className="welcomeImg">
          <img src={welcoemImage} alt="welcome image" />
        </div>
        <div className="welcomeText">
          <h2>Know where your money goes</h2>
          <p>
            Track your transaction easily with <br /> categories and financial
            report
          </p>
        </div>
      </div>
      <div className="formContainer">
        <div className="pageTitle">
          <div className="logo">
            <img src={logos} alt="" />
          </div>
          <h2>REGISTER</h2>
        </div>
        <form className="RegisterForm" onSubmit={formik.handleSubmit}>
          <div className="profile">
            <label htmlFor="profile">
              <img
                src={
                  formik.values.profilePicture
                    ? URL.createObjectURL(formik.values.profilePicture)
                    : profile
                }
                alt="avatar"
                className="profileImg"
              />
              <input
                type="file"
                name="profile"
                id="profile"
                onChange={onUpload}
              />
            </label>
          </div>
          <div className="inputs">
            <Input
              icon={user}
              type="text"
              field={formik.getFieldProps("userName")}
              placeholder="Username"
              required
            />
            <Input
              icon={email}
              type="email"
              placeholder="Email"
              field={formik.getFieldProps("email")}
              required
            />
            <Input
              icon={password}
              type="password"
              field={formik.getFieldProps("password")}
              placeholder="Password"
            />
          </div>
          <div className="inputCheckbox">
            <input
              type="checkbox"
              name="termsAndConditions"
              id="termsAndConditions"
              value="termsAndConditions"
              required
            />
            <label htmlFor="termsAndConditions" className="termsAndConditions">
              Terms & Conditions
            </label>
          </div>
          <button type="submit" className="btn">
            REGISTER
          </button>
        </form>
        <p className="navigationText">
          Already have an Account?{" "}
          <Link to="/login" className="link">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationPage;
