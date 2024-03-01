import React from "react";

// components

import SideBar from "../components/SideBar";
import TransactionScreen from "../components/TransactionScreen";

export default function TransactionPage(): React.JSX.Element {
    // do not render content if useer is not logged in
    // if (!store.userData) {
    //     console.log("No entry, token invalid or not found...");
    //     return <></>;
    // }

    return (
        <div className="MainPage">
            <SideBar />
            <div className="mainScreen">
                <TransactionScreen />
            </div>
        </div>
    );
}
