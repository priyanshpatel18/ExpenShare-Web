import { motion } from "framer-motion";
import React, { MutableRefObject, useRef, useState } from "react";
import categoriesImgs from "../pages/categories";
import { Store, TransactionType } from "../stores/store";
import { Amounttosort } from "./HomeScreen";
import back from "../assets/backButton.png";
export default function TransactionScreen(): React.JSX.Element {
    const store = Store();
    const [Flag, setFlag] = useState("income");
    const buttonRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    // function to change the transaction flag
    function toggleFlag() {
        if (Flag == "income") {
            setFlag("expense");
            if (buttonRef.current) {
                buttonRef.current.style.justifyContent = "right";
                buttonRef.current.children[0].textContent = "Expenses";
            }
        } else {
            setFlag("income");
            if (buttonRef.current) {
                buttonRef.current.style.justifyContent = "left";
                buttonRef.current.children[0].textContent = "Incomes";
            }
        }
    }

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

    return (
        <motion.div
            animate={{
                x: 0,

                opacity: 1,

                rotate: 0,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 100 }}
            className="TransactionScreen"
        >
            <div className="header">
                <h2 className="title">Transactions</h2>
                <div
                    className="btnContainer"
                    ref={buttonRef}
                    onClick={toggleFlag}
                >
                    <button>Income</button>
                </div>
            </div>
            <div className="transactions">
                {store.transactions &&
                    store.transactions.map((T, index) => {
                        const img = categoriesImgs.find((category) => {
                            return (
                                category.name.toLocaleLowerCase() ==
                                T.category.toLocaleLowerCase()
                            );
                        });

                        if (T.type == Flag)
                            return (
                                <div
                                    className="transaction"
                                    key={index}
                                    onClick={() => openTransactionPopup(T)}
                                >
                                    <div className="info">
                                        <div className="date">
                                            {
                                                formatDateTimeString(
                                                    T.transactionDate
                                                ).date
                                            }
                                        </div>
                                        <div className="time">
                                            {
                                                formatDateTimeString(
                                                    T.transactionDate
                                                ).time
                                            }
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="img">
                                            <img src={img?.source} alt="" />
                                        </div>
                                        <div className="transactiondetailinsec">
                                            {T.transactionTitle}
                                        </div>
                                        <div
                                            className={
                                                T.type == "income"
                                                    ? "green"
                                                    : "red"
                                            }
                                        >
                                            {`${
                                                T.type == "expense" ? "-" : "+"
                                            }₹${Amounttosort(
                                                T.transactionAmount
                                            )}`}
                                        </div>
                                    </div>
                                </div>
                            );
                    })}
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
                        <div className="deletetransacrion">
                            <button
                                onClick={() =>
                                    store.deleteTransaction(
                                        selectedTransaction._id
                                    )
                                }
                            >
                                delete transaction
                            </button>
                        </div>
                        {/* Add more details if needed */}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
