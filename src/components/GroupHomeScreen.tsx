import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../stores/store";
//  Images
import backButton from "../assets/backButton.png";
import group from "../assets/group.png";

export default function GroupHomeScreen(): React.JSX.Element {
    const navigate = useNavigate();
    const store = Store();
    const { groupId } = useParams<{ groupId?: string }>();
    const [screen, setscreen] = useState({
        transation: true,
        members: false,
        settleup: false,
        balances: false,
        totals: false,
    });
    return (
        <div className="GroupHomeScreen">
            <div className="header">
                <button
                    className="backBtn"
                    type="button"
                    onClick={() => {
                        navigate("/groups");
                        store.setselectedGroup([]);
                    }}
                >
                    <img src={backButton} alt="backButton" />
                </button>

                <h2 className="title"></h2>
            </div>

            <div className="body">
                <div className="row1">
                    <div
                        className={`${
                            store.selectedgroup.length == 0
                                ? "profile_s"
                                : "profile"
                        }`}
                    >
                        <img
                            src={store.selectedgroup[0]?.groupProfile || group}
                            alt="avatar"
                            className="profileImg"
                        />
                    </div>
                    <div
                        className={`${
                            store.selectedgroup.length == 0
                                ? "GroupName_s"
                                : "GroupName"
                        }`}
                    >
                        <p>Group Name</p>
                        <h3 id="GroupName">
                            {store.selectedgroup[0]?.groupName || group}
                        </h3>
                    </div>
                </div>
                <div
                    className={`${
                        store.selectedgroup.length == 0 ? "slider_s" : "slider"
                    }`}
                >
                    <div>
                        <button
                            className={screen.transation ? "selectedbtn" : ""}
                            onClick={() =>
                                setscreen(() => ({
                                    transation: true,
                                    members: false,
                                    settleup: false,
                                    balances: false,
                                    totals: false,
                                }))
                            }
                        >
                            Transaction
                        </button>
                        <button
                            className={screen.members ? "selectedbtn" : ""}
                            onClick={() =>
                                setscreen(() => ({
                                    transation: false,
                                    members: true,
                                    settleup: false,
                                    balances: false,
                                    totals: false,
                                }))
                            }
                        >
                            Members
                        </button>
                        <button
                            className={screen.settleup ? "selectedbtn" : ""}
                            onClick={() =>
                                setscreen(() => ({
                                    transation: false,
                                    members: false,
                                    settleup: true,
                                    balances: false,
                                    totals: false,
                                }))
                            }
                        >
                            Settle up
                        </button>{" "}
                        <button
                            className={screen.balances ? "selectedbtn" : ""}
                            onClick={() =>
                                setscreen(() => ({
                                    transation: false,
                                    members: false,
                                    settleup: false,
                                    balances: true,
                                    totals: false,
                                }))
                            }
                        >
                            Balances
                        </button>
                        <button
                            className={screen.totals ? "selectedbtn" : ""}
                            onClick={() =>
                                setscreen(() => ({
                                    transation: false,
                                    members: false,
                                    settleup: false,
                                    balances: false,
                                    totals: true,
                                }))
                            }
                        >
                            Totals
                        </button>
                    </div>
                </div>
                <div
                    className={`${
                        store.selectedgroup.length == 0 ? "row2_s" : "row2"
                    }`}
                >
                    {screen.transation ? (
                        <div>transaction</div>
                    ) : screen.members ? (
                        <div>
                            members{" "}
                            <button
                                type="button"
                                className="addMemberBtn"
                                onClick={() =>
                                    navigate(
                                        `/groups/${groupId}/addGroupMember`
                                    )
                                }
                            >
                                Add Group Members
                            </button>
                        </div>
                    ) : screen.settleup ? (
                        <div>settleup</div>
                    ) : screen.totals ? (
                        <div>totals</div>
                    ) : screen.balances ? (
                        <div>balances</div>
                    ) : null}
                </div>

                {/* <div className="addGroupMembers row2"></div> */}
            </div>
        </div>
    );
}
