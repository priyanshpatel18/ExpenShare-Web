import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import usersStore from "../stores/usersStore";
// components
import Input from "../components/Input";
// images
import logo from "../assets/APP-LOGO-LIGHT-THEME.png";
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
			console.log(values);
			store.login(values, navigate);
		},
	});

	return (
		<div className="ForgotPasswordPage">
			<div className="formContainer">
				<div className="pageTitle">
					<div className="logo">
						<img src={logo} alt="" />
					</div>
					<h2>Reset Password</h2>
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