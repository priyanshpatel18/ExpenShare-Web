import React from "react";
import SideBar from "../components/SideBar";
import GroupHomeScreen from "../components/GroupHomeScreen";
// imgaes

export default function GroupHomePage(): React.JSX.Element {
	return (
		<div className="MainPage">
			<div className="GroupHomePageSideBar">
				<SideBar />
			</div>

			<div className="mainScreen">
				<GroupHomeScreen />
			</div>
		</div>
	);
}
