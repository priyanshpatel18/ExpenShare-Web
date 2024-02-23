import React, { useState } from "react";
import { Store } from "../stores/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// images

import profilepic from "../assets/profile.png";
import Accounts from "../assets/account.png";
import Export from "../assets/export.png";
import Report from "../assets/report.png";
import Settings from "../assets/settings.png";
import Logout from "../assets/logout.png";

export default function ProfileScreen(): React.JSX.Element {
    const store = Store();
    const [isaccount, setisaccount] = useState(false);
    const [issetting, setissetting] = useState(false);
    const [islogout, setislogout] = useState(false);
    // const [isreport, setisreport] = useState(false);

    const navigate = useNavigate();

    //report logic

    return (
        <motion.div
            className="ProfileScreen"
            animate={{
                x: 0,
                opacity: 1,
                rotate: 0,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 100 }}
        >
            {/* account popup */}
            <motion.div
                animate={{
                    x: 0,
                    opacity: isaccount ? 1 : 0,
                    scale: isaccount ? 1 : 0,
                    rotate: 0,
                    visibility: isaccount ? "visible" : "hidden",
                }}
                className="account-section"
            >
                <button onClick={() => setisaccount(!isaccount)}>click</button>
            </motion.div>

            {/* setting popup */}
            <motion.div
                animate={{
                    x: 0,
                    opacity: issetting ? 1 : 0,
                    scale: issetting ? 1 : 0,
                    rotate: 0,
                    visibility: issetting ? "visible" : "hidden",
                }}
                className="setting-section"
            >
                <button onClick={() => setissetting(!issetting)}>click</button>
            </motion.div>

            {/* report popup   */}

            {/* logout popup */}

            <motion.div
                transition={{ type: "tween", damping: 30, stiffness: 30 }}
                animate={{
                    x: 0,
                    opacity: islogout ? 1 : 0.7,
                    scale: islogout ? 1 : 0.7,
                    rotate: 0,
                    visibility: islogout ? "visible" : "hidden",
                }}
                className="logout-section"
            >
                <div className="logoutcontainer">
                    <div className="logout-confirmation">
                        <h3>Are you sure you want to log out?</h3>
                    </div>
                    <div className="logout-options">
                        <button
                            className="yes"
                            onClick={() => store.logoutUser(navigate)}
                        >
                            Yes
                        </button>
                        <button
                            className="no"
                            onClick={() => setislogout(!islogout)}
                        >
                            No
                        </button>
                    </div>
                </div>
            </motion.div>
            <div className="Profile-photo">
                <div className="profilepic">
                    <img
                        src={store.userData?.profilePicture || profilepic}
                        alt=""
                    />
                </div>
                <div>Vaidik</div>
            </div>
            <div className="Profile-detail">
                <div className="profile-detail-container">
                    <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="Account"
                        onClick={() => setisaccount(!isaccount)}
                    >
                        <div className="Account-icon">
                            <img src={Accounts} alt="" />
                        </div>
                        <div className="Account-Link">Account</div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="Export"
                    >
                        <div className="Export-icon">
                            <img src={Export} alt="" />
                        </div>
                        <div className="Export-Link">Export</div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="Report"
                        onClick={() => navigate("/profile/Report")}
                    >
                        <div className="Report-icon">
                            {" "}
                            <img src={Report} alt="" />
                        </div>
                        <div className="Report-Link">Report</div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="Settings"
                        onClick={() => setissetting(!issetting)}
                    >
                        <div className="Settings-icon">
                            {" "}
                            <img src={Settings} alt="" />
                        </div>
                        <div className="Settings-Link">Settings</div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="Loggout"
                        onClick={() => setislogout(!islogout)}
                    >
                        <div className="Loggout-icon">
                            {" "}
                            <img src={Logout} alt="" />
                        </div>
                        <div className="Loggout-Link">Logout</div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
