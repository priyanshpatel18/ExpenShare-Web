import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { GroupDocumentRequest, Store } from "../stores/store";
//  Images
import backButton from "../assets/backButton.png";
import defaultgroup from "../assets/defaultGroup.png";

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
            store.createGroup(formdata, navigate);
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
                        <label htmlFor="profile" className="profile">
                            <img
                                src={
                                    formik.values.groupProfile
                                        ? URL.createObjectURL(
                                              formik.values.groupProfile
                                          )
                                        : defaultgroup
                                }
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

                        <button className="btn" type="submit">
                            create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
