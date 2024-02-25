import { motion } from "framer-motion";
import React, { MutableRefObject, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, TransactionType } from "../stores/store";
// imges
import categoriesImgs from "../pages/categories";
import expense from "../assets/downArrow.png";
import logo from "../assets/profile.png";
import income from "../assets/upArrow.png";
import nothing from "../assets/wallet.png";
import loading from "../assets/loadingimage.gif";
import back from "../assets/backButton.png";
import categoriesWithAssets from "../pages/categories";

export const Amounttosort = (data: string) => {
    if (data.length === 5) {
        return String(String((Number(data) / 1000).toFixed(2)) + "K");
    } else if (data.length === 6) {
        return String(String((Number(data) / 1000).toFixed(2)) + "K");
    } else if (data.length === 7) {
        return String(String((Number(data) / (1000 * 1000)).toFixed(2)) + "M");
    } else {
        return String(Number(data));
    }
};

function HomeScreen(): React.JSX.Element {
    const store = Store();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const data_balance = store.userData?.totalBalance ?? 0;
    const data_income = store.userData?.totalIncome ?? 0;
    const data_expense = store.userData?.totalExpense ?? 0;
    console.log(store.transactions);

    const ammount_ref: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const [selectedTransaction, setSelectedTransaction] =
        useState<TransactionType>();
    const openTransactionPopup = (transaction: TransactionType) => {
        // Set the selected transaction to display its popup
        setSelectedTransaction(transaction);
    };

    const closeTransactionPopup = () => {
        // Close the transaction popup
        setSelectedTransaction(undefined);
    };

    const imgs = categoriesImgs.find((category) => {
        return (
            category.name.toLocaleLowerCase() ==
            selectedTransaction?.category.toLocaleLowerCase()
        );
    });

    const formatDateTimeString = (isoString: string) => {
        const optionsDate: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "short",
            year: "numeric",
        };
        const optionsTime: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
        };

        const datePart = new Date(isoString).toLocaleDateString(
            "en-US",
            optionsDate
        );
        const timePart = new Date(isoString).toLocaleTimeString(
            "en-US",
            optionsTime
        );

        return { date: datePart, time: timePart };
    };

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

                        <div className="row2 ">
                            <motion.p>
                                ₹{Amounttosort(String(data_balance))}
                            </motion.p>
                        </div>

                        <div className="row3">
                            <div className="income">
                                <div className="img">
                                    <img src={income} alt="up arrow" />
                                </div>
                                <div className="value">
                                    <p>Income</p>
                                    <div>
                                        <span>₹</span>
                                        <motion.span>
                                            {Amounttosort(String(data_income))}
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
                                        <span>₹</span>
                                        <motion.span>
                                            {Amounttosort(String(data_expense))}
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
                        <button
                            className="desktopAddExpenseBtn"
                            onClick={() => navigate("/Addtransactions")}
                        >
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
                    <Link to={`/transactions`}>
                        <p>View All</p>
                    </Link>
                </div>
            </div>

            <div className="transactions">
                {!store.transactions ? (
                    <div className="loading">
                        <img src={loading} alt="" />
                    </div>
                ) : store.transactions.length === 0 ? (
                    <div className="err">
                        <img src={nothing} alt="" />
                        <p>No transaction yet</p>
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
                                onClick={() => openTransactionPopup(T)}
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
                                    {Amounttosort(T.transactionAmount)}
                                </div>
                            </motion.div>
                        )
                    )
                )}
            </div>

            {selectedTransaction && (
                <div className="transaction-popup">
                    <div className="transactionpopupnav">
                        <img
                            src={back}
                            alt=""
                            onClick={closeTransactionPopup}
                        />
                    </div>

                    <div className="popup-content">
                        <div className="Tpopupid">
                            <div className="Tpopupid_title">
                                <p>Transaction Id</p>
                            </div>
                            <div className="Tpopupid_value">
                                {selectedTransaction._id}
                            </div>
                        </div>

                        <div className="Tpopupcategory">
                            <div className="Tpopupcategoryimage">
                                <img src={imgs?.source} alt="" />
                            </div>
                            <div className="Tpopupcategory_otherdetails">
                                <div className="Tpopupcategory_otherdetails_title">
                                    Title
                                </div>
                                <div className="Tpopupcategory_otherdetails_value">
                                    {selectedTransaction?.transactionTitle}
                                </div>
                            </div>
                        </div>
                        <div className="TpopupAmmount">
                            <div className="TpopupAmmount_title"> Amount</div>
                            <div
                                className={`${
                                    selectedTransaction?.type === "expense"
                                        ? "TpopupAmmount_value"
                                        : "TpopupAmmount_value_green"
                                }`}
                            >
                                ₹ {selectedTransaction.transactionAmount}
                            </div>
                        </div>
                        <div className="TpopupNotes">
                            <div className="TpopupNotes_title">Notes</div>
                            <div className="TpopupNotes_value">
                                {selectedTransaction?.notes
                                    ? selectedTransaction.notes
                                    : "-"}
                            </div>
                        </div>
                        <div className="Tpopupdateandtime">
                            <div className="Tpopupdateandtime_title">
                                Transaction Date
                            </div>
                            <div className="Tpopupdateandtime_values">
                                <div className="Tpopupdateandtime_date">
                                    {
                                        formatDateTimeString(
                                            selectedTransaction.transactionDate
                                        ).date
                                    }
                                </div>
                                <div className="Tpopupdateandtime_time">
                                    {
                                        formatDateTimeString(
                                            selectedTransaction.transactionDate
                                        ).time
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Add more details if needed */}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default HomeScreen;
