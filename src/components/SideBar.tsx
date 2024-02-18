import { motion } from "framer-motion";
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

const SideBar = (props: any) => {
	function chageScreen(screen: string) {
		switch (screen) {
			case "HomeScreen":
				props.setFlag({
					HomeScreen: true,
					TransactionScreen: false,
					GroupsScreen: false,
					ProfileScreen: false,
				});
				break;

			case "TransactionScreen":
				props.setFlag({
					HomeScreen: false,
					TransactionScreen: true,
					GroupsScreen: false,
					ProfileScreen: false,
				});
				break;

			case "GroupsScreen":
				props.setFlag({
					HomeScreen: false,
					TransactionScreen: false,
					GroupsScreen: true,
					ProfileScreen: false,
				});
				break;

			case "ProfileScreen":
				props.setFlag({
					HomeScreen: false,
					TransactionScreen: false,
					GroupsScreen: false,
					ProfileScreen: true,
				});
				break;
		}
	}	

	return (
		<div className="SideBar">
			<div className="userProfile">
				<div className="img">
					<img src={props?.user?.profilePicture || logo} alt="Profile Picture" />
				</div>
				<div className="userName">{props?.user?.userName || "User"}</div>
			</div>
			<nav className="navigation">
				<motion.div
					className="nav nav-home"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.8 }}
					transition={{ type: "spring", stiffness: 200, damping: 17 }}
					onClick={() => chageScreen("HomeScreen")}
				>
					<div>
						<motion.div className="img">
							{props.flag.HomeScreen ? (
								<img src={homeactive} alt="" />
							) : (
								<img src={home} alt="" />
							)}
						</motion.div>
						<motion.div className="text">
							<p className={`${props.flag.HomeScreen ? "active" : ""}`}>Home</p>
						</motion.div>
					</div>
				</motion.div>

				<motion.div
					className="nav nav-transaction"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.8 }}
					transition={{ type: "spring", stiffness: 200, damping: 17 }}
					onClick={() => chageScreen("TransactionScreen")}
				>
					<div className="">
						<motion.div className="img">
							{props.flag.TransactionScreen ? (
								<img src={transactive} alt="" />
							) : (
								<img src={transaction} alt="" />
							)}
						</motion.div>
						<motion.div className="text">
							<p className={`${props.flag.TransactionScreen ? "active" : ""}`}>Transactions</p>
						</motion.div>
					</div>
				</motion.div>

				<div>{/* div for image justification in mobile */}</div>
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
					onClick={() => chageScreen("GroupsScreen")}
				>
					<div className="">
						<motion.div className="img">
							{props.flag.GroupsScreen ? (
								<img src={Groupsactive} alt="" />
							) : (
								<img src={Group} alt="" />
							)}
						</motion.div>
						<motion.div className="text">
							<p className={`${props.flag.GroupsScreen ? "active" : ""}`}>Groups</p>
						</motion.div>
					</div>
				</motion.div>

				<motion.div
					className="nav nav-persional"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.8 }}
					transition={{ type: "spring", stiffness: 200, damping: 17 }}
					onClick={() => chageScreen("ProfileScreen")}
				>
					<div className="">
						<motion.div className="img">
							{props.flag.ProfileScreen ? (
								<img src={personalactive} alt="" />
							) : (
								<img src={personal} alt="" />
							)}
						</motion.div>
						<motion.div className="text">
							<p className={`${props.flag.ProfileScreen ? "active" : ""}`}>Profile</p>
						</motion.div>
					</div>
				</motion.div>
			</nav>
		</div>
	);
};

export default SideBar;
