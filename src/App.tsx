import { Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen"

// pages
import HomePage from "./pages/HomePage";

function App(): React.JSX.Element {
	return (
		<main>
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</main>
	);
}

export default SplashScreen(App);
