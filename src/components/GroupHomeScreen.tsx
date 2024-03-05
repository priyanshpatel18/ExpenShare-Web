import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
<<<<<<< HEAD
import { GroupUser, Store } from "../stores/store";
//  imgs
import deletes from "../assets/deleteicon.png";
import backButton from "../assets/backButton.png";
import group from "../assets/group.png";
=======
import { Groupmember, Store } from "../stores/store";
//  Images
>>>>>>> 2e3fc6db603557d3ec7bd8a878fd48cb82000eac
import axios from "axios";
import droupup from "../assets/dropUp.png";
import toast from "react-hot-toast";

import defaultuser from "../assets/profile.png";
import addmember from "../assets/addMember.png";
import backButton from "../assets/backButton.png";
import deletes from "../assets/deleteicon.png";
import group from "../assets/group.png";
// components
import GroupTransactionScreen from "../components/GroupTransactionScreen";

export default function GroupHomeScreen(): React.JSX.Element {
    const navigate = useNavigate();
    const store = Store();
    const { groupId } = useParams<{ groupId?: string }>();
    // const [members, setMembers] = useState<Groupmember[]>([]);
    const [screen, setscreen] = useState({
        transation: true,
        members: false,
        settleup: false,
        balances: false,
        totals: false,
    });

    // Dependency added to execute when members state changes
    // const fetchMembers = async () => {
    //     try {
    //         if (!store.selectedgroup) return;
    //         const membersData = await Promise.all(
    //             store.selectedgroup?.members.map(async (memberId) => {
    //                 const response = await axios.get(
    //                     `/user/membersdetail/${memberId}`
    //                 );
    //                 return response.data;
    //             })
    //         );
    //         setMembers(membersData);
    //     } catch (err) {
    //         if (axios.isAxiosError(err)) {
    //             toast.error(err.response?.data.message);
    //         } else {
    //             console.error(err);
    //         }
    //     }
    // };

<<<<<<< HEAD
    useEffect(() => {
        // Fetch member details for each member in the group
        // fetchMembers();
        store.getSelectedGroupTransactions();
    }, [store.selectedgroup]);

    const calculateTotalBalance = (userId: string) => {
        let totalBalance = 0;
        store.selectedgroup?.balances.forEach((balance) => {
            if (balance.creditor?._id === userId) {
                totalBalance += balance.amount;
            } else if (balance.debtor?._id === userId) {
                totalBalance -= balance.amount;
            }
        });

        return totalBalance.toFixed(2);
    };

    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    // console.log("selected Group : ", store.selectedgroup);
    // console.log("selected Group Transactions : ", store.selectedGroupTransactions);

=======
>>>>>>> 2e3fc6db603557d3ec7bd8a878fd48cb82000eac
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
                    <div
                        className={`${
                            store.selectedgroup === undefined
                                ? "profile_s"
                                : "profile"
                        }`}
                    >
                        <img
                            src={store.selectedgroup?.groupProfile || group}
                            alt="avatar"
                            className="profileImg"
                        />
                    </div>
                    <div
                        className={`${
                            store.selectedgroup === undefined
                                ? "GroupName_s"
                                : "GroupName"
                        }`}
                    >
                        <p>Group Name</p>
                        <h3 id="GroupName">{store.selectedgroup?.groupName}</h3>
                    </div>
                    <div className="addmemberimg">
                        <img
                            src={addmember}
                            alt=""
                            onClick={() =>
                                navigate(`/groups/${groupId}/addGroupMember`)
                            }
                        />
                    </div>
                </div>
                <div
                    className={`${
                        store.selectedgroup == undefined ? "slider_s" : "slider"
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
                            onClick={() => {
                                setscreen(() => ({
                                    transation: false,
                                    members: true,
                                    settleup: false,
                                    balances: false,
                                    totals: false,
                                }));
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
                <div
                    className={`${
                        store.selectedgroup === undefined ? "row2_s" : "row2"
                    }`}
                >
                    {screen.transation ? (
                        <GroupTransactionScreen />
                    ) : screen.members ? (
                        <div className="memberssccreen">
                            <div className="memberscontainer">
                                {store.selectedgroup?.members.length == 0 ? (
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
                                    store.selectedgroup?.members.map(
                                        (e: GroupUser, index) => (
                                            <div
                                                key={index}
                                                className="membercont"
                                            >
                                                <div className="memberprofilepic">
                                                    <img
                                                        src={e?.profilePicture}
                                                        alt="member"
                                                    />
                                                </div>
                                                <div className="memberusername">
                                                    {e.userName}
                                                </div>
                                                <div className="deletemember">
                                                    <img
                                                        src={deletes}
                                                        alt=""
                                                        onClick={async () => {
                                                            if (
                                                                !store.selectedgroup
                                                            )
                                                                return;
                                                            await store.handleRemoveMember(
                                                                e.email,
                                                                store
                                                                    .selectedgroup
                                                                    ?._id,
                                                                navigate
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        </div>
                    ) : screen.settleup ? (
                        <div>settleup</div>
                    ) : screen.totals ? (
                        <div>totals</div>
                    ) : screen.balances ? (
                        <div className="userBalanceContainer">
                            {" "}
                            {store.selectedgroup?.members.map(
                                (member, index) => (
                                    <div key={index} className="userBalance">
                                        <div
                                            className="userBalancesecond"
                                            style={{
                                                flexDirection: "row",
                                                gap: 10,
                                                alignItems: "center",
                                            }}
                                        >
                                            <div className="userbalancethird">
                                                <div className="profilepic">
                                                    {member.profilePicture ? (
                                                        <img
                                                            className="profilePicture"
                                                            src={
                                                                member.profilePicture
                                                            }
                                                        />
                                                    ) : (
                                                        <img
                                                            className="profilePicture"
                                                            src={defaultuser}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="balanceText">
                                                        {store.userData
                                                            ?.userName ===
                                                        member.userName
                                                            ? "you "
                                                            : member.userName}
                                                        {Number(
                                                            calculateTotalBalance(
                                                                member._id
                                                            )
                                                        ) !== 0 ? (
                                                            <>
                                                                <p>
                                                                    {Number(
                                                                        calculateTotalBalance(
                                                                            member._id
                                                                        )
                                                                    ) > 0
                                                                        ? ` ${
                                                                              store
                                                                                  .userData
                                                                                  ?.userName ===
                                                                              member.userName
                                                                                  ? "get"
                                                                                  : "gets"
                                                                          } `
                                                                        : ` ${
                                                                              store
                                                                                  .userData
                                                                                  ?.userName ===
                                                                              member.userName
                                                                                  ? "owe"
                                                                                  : "owes"
                                                                          } `}
                                                                    <p
                                                                        style={{
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                Number(
                                                                                    calculateTotalBalance(
                                                                                        member._id
                                                                                    )
                                                                                ) >=
                                                                                0
                                                                                    ? "#00a200"
                                                                                    : "red",
                                                                        }}
                                                                    >
                                                                        {" "}
                                                                        {`₹${Math.abs(
                                                                            Number(
                                                                                calculateTotalBalance(
                                                                                    member._id
                                                                                )
                                                                            )
                                                                        )} `}
                                                                    </p>
                                                                    in
                                                                    totalBalance
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <p>{` ${
                                                                store.userData
                                                                    ?.userName ===
                                                                member.userName
                                                                    ? "are"
                                                                    : "is"
                                                            } settled up`}</p>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    src={droupup}
                                                    className="dropDownIcon"
                                                    onClick={() => {
                                                        setShowDropDown(
                                                            !showDropDown
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {showDropDown && (
                                            <div className="balanceContainer">
                                                {store.selectedgroup?.balances.map(
                                                    (balance, index) => (
                                                        <div key={index}>
                                                            {balance.debtor
                                                                ?._id ===
                                                                member._id && (
                                                                <div className="dropDownUser">
                                                                    <img
                                                                        className="dropDownProfile"
                                                                        src={
                                                                            balance
                                                                                .creditor
                                                                                .profilePicture
                                                                                ? balance
                                                                                      .creditor
                                                                                      .profilePicture
                                                                                : defaultuser
                                                                        }
                                                                    />
                                                                    <p className="dropDownText">
                                                                        {`${balance.debtor.userName} owes ${balance.creditor.userName} `}
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            fontWeight:
                                                                                "bold",
                                                                            color: "red",
                                                                        }}
                                                                    >
                                                                        ₹
                                                                        {
                                                                            balance.amount
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {balance.creditor
                                                                ?._id ===
                                                                member._id && (
                                                                <div className="dropDownUser">
                                                                    <img
                                                                        className="dropDownProfile"
                                                                        src={
                                                                            balance
                                                                                ?.debtor
                                                                                .profilePicture
                                                                                ? balance
                                                                                      .debtor
                                                                                      .profilePicture
                                                                                : defaultuser
                                                                        }
                                                                    />
                                                                    <p className="dropDownText">
                                                                        {`${balance.creditor.userName} gets back `}
                                                                        <p
                                                                            style={{
                                                                                fontWeight:
                                                                                    "bold",
                                                                                color: "#00a200",
                                                                            }}
                                                                        >
                                                                            ₹
                                                                            {
                                                                                balance.amount
                                                                            }
                                                                        </p>
                                                                        {` from ${balance.debtor.userName}`}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    ) : null}
                </div>

                {/* <div className="addGroupMembers row2"></div> */}
            </div>
        </div>
    );
}
