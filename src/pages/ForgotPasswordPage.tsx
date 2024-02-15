import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import usersStore from "../stores/usersStore";
// components
import Input from "../components/Input";
// images
// icons
import email from "../assets/icons/email.svg";
import { forgotPasswordValidation } from "../helper/inputValidation";

interface FormValues {
	email: "";
}

function ForgotPasswordPage(): React.JSX.Element {
	const navigate = useNavigate();
	const store = usersStore();

	const formik = useFormik<FormValues>({
		initialValues: {
			email: "",
		},
		validate: forgotPasswordValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			store.sendPasswordRecoveryMail(values, navigate);
		},
	});

	return (
		<div className="ForgotPasswordPage">
			<div className="formContainer">
				<div className="pageTitle">
					{/* <div className="logo">
						<img src={logo} alt="" />
					</div> */}
					<h2>Reset Password</h2>
					<p>If the account exists, we'll email you OTP to reset the password.</p>
				</div>
				<form className="ForgotPasswordForm" onSubmit={formik.handleSubmit}>
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
