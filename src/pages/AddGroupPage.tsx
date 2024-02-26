import React from "react";
import SideBar from "../components/SideBar";
import AddGroupScreen from "../components/AddGroupScreen";

export default function AddGroupPage(): React.JSX.Element {
	return (
		<div className="MainPage">
			<div className="AddGroupPageSideBar">
				<SideBar />
			</div>

			<div className="mainScreen">
				<AddGroupScreen />
			</div>
		</div>
	);
}
