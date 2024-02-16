// import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/profile.png";
import Group from "../assets/group.png";
// import homeactive from "../assets/home-active.png";
import personal from "../assets/user.png";
import transaction from "../assets/transaction.png";

// import plus from "../assets/plus.png";
import Groupsactive from "../assets/groupSelected.png";
import { useLocation } from "react-router-dom";
import transactive from "../assets/transactionSelected.png";
import homeactive from "../assets/homeSelected.png";
import personalactive from "../assets/userSelected.png";
import home from "../assets/home.png";
import { motion } from "framer-motion";

const CommenScreen = (props: any) => {
  const location = useLocation();
  const { pathname } = location;

  console.log(props.user);
  
  return (
		<div className="container">
			<div className="left">
				<div className="upper">
					<div className="logo-cont">
						{/* <img src={props.user.profilePicture || logo} alt="" /> */}
					</div>
				</div>
				<div className="lower">
					<motion.div
						className="home"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.8 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<Link to={`/`} className="aa">
							<motion.div className="im">
								{pathname == "/" ? (
									<img src={homeactive} alt="" />
								) : (
									<img src={home} alt="" />
								)}
							</motion.div>
							<motion.div className="tg">
								<p className={`${pathname == "/" ? "isactive" : ""}`}>
									<span className={`${pathname == "/" ? "" : ""}`}>H</span>
									ome
								</p>
							</motion.div>
						</Link>
					</motion.div>
					<motion.div
						className="transaction"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.8 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<Link className="aa" to={`/Transaction`}>
							<motion.div className="im">
								{pathname == "/Transaction" ? (
									<img src={transactive} alt="" />
								) : (
									<img src={transaction} alt="" />
								)}
							</motion.div>
							<motion.div className="tg">
								<p className={`${pathname == "/Transaction" ? "isactive" : ""}`}>
									<span className={`${pathname == "/Transaction" ? "" : ""}`}>T</span>
									ransactions
								</p>
							</motion.div>
						</Link>
					</motion.div>

					<motion.div
						className="group"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.8 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<Link to={`/Groups`} className="aa">
							<motion.div className="im">
								{" "}
								{pathname == "/Groups" ? (
									<img src={Groupsactive} alt="" />
								) : (
									<img src={Group} alt="" />
								)}
							</motion.div>
							<motion.div className="tg">
								<p className={`${pathname == "/Groups" ? "isactive" : ""}`}>
									<span className={`${pathname == "/Groups" ? "" : ""}`}>G</span>
									roups
								</p>
							</motion.div>
						</Link>
					</motion.div>
					<motion.div
						className="personal"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.8 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<Link to={`/Profile`} className="aa">
							<motion.div className="im">
								{pathname == "/Profile" ? (
									<img src={personalactive} alt="" />
								) : (
									<img src={personal} alt="" />
								)}
							</motion.div>
							<motion.div className="tg">
								<p className={`${pathname == "/Profile" ? "isactive" : ""}`}>
									<span className={`${pathname == "/Profile" ? "" : ""}`}>P</span>
									rofile
								</p>
							</motion.div>
						</Link>
					</motion.div>
				</div>
			</div>
			<div className="line"></div>
		</div>
  );
};

export default CommenScreen;
