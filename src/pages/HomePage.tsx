import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../stores/store";
// components
import SideBar from "../components/SideBar";
import HomeScreen from "../components/HomeScreen";
// import { motion } from "framer-motion";

export default function HomePage(): React.JSX.Element {
    const navigate = useNavigate();
    const store = Store();
    // const constraintsRef: React.MutableRefObject<null> = useRef(null);
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
                <HomeScreen />
            </div>
        </div>
    );
}
