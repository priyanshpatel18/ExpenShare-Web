import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//  Images
import backButton from "../assets/backButton.png";
import profile from "../assets/profile.png";
import greenTick from "../assets/greenTick.png";
import searchIcon from "../assets/searchIcon.png";
import { Store } from "../stores/store";

export default function AddGroupMemberScreen(): React.JSX.Element {
	const navigate = useNavigate();
	const store = Store();

	const [filter, setFilter] = useState("");
 
	useEffect(() => {
		async function getAllUsers( ) {
			await store.getAllUsers();
		}

		getAllUsers();
	}, [])

	console.log(store.allUsers);
	
	return (
		<div className="AddGroupMemberScreen">
			<div className="header">
				<button className="backBtn" type="button" onClick={() => navigate("/groupHome")}>
					<img src={backButton} alt="backButton" />
				</button>

				<h2 className="title">Add Members</h2>
			</div>

			<div className="body">
				<form className="addGroupMemberForm">
					<div className="serch">
						<input type="text" placeholder="Serch For Friends" onChange={(e) => setFilter(e.target.value)}/>
						<div className="icon">
							<img src={searchIcon} alt="searchIcon" />
						</div>
					</div>

					<div className="addGroupMembers row2">
						{store.allUsers.map((user, index) => {

							if (
								!(user.email.includes(filter) || user.userName.includes(filter)) ||
								filter == ""
							)
								return;

							return (
								<div key={index} className="userProfile" >
									<div>
										<div className="profileImg">
											<img src={user.profilePicture || profile} alt="user profile" />
										</div>
										<div className="details">{user.userName}</div>
									</div>
									<div className="tick">
										<img src={greenTick} alt="greenTick" />
									</div>
								</div>
							);
						})}
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
					</div>
					<button type="submit" className="btn">
						send request
					</button>
				</form>
			</div>
		</div>
	);
}
