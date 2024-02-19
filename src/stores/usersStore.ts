import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";

interface Transaction {
	category: string;
	createdBy: string;
	invoiceUrl: string;
	notes: string;
	publicId: string;
	transactionAmount: string;
	transactionDate: string;
	transactionTitle: string;
	type: string;
	_id: string;
}

interface userData {
	email: string;
	expenses: string[];
	incomes: string[];
	password: string;
	profilePicture: string;
	publicId: string;
	totalBalance: number;
	totalExpense: number;
	totalIncome: number;
	userName: string;
	__v: number;
	_id: string;
}

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
	getAllTransactions: () => Promise<void>;
	putTransactions: (values: Object) => Promise<void>;
	setTransactions: (values: Transaction) => null;
	transactions: Transaction[];
	isLoading: boolean;
	userData: userData | {};
}

const usersStore = create<UsersStore>((set) => ({
	userData: {
		email: "",
		expenses: [],
		incomes: [],
		password: "",
		profilePicture: "",
		publicId: "",
		totalBalance: 0,
		totalExpense: 0,
		totalIncome: 0,
		userName: "",
		__v: 0,
		_id: "",
	},
	transactions: [],
	isLoading: false,

	sendRegisterVerificationMail: async (formData: FormData, navigate: any) => {
		try {
			await toast.promise(axios.post(`/user/sendVerificationMail`, formData), {
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
				toast.error(error.response.data.message);
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
			await axios.post(`/user/verifyOtp`, { userOtp: OTP });
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
			await toast.promise(axios.post(`/user/register`), {
				pending: "Processing...",
				success: "Successfully Registered",
			});
			setTimeout(() => navigate("/"), 1000);
			return;
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data.message);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	login: async (values: any, navigate: any) => {
		try {
			await toast.promise(axios.post(`/user/login`, values), {
				pending: "Processing...",
				success: "Successfully Logged In",
			});
			navigate("/");
			return;
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data.message);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	sendPasswordRecoveryMail: async (values: { email: string }, navigate: any) => {
		try {
			await toast.promise(axios.post(`/user/sendMail`, values), {
				pending: "Processing...",
				success: "Email sent",
			});

			if (values.email) {
				Cookies.set("userEmail", values.email);
			}
			navigate("/passwordResetOtpVerificationPage");
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data.message);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	verifyResetPasswordOtp: async (values: any, navigate: any) => {
		const OTP = values.OTP.reduce((otp: any, digit: any) => otp + digit, "");

		try {
			await toast.promise(axios.post(`/user/verifyOtp`, { userOtp: OTP }), {
				pending: "Processing...",
				success: "OTP Verified",
			});
			Cookies.remove("userEmail");
			navigate("/resetPasswordPage");
			return;
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data.message);
				return;
			}
			Cookies.remove("userEmail");
			toast.error("Internal server error");
			return;
		}
	},

	resetPassword: async (values: any, navigate: any) => {
		try {
			await toast.promise(axios.post(`/user/resetPassword`, values), {
				pending: "Processing...",
				success: "Password Changed Successfully",
			});
			navigate("/login");
		} catch (error: any) {
			if (error.response) {
				toast.error(error.response.data.message);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	getUserData: async (navigate: any) => {
		try {
			set({ isLoading: true });
			const response = await axios.get(`/user/getUser`);
			set({ userData: response.data.user });
			set({ isLoading: false });
			const data = response.data.user;
			return data;
		} catch (error: any) {
			set({ isLoading: false });
			navigate("/login");
			if (error.response) {
				toast.error(error.response.data.message);
				return;
			}
			toast.error("Internal server error");
			return;
		}
	},

	putTransactions: async (values: Object) => {
		try {
			await axios.post(`/transaction/add`, values);
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

	getAllTransactions: async () => {
		try {
			const response = await axios.get(`/transaction/getAll`);
			// Sort transactions by transactionDate in descending order
			const sortedTransactions = response.data.transactions.sort(
				(a: Transaction, b: Transaction) =>
					new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime(),
			);
			set({ transactions: sortedTransactions });
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

	setTransactions: (values: Transaction) => {
		set((state) => ({ transactions: [values, ...state.transactions] }));
		return null;
	},
}));

export default usersStore;
