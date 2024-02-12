import React from "react";
import "./Homepage.css";

import CommenScreen from "../../components/SideBar";
function HomePage(): React.JSX.Element {
  return (
    <div className="homePage">
      <CommenScreen />
      <div className="right">
        <div className="up">
          <div className="side1">
            <div className="credit"></div>
          </div>
          <div className="side2"></div>
        </div>
        <div className="down"></div>
      </div>
    </div>
  );
}

export default HomePage;
