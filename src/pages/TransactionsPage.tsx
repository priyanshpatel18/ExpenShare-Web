import React, { useEffect } from "react";
import { Store } from "../stores/store";
import { useNavigate } from "react-router-dom";
// components

import SideBar from "../components/SideBar";
import TransactionScreen from "../components/TransactionScreen";

export default function TransactionPage(): React.JSX.Element {
    const navigate = useNavigate();

    const store = Store();

    useEffect(() => {
        async function fetchUserData() {
            await store.getUserData(navigate);
            await store.getTransactions();
        }

        fetchUserData();
    }, []);

    // do not render content if useer is not logged in
    if (!store.userData) {
        console.log("No entry, token invalid or not found...");
        return <></>;
    }

    return (
        <div className="MainPage">
            <SideBar />
            <div className="mainScreen">
                <TransactionScreen />
            </div>
        </div>
    );
}
