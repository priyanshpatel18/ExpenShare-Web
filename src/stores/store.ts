import axios from "axios";
import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";

export interface TransactionType {
    transactionAmount: number;
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
    handleLogin: (
        formData: LoginFormValues,
        redirect: NavigateFunction
    ) => void;
    // Reset Password
    handleResetPasswrord: (
        formData: ResetFormValues,
        redirect: NavigateFunction
    ) => void;
    // Forgot Password Email
    sendRecoveryMail: (
        formData: ForgotFormValues,
        redirect: NavigateFunction
    ) => void;
    // Register
    handleRegister: (redirect: NavigateFunction) => void;
    // Email Verification Mail
    sendEmailVerificationMail: (
        FormData: RegisterFormValues,
        redirect: NavigateFunction
    ) => void;
    // Post Transactions
    addTransaction: (formData: TransactionType) => void;
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

    transactions: undefined,
    setTransactions: (transactions) => set({ transactions: transactions }),

    userData: undefined,
    setUserData: (userData) => set({ userData }),

    handleLogin: async (formData, redirect) => {
        // set({ isLoading: true });

        // Post Request
        await axios
            .post("/user/login", formData)
            .then((res) => {
                console.log(res.data.message);
                redirect("/");
            })
            .catch((err) => {
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
                console.log(res.data.response);
                redirect("/login");
            })
            .catch((err) => {
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
                console.log(res.data.message);
                redirect("/verifyOtp");
            })
            .catch((err) => {
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
                console.log(res.data.message);
                redirect("/");
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
            .finally(() => {
                // set({ isLoading: true });
            });
    },

    sendEmailVerificationMail: async (formData, redirect) => {
        // set({ isLoading: true });

        await axios
            .post("/user/sendVerificationMail", formData)
            .then((res) => {
                console.log(res.data.message);
                redirect("/verifyEmail");
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },

    getUserData: async (redirect) => {
        // set({ isLoading: true });

        await axios
            .get("/user/getUser")
            .then((res) => {
                set({ userData: res.data.userData });
            })
            .catch((err) => {
                redirect("/");
                console.log(err.response.data.message);
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
                console.log(res.data.transactions);
                set({ transactions: res.data.transactions });
            })
            .catch((err) => {
                console.log(err.response.data?.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },

    verifyEmail: async (formData, redirect) => {
        const { handleRegister } = Store.getState();

        // set({ isLoading: true });

        const OTP: string = formData.OTP.reduce(
            (otp: string, digit: string) => otp + digit,
            ""
        );

        await axios
            .post(`/user/verifyOtp`, { userOtp: OTP })
            .then((res) => {
                Cookies.remove("userEmail");
                handleRegister(redirect);
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },

    verifyOtp: async (formData, redirect) => {
        // set({ isLoading: false });

        const OTP: string = formData.OTP.reduce(
            (otp: string, digit: string) => otp + digit,
            ""
        );

        await axios
            .post("/user/verifyOtp", OTP)
            .then((res) => {
                Cookies.remove("userEmail");
                redirect("/resetPasswordPage");
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },
}));
