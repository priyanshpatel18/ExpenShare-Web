import React, { useEffect, useRef, useState } from "react";
import { Store } from "../stores/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// images
import profilepic from "../assets/profile.png";
import Accounts from "../assets/account.png";
import Export from "../assets/export.png";
import Report from "../assets/report.png";
import Settings from "../assets/settings.png";
import Logout from "../assets/logout.png";

import Chart from "chart.js/auto";

import back from "../assets/backButton.png";

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

export default function ProfileScreen(): React.JSX.Element {
    const store = Store();
    const [isaccount, setisaccount] = useState(false);
    const [issetting, setissetting] = useState(false);
    const [islogout, setislogout] = useState(false);
    const [userData, setUserData] = useState<userData | null>(null);

    const [isreport, setisreport] = useState(false);
    const data = [25, 35, 20, 15, 5];
    const labels = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];
    const incomee = userData?.totalIncome ?? 0;
    const expensee = userData?.totalExpense ?? 0;
    const balances = incomee - expensee;
    const income_data = [1, incomee];
    const expense_data = [balances, expensee];
    const balance_data = [expensee, balances];

    const creditDatas = [String(incomee), String(balances), String(expensee)];

    const navigate = useNavigate();

    useEffect(() => {
        async function getUserObject() {
            await store.getUserData(navigate);
        }
        getUserObject();
        setUserData(store.userData as userData | null);
    }, [navigate, store]);

    //report logic

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const income_chart = useRef<HTMLCanvasElement | null>(null);
    const balance_chart = useRef<HTMLCanvasElement | null>(null);
    const expense_chart = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;
        const chart = new Chart(ctx, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        label: "Data",
                        data: data,
                        backgroundColor: [
                            "rgb(249,70,86)",
                            "rgb(47,117,92)",
                            "rgb(49,190,190)",
                            "rgb(250,132,47)",
                            "rgba(153, 102, 255)",
                        ],
                    },
                ],
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "Category",
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                    },
                },
            },
        });

        if (!income_chart.current) return;
        const ctx1 = income_chart.current.getContext("2d");
        if (!ctx1) return;

        const chart1 = new Chart(ctx1, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        label: "Data",
                        data: income_data,
                        backgroundColor: ["white", "rgba(29,145,255,255)"],
                    },
                ],
            },

            options: {
                cutout: "80%",
                responsive: true,

                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "INCOME",
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                    },
                },
                animation: {
                    duration: 1000, // Animation duration in milliseconds
                    easing: "easeInOutQuart", // Easing function
                    animateRotate: true, // Whether to animate rotation
                    animateScale: true, // Whether to animate scaling
                },
            },
            plugins: [
                {
                    id: "centertext",
                    afterDatasetDraw(chart) {
                        const { ctx } = chart;
                        ctx.save();
                        const text = creditDatas[0];
                        const x = chart1.getDatasetMeta(0).data[0].x;
                        const y = chart1.getDatasetMeta(0).data[0].y;
                        ctx.font = "bold 13px sans-serif";
                        // ctx.fillRect(x - 10, y - 10, 20, 20);
                        ctx.fillText(text, x - (30 * x) / 100, y);
                        ctx.fillStyle = "rgba(29,145,255,255)";
                    },
                },
            ],
        });

        //chart 2

        if (!balance_chart.current) return;
        const ctx2 = balance_chart.current.getContext("2d");
        if (!ctx2) return;

        const chart2 = new Chart(ctx2, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        label: "Data",
                        data: balance_data,
                        backgroundColor: ["white", "rgba(55,212,159,255)"],
                    },
                ],
            },

            options: {
                cutout: "80%",
                responsive: true,

                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "BALANCE",
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                    },
                },
                animation: {
                    duration: 1500, // Animation duration in milliseconds
                    easing: "easeInOutQuart", // Easing function
                    animateRotate: true, // Whether to animate rotation
                    animateScale: true, // Whether to animate scaling
                },
            },
            plugins: [
                {
                    id: "centertext",
                    afterDatasetDraw(chart) {
                        const { ctx } = chart;
                        ctx.save();
                        const text = creditDatas[1];
                        const x = chart1.getDatasetMeta(0).data[0].x;
                        const y = chart1.getDatasetMeta(0).data[0].y;
                        ctx.font = "bold 13px sans-serif";
                        // ctx.fillRect(x - 10, y - 10, 20, 20);
                        ctx.fillText(text, x - (30 * x) / 100, y);
                        ctx.fillStyle = "rgba(55,212,159,255)";
                    },
                },
            ],
        });

        //chart 3

        if (!expense_chart.current) return;
        const ctx3 = expense_chart.current.getContext("2d");
        if (!ctx3) return;

        const chart3 = new Chart(ctx3, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        label: "Data",
                        data: expense_data,
                        backgroundColor: ["white", "rgba(254,72,86,255)"],
                    },
                ],
            },

            options: {
                cutout: "80%",
                responsive: true,

                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "EXPENSE",
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                    },
                },
                animation: {
                    duration: 2000, // Animation duration in milliseconds
                    easing: "easeInOutQuart", // Easing function
                    animateRotate: true, // Whether to animate rotation
                    animateScale: true, // Whether to animate scaling
                },
            },
            plugins: [
                {
                    id: "centertext",
                    afterDatasetDraw(chart) {
                        const { ctx } = chart;
                        ctx.save();
                        const text = creditDatas[2];
                        const x = chart1.getDatasetMeta(0).data[0].x;
                        const y = chart1.getDatasetMeta(0).data[0].y;
                        ctx.font = "bold 13px sans-serif";
                        // ctx.fillRect(x - 10, y - 10, 20, 20);
                        ctx.fillText(text, x - (30 * x) / 100, y);
                        ctx.fillStyle = "rgba(254,72,86,255)";
                    },
                },
            ],
        });

        return () => {
            chart.destroy();
            chart1.destroy();
            chart2.destroy();
            chart3.destroy(); // Clean up chart on unmount
        };
    }, [data, income_data, labels]);
    return (
        <motion.div
            className="ProfileScreen"
            animate={{
                x: 0,
                opacity: 1,
                rotate: 0,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 100 }}
        >
            {/* account popup */}
            <motion.div
                animate={{
                    x: 0,
                    opacity: isaccount ? 1 : 0,
                    scale: isaccount ? 1 : 0,
                    rotate: 0,
                    visibility: isaccount ? "visible" : "hidden",
                }}
                className="account-section"
            >
                <button onClick={() => setisaccount(!isaccount)}>click</button>
            </motion.div>

            {/* setting popup */}
            <motion.div
                animate={{
                    x: 0,
                    opacity: issetting ? 1 : 0,
                    scale: issetting ? 1 : 0,
                    rotate: 0,
                    visibility: issetting ? "visible" : "hidden",
                }}
                className="setting-section"
            >
                <button onClick={() => setissetting(!issetting)}>click</button>
            </motion.div>

            {/* report popup   */}

            <motion.div
                animate={{
                    x: 0,
                    opacity: isreport ? 1 : 0,
                    scale: isreport ? 1 : 0,
                    rotate: 0,
                    visibility: isreport ? "visible" : "hidden",
                }}
                className="report-section"
            >
                <motion.button
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                    }}
                    onClick={() => setisreport(!isreport)}
                >
                    <img src={back} alt="" />
                </motion.button>
                <motion.div
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                    }}
                    className="category-chart"
                >
                    <canvas ref={chartRef} width={200} height={200}></canvas>
                </motion.div>

                <div className="credit-pie">
                    <div className="income_chart">
                        <canvas
                            ref={income_chart}
                            width={200}
                            height={200}
                        ></canvas>
                    </div>
                    <div className="balance_chart">
                        <canvas
                            ref={balance_chart}
                            width={200}
                            height={200}
                        ></canvas>
                    </div>
                    <div className="expense_chart">
                        <canvas
                            ref={expense_chart}
                            width={200}
                            height={200}
                        ></canvas>
                    </div>
                </div>
            </motion.div>

            {/* logout popup */}

            <motion.div
                transition={{ type: "tween", damping: 30, stiffness: 30 }}
                animate={{
                    x: 0,
                    opacity: islogout ? 1 : 0.7,
                    scale: islogout ? 1 : 0.7,
                    rotate: 0,
                    visibility: islogout ? "visible" : "hidden",
                }}
                className="logout-section"
            >
                <div className="logoutcontainer">
                    <div className="logout-confirmation">
                        <h3>Are you sure you want to log out?</h3>
                    </div>
                    <div className="logout-options">
                        <button
                            className="yes"
                            onClick={() => store.logoutUser(navigate)}
                        >
                            Yes
                        </button>
                        <button
                            className="no"
                            onClick={() => setislogout(!islogout)}
                        >
                            No
                        </button>
                    </div>
                </div>
            </motion.div>
            <div className="Profile-photo">
                <div className="profilepic">
                    <img src={userData?.profilePicture || profilepic} alt="" />
                </div>
                <div>Vaidik</div>
            </div>
            <div className="Profile-detail">
                <div className="profile-detail-container">
                    <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="Account"
                        onClick={() => setisaccount(!isaccount)}
                    >
                        <div className="Account-icon">
                            <img src={Accounts} alt="" />
                        </div>
                        <div className="Account-Link">Account</div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="Export"
                    >
                        <div className="Export-icon">
                            <img src={Export} alt="" />
                        </div>
                        <div className="Export-Link">Export</div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="Report"
                        onClick={() => setisreport(!isreport)}
                    >
                        <div className="Report-icon">
                            {" "}
                            <img src={Report} alt="" />
                        </div>
                        <div className="Report-Link">Report</div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="Settings"
                        onClick={() => setissetting(!issetting)}
                    >
                        <div className="Settings-icon">
                            {" "}
                            <img src={Settings} alt="" />
                        </div>
                        <div className="Settings-Link">Settings</div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="Loggout"
                        onClick={() => setislogout(!islogout)}
                    >
                        <div className="Loggout-icon">
                            {" "}
                            <img src={Logout} alt="" />
                        </div>
                        <div className="Loggout-Link">Logout</div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
