import axios from "axios";

import Cookies from "js-cookie";

import toast from "react-hot-toast";
import { NavigateFunction, redirect } from "react-router-dom";
import { create } from "zustand";
import { socket } from "../utils/socket";

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
	invoiceUrl: File | null;
}
export interface TransactionRequest1 {
	transactionAmount: string;
	category: string;
	transactionTitle: string;
	notes: string;
	transactionDate: string;
	type: string;
}

export interface UserObject {
	_id: string;
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

export interface updateUserFormData {
	userName: string;
	profilePicture: File | null;
}

export interface GroupDocumentRequest {
	_id: string;
	groupName: string;
	groupProfile?: File | null;
	createdBy: UserObject | undefined;
	members: UserObject[];
	groupExpenses: TransactionType[];
	totalExpense: number;
	category: string;
}

export interface GroupMember {
	email: string;
	profilePicture: string;
	userId: string;
	userName: string;
}

export interface GroupDocument {
	balances: any[]; // You may replace 'any' with the actual type of your balances
	groupExpenses: any[]; // You may replace 'any' with the actual type of your group expenses
	groupName: string;
	groupProfile: string;
	members: GroupMember[];
	_id: string;
}

export interface Notification {
	requestId: string;
	groupId: string;
	groupName: string;
}

export interface GroupTransactionRequest {
	groupId: string;
	splitAmong: string[]
	paidBy: string;
	category: string;
	transactionTitle: string;
	transactionAmount: string;
	transactionDate: string;
}

export interface Groupmember {
	userName: string;
	email: string;
	profilePicture: string;
	expenses: string;
}

export interface Groupmembers {
	members: Groupmember[] | undefined;
}

export interface GroupTransaction {
	_id: string,
	groupId: string,
	paidBy: string,
	splitAmoung: string[],
	category: string,
	transactionTitle: string,
	transactionDate: string,
}

interface Store {
	isLoggedIn: boolean | null;

	// isLoading: boolean;
	// setIsLoading: (state: boolean) => void;

	// User Data
	userData: UserObject | undefined;
	setUserData: (userData: UserObject | undefined) => void;

	// Transactions
	transactions: TransactionType[] | undefined;
	setTransactions: (transactions: TransactionType[] | undefined) => void;

	// groups
	selectedgroup: GroupDocument | undefined;
	setselectedGroup: (groups: GroupDocument | undefined) => void;

	groups: GroupDocument[] | [];
	setGroups: (groups: GroupDocument[]) => void;

	// all users
	allUsers: UserObject[];

	// active group
	activeGroup: GroupDocument | undefined;
	setActiveGroup: (group: GroupDocument) => void;

	// notifications
	notifications: Notification[];
	setNotifications: (notification: Notification[]) => void;

	// selected gtoup transactions
	
	selectedGroupTransactions: GroupTransaction[];
	setselectedGroupTransactions: (transactions: GroupTransaction[]) => void;

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
	addTransaction: (formData: FormData) => Promise<boolean>;

	// Get User
	getUserData: (redirect: NavigateFunction) => void;

	// Get Transactions
	getTransactions: () => void;
	
	// Email Verification
	verifyEmail: (formData: OTPFormValues, redirect: NavigateFunction) => void;
	
	// OTP Verification
	verifyOtp: (formData: OTPFormValues, redirect: NavigateFunction) => void;
	
	// user log out
	logoutUser: (redirect: NavigateFunction) => void;
	
	// update user, profile pic and username
	updateUser: (formData: FormData, redirect: NavigateFunction) => void;
	
	// Reset Password
	handleChangePassword: (formData: ResetFormValues) => Promise<boolean>;
	
	// delete user
	deleteUser: (redirect: NavigateFunction) => void;
	
	//update a transaction
	updateTransaction: (transactionId: string, formData: TransactionRequest1) => Promise<boolean>;
	
