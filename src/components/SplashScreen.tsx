import { ComponentType, useEffect, useState } from "react";
import logo from "../assets/APP-LOGO-LIGHT-THEME.png";

function withSplashScreen<T extends object>(WrappedComponent: ComponentType<T>) {
	return function WithSplashScreen(props: T) {
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			const timeoutId = setTimeout(() => {
				setLoading(false);
			}, 2000);

			return () => clearTimeout(timeoutId);
		}, []);

		return loading ? (
			<div className="splashScreenPage">
				<div className="img">
					<img src={logo} className="App-logo" alt="logo" />
				</div>
			</div>
		) : (
			<WrappedComponent {...props} />
		);
	};
}

export default withSplashScreen;
