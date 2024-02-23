import React, { useEffect, useRef, useState } from "react";
import { Store } from "../stores/store";
import { useNavigate } from "react-router-dom";
// components
import AddTransaction from "../components/AddTransaction";
import SideBar from "../components/SideBar";
import TransactionScreen from "../components/TransactionScreen";

export default function TransactionPage(): React.JSX.Element {
	const navigate = useNavigate();
	const myref = useRef<HTMLDivElement>(null);
	const store = Store();
	const [isclick, setisclick] = useState(false);

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
	})

	// do not render content if useer is not logged in
	if (!store.isLoggedIn) {
		console.log("No entry, token invalid or not found...");
		return <></>;
	}

	return (
		<div className="MainPage">
			<SideBar {...buttonProps} />
			<div className="mainScreen">
				<TransactionScreen />
			</div>
			<AddTransaction {...buttonProps} />
		</div>
	);
}
