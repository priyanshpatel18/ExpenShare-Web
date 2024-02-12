import React from "react";
import CommenScreen from "../../components/SideBar";
import "./Groups.css";
// import GroupFrame from "./GroupFrame";
// import { useLocation } from "react-router-dom";
const Groups = () => {
  //   const location = useLocation();
  //   const { pathname } = location;
  return (
    <div className="GroupPage">
      <CommenScreen></CommenScreen>
      <div className="right">
        <p>Groups</p>
      </div>
    </div>
  );
};

export default Groups;
