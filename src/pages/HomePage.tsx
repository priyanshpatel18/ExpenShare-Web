import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../stores/store";
// components
import SideBar from "../components/SideBar";
import HomeScreen from "../components/HomeScreen";
import AddTransaction from "../components/AddTransaction";

export default function HomePage(): React.JSX.Element {
	const navigate = useNavigate();
	const store = Store();
	const myref = useRef<HTMLDivElement>(null);
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
	}, []);

	// do not render content if useer is not logged in
	if (!store.isLoggedIn) {
		console.log("No entry, token invalid or not found...");
		return <></>;
	}
	
	useEffect(() => {
		async function getUserData() {
			await store.getUserData(navigate);
		}

		getUserData();
		async function getUserTransactions() {
			await store.getTransactions();
		}
		getUserTransactions();
	}, []);


	return (
		<div className="MainPage">
			<SideBar {...buttonProps} />
			<div className="mainScreen">
				<HomeScreen />
			</div>
			<AddTransaction {...buttonProps} />
		</div>
	);
}
