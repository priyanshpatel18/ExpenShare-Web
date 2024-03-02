import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Groupmember, Store } from "../stores/store";
//  Images
import deletes from "../assets/deleteicon.png";
import backButton from "../assets/backButton.png";
import group from "../assets/group.png";
import axios from "axios";
import toast from "react-hot-toast";
import addmember from "../assets/addMember.png";
// components
import GroupTransactionScreen from "../components/GroupTransactionScreen";

export default function GroupHomeScreen(): React.JSX.Element {
    const navigate = useNavigate();
    const store = Store();
    const { groupId } = useParams<{ groupId?: string }>();
    const [members, setMembers] = useState<Groupmember[]>([]);
    const [screen, setscreen] = useState({
        transation: true,
        members: false,
        settleup: false,
        balances: false,
        totals: false,
    });

    // Dependency added to execute when members state changes
    const fetchMembers = async () => {
        try {
            if (!store.selectedgroup) return;
            const membersData = await Promise.all(
                store.selectedgroup?.members.map(async (memberId) => {
                    const response = await axios.get(
                        `/user/membersdetail/${memberId}`
                    );
                    return response.data;
                })
            );
            setMembers(membersData);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data.message);
            } else {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        // Fetch member details for each member in the group
        console.log("selected Group : ", store.selectedgroup);

        fetchMembers();
    }, []);


    return (
		<div className="GroupHomeScreen">
			<div className="header">
				<button
					className="backBtn"
					type="button"
					onClick={() => {
						navigate("/groups");
						store.setselectedGroup(undefined);
					}}
				>
					<img src={backButton} alt="backButton" />
				</button>

				<h2 className="title"></h2>
			</div>

			<div className="body">
				<div className="row1">
					<div className={`${store.selectedgroup === undefined ? "profile_s" : "profile"}`}>
						<img
							src={store.selectedgroup?.groupProfile || group}
							alt="avatar"
							className="profileImg"
						/>
					</div>
					<div className={`${store.selectedgroup === undefined ? "GroupName_s" : "GroupName"}`}>
						<p>Group Name</p>
						<h3 id="GroupName">{store.selectedgroup?.groupName}</h3>
					</div>
					<div className="addmemberimage">
						<img
							src={addmember}
							alt=""
							onClick={() => navigate(`/groups/${groupId}/addGroupMember`)}
						/>
					</div>
				</div>
				<div className={`${store.selectedgroup == undefined ? "slider_s" : "slider"}`}>
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
							onClick={() => {
								setscreen(() => ({
									transation: false,
									members: true,
									settleup: false,
									balances: false,
									totals: false,
								}));
								fetchMembers();
							}}
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
				<div className={`${store.selectedgroup === undefined ? "row2_s" : "row2"}`}>
					{screen.transation ? (
						<GroupTransactionScreen />
					) : screen.members ? (
						<div className="memberssccreen">
							<div className="memberscontainer">
								{members.length == 0 ? (
									<>
										<div className="membercont_s">
											<div className="memberprofilepic"></div>
											<div className="memberusername"></div>
										</div>{" "}
										<div className="membercont_s">
											<div className="memberprofilepic"></div>
											<div className="memberusername"></div>
										</div>{" "}
										<div className="membercont_s">
											<div className="memberprofilepic"></div>
											<div className="memberusername"></div>
										</div>
										<div className="membercont_s">
											<div className="memberprofilepic"></div>
											<div className="memberusername"></div>
										</div>
										<div className="membercont_s">
											<div className="memberprofilepic"></div>
											<div className="memberusername"></div>
										</div>
									</>
								) : (
									members.map((e: Groupmember, index) => (
										<div key={index} className="membercont">
											<div className="memberprofilepic">
												<img src={e.profilePicture} alt="member" />
											</div>
											<div className="memberusername">{e.userName}</div>
											<div className="deletemember">
												<img
													src={deletes}
													alt=""
													onClick={async () => {
														if (!store.selectedgroup) return;
														await store.handleRemoveMember(
															e.email,
															store.selectedgroup?._id,
															navigate,
														);
													}}
												/>
											</div>
										</div>
									))
								)}
							</div>
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
