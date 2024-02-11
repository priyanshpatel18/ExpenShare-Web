import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/APP-LOGO-LIGHT-THEME.png";
import Input from "../components/Input";
import FormSubmitButton from "../components/FormSubmitButton";
import profile from "../assets/profile.png";

interface RegistrationPageProps {}

const RegistrationPage: React.FC<RegistrationPageProps> = () => {
	const handleRegistration = () => {
		// Implement your registration logic here
	};

	return (
		<div className="RegistrationPage">
			<div className="formContainer">
				<div className="pageTitle">
					<div className="logo">
						<img src={logo} alt="" />
					</div>
					<h2>REGISTER</h2>
				</div>
				<form className="RegisterForm" onSubmit={handleRegistration}>
					<div className="profile">
						<label htmlFor="profile">
							<img src={profile} alt="avatar" className="profileImg" />
							<input type="file" name="profile" id="profile" />
						</label>
					</div>
					<div className="inputs">
						<Input
							type="text"
							value=""
							placeholder="Username"
							setFunction={(value) => console.log(value)} // Replace with your logic
							required
						/>
						<Input
							type="email"
							value=""
							placeholder="Email"
							setFunction={(value) => console.log(value)} // Replace with your logic
							required
						/>
						<Input
							type="password"
							value=""
							placeholder="Password"
							setFunction={(value) => console.log(value)} // Replace with your logic
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
						<label htmlFor="termsAndConditions">Terms & Conditions</label>
					</div>
					<FormSubmitButton value="Register" />
				</form>
				<p>
					Already have an Account?{" "}
					<Link to="/login" className="link">
						Login Now
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegistrationPage;
