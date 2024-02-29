import React from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../stores/store";
//  Images
import backButton from "../assets/backButton.png";
import group from "../assets/group.png";

export default function GroupHomeScreen(): React.JSX.Element {
	const navigate = useNavigate();
	const store = Store();

	return (
		<div className="GroupHomeScreen">
			<div className="header">
				<button className="backBtn" type="button" onClick={() => navigate("/groups")}>
					<img src={backButton} alt="backButton" />
				</button>

				<h2 className="title"></h2>
			</div>

			<div className="body">
				<div className="row1">
					<div className="profile">
						<img
							src={store.activeGroup?.groupProfile || group}
							alt="avatar"
							className="profileImg"
						/>
					</div>
					<div className="GroupName">
						<p>Group Name</p>
						<h3 id="GroupName">{store.activeGroup?.groupName}</h3>
					</div>
				</div>

				<button type="button" className="addMemberBtn" onClick={() => navigate("/addGroupMember")}>
					Add Group Members
				</button>

				<div className="addGroupMembers row2"></div>
			</div>
		</div>
	);
}
