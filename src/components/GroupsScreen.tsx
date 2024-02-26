import React from "react";
import group from "../assets/group.png";
import { useNavigate } from "react-router-dom";

export default function GroupsScreen(): React.JSX.Element {
	const navigate = useNavigate();

	return (
		<div className="GroupsScreen">
			<div className="header">
				<h2>Groups</h2>
			</div>
				<div className="btnWrapper">
					<button className="addGroupBtn2" type="button" onClick={() => navigate("/addGroup")}>
						ADD A GROUP
					</button>
				</div>
			<div className="body">
				<div className="Group">
					<div className="profile">
						<img src={group} alt="GroupProfile" className="groupProfile" />
					</div>
					<h3 className="name">TRIPSTERS</h3>
					<div className="members">
						<p>Members</p>
						<span>10</span>
					</div>
				</div>
				<div className="Group">
					<div className="profile">
						<img src={group} alt="GroupProfile" className="groupProfile" />
					</div>
					<h3 className="name">TRIPSTERS</h3>
					<div className="members">
						<p>Members</p>
						<span>10</span>
					</div>
				</div>
				<div className="Group">
					<div className="profile">
						<img src={group} alt="GroupProfile" className="groupProfile" />
					</div>
					<h3 className="name">TRIPSTERS</h3>
					<div className="members">
						<p>Members</p>
						<span>10</span>
					</div>
				</div>
				<div className="Group">
					<div className="profile">
						<img src={group} alt="GroupProfile" className="groupProfile" />
					</div>
					<h3 className="name">TRIPSTERS</h3>
					<div className="members">
						<p>Members</p>
						<span>10</span>
					</div>
				</div>
				<div className="Group">
					<div className="profile">
						<img src={group} alt="GroupProfile" className="groupProfile" />
					</div>
					<div className="name">TRIPSTERS</div>
				</div>
				<div className="Group">
					<div className="profile">
						<img src={group} alt="GroupProfile" className="groupProfile" />
					</div>
					<div className="name">TRIPSTERS</div>
				</div>
				<div className="Group">
					<div className="profile">
						<img src={group} alt="GroupProfile" className="groupProfile" />
					</div>
					<div className="name">TRIPSTERS</div>
				</div>
			</div>
		</div>
	);
}
