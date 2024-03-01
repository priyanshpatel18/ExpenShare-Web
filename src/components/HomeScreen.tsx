import { motion } from "framer-motion";
import React, { MutableRefObject, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, TransactionRequest1, TransactionType } from "../stores/store";
// imges
import categoriesImgs from "../pages/categories";
import expense from "../assets/downArrow.png";
import logo from "../assets/profile.png";
import income from "../assets/upArrow.png";
import nothing from "../assets/wallet.png";
// import loading from "../assets/loadingimage.gif";
import back from "../assets/backButton.png";
import categoriesWithAssets from "../pages/categories";
import incomeAssets from "../pages/income-categories";
import notification from "../assets/notification.png";

import invoice from "../assets/invoice.png";
import deleteicon from "../assets/deleteicon.png";
import edit from "../assets/editpensil.png";
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
    const [confirmation, setconfirmation] = useState(false);
    const data_balance = store.userData?.totalBalance ?? 0;
    const data_income = store.userData?.totalIncome ?? 0;
    const data_expense = store.userData?.totalExpense ?? 0;

    const ammount_ref: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const [selectedTransaction, setSelectedTransaction] = useState<
        TransactionType | undefined
    >();
    const openTransactionPopup = (transaction: TransactionType) => {
        // Set the selected transaction to display its popup
        setSelectedTransaction(transaction);
    };

    const closeTransactionPopup = () => {
        // Close the transaction popup
        setSelectedTransaction(undefined);
    };
    function splitDate(timestamp: string): string {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        // Months are zero-based, so we add 1 to get the correct month
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function splitTime(timestamp: string): string {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${hours}:${minutes}`;
    }

    const [istransactionedit, setistransactionedit] = useState(true);
    const [confirmationpopup, setconfirmationpopup] = useState(false);
    // const formatDateTimeString = (isoString: string) => {
    //     const optionsDate: Intl.DateTimeFormatOptions = {
    //         day: "numeric",
    //         month: "short",
    //         year: "numeric",
    //     };
    //     const optionsTime: Intl.DateTimeFormatOptions = {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //     };

    //     const datePart = new Date(isoString).toLocaleDateString(
    //         "en-US",
    //         optionsDate
    //     );
    //     const timePart = new Date(isoString).toLocaleTimeString(
    //         "en-US",
    //         optionsTime
    //     );

    //     return { date: datePart, time: timePart };
    // };

    const handlereq = async () => {
        // Check if there is a selected transaction
        if (!selectedTransaction) {
            console.error("No transaction selected for update");
            return;
        }

        try {
            // Convert the selected transaction object to FormData
            const formData: TransactionRequest1 = {
                transactionAmount: selectedTransaction.transactionAmount,

                category: selectedTransaction.category,
                transactionTitle: selectedTransaction.transactionTitle,
                notes: selectedTransaction.notes,
                transactionDate: selectedTransaction.transactionDate,
                type: selectedTransaction.type,
            };

            // Call the store's updateTransaction method with FormData
            await store.updateTransaction(selectedTransaction._id, formData);
            console.log("Transaction updated successfully");

            // Optionally, perform any additional actions upon successful update
        } catch (error) {
            console.error("Error updating transaction:", error);
            // Handle error, such as displaying an error message
        }
    };
    const dataimage =
        selectedTransaction?.type === "expense" ? categoriesImgs : incomeAssets;

    const imgs = dataimage.find((category) => {
        return (
            category.name.toLocaleLowerCase() ==
            selectedTransaction?.category.toLocaleLowerCase()
        );
    });
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
                        zIndex: isEditing ? "11111111" : 0,
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
                    <div
                        className={`${
                            store.userData == undefined
                                ? "welcomeText_scaletan"
                                : "welcomeText"
                        }`}
                    >
                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className={`${
                                store.userData == undefined
                                    ? "profilePic_s"
                                    : "profilePic "
                            }`}
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
                        <img
                            src={notification}
                            width={40}
                            alt=""
                            className={
                                store.notifications.length === 0
                                    ? ""
                                    : "notificationimage"
                            }
                            onClick={() => navigate("/notofication")}
                        />
                    </div>

                    <motion.div
                        className={`${
                            store.userData == undefined
                                ? "balance_scaletan"
                                : "balance"
                        }`}
                    >
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
                            className={`${
                                store.userData == undefined
                                    ? "desktopAddExpenseBtn_s"
                                    : "desktopAddExpenseBtn"
                            }`}
                            onClick={() => navigate("/Addtransactions")}
                        >
                            Add Expenses
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            <div
                className={`${
                    store.userData == undefined ? "header_s" : "header"
                }`}
            >
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
                    <div className="transaction_s">
                        <div className="transactionDetail_s"></div>{" "}
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
                                                    ? categoriesWithAssets.find(
                                                          (cat) =>
                                                              cat.name.toLocaleLowerCase() ==
                                                              T.category.toLocaleLowerCase()
                                                      )?.source
                                                    : incomeAssets.find(
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
                    {confirmationpopup ? (
                        <motion.div
                            transition={{
                                type: "tween",
                                damping: 30,
                                stiffness: 30,
                            }}
                            animate={{
                                x: 0,
                                opacity: confirmation ? 1 : 0.7,
                                scale: confirmation ? 1 : 0.7,
                                rotate: 0,
                                visibility: confirmation ? "visible" : "hidden",
                            }}
                            className="logout-section"
                        >
                            <div className="logoutcontainer">
                                <div className="logout-confirmation">
                                    <h3>Are you sure to save changes?</h3>
                                </div>
                                <div className="logout-options">
                                    <button
                                        className="yes"
                                        onClick={() => {
                                            closeTransactionPopup();
                                            setistransactionedit(true);
                                            setconfirmation(!confirmation);
                                            handlereq();
                                            setconfirmationpopup(false);
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className="no"
                                        onClick={() => {
                                            navigate("/transactions");
                                            setconfirmation(!confirmation);
                                        }}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        ""
                    )}
                    <div className="transactionpopupnav">
                        <img
                            src={back}
                            alt=""
                            onClick={() => {
                                !confirmationpopup
                                    ? closeTransactionPopup()
                                    : "";
                                setistransactionedit(true);
                                setconfirmation(!confirmation);
                            }}
                        />
                        <img
                            src={edit}
                            alt=""
                            onClick={() => {
                                setistransactionedit(!istransactionedit);
                                setconfirmationpopup(true);
                            }}
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

                                <input
                                    type="text"
                                    value={selectedTransaction.transactionTitle}
                                    className="Tpopupcategory_otherdetails_value"
                                    disabled={istransactionedit}
                                    onChange={(e) =>
                                        setSelectedTransaction({
                                            ...(selectedTransaction || {}),
                                            transactionTitle: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="TpopupAmmount">
                            <div className="TpopupAmmount_title">Amount</div>
                            <div
                                className={`${
                                    selectedTransaction?.type === "expense"
                                        ? "Rupeessymbol"
                                        : "Rupeessymbol_green"
                                }`}
                            >
                                <h1> ₹</h1>
                                <input
                                    type="number"
                                    className={`${
                                        selectedTransaction?.type === "expense"
                                            ? "TpopupAmmount_value"
                                            : "TpopupAmmount_value_green"
                                    }`}
                                    value={
                                        selectedTransaction.transactionAmount
                                    }
                                    disabled={istransactionedit}
                                    onChange={(e) =>
                                        setSelectedTransaction({
                                            ...(selectedTransaction || {}),
                                            transactionAmount: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="TpopupNotes">
                            <div className="TpopupNotes_title">Notes</div>
                            <div className="TpopupNotes_value">
                                <input
                                    type="text"
                                    className="TpopupNotes_value_title"
                                    value={
                                        selectedTransaction?.notes
                                            ? selectedTransaction.notes
                                            : "-"
                                    }
                                    disabled={istransactionedit}
                                    onChange={(e) =>
                                        setSelectedTransaction({
                                            ...(selectedTransaction || {}),
                                            notes: e.target.value,
                                        })
                                    }
                                />
                                <div className="invoice_url">
                                    {selectedTransaction.invoiceUrl ? (
                                        <img
                                            src={invoice}
                                            alt=""
                                            onClick={() =>
                                                setIsEditing(!isEditing)
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="Tpopupdateandtime">
                            <div className="Tpopupdateandtime_title">
                                Transaction Date
                            </div>
                            <div className="Tpopupdateandtime_values">
                                <input
                                    className="Tpopupdateandtime_date"
                                    type="date"
                                    value={splitDate(
                                        selectedTransaction.transactionDate
                                    )}
                                    disabled={istransactionedit}
                                    // onChange={(e) => setdate(e.target.value)}
                                />

                                <input
                                    type="time"
                                    className="Tpopupdateandtime_time"
                                    value={splitTime(
                                        selectedTransaction.transactionDate
                                    )}
                                    disabled={istransactionedit}
                                    // onChange={(e) => settime(e.target.value)}
                                />
                            </div>
                        </div>
                        {!istransactionedit ? (
                            <div className="deletetransacrion">
                                <button onClick={handlereq}>Submmit</button>
                            </div>
                        ) : (
                            <div className="deletetransacrion">
                                <img src={deleteicon} alt="" />
                                <button
                                    onClick={() =>
                                        store.deleteTransaction(
                                            selectedTransaction._id
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                        {/* Add more details if needed */}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default HomeScreen;
