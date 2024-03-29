import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// components
import Input from "../components/Input";
// images
import logo from "../assets/APP-LOGO-LIGHT-THEME.png";
// icons
import password from "../assets/password.png";
import { Store, ResetFormValues } from "../stores/store";

import { ResetPasswordValidation } from "../helper/inputValidation";

export interface FormValuesResetPasswordPage {
    password: string;
    confirmPassword: string;
}

function ResetPasswordPage(): React.JSX.Element {
    const navigate = useNavigate();
    const store = Store();

    const formik = useFormik<ResetFormValues>({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: ResetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            store.handleResetPasswrord(values, navigate);
        },
    });

    return (
        <div className="ResetPasswordPage">
            <div className="formContainer">
                <div className="pageTitle">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <h2>Reset Password</h2>
                </div>
                <form
                    className="ResetPasswordForm"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="inputs">
                        <Input
                            icon={password}
                            type="password"
                            placeholder="Password"
                            field={formik.getFieldProps("password")}
                            required
                        />
                        <Input
                            icon={password}
                            type="password"
                            placeholder="Confirm Password"
                            field={formik.getFieldProps("confirmPassword")}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">
                        reset
                    </button>
                </form>
                <p className="navigationText">
                    Move to login page?{" "}
                    <Link to="/login" className="link">
                        Login Page
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
