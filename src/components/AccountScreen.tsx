import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserFormValidation } from "../helper/inputValidation";
import { Store, updateUserFormData } from "../stores/store";
// images
import backButton from "../assets/backButton.png";
import doneButton from "../assets/doneButton.png";
import profile from "../assets/profile.png";

export default function AccountScreen(): React.JSX.Element {
	const navigate = useNavigate();
	const store = Store();

	const formikUserData = useFormik<updateUserFormData>({
		initialValues: {
			userName: store.userData?.userName || "",
			profilePicture: null,
		},
		validate: updateUserFormValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: (values) => {
			console.log(values);
			const formData = new FormData();
			formData.append("userName", values.userName);
			formData.append("profilePicture", values.profilePicture as File);
			store.updateUser(formData, navigate);
		},
	});

	useEffect(() => {
		formikUserData.setValues({ ...formikUserData.values, userName: store.userData?.userName || "" });
	}, [store.userData]);

	const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		formikUserData.setValues({
			...formikUserData.values,
			profilePicture: e.target.files ? e.target.files[0] : null,
		});
	};

	return (
		<div className="AccountScreen">
			<div className="header">
				<button className="backBtn" type="button" onClick={() => navigate("/profile")}>
					<img src={backButton} alt="backButton" />
				</button>

				<h2 className="title">Account</h2>
			</div>

			<div className="body">
				<form className="profileChange" onSubmit={formikUserData.handleSubmit}>
					<label htmlFor="profile" className="profile">
						<img
							src={
								formikUserData.values.profilePicture
									? URL.createObjectURL(formikUserData.values.profilePicture)
									: store.userData?.profilePicture
									? store.userData?.profilePicture
									: profile
							}
							alt="avatar"
							className="profileImg"
						/>
						<input type="file" name="profile" id="profile" onChange={onUpload} />
					</label>
					<div className="userName">
						<label htmlFor="userName">User Name</label>
						<input
							type="text"
							id="userName"
							placeholder="User Name"
							{...formikUserData.getFieldProps("userName")}
							required
						/>
					</div>
					<button type="submit" className="doneBtn">
						<img src={doneButton} alt="doneButton" />
					</button>
				</form>

				<div className="userEmail">
					<h3>Email</h3>
					<p>{store.userData?.email || "email"}</p>
				</div>

				<form className="passwordChange" >
					<h3>Change Password</h3>
					<p>Leave empty if you don't want to change it.</p>
					<div className="inputs">
						<input
							type="password"
							placeholder="Password"
							required
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							required
						/>
					</div>
					<button type="submit">Change Password</button>
				</form>

				<div className="deleteAccountChange">
					<button type="button">Delete Account</button>
				</div>
			</div>
		</div>
	);
}
