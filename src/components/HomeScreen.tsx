import { animate, motion, useMotionValue } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Store, TransactionType } from "../stores/store";
// imges
import expense from "../assets/downArrow.png";
import logo from "../assets/profile.png";
import income from "../assets/upArrow.png";
import nothing from "../assets/wallet.png";
import categoriesWithAssets from "../pages/categories";

function HomeScreen(): React.JSX.Element {
    const store = Store();
    const [isEditing, setIsEditing] = useState(false);
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

    return (
        <motion.div
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 100 }}
            className="HomeScreen"
        >
            <div className="userDashbord">
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
                        <img
                            src={store.userData?.profilePicture || logo}
                            alt=""
                        />
                    </div>
                </motion.div>
                <div className="leftDashbord">
                    <div className="welcomeText">
                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="profilePic"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            <img
                                src={store.userData?.profilePicture || logo}
                                alt="Profile Picture"
                            />
                        </motion.div>
                        <div>
                            <h2>Welcome,</h2>
                            <div>{store.userData?.userName || "User"}</div>
                        </div>
                    </div>

                    <motion.div className="balance">
                        <div className="row1">
                            <h3>Total Balance</h3>
                        </div>

                        <div className="row2">
                            <motion.p>{`${
                                Math.sign(store.userData?.totalBalance ?? 0) ==
                                1
                                    ? ""
                                    : "-"
                            }₹${Math.abs(
                                store.userData?.totalBalance ?? 0
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
                                            {store.userData?.totalIncome || 0}
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
                                            {store.userData?.totalExpense || 0}
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
                    <Link to={`/transactionsPage`}>
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
                                                        cat.name.toLocaleLowerCase() ==
                                                        T.category.toLocaleLowerCase()
                                                )?.source
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className="transactionDetail-text">
                                        {T.transactionTitle}
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        T.type === "expense"
                                            ? "transactionValue "
                                            : "transactionValue-income"
                                    }`}
                                    ref={ammount_ref}
                                >
                                    {T.type == "expense" ? "-" : "+"} ₹
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
