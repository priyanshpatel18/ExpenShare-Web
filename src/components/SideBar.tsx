// import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LOGO3.png";
import Group from "../assets/group.png";
import Home from "../assets/home.png";
import personal from "../assets/personal.png";
import transaction from "../assets/transaction.png";
import "./Common.css";

const CommenScreen = () => {
  //   let route = ["Home", "transaction", "Groups", "Profile"];
  return (
    <div className="container">
      <div className="left">
        <div className="upper">
          <div className="logo-cont">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="lower">
          <div className="home">
            <div className="im">
              <img src={Home} alt="" />
            </div>
            <div className="tg">
              <Link to={`/`}>
                <p className="transaction-link">Home</p>
              </Link>
            </div>
          </div>
          <div className="transaction">
            <div className="im">
              {" "}
              <img src={transaction} alt="" />
            </div>
            <div className="tg">
              <Link to={`/Transaction`}>
                <p className="transaction-link">Transactions</p>
              </Link>
            </div>
          </div>
          <div className="group">
            <div className="im">
              {" "}
              <img src={Group} alt="" />
            </div>
            <div className="tg">
              <Link to={`/Groups`}>
                <p className="transaction-link">Groups</p>
              </Link>
            </div>
          </div>
          <div className="personal">
            <div className="im">
              <img src={personal} alt="" />
            </div>
            <div className="tg">
              <Link to={`/Profile`}>
                <p className="transaction-link">Profile</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="line"></div>
    </div>
  );
};

export default CommenScreen;
