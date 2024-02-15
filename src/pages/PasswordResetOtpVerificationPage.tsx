import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usersStore from "../stores/usersStore";
import { useFormik } from "formik";
import { verifyOTPValidation } from "../helper/inputValidation";
import Cookies from "js-cookie";

interface FormValues {
	OTP: string[];
}

export default function PasswordResetOtpVerificationPage(): React.JSX.Element {
	const [userEmail, setUserEmail] = useState("");
	const [timer, setTimer] = useState<number>(60);
	const store = usersStore();
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement[]>([]);

	const formik = useFormik<FormValues>({
		initialValues: {
			OTP: new Array(6).fill(""),
		},
		validate: verifyOTPValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: (values) => {
			store.verifyResetPasswordOtp(values, navigate);
		},
	});

	useEffect(() => {
		// focus first field if it is empty
		const firstInput = inputRef.current[0];
		if (firstInput && !firstInput.value) {
			firstInput.focus();
		}

		// getting users email id from cookie
		const userEmailCookie = Cookies.get("userEmail");
		setUserEmail(userEmailCookie ?? "");
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (timer > 0) {
				setTimer(timer - 1);
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [timer]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
		// if it is number or space -> do not move
		if (isNaN(Number(e.target.value)) || e.target.value === " ") return;
		// adding values in formik
		formik.values.OTP[index] = e.target.value;
		// shifting focus on typing
		if (e.target.value && index < 5 && inputRef.current[index + 1]) {
			inputRef.current[index + 1].focus();
		}
	}

	// function to handle backspace
	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
		if (e.key === "Backspace" && !e.currentTarget.value && inputRef.current[index - 1]) {
			inputRef.current[index - 1].focus();
		}
	}

	return (
		<div className="OtpVerificationPage">
			<div className="formContainer">
				<div className="pageTitle">
					<h2>OTP Verification</h2>
					<p>One Time Password (OTP) has been sent via Email to {userEmail}.</p>
				</div>

				<form className="OtpForm" onSubmit={formik.handleSubmit}>
					<div className="inputs">
						{formik.values.OTP.map((_, index) => (
							<input
								key={index}
								type="text"
								maxLength={1}
								inputMode="numeric"
								onChange={(e) => handleChange(e, index)}
								ref={(input) => (inputRef.current[index] = input as HTMLInputElement)}
								onKeyDown={(e) => handleKeyDown(e, index)}
							/>
						))}
					</div>

					<div className="resendOtpContanier">
						{timer > 0 ? (
							<span className="resendOtp">resend otp in {timer} seconds</span>
						) : (
							<button
								className="resendOtp"
								onClick={() => {
									setTimer(60);
									store.sendPasswordRecoveryMail({ email: userEmail }, navigate);
								}}
							>
								Resend OTP
							</button>
						)}
					</div>

					<button className="btn" type="submit">
						recover
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
