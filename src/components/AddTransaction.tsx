import { motion } from "framer-motion";
import {
    LegacyRef,
    MutableRefObject,
    Ref,
    RefObject,
    useRef,
    useState,
} from "react";
import { Store } from "../stores/store";
// images
import leftarrow from "../assets/leftArrow.png";
import categoriesWithAssets from "../pages/categories";

interface AddTransactionint {
    myref: RefObject<HTMLDivElement>;
    changepage2: () => void;
    changepage: () => void;
}

export default function AddTransaction(
    props: AddTransactionint
): React.JSX.Element {
    const [incomeFlag, setIncomeFlag] = useState("expense");
    const [searchQuery, setSearchQuery] = useState("");
    const [transactionAmount, setAmount] = useState("");
    const [notes, setNotes] = useState("");
    const [transactionTitle, setTitle] = useState("");
    const [category, setCategory] = useState("Air Tickets");
    const store = Store();

    // Userref and style change stuff
    const { myref, changepage2 } = props;
    const myref_left: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const myref_right: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const myref_in_btn: Ref<HTMLButtonElement> = useRef(null);
    const myref_ex_btn: Ref<HTMLButtonElement> = useRef(null);
    const tsp_down_input: LegacyRef<HTMLInputElement> = useRef(null);
    const myref_second_part: MutableRefObject<HTMLDivElement | null> =
        useRef(null);
    const swichtoincome = () => {
        if (
            myref_second_part.current &&
            myref_in_btn.current &&
            myref_left.current &&
            myref_right.current &&
            myref_ex_btn.current &&
            tsp_down_input.current
        ) {
            setIncomeFlag("income");
            myref_in_btn.current.style.backgroundColor = "#2ABD42";
            myref_in_btn.current.style.color = "white";
            myref_left.current.style.backgroundColor = "#2ABD42";
            myref_right.current.style.backgroundColor = "#2ABD42";
            myref_second_part.current.style.backgroundColor = "#2ABD42";
            myref_ex_btn.current.style.backgroundColor = "white";
            myref_ex_btn.current.style.color = "black";
            tsp_down_input.current.style.backgroundColor = "#2ABD42";
        }
    };
    const swichtoexpense = () => {
        if (
            myref_second_part.current &&
            myref_in_btn.current &&
            myref_left.current &&
            myref_right.current &&
            myref_ex_btn.current &&
            tsp_down_input.current
        ) {
            setIncomeFlag("expense");
            myref_in_btn.current.style.backgroundColor = "white";
            myref_in_btn.current.style.color = "black";
            myref_left.current.style.backgroundColor = "#FF4545";
            myref_right.current.style.backgroundColor = "#FF4545";
            myref_second_part.current.style.backgroundColor = "#FF4545";
            myref_ex_btn.current.style.backgroundColor = "#FF4545";
            myref_ex_btn.current.style.color = "white";
            tsp_down_input.current.style.backgroundColor = "#FF4545";
        }
    };

    // changing date to hyphen from slash
    const [time, setTime] = useState(
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
    );
    const dateObject = new Date();
    const today = new Date().toISOString().split("T")[0];
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(dateObject.getDate()).padStart(2, "0");
    const newDate = `${year}-${month}-${day}`;
    const [date, setDate] = useState(newDate);

    // categoris page open close logic
    const categories_page_ref: MutableRefObject<HTMLDivElement | null> =
        useRef(null);
    const switchToCategorisPage = () => {
        if (categories_page_ref.current) {
            categories_page_ref.current.style.opacity = "1";
            categories_page_ref.current.style.scale = "1";
            categories_page_ref.current.style.height = "100vh";
        }
    };
    const closeCategorisPage = () => {
        if (categories_page_ref.current) {
            categories_page_ref.current.style.opacity = "0";
            categories_page_ref.current.style.scale = "0";
            categories_page_ref.current.style.height = "0vh";
        }
    };

    // filtering categoris
    const filteredCategories = categoriesWithAssets.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // const transactionAmountNumber: number = parseFloat(transactionAmount);
    const handlesubmit = () => {
        if (!transactionAmount.trim()) {
            alert("Please enter a valid amount");
            return;
        }
        const transactionDate = new Date(`${date}T${time}`).toISOString();
        console.log(transactionDate);

        store.setTransactions([
            ...(store.transactions || []), // Provide a default empty array if store.transactions is undefined
            {
                transactionAmount: Number(transactionAmount),
                category: category,
                transactionTitle: transactionTitle,
                notes: notes,
                transactionDate: transactionDate,
                type: incomeFlag,
            },
        ]);

        // Server Regest Object
        const requestObject = {
            transactionAmount: Number(transactionAmount),
            category: category,
            transactionTitle: transactionTitle,
            notes: notes,
            transactionDate: transactionDate,
            type: incomeFlag,
        };
        store.addTransaction(requestObject);
    };

    return (
        <div className="Addtransaction" ref={myref}>
            <div className="categories-page" ref={categories_page_ref}>
                <div className="transaction-first-part-dopel">
                    <div className="tfp-left-dopel" ref={myref_left}>
                        <div
                            className="img-layer-02"
                            onClick={closeCategorisPage}
                        >
                            <img src={leftarrow} alt="" />
                        </div>
                    </div>
                    <div className="tfp-right-dopel" ref={myref_right}>
                        <div className="tfp-search">
                            <input
                                type="text"
                                className="search-categories"
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="category-grid">
                    {filteredCategories.map((category, index) => (
                        <div key={index} className="category-item">
                            <img
                                src={category.source}
                                alt={category.name}
                                onClick={() => {
                                    closeCategorisPage();
                                    setCategory(
                                        categoriesWithAssets[index].name
                                    );
                                }}
                            />
                            <p>{category.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="transaction-first-part">
                <div className="tfp-left" ref={myref_left}>
                    <div onClick={changepage2} className="img-layer-01">
                        <div className="img-layer-02">
                            <img src={leftarrow} alt="" />
                        </div>
                    </div>
                </div>
                <div className="tfp-right" ref={myref_right}>
                    <div className="tfp-over">
                        <motion.button
                            className="tfp-in"
                            onClick={swichtoincome}
                            ref={myref_in_btn}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                            }}
                        >
                            INCOME
                        </motion.button>
                        <motion.button
                            className="tfp-ex"
                            ref={myref_ex_btn}
                            onClick={swichtoexpense}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                            }}
                        >
                            EXPENSE
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className="transaction-second-part" ref={myref_second_part}>
                <div className="tsp-up">
                    <p>How much ?</p>
                </div>
                <div className="tsp-down">
                    <h1>$</h1>
                    <input
                        type="nummber"
                        inputMode="numeric"
                        className="tsp-down-input"
                        ref={tsp_down_input}
                        maxLength={7}
                        value={transactionAmount}
                        onChange={(e) =>
                            setAmount(
                                e.target.value.replace(/^[^.]*\.[^.]*$/, "")
                            )
                        }
                    />
                </div>
            </div>
            <div className="transaction-third-part">
                <div className="ttp-details">
                    <div
                        className="ttp-category"
                        onClick={switchToCategorisPage}
                    >
                        <div className="ttpc-detail">
                            <p>Select a Category</p>
                        </div>
                        <div className="ttpc-img">
                            <img
                                src={
                                    categoriesWithAssets.find(
                                        (cat) => cat.name == category
                                    )?.source
                                }
                                alt=""
                            />
                            <p>{category}</p>
                        </div>
                    </div>

                    <div className="ttp-title">
                        <div className="ttpc-detail">
                            <p>Title</p>
                        </div>
                        <div className="ttpc-title">
                            <input
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="ttp-note">
                        <div className="ttpc-detail">
                            <p>Notes</p>
                        </div>
                        <div className="ttpc-note">
                            <input
                                type="text"
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="ttp-time-container">
                        <div className="ttp-Date">
                            <input
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                                max={today}
                            />
                        </div>
                        <div className="ttp-time">
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="ttp-btn">
                    <button
                        onClick={() => {
                            changepage2();
                            handlesubmit();
                        }}
                    >
                        CONTINUE
                    </button>
                </div>
            </div>
        </div>
    );
}
