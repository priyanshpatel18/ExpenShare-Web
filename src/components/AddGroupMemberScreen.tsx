import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store, UserObject } from "../stores/store";
import { socket } from "../utils/socket";
import toast from "react-hot-toast";
//  Images
import backButton from "../assets/backButton.png";
import profile from "../assets/profile.png";
import greenTick from "../assets/greenTick.png";
import searchIcon from "../assets/searchIcon.png";

export default function AddGroupMemberScreen(): React.JSX.Element {
    const { groupId } = useParams<{ groupId?: string }>();
    const navigate = useNavigate();
    const store = Store();
    const [textInput, setTextInput] = useState<string>("");
    const [selectedUsers, setSelectedUsers] = useState<UserObject[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserObject[]>([]);

    useEffect(() => {
        async function getAllUsers() {
            await store.getAllUsers();
        }

        getAllUsers();
    }, []);

    useEffect(() => {
        socket.on("requestSent", (message: string) => {
            toast.success(message);
        });

        socket.on("filteredUsers", (users: UserObject[]) => {
            const filtered = users.filter(
                (user) =>
                    !selectedUsers.find(
                        (selectedUser) =>
                            selectedUser.userName === user.userName
                    ) &&
                    user.userName !== store.userData?.userName 
                    &&
                    !store.selectedgroup?.members.some(
                        (member) => member === user.userName
                    )
            );

            const merged = [...selectedUsers, ...filtered];
            setFilteredUsers(merged);
        });

        return () => {
            socket.off("filteredUsers");
            socket.off("requestSent");
        };
    }, [selectedUsers]);

    function handleChange(e: string) {
        setTextInput(e);
        if (e.trim() !== "") {
            socket.emit("getUsers", e.toLowerCase());
        } else {
            setFilteredUsers(selectedUsers);
        }
    }

    async function handleSendRequest() {
        const data = {
            selectedUsers: selectedUsers.map((user) => user.userName),
            groupId: store.selectedgroup?._id,
            groupName: store.selectedgroup?.groupName,
        };

        socket.emit("sendRequest", data);
        navigate("/groups");
    }

    function handleSelectUser(user: UserObject) {
        // Check if the user is already in selectedUsers
        const isSelected = selectedUsers.some(
            (selectedUser) => selectedUser.userName === user.userName
        );

        if (isSelected) {
            // If selected, remove the user from selectedUsers
            const updatedSelectedUsers = selectedUsers.filter(
                (selectedUser) => selectedUser.userName !== user.userName
            );
            setSelectedUsers(updatedSelectedUsers);
        } else {
            // If not selected, add the user to selectedUsers
            setSelectedUsers((prevSelectedUsers) => [
                ...prevSelectedUsers,
                user,
            ]);
        }
    }

    console.log("Selected Users : ", selectedUsers);

    return (
		<div className="AddGroupMemberScreen">
			<div className="header">
				<button className="backBtn" type="button" onClick={() => navigate(`/groups/:${groupId}`)}>
					<img src={backButton} alt="backButton" />
				</button>

				<h2 className="title">Add Members</h2>
			</div>

			<div className="body">
				<form className="addGroupMemberForm" onSubmit={handleSendRequest}>
					<div className="serch">
						<input
							type="text"
							placeholder="Serch For Friends"
							value={textInput}
							onChange={(e) => handleChange(e.target.value)}
						/>
						<div className="icon">
							<img src={searchIcon} alt="searchIcon" />
						</div>
					</div>

					<div className="addGroupMembers row2">
						{filteredUsers.map((user, index) => {
							return (
								<div
									key={index}
									className="userProfile"
									onClick={() => handleSelectUser(user)}
								>
									<div>
										<div className="profileImg">
											<img src={user.profilePicture || profile} alt="user profile" />
										</div>
										<div className="details">{user.userName}</div>
									</div>
									<div className="tickActive">
										{selectedUsers.includes(user) && (
											<img src={greenTick} alt="greenTick" />
										)}
									</div>
								</div>
							);
						})}
					</div>
					<button type="submit" className="btn">
						send request
					</button>
				</form>
			</div>
		</div>
	);
}
