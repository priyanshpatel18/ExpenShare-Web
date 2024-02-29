import React from "react";
import SideBar from "../components/SideBar";
import AddGroupMemberScreen from "../components/AddGroupMemberScreen";

export default function AddGroupMemberPage(): React.JSX.Element {
	return (
		<div className="MainPage">
			<div className="AddGroupMemberPageSideBar">
				<SideBar />
			</div>

			<div className="mainScreen">
				<AddGroupMemberScreen />
			</div>
		</div>
	);
}
