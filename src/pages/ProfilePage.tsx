import React, { useEffect, useRef, useState } from "react";
import { Store } from "../stores/store";
import { useNavigate } from "react-router-dom";
// components
import AddTransaction from "../components/AddTransaction";
import ProfileScreen from "../components/ProfileScreen";
import SideBar from "../components/SideBar";

export default function ProfilePage(): React.JSX.Element {
	const navigate = useNavigate();
	const myref = useRef<HTMLDivElement>(null);
	const [isclick, setisclick] = useState(false);
	const store = Store();

	const changepage = () => {
		if (myref.current) {
			myref.current.style.top = "0%";
			setisclick(!isclick);
		}
	};

	const changepage2 = () => {
		if (myref.current) {
			myref.current.style.top = "150%";
			setisclick(!isclick);
		}
	};

	const buttonProps = {
		myref,
		changepage2,
		changepage,
	};

	useEffect(() => {
		async function fetchUserData() {
			await store.getUserData(navigate);
			await store.getTransactions();
		}

		fetchUserData();
	}, []);


	// do not render content if useer is not logged in
	if (!store.getUserData) {
		console.log("No entry, token invalid or not found...");
		return <></>;
	}

	return (
		<div className="MainPage">
			<SideBar {...buttonProps}/>
			<div className="mainScreen">
				<ProfileScreen />
			</div>
			<AddTransaction {...buttonProps} />
		</div>
	);
}
