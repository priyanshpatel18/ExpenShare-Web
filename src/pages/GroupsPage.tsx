import React, { useEffect } from "react";
import { Store } from "../stores/store";

import GroupsScreen from "../components/GroupsScreen";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

export default function GroupsPage(): React.JSX.Element {
    const navigate = useNavigate();

    const store = Store();

    useEffect(() => {
        async function getUserData() {
            await store.getUserData(navigate);
        }

        getUserData();
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
                <GroupsScreen />
            </div>
        </div>
    );
}
