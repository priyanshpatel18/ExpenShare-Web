import React from "react";
import SideBar from "../components/SideBar";
import NotoficationScreen from "../components/NotoficationScreen";
// imgaes

export default function NotoficationPage(): React.JSX.Element {
	return (
		<div className="MainPage">
			<div className="AccountPageSideBar">
				<SideBar />
			</div>

			<div className="mainScreen">
				<NotoficationScreen />
			</div>
		</div>
	);
}
