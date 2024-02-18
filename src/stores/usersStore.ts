import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const baseUrl1 = "http://192.168.43.242:8080";
const baseUrl2 = "http://192.168.43.242:8081";

interface UsersStore {
	sendRegisterVerificationMail: (formData: FormData, navigate: (path: string) => void) => Promise<void>;
	verifyRegisterOtp: (values: Object, navigate: (path: string) => void) => Promise<void>;
	register: (navigate: (path: string) => void) => Promise<void>;
	login: (formData: Object, navigate: (path: string) => void) => Promise<void>;
	verifyResetPasswordOtp: (values: Object, navigate: (path: string) => void) => Promise<void>;
	sendPasswordRecoveryMail: (values: { email: string }, navigate: (path: string) => void) => Promise<void>;
	resetPassword: (values: Object, navigate: (path: string) => void) => Promise<void>;
	getUserData: (navigate: (path: string) => void) => Promise<
		| {
				email: string;
				password: string;
				profilePicture: string;
				publicId: string;
				userName: string;
		  }
		| undefined
	>;
	getAllTransactions: (values: Object) => Promise<void>;
}

const usersStore = create<UsersStore>(() => ({
	sendRegisterVerificationMail: async (formData: FormData, navigate: any) => {
		try {
			await toast.promise(axios.post(`${baseUrl1}/user/sendVerificationMail`, formData), {
				pending: "Processing...",
				success: "Email sent",
			});
			const email = formData.get("email") as string | null;
			if (email) {
				Cookies.set("userEmail", email);
			}
			navigate("/registerOtpVerificationPage");
		} catch (error: any) {
			console.log(error);

			if (error.response) {
				toast.error(error.response.data);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	verifyRegisterOtp: async (values: any, navigate: any) => {
		const { register } = usersStore.getState();
		const OTP = values.OTP.reduce((otp: any, digit: any) => otp + digit, "");

		try {
			await toast.promise(axios.post(`${baseUrl1}/user/verifyOtp`, { userOtp: OTP }), {
				// pending: "Processing...",
				// success: "OTP Verified",
			});
			Cookies.remove("userEmail");
			await register(navigate);
			return;
		} catch (error: any) {
			Cookies.remove("userEmail");
			if (error.response) {
				toast.error(error.response.data.message);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	register: async (navigate: any) => {
		try {
			await toast.promise(axios.post(`${baseUrl1}/user/register`), {
				pending: "Processing...",
				success: "Sucessfully Registerd",
			});
			setTimeout(() => navigate("/"), 1000);
			return;
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	login: async (values: any, navigate: any) => {
		try {
			await toast.promise(axios.post(`${baseUrl1}/user/login`, values), {
				pending: "Processing...",
				success: "Sucessfully Loggdin",
			});
			navigate("/");
			return;
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	sendPasswordRecoveryMail: async (values: { email: string }, navigate: any) => {
		try {
			await toast.promise(axios.post(`${baseUrl1}/user/sendMail`, values), {
				pending: "Processing...",
				success: "Email sent",
			});

			if (values.email) {
				Cookies.set("userEmail", values.email);
			}
			navigate("/passwordResetOtpVerificationPage");
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	verifyResetPasswordOtp: async (values: any, navigate: any) => {
		const OTP = values.OTP.reduce((otp: any, digit: any) => otp + digit, "");

		try {
			await toast.promise(axios.post(`${baseUrl1}/user/verifyOtp`, { userOtp: OTP }), {
				pending: "Processing...",
				success: "OTP Verified",
			});
			Cookies.remove("userEmail");
			navigate("/resetPasswordPage");
			return;
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data);
				return;
			}
			Cookies.remove("userEmail");
			toast.error("Internal server error");
			return;
		}
	},

	resetPassword: async (values: any, navigate: any) => {
		try {
			await toast.promise(axios.post(`${baseUrl1}/user/resetPassword`, values), {
				pending: "Processing...",
				success: "Password Changed Successfully",
			});
			navigate("/login");
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	getUserData: async (navigate: any) => {
		try {
			const response = await axios.get(`${baseUrl2}/user/getUser`);
			const data = response.data.user;
			return data;
		} catch (error: any) {
			navigate("/login");
			if (error.response) {
				toast.error(error.response.data);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	getAllTransactions: async (values: Object) => {
		try {
			const response = await axios.post(`${baseUrl2}/transaction/getAll`, values);
			console.log(response.data);
		} catch (error: any) {
			console.log(error);

			if (error.response) {
				toast.error(error.response.data.message);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},
}));

export default usersStore;