	//delete a transaction
	deleteTransaction: (transactionId: string) => Promise<boolean>;
	
	//create a group
	createGroup: (formData: FormData, redirect: NavigateFunction) => void;
	
	// fetch groups
	handleFetchGroups: () => void;
	
	// get user notifications
	getNotifications: () => void;
	
	handleFetchselectedGroups: (params: string | undefined) => void;
	
	// get all the users
	getAllUsers: () => void;
	
	// Handle Request
	handleRequest: (type: string, requestId: string, groupId: string, navigation: NavigateFunction) => void;
	
	// Handle Remove Member
	handleRemoveMember: (memberEmail: string, groupId: string, navigation: NavigateFunction) => void;
	
	// add group transaction
	addGroupTransaction: (formData: GroupTransactionRequest) => Promise<boolean>;
	
	// get the selcted group transactions
	getSelectedGroupTransactions: () => void;
}

export const Store = create<Store>((set) => ({
	// isLoading: false,
	// setIsLoading: (state) => set({ isLoading: state }),

	isLoggedIn: null,

	transactions: undefined,
	setTransactions: (transactions) => set({ transactions: transactions }),

	userData: undefined,
	setUserData: (userData) => set({ userData }),
	selectedgroup: undefined,
	setselectedGroup: (selectedgroup: GroupDocument | undefined) => set({ selectedgroup }),
	groups: [],
	setGroups: (groups: GroupDocument[]) => set({ groups }),

	activeGroup: undefined,
	setActiveGroup: (data) => {
		set({ activeGroup: data });
	},

	allUsers: [],

	// set({ isLoading: true });

	notifications: [],
	setNotifications: (notifications) => set({ notifications }),

	selectedGroupTransactions: [],
	setselectedGroupTransactions: (transactions) => set({ selectedGroupTransactions: transactions }),

	sendEmailVerificationMail: async (formData, redirect) => {
		// set({ isLoading: true });

		await axios
			.post("/user/sendVerificationMail", formData)
			.then((res) => {
				toast.success(res.data?.message);
				const email = formData.get("email") as string | null;
				if (email) {
					Cookies.set("userEmail", email);
				}
				redirect("/registerOtpVerificationPage");
			})
			.catch((err) => {
				if (err.response) return toast.error(err.response?.data?.message);
				return toast.error("Internal server error");
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
				toast.success(res.data?.message);
			})
			.catch((err) => {
				if (err.response) return toast.error(err.response?.data?.message);
				return toast.error("Internal server error");
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
				toast.success(res.data?.message);
				set({ isLoggedIn: true });
				setTimeout(() => redirect("/"), 1000);
			})
			.catch((err) => {
				if (err.response) return toast.error(err.response?.data?.message);
				return toast.error("Internal server error");
			})
			.finally(() => {
				// set({ isLoading: true });
			});
	},

	handleLogin: async (formData, redirect) => {
		// set({ isLoading: true });

		await axios
			.post("/user/login", formData)
			.then((res) => {
				toast.success(res.data?.message);
				set({ isLoggedIn: true });
				socket.emit("login");
				redirect("/");
			})
			.catch((err) => {
				if (err.response) return toast.error(err.response?.data?.message);
				return toast.error("Internal server error");
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
				toast.success(res.data?.message);
				redirect("/passwordResetOtpVerificationPage");
			})
			.catch((err) => {
				if (err.response) return toast.error(err.response?.data?.message);
				return toast.error("Internal server error");
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
				toast.success(res.data?.message);
			})
			.catch((err) => {
				if (err.response) return toast.error(err.response?.data?.message);
				return toast.error("Internal server error");
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
				toast.success(res.data?.message);
				redirect("/login");
			})
			.catch((err) => {
				if (err.response) return toast.error(err.response?.data?.message);
				return toast.error("Internal server error");
			})
			.finally(() => {
				// set({ isLoading: false });
			});
	},

	getUserData: async (redirect) => {
		// set({ isLoading: true });
		const { userData } = Store.getState();

		if (userData == undefined) {
			await axios
				.get("/user/getUser")
				.then((res) => {
					console.log("userData fetched");
					set({ userData: res.data.userObject });
				})
				.catch((err) => {
					redirect("/login");
					if (err.response) return toast.error(err.response?.data?.message);
					return toast.error("Internal server error");
				})
				.finally(() => {
					// set({ isLoading: false });
				});
		}
	},

	addTransaction: async (formData) => {
		let flag = false;
		await axios
			.post("/transaction/add", formData)
			.then(() => {
				toast.success("Transaction added");
				flag = true;
				return true;
			})
			.catch((err) => {
				if (err.response) {
					toast.error(err.response?.data?.message);
					return false;
				}
				toast.error("Internal server error");
				return false;
			})
			.finally(() => {
				// set({ isLoading: false });
			});
		return flag;
	},

	getTransactions: async () => {
		// set({ isLoading: true });
		const { userData } = Store.getState();

		if (userData)
			await axios
				.get("/transaction/getAll")
				.then((res) => {
					const sortedTransactions = res.data.transactions.sort(
						(a: TransactionType, b: TransactionType) =>
							new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime(),
					);

					if (userData !== undefined) {
						set({ transactions: sortedTransactions });
					}
				})
				.catch((err) => {
					if (err.response) return toast.error(err.response?.data?.message);
					return toast.error("Internal server error");
				})
				.finally(() => {
					// set({ isLoading: false });
				});
	},

	logoutUser: async (redirect) => {
		await axios
			.post("/user/logout")
			.then((res) => {
				redirect("/login");
				set({ isLoggedIn: false });
				toast.success(res.data?.message);
			})
			.catch((err) => {
				if (err.response) return toast.error(err.response?.data?.message);
				return toast.error("Internal server error");
			})
			.finally(() => {});
	},

	updateUser: async (formData, redirect) => {
		const { getUserData } = Store.getState();

		await axios
			.put("/user/update", formData)
			.then((res) => {
				toast.success(res.data?.message);
				set({ userData: undefined });
				getUserData(redirect);
			})
			.catch((err) => {
				if (err.response) return toast.error(err.response?.data?.message);
				return toast.error("Internal server error");
			})
			.finally(() => {});
	},

	handleChangePassword: async (formData) => {
		// set({ isLoading: true });
		let flag = false;

		await axios
			.post("/user/resetPassword", formData)
			.then((res) => {
				flag = true;
				toast.success(res.data?.message);
			})
			.catch((err) => {
				flag = false;
				if (err.response) return toast.error(err.response?.data?.message);
				return toast.error("Internal server error");
			})
			.finally(() => {
				// set({ isLoading: false });
			});

		return flag;
	},

	deleteUser: async (redirect) => {
		await axios
			.delete("/user/delete")
			.then((res) => {
				redirect("/login");
				toast.success(res.data?.message);
			})
			.catch((err) => {
				if (err.response) return toast.error(err.response?.data?.message);
				return toast.error("Internal server error");
			})
			.finally(() => {});
	},

	updateTransaction: async (transactionId: string, formData: TransactionRequest1) => {
		let flag = false;
		await axios
			.put(`/transaction/edit/${transactionId}`, formData)
			.then(() => {
				toast.success("Transaction updated");
				flag = true;
			})
			.catch((err) => {
				if (err.response) {
					toast.error(err.response?.data?.message);
				} else {
					toast.error("Internal server error");
				}
			})
			.finally(() => {
				// Handle any post-update actions or UI changes here
			});
		return flag;
	},

	deleteTransaction: async (transactionId: string) => {
		let flag = false;
		await axios
			.delete(`/transaction/delete/${transactionId}`)
			.then(() => {
				toast.success("Transaction deleted");
				flag = true;
			})
			.catch((err) => {
				if (err.response) {
					toast.error(err.response?.data?.message);
				} else {
					toast.error("Internal server error");
				}
			})
			.finally(() => {
				// Fetch updated transactions after deletion
				redirect("/");
			});
		return flag;
	},

	createGroup: async (formData, redirect) => {
		await axios
			.post("/group/create", formData)
			.then((res) => {
				toast.success(res.data?.message);
				redirect("/groups");
			})
			.catch((err) => {
				if (err.response) {
					toast.error(err.response?.data?.message);
				} else {
					toast.error("Internal server error");
				}
			})
			.finally(() => {});
	},

	handleFetchGroups: async () => {
		await axios.get("/group/getAll").then((res) => {
			set({ groups: res.data.groups });
			console.log("Group fetched : ", res.data.groups);
		});
	},

	handleFetchselectedGroups: async (params: string | undefined) => {
		await axios.get(`/group/${params}`).then((res) => {
			console.log("selected Group : ", res.data );
			set({ selectedgroup: res.data });
		});
	},

	getAllUsers: async () => {
		await axios
			.get("/user/getAllUsers")
			.then((res) => {
				set({ allUsers: res.data.users });
			})
			.catch((error) => {
				console.log(error);
			});
	},

	getNotifications: async () => {
		axios
			.get("/user/notifications")
			.then((res) => {
				console.log("Notifications : ", res.data?.notifications);
				set({ notifications: res.data?.notifications });
			})
			.catch((err) => {
				if (axios.isAxiosError(err)) {
					toast.error(err.response?.data.message);
				} else {
					console.error(err);
				}
			});
	},

	handleRequest: async (type, requestId, groupId, redirect) => {
		axios
			.post("/user/handleRequest", { requestId, type })
			.then(() => {
				if (type === "accept") {
					socket.emit("acceptRequest", { groupId: groupId });
					redirect("/groups");
				}
				set((prevState) => ({
					notifications: prevState.notifications.filter(
						(notification) => notification.requestId !== requestId,
					),
				}));
				toast.success(type === "accept" ? "Request Accepted" : "Request Rejected");
			})
			.catch((err) => {
				if (axios.isAxiosError(err)) {
					toast.error(err.response?.data.message);
				} else {
					console.error(err);
				}
			});
	},

	handleRemoveMember: async (memberEmail, groupId) => {
		axios
			.post("/group/removeMember", { memberEmail, groupId })
			.then(() => {
				socket.emit("removeMember", { groupId: groupId });
			})
			.catch((err) => {
				if (axios.isAxiosError(err)) {
					toast.error(err.response?.data.message);
				} else {
					console.error(err);
				}
			})
			.finally(() => {});
	},

	addGroupTransaction: async (formData) => {
		let flag = false;
		await axios
			.post("group/addGroupTransaction", formData)
			.then(() => {
				toast.success("Transaction added");
				flag = true;
				return true;
			})
			.catch((err) => {
				if (err.response) {
					toast.error(err.response?.data?.message);
					return false;
				}
				toast.error("Internal server error");
				return false;
			})
			.finally(() => {
				// set({ isLoading: false });
			});
		return flag;
	},

	getSelectedGroupTransactions: async () => {
	// 	const { selectedgroup } = Store.getState();

    // if (!selectedgroup || !selectedgroup.groupExpenses) return;
		
	// 	try {
	// 		console.log("RUN");
	// 		const Transactions = await Promise.all(
	// 			selectedgroup?.groupTransactions?.map(async (id) => {
	// 				const response = await axios.get(`/group/getTransaction/${id}`);					
	// 				return response.data;
	// 			}),
	// 		);

	// 		console.log("Group Transactions Data : ", Transactions);
			
	// 	} catch (err) {
	// 		if (axios.isAxiosError(err)) {
	// 			toast.error(err.response?.data.message);
	// 		} else {
	// 			console.error(err);
	// 		}
	// 	}
	},
}));
