import React from "react";
import profilepic from "../assets/profile.png";
import { motion } from "framer-motion";
import Accounts from "../assets/account.png";
import Export from "../assets/export.png";
import Report from "../assets/report.png";
import Settings from "../assets/settings.png";
import Logout from "../assets/logout.png";
export default function ProfileScreen(): React.JSX.Element {
    return (
        <div className="ProfileScreen">
            <div className="Profile-photo">
                <div className="profilepic">
                    <img src={profilepic} alt="" />
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
                    >
                        <div className="Loggout-icon">
                            {" "}
                            <img src={Logout} alt="" />
                        </div>
                        <div className="Loggout-Link">Logout</div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
