import { motion } from "framer-motion";
import React, { MutableRefObject, useRef, useState } from "react";
import categoriesImgs from "../pages/categories";
import { Store, TransactionType } from "../stores/store";
import { Amounttosort } from "./HomeScreen";
import back from "../assets/backButton.png";
import incomeAssets from "../pages/income-categories";
import invoice from "../assets/invoice.png";
import deleteicon from "../assets/deleteicon.png";
import edit from "../assets/editpensil.png";
// import { useNavigate } from "react-router-dom";

export default function TransactionScreen(): React.JSX.Element {
    const store = Store();
    // const navigate = useNavigate();
    const [Flag, setFlag] = useState("income");
    const buttonRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [istransactionedit, setistransactionedit] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const dataimage =
        selectedTransaction?.type === "expense" ? categoriesImgs : incomeAssets;

    const imgs = dataimage.find((category) => {
        return (
            category.name.toLocaleLowerCase() ==
            selectedTransaction?.category.toLocaleLowerCase()
        );
    });
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

    // const [date, setdate] = useState<string>(
    //     selectedTransaction
    //         ? splitDate(selectedTransaction.transactionDate)
    //         : ""
    // );
    // const [time, settime] = useState<string>(
    //     selectedTransaction
    //         ? splitTime(selectedTransaction.transactionDate)
    //         : ""
    // );
    // useEffect(() => {
    //     if (selectedTransaction) {
    //         setdate(splitDate(selectedTransaction.transactionDate));
    //         settime(splitTime(selectedTransaction.transactionDate));
    //     }
    // }, [selectedTransaction]);

    // useEffect(() => {
    //     if (!selectedTransaction) return; // Return early if selectedTransaction is undefined

    //     const updatedTransaction = {
    //         ...(selectedTransaction || {}),
    //         transactionDate: date
    //             ? new Date(`${date}T${time}`).toISOString()
    //             : "",
    //     };
    //     setSelectedTransaction(updatedTransaction);
    //     console.log(selectedTransaction.transactionDate);
    // }, []);

    // const handlereq = async () => {
    //     await store.updateTransaction(
    //         selectedTransaction?._id,
    //         selectedTransaction
    //     );
    // };

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
            <motion.div
                animate={{
                    x: 0,
                    opacity: isEditing ? 1 : 0,
                    scale: isEditing ? 1 : 0,
                    width: isEditing ? "80vw" : 0,
                    visibility: isEditing ? "visible" : "hidden",
                    zIndex: isEditing ? 1111111111 : 0,
                }}
                className="fullscreeniaemodel"
                onClick={() => setIsEditing(!isEditing)}
            >
                <div>
                    <img
                        src={selectedTransaction?.invoiceUrl}
                        alt="Invoice Iamge"
                    />
                </div>
            </motion.div>
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
                        const img_expense = categoriesImgs.find((category) => {
                            return (
                                category.name.toLocaleLowerCase() ==
                                T.category.toLocaleLowerCase()
                            );
                        });
                        const img_income = incomeAssets.find((category) => {
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
                                            <img
                                                src={
                                                    img_expense
                                                        ? img_expense.source
                                                        : img_income?.source
                                                }
                                                alt=""
                                            />
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
                            onClick={() => {
                                closeTransactionPopup();
                                setistransactionedit(true);
                            }}
                        />
                        <img
                            src={edit}
                            alt=""
                            onClick={() => {
                                setistransactionedit(!istransactionedit);
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
                                    ref={inputRef}
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
                            <div className="TpopupAmmount_title"> Amount</div>

                            <input
                                type="text"
                                className={`${
                                    selectedTransaction?.type === "expense"
                                        ? "TpopupAmmount_value"
                                        : "TpopupAmmount_value_green"
                                }`}
                                value={selectedTransaction.transactionAmount}
                                disabled={istransactionedit}
                                onChange={(e) =>
                                    setSelectedTransaction({
                                        ...(selectedTransaction || {}),
                                        transactionAmount: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="TpopupNotes">
                            <div className="TpopupNotes_title">Notes</div>
                            <div className="TpopupNotes_value">
                                <div>{}</div>

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
                                <div>
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
                                <button>Submmit</button>
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
