import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//  Images
import backButton from "../assets/backButton.png";
import doneButton from "../assets/doneButton.png";
import profile from "../assets/profile.png";
import group from "../assets/group.png";
import greenTick from "../assets/greenTick.png";
import searchIcon from "../assets/searchIcon.png";
import { GroupDocumentRequest, Store } from "../stores/store";
import { useFormik } from "formik";

export default function AddGroupScreen(): React.JSX.Element {
    const store = Store();
    const navigate = useNavigate();

    const formik = useFormik<GroupDocumentRequest>({
        initialValues: {
            groupName: "",
            groupProfile: null,
            _id: "",
            createdBy: undefined,
            members: [],
            groupExpenses: [],
            totalExpense: 0,
            category: "",
        },
        onSubmit: async (values) => {
            const formdata = new FormData();
            formdata.append("groupName", values.groupName);
            formdata.append("groupProfile", values.groupProfile || "");
            formdata.append("category", "");
            await store.createGroup(formdata, navigate);
        },
    });

    return (
        <div className="AddGroupScreen">
            <div className="header">
                <button className="backBtn" onClick={() => navigate("/groups")}>
                    <img src={backButton} alt="backButton" />
                </button>

                <h2 className="title">New Group</h2>
            </div>

            <div className="body">
                <form className="addGroupForm" onSubmit={formik.handleSubmit}>
                    <div className="row1">
                        <button type="submit" className="doneBtn">
                            <img src={doneButton} alt="doneButton" />
                        </button>
                        <label htmlFor="profile" className="profile">
                            <img
                                src={group}
                                alt="avatar"
                                className="profileImg"
                            />
                            <input
                                type="file"
                                name="profile"
                                id="profile"
                                onChange={(e) =>
                                    formik.setValues({
                                        ...formik.values,
                                        groupProfile: e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    })
                                }
                            />
                        </label>
                        <div className="GroupName">
                            <label htmlFor="GroupName">Group Name</label>
                            <input
                                type="text"
                                id="GroupName"
                                placeholder="Group Name"
                                {...formik.getFieldProps("groupName")}
                                required
                            />
                        </div>
                    </div>

                    <div className="serch">
                        <input type="text" placeholder="Serch For Friends" />
                        <div className="icon">
                            <img src={searchIcon} alt="searchIcon" />
                        </div>
                    </div>

                    <div className="addGroupMembers row2">
                        <div className="userProfile">
                            <div className="profileImg">
                                <img src={profile} alt="" />
                            </div>
                            <div className="details">User Name</div>
                            <div className="tick">
                                <img src={greenTick} alt="greenTick" />
                            </div>
                        </div>
                        <div className="userProfile">
                            <div className="profileImg">
                                <img src={profile} alt="" />
                            </div>
                            <div className="details">User Name</div>
                            <div className="tick"></div>
                        </div>
                        <div className="userProfile">
                            <div className="profileImg">
                                <img src={profile} alt="" />
                            </div>
                            <div className="details">User Name</div>
                            <div className="tick"></div>
                        </div>
                        <div className="userProfile">
                            <div className="profileImg">
                                <img src={profile} alt="" />
                            </div>
                            <div className="details">User Name</div>
                            <div className="tick"></div>
                        </div>
                        <div className="userProfile">
                            <div className="profileImg">
                                <img src={profile} alt="" />
                            </div>
                            <div className="details">User Name</div>
                            <div className="tick"></div>
                        </div>
                        <div className="userProfile">
                            <div className="profileImg">
                                <img src={profile} alt="" />
                            </div>
                            <div className="details">User Name</div>
                            <div className="tick"></div>
                        </div>
                        <div className="userProfile">
                            <div className="profileImg">
                                <img src={profile} alt="" />
                            </div>
                            <div className="details">User Name</div>
                            <div className="tick"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
