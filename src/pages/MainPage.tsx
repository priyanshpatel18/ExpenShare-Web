import React, { useEffect, useRef, useState } from "react";
// components
import SideBar from "../components/SideBar";
import HomeScreen from "../components/HomeScreen";
import TransactionScreen from "../components/TransactionScreen";
import GroupsScreen from "../components/GroupsScreen";
import ProfileScreen from "../components/ProfileScreen";
import { Store } from "../stores/store";
import { useNavigate } from "react-router-dom";
import AddTransaction from "../components/AddTransaction";

export default function MainPage(): React.JSX.Element {
    const myref = useRef<HTMLDivElement>(null);
    const store = Store();
    const navigate = useNavigate();

    const [isclick, setisclick] = useState(false);

    useEffect(() => {}, []);
    const [flag, setFlag] = useState({
        HomeScreen: true,
        TransactionScreen: false,
        GroupsScreen: false,
        ProfileScreen: false,
    });

    useEffect(() => {
        async function getUserData() {
            await store.getUserData(navigate);
        }
        getUserData();
    }, []);

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

    // do not render content if useer is not logged in    
    if (!store.userData) {
        console.log("No entry");
        
        return <></>
    }  

    return (
        <div className="MainPage">
            <SideBar
                flag={flag}
                setFlag={setFlag}
                {...buttonProps}
            />
            <div className="mainScreen">
                {flag.HomeScreen && <HomeScreen />}
                {flag.TransactionScreen && <TransactionScreen />}
                {flag.GroupsScreen && <GroupsScreen />}
                {flag.ProfileScreen && <ProfileScreen />}
            </div>
            <AddTransaction {...buttonProps} />
        </div>
    );
}
