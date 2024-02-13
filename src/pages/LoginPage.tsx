import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// components
import Input from "../components/Input";
// images
import logo from "../assets/APP-LOGO-LIGHT-THEME.png";
import welcoemImage from "../assets/welcomePageImage.jpg";
// icons
import user from "../assets/icons/user.svg";
import password from "../assets/icons/password.svg";
import usersStore from "../stores/usersStore";

interface FormValues {
	userNameOrEmail: string;
	password: string;
}

function LoginPage(): React.JSX.Element {
	const navigate = useNavigate();
	const store = usersStore();

	const formik = useFormik<FormValues>({
		initialValues: {
			userNameOrEmail: "",
			password: "",
		},
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			store.login(values, navigate);
		},
	});

	return (
		<div className="LoginPage">
			<div className="welcome">
				<div className="welcomeImg">
					<img src={welcoemImage} alt="welcome image" />
				</div>
				<div className="welcomeText">
					<h2>Know where your money goes</h2>
					<p>
						Track your transaction easily with <br /> categories and financial report
					</p>
				</div>
			</div>
			<div className="formContainer">
				<div className="pageTitle">
					<div className="logo">
						<img src={logo} alt="" />
					</div>
					<h2>LOGIN</h2>
				</div>
				<form className="loginForm" onSubmit={formik.handleSubmit}>
					<div className="inputs">
						<Input
							icon={user}
							type="text"
							placeholder="Username or Email"
							field={formik.getFieldProps("userNameOrEmail")}
							required
						/>
						<Input
							icon={password}
							type="password"
							placeholder="Password"
							field={formik.getFieldProps("password")}
							required
						/>
					</div>
					<div className="forgotPassword navigationText">
						<Link to="/forgotPasswordPage" className="link">
							Forgot password ?
						</Link>
					</div>
					<button type="submit" className="btn">
						LOGIN
					</button>
				</form>
				<p className="navigationText">
					Do not have an Account?{" "}
					<Link to="/registration" className="link">
						Register Now
					</Link>
				</p>
			</div>
		</div>
	);	
}

export default LoginPage;
