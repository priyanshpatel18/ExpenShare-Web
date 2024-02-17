import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import usersStore from "../stores/usersStore";
// components
import SideBar from "../components/SideBar";
import HomeScreen from "../components/HomeScreen";
import TransactionScreen from "../components/TransactionScreen";
import GroupsScreen from "../components/GroupsScreen";
import ProfileScreen from "../components/ProfileScreen";
import Addtransaction from "./Addtransaction";

export default function MainPage(): React.JSX.Element {
  const myref = useRef<HTMLDivElement>(null);
  const [isclick, setisclick] = useState(false);

  const [flag, setFlag] = useState({
    HomeScreen: true,
    TransactionScreen: false,
    GroupsScreen: false,
    ProfileScreen: false,
  });
  //   const store = usersStore();
  //   const navigate = useNavigate();

  // useEffect(() => {
  // 	async function getUserData() {
  // 		console.log("Welcomme");
  // 		const data = await store.getUserData(navigate);
  // 		console.log("user Data : ", data);
  // 	}

  // 	getUserData();
  // }, []);

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

  return (
    <div className="MainPage">
      <SideBar user={null} flag={flag} setFlag={setFlag} {...buttonProps} />
      <div className="mainScreen">
        {flag.HomeScreen && <HomeScreen />}
        {flag.TransactionScreen && <TransactionScreen />}
        {flag.GroupsScreen && <GroupsScreen />}
        {flag.ProfileScreen && <ProfileScreen />}
      </div>
      <Addtransaction {...buttonProps}></Addtransaction>
    </div>
  );
}
