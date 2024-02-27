import React, { useEffect, useState } from "react";
import group from "../assets/group.png";
import { useNavigate } from "react-router-dom";
import { Store, GroupDocument } from "../stores/store";

export default function GroupsScreen(): React.JSX.Element {
    const navigate = useNavigate();
    const store = Store();

    const [groups, setgroups] = useState<GroupDocument[]>();

    useEffect(() => {
        async function fetchgroupData() {
            await store.handleFetchGroups();
        }
        console.log(store.groups);
        setgroups(store.groups);
        fetchgroupData();
    }, []);

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
                {groups?.map((group) => (
                    <div className="Group">
                        <div className="profile">
                            <img
                                src={group.groupProfile}
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
