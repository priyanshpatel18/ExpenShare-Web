import React from "react";
import SideBar from "../components/SideBar";
import AccountScreen from "../components/AccountScreen";
// imgaes

export default function AccountPage(): React.JSX.Element {
	return (
		<div className="MainPage">
			<div className="AccountPageSideBar">
				<SideBar className="AccountPageSideBar" />
			</div>

			<div className="mainScreen">
				<AccountScreen />
			</div>
		</div>
	);
}
