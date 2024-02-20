import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Store } from "../stores/store";
// components
import Input from "../components/Input";
// icons
import email from "../assets/email.png";
import { forgotPasswordValidation } from "../helper/inputValidation";
import { ForgotFormValues } from "../stores/store";

function ForgotPasswordPage(): React.JSX.Element {
    const navigate = useNavigate();
    const store = Store();

    const formik = useFormik<ForgotFormValues>({
        initialValues: {
            email: "",
        },
        validate: forgotPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            store.sendRecoveryMail(values, navigate);
        },
    });

    return (
        <div className="ForgotPasswordPage">
            <div className="formContainer">
                <div className="pageTitle">
                    <h2>Reset Password</h2>
                    <p>
                        If the account exists, we'll email you OTP to reset the
                        password.
                    </p>
                </div>
                <form
                    className="ForgotPasswordForm"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="inputs">
                        <Input
                            icon={email}
                            type="email"
                            placeholder="Email"
                            field={formik.getFieldProps("email")}
                            required
                        />
                    </div>

                    <button type="submit" className="btn">
                        SEND EMAIL
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

export default ForgotPasswordPage;
