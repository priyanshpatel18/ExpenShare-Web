import { Route, Routes } from "react-router-dom";
import SplashScreenPage from "./Pages/SplashScreenPage";

function App(): React.JSX.Element {
	return (
		<main>
			<Routes>
				<Route path="/" element={<SplashScreenPage />} />
			</Routes>
		</main>
	);
}

export default App;
