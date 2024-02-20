import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// components
import Input from "../components/Input";
// images
import welcoemImage from "../assets/welcomePageImage.jpg";
import logos from "../assets/APP-LOGO-LIGHT-THEME.png";
// icons
import email from "../assets/email.png";
import password from "../assets/password.png";
import user from "../assets/username.png";
import profile from "../assets/profile.png";
import { Store, RegisterFormValues } from "../stores/store";
import { registerFormValidation } from "../helper/inputValidation";

function RegistrationPage(): React.JSX.Element {
    const navigate = useNavigate();
    const store = Store();

    const formik = useFormik<RegisterFormValues>({
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
            const formData: RegisterFormValues = {
                email: values.email,
                userName: values.userName,
                password: values.password,
                profilePicture: values.profilePicture,
            };
            store.sendEmailVerificationMail(formData, navigate);
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
                        Track your transaction easily with <br /> categories and
                        financial report
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
                                        ? URL.createObjectURL(
                                              formik.values.profilePicture
                                          )
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
                        <label
                            htmlFor="termsAndConditions"
                            className="termsAndConditions"
                        >
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
