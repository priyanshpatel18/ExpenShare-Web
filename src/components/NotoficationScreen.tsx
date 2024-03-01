import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//  Images
import accept from "../assets/accept.png";
import backButton from "../assets/backButton.png";
import group from "../assets/defaultGroup.png";
import reject from "../assets/reject.png";
import { Store } from "../stores/store";

export default function NotoficationScreen(): React.JSX.Element {
	const navigate = useNavigate();
	const store = Store();

	useEffect(() => {
		store.getNotifications();
	}, []);

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
					<div className="notifications row2">
						{store.notifications.map((notificaion, index) => {
							return (
								<div key={index} className="notification">
									<div className="profile">
										<img src={group} alt="Group profile" />
									</div>
									<div className="message">
										You've been invited to join <span>{notificaion.groupName}</span>
									</div>

									<div className="buttons">
										<button
											type="button"
											onClick={() =>
												store.handleRequest(
													"accept",
													notificaion.requestId,
													notificaion.groupId,
													navigate,
												)
											}
										>
											<img src={accept} alt="accept" />
										</button>
										<button
											type="button"
											onClick={() =>
												store.handleRequest(
													"reject",
													notificaion.requestId,
													notificaion.groupId,
													navigate,
												)
											}
										>
											<img src={reject} alt="reject" />
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</form>
			</div>
		</div>
	);
}
