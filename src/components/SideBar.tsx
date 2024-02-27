import { motion } from "framer-motion";
import { Store } from "../stores/store";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// imges
import addBtn from "../assets/addButton.png";
import Group from "../assets/group.png";
import Groupsactive from "../assets/groupSelected.png";
import home from "../assets/home.png";
import homeactive from "../assets/homeSelected.png";
import logo from "../assets/profile.png";
import transaction from "../assets/transaction.png";
import transactive from "../assets/transactionSelected.png";
import personal from "../assets/user.png";
import personalactive from "../assets/userSelected.png";

interface userObject {
    email: string;
    expenses: string[];
    incomes: string[];
    password: string;
    profilePicture: string;
    publicId: string;
    totalBalance: number;
    totalExpense: number;
    totalIncome: number;
    userName: string;
    __v: number;
    _id: string;
}

const SideBar = () => {
    const { pathname } = useLocation();

    const store = Store();
    const [userObject, setUserObject] = useState<userObject | null>();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        async function getUserObject() {
            await store.getUserData(navigate);
        }
        getUserObject();
        setUserObject(store.userData as userObject | null);
    }, []);

    return (
        <div className="SideBar">
            <motion.div
                animate={{
                    display: isEditing ? "block" : "none",
                    opacity: isEditing ? 1 : 0,
                    scale: isEditing ? 1 : 0,
                    width: isEditing ? "100vw" : 0,
                }}
                className="fullscreeniaemodel"
                onClick={() => setIsEditing(!isEditing)}
            >
                <div>
                    <img src={store.userData?.profilePicture || logo} alt="" />
                </div>
            </motion.div>
            <div className="userProfile">
                <div className="img">
                    <img
                        src={userObject?.profilePicture || logo}
                        alt="Profile Picture"
                        onClick={() => setIsEditing(!isEditing)}
                    />
                </div>
                <div className="userName">{userObject?.userName || "User"}</div>
            </div>
            <nav className="navigation">
                <motion.div
                    className="nav nav-home"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 17 }}
                    onClick={() => navigate("/")}
                >
                    <div>
                        <motion.div className="img">
                            {pathname === "/" ? (
                                <img src={homeactive} alt="" />
                            ) : (
                                <img src={home} alt="" />
                            )}
                        </motion.div>
                        <motion.div className="text">
                            <p className={pathname === "/" ? "active" : ""}>
                                Home
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="nav nav-transaction"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 17 }}
                    onClick={() => navigate("/transactions")}
                >
                    <div className="">
                        <motion.div className="img">
                            {pathname === "/transactions" ? (
                                <img src={transactive} alt="" />
                            ) : (
                                <img src={transaction} alt="" />
                            )}
                        </motion.div>
                        <motion.div className="text">
                            <p
                                className={`${
                                    pathname === "/transactions" ? "active" : ""
                                }`}
                            >
                                Transactions
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                <div style={{ paddingInline: "18px" }}>
                    {/* div for image justification in mobile */}
                </div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="addBtn img"
                    onClick={() => navigate("/Addtransactions")}
                >
                    <img src={addBtn} alt="Add Button" />
                </motion.button>

                <motion.div
                    className="nav nav-groups"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 17 }}
                    onClick={() => navigate("/groups")}
                >
                    <div className="">
                        <motion.div className="img">
                            {pathname === "/groups" ? (
                                <img src={Groupsactive} alt="" />
                            ) : (
                                <img src={Group} alt="" />
                            )}
                        </motion.div>
                        <motion.div className="text">
                            <p
                                className={`${
                                    pathname === "/groups" ? "active" : ""
                                }`}
                            >
                                Groups
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="nav nav-persional"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 17 }}
                    onClick={() => navigate("/Profile")}
                >
                    <div className="">
                        <motion.div className="img">
                            {pathname === "/Profile" ? (
                                <img src={personalactive} alt="" />
                            ) : (
                                <img src={personal} alt="" />
                            )}
                        </motion.div>
                        <motion.div className="text">
                            <p
                                className={`${
                                    pathname === "/Profile" ? "active" : ""
                                }`}
                            >
                                Profile
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </nav>
        </div>
    );
};

export default SideBar;
