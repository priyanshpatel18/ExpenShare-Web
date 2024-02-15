// import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LOGO3.png";
import Group from "../assets/group.png";
// import homeactive from "../assets/home-active.png";
import { useLocation } from "react-router-dom";
import add from "../assets/add.png";
import Groupsactive from "../assets/group-active.png";
import homeactive from "../assets/home-active.png";
import home from "../assets/home.png";
import personalactive from "../assets/person-active.png";
import personal from "../assets/personal.png";
import plus from "../assets/plus.png";
import transactive from "../assets/transaction-active.png";
import transaction from "../assets/transaction.png";

const CommenScreen = (props: any) => {
	const location = useLocation();
	const { pathname } = location;
	console.log(pathname);	

	return (
		<div className="container">
			<div className="left">
				<div className="upper">
					<div className="logo-cont">
						<img src={props.profile || logo} alt="" className="userProfile"/>
					</div>
				</div>

				<div className="lower">
					<div className="home">
						<Link to={`/`}>
							<div className="im">
								{pathname == "/" ? (
									<img src={homeactive} alt="" />
								) : (
									<img src={home} alt="" />
								)}
							</div>
							<div className="tg">
								<p className={`${pathname == "/" ? "isactive" : ""}`}>
									<span className={`${pathname == "/" ? "hlink" : ""}`}>H</span>
									ome
								</p>
							</div>
						</Link>
					</div>

					<div className="transaction">
						<Link to={`/Transaction`}>
							<div className="im">
								{pathname == "/Transaction" ? (
									<img src={transactive} alt="" />
								) : (
									<img src={transaction} alt="" />
								)}
							</div>
							<div className="tg">
								<p className={`${pathname == "/Transaction" ? "isactive" : ""}`}>
									<span className={`${pathname == "/Transaction" ? "tlink" : ""}`}>T</span>
									ransactions
								</p>
							</div>
						</Link>
					</div>

					<div className="add">
						<img src={add} alt="" className="ad" />
						<img src={plus} alt="" className="plus" />
					</div>

					<div className="group">
						<Link to={`/Groups`}>
							<div className="im">
								{" "}
								{pathname == "/Groups" ? (
									<img src={Groupsactive} alt="" />
								) : (
									<img src={Group} alt="" />
								)}
							</div>
							<div className="tg">
								<p className={`${pathname == "/Groups" ? "isactive" : ""}`}>
									<span className={`${pathname == "/Groups" ? "glink" : ""}`}>G</span>
									roups
								</p>
							</div>
						</Link>
					</div>

					<div className="personal">
						<Link to={`/Profile`}>
							<div className="im">
								{pathname == "/Profile" ? (
									<img src={personalactive} alt="" />
								) : (
									<img src={personal} alt="" />
								)}
							</div>
							<div className="tg">
								<p className={`${pathname == "/Profile" ? "isactive" : ""}`}>
									<span className={`${pathname == "/Profile" ? "plink" : ""}`}>P</span>
									rofile
								</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
			<div className="line"></div>
		</div>
	);
};

export default CommenScreen;
