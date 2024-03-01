import React from "react";


import GroupsScreen from "../components/GroupsScreen";
import SideBar from "../components/SideBar";


export default function GroupsPage(): React.JSX.Element {


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
