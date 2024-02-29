import React from "react";
import { useNavigate } from "react-router-dom";
//  Images
import backButton from "../assets/backButton.png";
import greenTick from "../assets/greenTick.png";
import profile from "../assets/profile.png";

export default function NotoficationScreen(): React.JSX.Element {
	const navigate = useNavigate();

	return (
		<div className="AddGroupMemberScreen">
			<div className="header">
				<button className="backBtn" type="button" onClick={() => navigate("/")}>
					<img src={backButton} alt="backButton" />
				</button>

				<h2 className="title">Notifications</h2>
			</div>

			<div className="body">
				<form className="addGroupMemberForm">
					<div className="addGroupMembers row2">
						<div className="userProfile">
							<div>
								<div className="profileImg">
									<img src={profile} alt="" />
								</div>
								<div className="details">User Name</div>
							</div>
							<div className="tickActive">
								<img src={greenTick} alt="greenTick" />
							</div>
						</div>
						<div className="userProfile">
							<div>
								<div className="profileImg">
									<img src={profile} alt="" />
								</div>
								<div className="details">User Name</div>
							</div>
							<div className="tick">
								<img src={greenTick} alt="greenTick" />
							</div>
						</div>
						<div className="userProfile">
							<div>
								<div className="profileImg">
									<img src={profile} alt="" />
								</div>
								<div className="details">User Name</div>
							</div>
							<div className="tick">
								<img src={greenTick} alt="greenTick" />
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
