import React, { useEffect, useRef, useState } from "react";
import { Store } from "../stores/store";
// components
import AddTransaction from "../components/AddTransaction";
import GroupsScreen from "../components/GroupsScreen";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

export default function GroupsPage(): React.JSX.Element {
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
		async function checkAuth() {
			await store.checkAuth(navigate);
		}

		checkAuth();
	}, []);

	// do not render content if useer is not logged in
	if (!store.isLoggedIn) {
		console.log("No entry, token invalid or not found...");
		return <></>;
	}

	return (
		<div className="MainPage">
			<SideBar {...buttonProps} />
			<div className="mainScreen">
				<GroupsScreen />
			</div>
			<AddTransaction {...buttonProps} />
		</div>
	);
}
