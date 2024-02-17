import { Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";

// pagesimport HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import RegisterOtpVerificationPage from "./pages/RegisterOtpVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PasswordResetOtpVerificationPage from "./pages/PasswordResetOtpVerificationPage";
import MainPage from "./pages/MainPage";

function App(): React.JSX.Element {
	return (
		<main>
			<Routes>
				<Route path="/registration" element={<RegistrationPage />} />
				<Route path="/registerOtpVerificationPage" element={<RegisterOtpVerificationPage />} />
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/forgotPasswordPage" element={<ForgotPasswordPage />} />
				<Route
					path="/passwordResetOtpVerificationPage"
					element={<PasswordResetOtpVerificationPage />}
				/>
				<Route path="/resetPasswordPage" element={<ResetPasswordPage />} />
			</Routes>
		</main>
	);
}

export default SplashScreen(App);
