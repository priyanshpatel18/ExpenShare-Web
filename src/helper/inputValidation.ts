import toast from "react-hot-toast";

interface FormValues {
	email?: string;
	userName?: string;
	password?: string;
	confirmPassword?: string;
	OTP?: string[];
	profilePicture?: File | null;
}

// validating registration form
export async function registerFormValidation(values: FormValues) {
	const error: Partial<FormValues> = usernameVerify({}, values);
	if (error.userName) return error;
	emailVerify(error, values);
	if (error.email) return error;
	passwordVerify(error, values);
	if (error.password) return error;
	profilePictureVerify(error, values);

	return error;
}

// validating forgot password page
export async function forgotPasswordValidation(values: FormValues) {
	const error: Partial<FormValues> = emailVerify({}, values);
	return error;
}

// validating OTP verification page
export async function verifyOTPValidation(values: FormValues) {
	const error: Partial<FormValues> = otpVerify({}, values);
	return error;
}

// validating confirm password page
export async function ResetPasswordValidation(values: FormValues) {
	const error: Partial<FormValues> = passwordVerify({}, values);
	if (error.password) return error;
	resetPasswordVerify(error, values);

	return error;
}

// validating user update form in account page
export async function updateUserFormValidation(values: FormValues) {
	console.log("run");
	const error: Partial<FormValues> = usernameVerify({}, values);
	if (error.password) return error;
	profilePictureVerify(error, values);

	return error;
}

// All the functions (Logic) starts from here

// validating verify OTP page
function resetPasswordVerify(error: Partial<FormValues> = {}, values: FormValues) {
	if (values.password !== values.confirmPassword) {
		error.confirmPassword = toast.error("Password not match");
	}

	return error;
}

// validate email
function emailVerify(error: Partial<FormValues> = {}, values: FormValues) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!values.email) {
		error.email = toast.error("Email required");
	} else if (values.email.includes(" ")) {
		error.email = toast.error("Invalid email address");
	} else if (!emailRegex.test(values.email)) {
		error.email = toast.error("Invalid email address");
	}

	return error;
}

// validate password
function passwordVerify(error: Partial<FormValues> = {}, values: FormValues) {
	const specialCharactorsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

	if (!values.password) {
		error.password = toast.error("Password required");
	} else if (values.password.includes(" ")) {
		error.password = toast.error("Invalid password");
	} else if (values.password.length < 6) {
		error.password = toast.error("Minimum 6 digits required");
	} else if (!specialCharactorsRegex.test(values.password)) {
		error.password = toast.error("Password must have special characters");
	}

	return error;
}

// validate username
function usernameVerify(error: Partial<FormValues> = {}, values: FormValues) {
	if (!values.userName) {
		error.userName = toast.error("Username required");
	} else if (values.userName.includes(" ")) {
		error.userName = toast.error("Invalid username");
	}

	return error;
}

// validate OTP
function otpVerify(error: Partial<FormValues> = {}, values: FormValues) {
	values.OTP?.some((digit) => {
		if (!digit || isNaN(Number(digit))) {
			toast.error("6-digit OTP required");
			error.OTP = ["6-digit OTP required"];
			return true;
		}
	});

	return error;
}

// profile pic verify
function profilePictureVerify(error: Partial<FormValues> = {}, values: FormValues) {
	console.log(values.profilePicture);

	if (values.profilePicture && !values.profilePicture.type.includes("image")) {
		error.userName = toast.error("Please upload a valid image file");
	} else if (values.profilePicture && values.profilePicture.size > 3000000) {
		error.userName = toast.error("Image size must be less then 3 MB");
	}

	return error;
}
