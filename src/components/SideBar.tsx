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

const SideBar = (props: any) => {
	const { pathname } = useLocation();
	const store = Store();
	const [userObject, setUserObject] = useState<userObject | null>();
	const navigate = useNavigate();

	useEffect(() => {
		async function getUserObject() {
			await store.getUserData(navigate);
		}
		getUserObject();
		setUserObject(store.userData as userObject | null);
	}, [store.userData]);

	return (
		<div className="SideBar">
			<div className="userProfile">
				<div className="img">
					<img src={userObject?.profilePicture || logo} alt="Profile Picture" />
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
							<p className={pathname === "/" ? "active" : ""}>Home</p>
						</motion.div>
					</div>
				</motion.div>

				<motion.div
					className="nav nav-transaction"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.8 }}
					transition={{ type: "spring", stiffness: 200, damping: 17 }}
					onClick={() => navigate("/transactionsPage")}
				>
					<div className="">
						<motion.div className="img">
							{pathname === "/transactionsPage" ? (
								<img src={transactive} alt="" />
							) : (
								<img src={transaction} alt="" />
							)}
						</motion.div>
						<motion.div className="text">
							<p className={`${pathname === "/transactionsPage" ? "active" : ""}`}>
								Transactions
							</p>
						</motion.div>
					</div>
				</motion.div>

				<div style={{ paddingInline: "18px" }}>{/* div for image justification in mobile */}</div>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.8 }}
					transition={{ type: "spring", stiffness: 400, damping: 17 }}
					className="addBtn img"
					onClick={props.changepage}
				>
					<img src={addBtn} alt="Add Button" />
				</motion.button>

				<motion.div
					className="nav nav-groups"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.8 }}
					transition={{ type: "spring", stiffness: 200, damping: 17 }}
					onClick={() => navigate("/groupsPage")}
				>
					<div className="">
						<motion.div className="img">
							{pathname === "/groupsPage" ? (
								<img src={Groupsactive} alt="" />
							) : (
								<img src={Group} alt="" />
							)}
						</motion.div>
						<motion.div className="text">
							<p className={`${pathname === "/groupsPage" ? "active" : ""}`}>Groups</p>
						</motion.div>
					</div>
				</motion.div>

				<motion.div
					className="nav nav-persional"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.8 }}
					transition={{ type: "spring", stiffness: 200, damping: 17 }}
					onClick={() => navigate("/ProfilePage")}
				>
					<div className="">
						<motion.div className="img">
							{pathname === "/ProfilePage" ? (
								<img src={personalactive} alt="" />
							) : (
								<img src={personal} alt="" />
							)}
						</motion.div>
						<motion.div className="text">
							<p className={`${pathname === "/ProfilePage" ? "active" : ""}`}>Profile</p>
						</motion.div>
					</div>
				</motion.div>
			</nav>
		</div>
	);
};

export default SideBar;
