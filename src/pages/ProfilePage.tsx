import React, { useEffect } from "react";
import { Store } from "../stores/store";
import { useNavigate } from "react-router-dom";
// components

import ProfileScreen from "../components/ProfileScreen";
import SideBar from "../components/SideBar";

export default function ProfilePage(): React.JSX.Element {
    const navigate = useNavigate();
    // const myref = useRef<HTMLDivElement>(null);
    // const [isclick, setisclick] = useState(false);
    const store = Store();

    useEffect(() => {
        async function fetchUserData() {
            await store.getUserData(navigate);
            await store.getTransactions();
        }

        fetchUserData();
    }, []);

    // do not render content if useer is not logged in
    if (!store.getUserData) {
        console.log("No entry, token invalid or not found...");
        return <></>;
    }

    return (
        <div className="MainPage">
            <SideBar />
            <div className="mainScreen">
                <ProfileScreen />
            </div>
        </div>
    );
}
