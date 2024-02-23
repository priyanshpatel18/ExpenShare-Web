import { motion } from "framer-motion";
import React, { MutableRefObject, useRef, useState } from "react";
import categoriesImgs from "../pages/categories";
import { Store } from "../stores/store";

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
                                <div className="transaction" key={index}>
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
                                        <div className="transactiondetailinsec">{T.transactionTitle}</div>
                                        <div
                                            className={
                                                T.type == "income"
                                                    ? "green"
                                                    : "red"
                                            }
                                        >
                                            {`${
                                                T.type == "expense" ? "-" : "+"
                                            }$${T.transactionAmount}`}
                                        </div>
                                    </div>
                                </div>
                            );
                    })}
            </div>
        </motion.div>
    );
}
