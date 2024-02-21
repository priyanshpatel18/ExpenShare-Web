import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";

export interface TransactionType {
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

export interface TransactionRequest {
  transactionAmount: string;
  category: string;
  transactionTitle: string;
  notes: string;
  transactionDate: string; 
  type: string; 
}

export interface UserObject {
	email: string;
	userName: string;
	profilePicture: string;
	totalBalance: number;
	totalIncome: number;
	totalExpense: number;
}

export interface LoginFormValues {
	userNameOrEmail: string;
	password: string;
}

export interface ResetFormValues {
	password: string;
	confirmPassword: string;
}

export interface ForgotFormValues {
	email: string;
}

export interface RegisterFormValues {
	email: string;
	userName: string;
	password: string;
	profilePicture: File | null;
}

export interface OTPFormValues {
	OTP: string[];
}

interface Store {
	isLoggedIn: boolean;
	// Loading
	// isLoading: boolean;
	// setIsLoading: (state: boolean) => void;
	// Transactions
	transactions: TransactionType[] | undefined;
	setTransactions: (transactions: TransactionType[] | undefined) => void;
	// User Data
	userData: UserObject | undefined;
	setUserData: (userData: UserObject) => void;
	// Login
	handleLogin: (formData: LoginFormValues, redirect: NavigateFunction) => void;
	// Reset Password
	handleResetPasswrord: (formData: ResetFormValues, redirect: NavigateFunction) => void;
	// Forgot Password Email
	sendRecoveryMail: (formData: ForgotFormValues, redirect: NavigateFunction) => void;
	// Register
	handleRegister: (redirect: NavigateFunction) => void;
	// Email Verification Mail
	sendEmailVerificationMail: (FormData: FormData, redirect: NavigateFunction) => void;
	// Post Transactions
	addTransaction: (formData: TransactionRequest) => void;
	// Get User
	getUserData: (redirect: NavigateFunction) => void;
	// Get Transactions
	getTransactions: () => void;
	// Email Verification
	verifyEmail: (formData: OTPFormValues, redirect: NavigateFunction) => void;
	// OTP Verification
	verifyOtp: (formData: OTPFormValues, redirect: NavigateFunction) => void;
}

export const Store = create<Store>((set) => ({
	// isLoading: false,
	// setIsLoading: (state) => set({ isLoading: state }),
	isLoggedIn: false,

	transactions: undefined,
	setTransactions: (transactions) => set({ transactions: transactions }),

	userData: undefined,
	setUserData: (userData) => set({ userData }),

	sendEmailVerificationMail: async (formData, redirect) => {
		// set({ isLoading: true });

		await axios
			.post("/user/sendVerificationMail", formData)
			.then((res) => {
				toast.success(res.data.message);
				console.log(res.data.message);
				const email = formData.get("email") as string | null;
				if (email) {
					Cookies.set("userEmail", email);
				}
				redirect("/registerOtpVerificationPage");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err.response.data.message);
			})
			.finally(() => {
				// set({ isLoading: false });
			});
	},

	verifyEmail: async (formData, redirect) => {
		const { handleRegister } = Store.getState();

		// set({ isLoading: true });

		const OTP: string = formData.OTP.reduce((otp: string, digit: string) => otp + digit, "");

		await axios
			.post(`/user/verifyOtp`, { userOtp: OTP })
			.then((res) => {
				Cookies.remove("userEmail");
				handleRegister(redirect);
				console.log(res.data);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err.response.data.message);
			})
			.finally(() => {
				// set({ isLoading: false });
			});
	},

	handleRegister: async (redirect) => {
		// set({ isLoading: true });

		await axios
			.post("/user/register")
			.then((res) => {
				toast.success(res.data.message);
				console.log(res.data.message);
				set({ isLoggedIn: true });
				redirect("/");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err.response.data.message);
			})
			.finally(() => {
				// set({ isLoading: true });
			});
	},

	handleLogin: async (formData, redirect) => {
		// set({ isLoading: true });

		// Post Request
		await axios
			.post("/user/login", formData)
			.then((res) => {
				toast.success(res.data.message);
				console.log(res.data.message);
				set({ isLoggedIn: true })
				redirect("/");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err.response.data.message);
			})
			.finally(() => {
				// set({ isLoading: false });
			});
	},

	sendRecoveryMail: async (formData, redirect) => {
		// set({ isLoading: true });

		await axios
			.post("/user/sendMail", formData)
			.then((res) => {
				toast.success(res.data.message);
				console.log(res.data.message);
				redirect("/passwordResetOtpVerificationPage");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err.response.data.message);
			})
			.finally(() => {
				// set({ isLoading: false });
			});
	},

	verifyOtp: async (formData, redirect) => {
		// set({ isLoading: false });

		const userOtp: string = formData.OTP.reduce((otp: string, digit: string) => otp + digit, "");

		await axios
			.post("/user/verifyOtp", { userOtp })
			.then((res) => {
				Cookies.remove("userEmail");
				redirect("/resetPasswordPage");
				console.log(res.data);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err.response.data.message);
			})
			.finally(() => {
				// set({ isLoading: false });
			});
	},

	handleResetPasswrord: async (formData, redirect) => {
		// set({ isLoading: true });

		await axios
			.post("/user/resetPassword", formData)
			.then((res) => {
				toast.success(res.data.response);
				console.log(res.data.response);
				redirect("/login");
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err.response.data.message);
			})
			.finally(() => {
				// set({ isLoading: false });
			});
	},

	getUserData: async (redirect) => {
		// set({ isLoading: true });
		const { userData } = Store.getState();

		await axios
			.get("/user/getUser")
			.then((res) => {
				if (userData == undefined)
				set({ userData: res.data.userObject });
				console.log("userData", userData);
			})
			.catch((err) => {
				redirect("/login");
				toast.error(err.response.data);
				console.log(err.response.data);
			})
			.finally(() => {
				// set({ isLoading: false });
			});
	},

	addTransaction: async (formData) => {
		// set({ isLoading: true });

		await axios
			.post("/transaction/add", formData)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err.response?.data.message);
			})
			.finally(() => {
				// set({ isLoading: false });
			});
	},

	getTransactions: async () => {
		// set({ isLoading: true });

		await axios
			.get("/transaction/getAll")
			.then((res) => {
				const sortedTransactions = res.data.transactions.sort(
					(a: TransactionType, b: TransactionType) =>
						new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime(),
				);
				set({ transactions: sortedTransactions });
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err.response.data?.message);
			})
			.finally(() => {
				// set({ isLoading: false });
			});
	},
}));
