import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Store, TransactionType } from "../stores/store";
import Chart from "chart.js/auto";
import back from "../assets/backButton.png";
import { useNavigate } from "react-router-dom";
import { Amounttosort } from "./HomeScreen";
const UserReport = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const income_chart = useRef<HTMLCanvasElement | null>(null);
    const balance_chart = useRef<HTMLCanvasElement | null>(null);
    const expense_chart = useRef<HTMLCanvasElement | null>(null);
    // const [categoryData, setCategoryData] = useState<
    //     { label: string; count: number }[]
    // >([]);
    const [transacriondata, settransactiondata] = useState<TransactionType[]>();
    const navigate = useNavigate();
    const store = Store();
    // const data = [25, 35, 20, 15, 5];
    // const labels = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];
    const incomee = store.userData?.totalIncome ?? 0;
    const expensee = store.userData?.totalExpense ?? 0;
    const balances = incomee - expensee;
    const income_data = [1, incomee];
    const expense_data = [balances, expensee];
    const balance_data = [expensee, balances];
    const creditDatas = [String(incomee), String(balances), String(expensee)];

    useEffect(() => {
        async function fetchUserData() {
            await store.getUserData(navigate);
            await store.getTransactions();
        }
        settransactiondata(store.transactions);
        fetchUserData();
        console.log("transac", store.transactions);
    }, []);

    const [categoryData, setCategoryData] = useState<
        { label: string; count: number }[]
    >([]);

    const [chartData, setChartData] = useState<{
        labels: string[];
        incomeData: number[];
        balanceData: number[];
        expenseData: number[];
    }>({ labels: [], incomeData: [], balanceData: [], expenseData: [] });

    useEffect(() => {
        const fetchData = async () => {
            // await store.getUserData(navigate);
            // await store.getTransactions();

            const categoryCounts: { [category: string]: number } = {};
            transacriondata?.forEach((transaction: TransactionType) => {
                const category = transaction.category;
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            });

            const data = Object.entries(categoryCounts).map(
                ([label, count]) => ({ label, count })
            );
            console.log("categorydata", data);
            setCategoryData(data);
        };

        fetchData();
    }, [transacriondata]);

    useEffect(() => {
        const labels = categoryData.map((category) => category.label);
        const incomeData = [0, store.userData?.totalIncome ?? 0];
        const expenseData = [store.userData?.totalExpense ?? 0, 0];
        const balanceData = [expenseData[0], incomeData[1] - expenseData[0]];

        setChartData({ labels, incomeData, balanceData, expenseData });
    }, [categoryData, store.userData]);

    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;
        const chart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: chartData.labels,

                datasets: [
                    {
                        data: categoryData.map((category) => category.count),
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
                        // color: "white",
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                    },
                },
            },

            // for dark theme
            // plugins: [
            //     {
            //         id: "customCanvasBackgroundColor",
            //         beforeDraw: (chart, args, options) => {
            //             const { ctx } = chart;
            //             ctx.save();
            //             ctx.globalCompositeOperation = "destination-over";
            //             ctx.fillStyle = options.color || "black";
            //             ctx.fillRect(0, 0, chart.width, chart.height);
            //             ctx.restore();
            //         },
            //     },
            // ],
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
                        const text = Amounttosort(String(creditDatas[0]));
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
                        backgroundColor: ["#e6e6e6", "rgba(55,212,159,255)"],
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
                        const text = Amounttosort(String(creditDatas[1]));
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
                        backgroundColor: ["#e6e6e6", "rgba(254,72,86,255)"],
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
                        text: "EXPENSES",
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                    },
                },
                animation: {
                    duration: 1500,
                    easing: "easeInOutQuart",
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
                        const text = Amounttosort(String(creditDatas[2]));
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
    }, [
        balance_data,
        categoryData,
        chartData.labels,
        creditDatas,
        expense_data,
        income_data,
    ]);
    return (
        <motion.div className="report-section">
            <motion.button
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                }}
                onClick={() => navigate("/profile")}
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
    );
};

export default UserReport;
