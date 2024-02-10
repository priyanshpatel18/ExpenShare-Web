import { Route, Routes, BrowserRouter } from "react-router-dom";
import SplashScreenPage from "./Pages/splashScreen";

function App():React.JSX.Element {
	return (
		<>
			<main>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<SplashScreenPage />} />
					</Routes>
				</BrowserRouter>
			</main>
		</>
	);
}

export default App;
