import React from "react";
// import group from "../assets/group.png";
import { useNavigate } from "react-router-dom";
import { Store } from "../stores/store";
import defaultgroup from "../assets/defaultGroup.png";
export default function GroupsScreen(): React.JSX.Element {
    const navigate = useNavigate();
    const store = Store();

    const handleGroupClick = (groupId: string) => {
        navigate(`/groups/${groupId}`); // Navigate to the dynamic route with group ID
    };
    return (
        <div className="GroupsScreen">
            <div className="header">
                <h2>Groups</h2>
            </div>
            <div className="btnWrapper">
                <button
                    className="addGroupBtn2"
                    type="button"
                    onClick={() => navigate("/addGroup")}
                >
                    ADD A GROUP
                </button>
            </div>
            <div className="body">
                {store.groups?.map((group, key) => (
                    <div
                        className="Group"
                        onClick={() => handleGroupClick(group._id)}
                        key={key}
                    >
                        <div className="profile">
                            <img
                                src={group.groupProfile || defaultgroup}
                                alt="GroupProfile"
                                className="groupProfile"
                            />
                        </div>
                        <h3 className="name">{group.groupName}</h3>
                        <div className="members">
                            <p>Members</p>
                            <span>{group.members.length}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
