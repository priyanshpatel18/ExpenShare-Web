import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// imges
import expense from "../assets/downArrow.png";
import categoriesWithAssets from "../pages/categories";
// import food from "../assets/food.png";
import logo from "../assets/profile.png";
import income from "../assets/upArrow.png";
import nothing from "../assets/wallet.png";
import usersStore from "../stores/usersStore";

function HomeScreen(props: any): React.JSX.Element {
	const store = usersStore();
	const universalsex: number = 0.5;
	const credit = 50000;
	const incomee = 4000;
	const expensee = 8000;

	const count = useMotionValue(0);
	const count2 = useMotionValue(0);
	const count3 = useMotionValue(0);
	const rounded = useTransform(count, Math.round);
	const rounded2 = useTransform(count2, Math.round);
	const rounded3 = useTransform(count3, Math.round);

	useEffect(() => {
		const incomeanimation = animate(count, incomee, { duration: universalsex });
		return incomeanimation.stop;
	}, []);

	useEffect(() => {
		const expenseanimation = animate(count2, expensee, {
			duration: universalsex,
		});
		return expenseanimation.stop;
	}, []);

	useEffect(() => {
		const animation = animate(count3, credit, { duration: universalsex });
		return animation.stop;
	}, []);
	const ammount_ref: MutableRefObject<HTMLDivElement | null> = useRef(null);



	useEffect(() => {
		async function getTransactions() {
			// props des not loading.. 
			// await store.getAllTransactions({ email: data?.email || "" });
		}
		getTransactions();
	}, []);

	return (
		<div className="HomeScreen">
			<div className="userDashbord">
				<div className="leftDashbord">
					<div className="welcomeText">
						<div className="profilePic">
							<img src={props?.user?.profilePicture || logo} alt="Profile Picture" />
						</div>
						<div>
							<h2>Welcome,</h2>
							<div>{props?.user?.userName || "User"}</div>
						</div>
					</div>

					<div className="balance">
						<div className="row1">
							<h3>Total Balance</h3>
						</div>

						<div className="row2">
							<span>$</span>
							<motion.p>{rounded3}</motion.p>
						</div>

						<div className="row3">
							<div className="income">
								<div className="img">
									<img src={income} alt="up arrow" />
								</div>
								<div className="value">
									<p>Income</p>
									<div>
										<span>$</span>
										<motion.span>{rounded}</motion.span>
									</div>
								</div>
							</div>

							<div className="expense">
								<div className="img">
									<img src={expense} alt="down arrow" />
								</div>
								<div className="value">
									<p>Expense</p>
									<div>
										<span>$</span>
										<motion.span>{rounded2}</motion.span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<motion.div className="rightDashbord">
					<motion.div
						whileHover={{ scale: 1 }}
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<button className="desktopAddExpenseBtn">Add Expenses</button>
					</motion.div>
				</motion.div>
			</div>

			<div className="header">
				<div className="">
					<p>Transactions</p>
				</div>
				<div className="">
					<Link to={`/`}>
						<p>View All</p>
					</Link>
				</div>
			</div>

			<div className="transactions">
				{store.transactions.length === 0 ? (
					<div className="err">
						<img src={nothing} alt="" />
						<p>No Transactions Found Yet</p>
					</div>
				) : (
					store.transactions.map((T, index) => (
						<motion.div
							className={`${T.type === "expense" ? "transaction" : "transaction-income"}`}
							key={index}
						>
							<div className="transactionDetail">
								<div className="circle">
									<img
										src={
											categoriesWithAssets.find((cat) => cat.name == T.category)?.source
										}
										alt=""
									/>
								</div>
								<div className="">{T.category}</div>
							</div>
							<div
								className={`${
									T.type === "expense"
										? "transactionValue "
										: "transactionValue-income"
								}`}
								ref={ammount_ref}
							>
								{T.type == "expense" ? "-" : "+"} ${T.transactionAmount}
							</div>
						</motion.div>
					))
				)}
			</div>
		</div>
	);
}

export default HomeScreen;
