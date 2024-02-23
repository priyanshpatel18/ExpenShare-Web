import { Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import GroupsPage from "./pages/GroupsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PasswordResetOtpVerificationPage from "./pages/PasswordResetOtpVerificationPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterOtpVerificationPage from "./pages/RegisterOtpVerificationPage";
import RegistrationPage from "./pages/RegistrationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TransactionsPage from "./pages/TransactionsPage";
import AccountPage from "./pages/AccountPage";

function App(): React.JSX.Element {
	return (
		<main>
			<Routes>
				<Route path="/registration" element={<RegistrationPage />} />
				<Route path="/registerOtpVerificationPage" element={<RegisterOtpVerificationPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/forgotPasswordPage" element={<ForgotPasswordPage />} />
				<Route
					path="/passwordResetOtpVerificationPage"
					element={<PasswordResetOtpVerificationPage />}
				/>
				<Route path="/resetPasswordPage" element={<ResetPasswordPage />} />
				{/* Protected routes */}
				<Route path="/" element={<HomePage />} />
				<Route path="/transactionsPage" element={<TransactionsPage />} />
				<Route path="/groupsPage" element={<GroupsPage />} />
				<Route path="/profilePage" element={<ProfilePage />} />
				<Route path="/accountPage" element={<AccountPage />} />
			</Routes>
		</main>
	);
}

export default SplashScreen(App);
