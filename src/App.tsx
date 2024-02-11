import { Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen"
import RegistrationPage from "./pages/RegistrationPage"

// pages
import HomePage from "./pages/HomePage";

function App(): React.JSX.Element {
	return (
		<main>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/registration" element={<RegistrationPage />} />
			</Routes>
		</main>
	);
}

export default SplashScreen(App);
