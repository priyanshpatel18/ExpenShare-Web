import React, { useEffect } from "react";
import GroupsScreen from "../components/GroupsScreen";
import SideBar from "../components/SideBar";
import { Store } from "../stores/store";

export default function GroupsPage(): React.JSX.Element {
    const store = Store();

    useEffect(() => {
        async function getgroups() {
            await store.handleFetchGroups();
        }

        getgroups();
    }, [])

    // do not render content if useer is not logged in
    // if (!store.userData) {
    //     console.log("No entry, token invalid or not found...");
    //     return <></>;
    // }

    return (
        <div className="MainPage">
            <SideBar />
            <div className="mainScreen">
                <GroupsScreen />
            </div>
        </div>
    );
}
