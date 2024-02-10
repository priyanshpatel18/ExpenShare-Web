import { Component, ComponentType } from "react";
import logo from "../assets/APP-LOGO-LIGHT-THEME.png";

interface WithSplashScreenState {
	loading: boolean;
}

export default function withSplashScreen<T extends object>(WrappedComponent: ComponentType<T>) {
	return class extends Component<object, WithSplashScreenState> {
		state: WithSplashScreenState = {
			loading: true,
		};

		componentDidMount() {
			// Simulate a delay of 2 seconds (2000 milliseconds) for the splash screen
			setTimeout(() => {
				this.setState({ loading: false });
			}, 2500);
		}

		render() {
			return this.state.loading ? (
				<div className="splashScreenPage">
					<div className="img">
						<img src={logo} className="App-logo" alt="logo" />
					</div>
				</div>
			) : <WrappedComponent {...(this.props as T)} />;
		}
	};
}
