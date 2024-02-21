import { animate, motion, useMotionValue } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// imges
import expense from "../assets/downArrow.png";
import categoriesWithAssets from "../pages/categories";
import logo from "../assets/profile.png";
import income from "../assets/upArrow.png";
import nothing from "../assets/wallet.png";
import { Store, TransactionType } from "../stores/store";

interface userData {
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

function HomeScreen(): React.JSX.Element {
	const [userData, setUserData] = useState<userData | null>(null);
	const store = Store();
	const universalsex: number = 0.5;
	const credit = 5000;
	const incomee = 4000;
	const expensee = 8000;

	const count = useMotionValue(0);
	const count2 = useMotionValue(0);
	const count3 = useMotionValue(0);
	// const rounded = useTransform(count, Math.round);
	// const rounded2 = useTransform(count2, Math.round);
	// const rounded3 = useTransform(count3, Math.round);

	useEffect(() => {
		const incomeanimation = animate(count, incomee, {
			duration: universalsex,
		});
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
		setUserData(store.userData as userData | null);
		async function getTransactions() {
			await store.getTransactions();
		}
		getTransactions();
	}, [store.userData]);

	return (
		  <motion.div
            animate={{
                x: 0,

                opacity: 1,

                rotate: 0,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 100 }}
            className="HomeScreen"
        >
            <div className="userDashbord">
                <motion.div
                    animate={{
                        x: 0,
                        opacity: isEditing ? 1 : 0,
                        scale: isEditing ? 1 : 0,
                        width: isEditing ? "100vw" : 0,
                        visibility: isEditing ? "visible" : "hidden",
                    }}
                    className="fullscreeniaemodel"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    <div>
                        <img src={userData?.profilePicture || logo} alt="" />
                    </div>
                </motion.div>
                <div className="leftDashbord">
                    <div className="welcomeText">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="profilePic"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            <img
                                src={userData?.profilePicture || logo}
                                alt="Profile Picture"
                            />
                        </motion.div>
                        <div>
                            <h2>Welcome,</h2>
                            <div>{userData?.userName || "User"}</div>
                        </div>
                    </div>

                    <motion.div className="balance">
                        <div className="row1">
                            <h3>Total Balance</h3>
                        </div>

                        <div className="row2">
                            <motion.p>{`${
                                Math.sign(userData?.totalBalance ?? 0) == 1
                                    ? ""
                                    : "-"
                            }$${Math.abs(
                                userData?.totalBalance ?? 0
                            )}`}</motion.p>
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
                                        <motion.span>
                                            {userData?.totalIncome || 0}
                                        </motion.span>
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
                                        <motion.span>
                                            {userData?.totalIncome || 0}
                                        </motion.span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div className="rightDashbord">
                    <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                    >
                        <button className="desktopAddExpenseBtn">
                            Add Expenses
                        </button>
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
                {!store.transactions ? (
                    <div className="err">
                        <img src={nothing} alt="" />
                        <p>No Transactions Found Yet</p>
                    </div>
                ) : (
                    store.transactions.map(
                        (
                            T: TransactionType,
                            index: React.Key | null | undefined
                        ) => (
                            <motion.div
                                className={`${
                                    T.type === "expense"
                                        ? "transaction"
                                        : "transaction-income"
                                }`}
                                key={index}
                            >
                                <div className="transactionDetail">
                                    <div className="circle">
                                        <img
                                            src={
                                                categoriesWithAssets.find(
                                                    (cat) =>
                                                        cat.name == T.category
                                                )?.source
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
                                    {T.type == "expense" ? "-" : "+"} $
                                    {T.transactionAmount}
                                </div>
                            </motion.div>
                        )
                    )
                )}
            </div>
        </motion.div>
	);
}

export default HomeScreen;
