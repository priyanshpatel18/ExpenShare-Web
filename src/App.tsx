import { Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen"

// pages
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage"
import LoginPage from "./pages/LoginPage"
import OtpVerificationPage from "./pages/OtpVerificationPage"

function App(): React.JSX.Element {
	return (
		<main>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/registration" element={<RegistrationPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/OtpVerification" element={<OtpVerificationPage />} />
			</Routes>
		</main>
	);
}

export default SplashScreen(App);
