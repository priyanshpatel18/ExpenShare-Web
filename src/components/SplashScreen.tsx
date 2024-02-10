import { Component, ComponentType } from "react";
import logo from "../assets/APP-LOGO-LIGHT-THEME.png";

function SplashMessage() {
	return (
		<div className="splashScreenPage">
			<div className="img">
				<img src={logo} className="App-logo" alt="logo" />
			</div>
		</div>
	);
}

interface WithSplashScreenState {
	loading: boolean;
}

export default function withSplashScreen<T extends object>(WrappedComponent: ComponentType<T>) {
	return class extends Component<{}, WithSplashScreenState> {
		state: WithSplashScreenState = {
			loading: true,
		};

		componentDidMount() {
			// Simulate a delay of 2 seconds (2000 milliseconds) for the splash screen
			setTimeout(() => {
				this.setState({ loading: false });
			}, 2000);
		}

		render() {
			return this.state.loading ? <SplashMessage /> : <WrappedComponent {...(this.props as T)} />;
		}
	};
}
