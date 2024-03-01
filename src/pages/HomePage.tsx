import React, { useEffect } from "react";

// components
import SideBar from "../components/SideBar";
import HomeScreen from "../components/HomeScreen";
import { Store } from "../stores/store";
import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

export default function HomePage(): React.JSX.Element {
    const store = Store();
    const navigate = useNavigate();
    // do not render content if useer is not logged in
    // if (!store.userData) {
    //     console.log("No entry, token invalid or not found...");
    //     return <></>;
    // }
    useEffect(() => {
        async function getUserData() {
            await store.getUserData(navigate);
            await store.handleFetchGroups();
            await store.getTransactions();
        }

        getUserData();
    }, []);
    return (
        <div className="MainPage">
            <SideBar />
            <div className="mainScreen">
                <HomeScreen />
            </div>
        </div>
    );
}
