import React, { useState } from "react";
import { Store, TransactionType } from "../stores/store";
// import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
const ExportData = () => {
    const store = Store();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const fetchedtransaction = store.transactions;
    const filteredTransactions = fetchedtransaction?.filter((transaction) => {
        const transactionDate = new Date(transaction.transactionDate);
        return (
            transactionDate >= new Date(startDate) &&
            transactionDate <= new Date(endDate)
        );
    });

    console.log(filteredTransactions);

    const exportToCSV = (transactions: TransactionType[]) => {
        const header = Object?.keys(transactions[0]).join(",") + "\n";
        const csv = transactions
            .map((transaction) => Object.values(transaction).join(","))
            .join("\n");
        const csvData = header + csv;
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const exportToPDF = () => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        let yPos = 20;

        let index = 0;
        doc.setFontSize(10);

        doc.text("Transaction Data", 10, 10);

        if (!filteredTransactions) return;
        while (index < filteredTransactions.length) {
            const transaction = filteredTransactions[index];
            const transactionDate = new Date(transaction.transactionDate);
            const formattedDate = transactionDate.toLocaleDateString();
            const formattedTime = transactionDate.toLocaleTimeString();
            const transactionString = `${
                index + 1
            }. Date: ${formattedDate}, Time: ${formattedTime}, Title: ${
                transaction.transactionTitle
            }, Amount: ₹${
                // Use \u20B9 for Rupee symbol
                transaction.transactionAmount
            }`;
            const lineHeight = doc.getTextDimensions(transactionString).h;

            if (yPos + lineHeight > pageHeight - 10) {
                doc.addPage();
                yPos = 20;
            }

            doc.text(transactionString, 10, yPos);
            yPos += lineHeight;
            index++;
        }
        doc.save("transactions.pdf");
        doc.output("datauri");
    };

    // Function to export transaction data as JSON
    // const exportToJSON = (transactions: TransactionType[]) => {
    //     const json = JSON.stringify(transactions, null, 2);
    //     const blob = new Blob([json], { type: "application/json" });
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.setAttribute("href", url);
    //     link.setAttribute("download", "transactions.json");
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const handleExportCSV = () => {
        if (filteredTransactions) {
            exportToCSV(filteredTransactions);
        }
    };

    // const handleExportJSON = () => {
    //     if (filteredTransactions) {
    //         exportToJSON(filteredTransactions);
    //     }
    // };
    const handleExportPDF = () => {
        if (filteredTransactions) {
            exportToPDF();
        } else {
            alert("No transactions found in the selected date range.");
        }
    };

    return (
        <div>
            <div className="mainexportcontainer">
                <div className="startingdate">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="endingdate">
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <button className="handlegenerate" onClick={handleExportCSV}>
                Export as
            </button>
            <button className="handlegenerate" onClick={handleExportPDF}>
                Export PDF
            </button>
        </div>
    );
};

export default ExportData;
