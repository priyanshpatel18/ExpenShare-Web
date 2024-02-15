import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";

interface UsersStore {
	sendEmailVerificationMail: (formData: FormData, navigate: (path: string) => void) => Promise<void>;
	verifyOtp: (values: Object, navigate: (path: string) => void) => Promise<void>;
	register: (navigate: (path: string) => void) => Promise<void>;
	login: (formData: Object, navigate: (path: string) => void) => Promise<void>;
}

const usersStore = create<UsersStore>(() => ({
	sendEmailVerificationMail: async (formData: FormData, navigate: any) => {
		try {
			await toast.promise(axios.post("/user/sendVerificationMail", formData), {
				pending: "Processing...",
				success: "Email sent",
			});
			navigate("/OtpVerification");
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	verifyOtp: async (values: any, navigate: any) => {
		const { register } = usersStore.getState();
		const OTP = values.OTP.reduce((otp: any, digit: any) => otp + digit, "");

		try {
			await toast.promise(axios.post("/user/verifyOtp", { userOtp: OTP }), {
				// pending: "Processing...",
				// success: "OTP Verified",
			});
			await register(navigate);
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

	register: async (navigate: any) => {
		try {
			await toast.promise(axios.post("/user/register"), {
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
			await toast.promise(axios.post("/user/login", values), {
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
}));

export default usersStore;
