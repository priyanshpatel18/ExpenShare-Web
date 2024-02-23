import { motion } from "framer-motion";
import { LegacyRef, MutableRefObject, Ref, useRef, useState } from "react";
import { Store } from "../stores/store";
import { TransactionRequest } from "../stores/store";
import { useFormik } from "formik";
// images
import addImageIcon from "../assets/addImageIcon.png";
import leftarrow from "../assets/leftArrow.png";
import categoriesWithAssets from "../pages/categories";
import { useNavigate } from "react-router-dom";

export default function AddTransaction(): React.JSX.Element {
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const store = Store();
    const navigate = useNavigate();
    const balance = store.userData?.totalBalance;
    console.log(balance);

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
            console.log("run CLOSE");
            categories_page_ref.current.style.opacity = "0";
            categories_page_ref.current.style.scale = "0";
            categories_page_ref.current.style.height = "0vh";
        }
    };

    // Userref and style change stuff

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
            formik.setValues({ ...formik.values, type: "income" });
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
            formik.setValues({ ...formik.values, type: "expense" });
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

    // filtering categoris
    const filteredCategories = categoriesWithAssets.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formik = useFormik<TransactionRequest>({
        initialValues: {
            transactionAmount: "",
            category: "Air Tickets",
            transactionTitle: "",
            notes: "",
            transactionDate: new Date().toISOString(),
            type: "expense",
            invoiceUrl: null,
        },
        onSubmit: async (values, { resetForm }) => {
            const transactionDate = new Date(`${date}T${time}`).toISOString();
            formik.setValues({
                ...formik.values,
                transactionDate: transactionDate,
            });
            console.log(values);

            store.setTransactions([
                {
                    transactionAmount: values.transactionAmount,
                    category: values.category,
                    transactionTitle: values.transactionTitle,
                    notes: values.notes,
                    transactionDate: values.transactionDate,
                    type: values.type,
                    _id: "",
                    publicId: "",
                    invoiceUrl: "",
                    createdBy: "",
                },
                ...(store.transactions || []),
            ]);

            const formData = new FormData();
            formData.append("transactionAmount", values.transactionAmount);
            formData.append("category", values.category);
            formData.append("transactionTitle", values.transactionTitle);
            formData.append("notes", values.notes);
            formData.append("transactionDate", values.transactionDate);
            formData.append("type", values.type);
            formData.append("invoiceUrl", values.invoiceUrl as File);
            const res = await store.addTransaction(formData);
            if (res) resetForm();
        },
    });

    return (
        <div className="Addtransaction">
            <motion.div
                animate={{
                    x: 0,
                    opacity: isEditing ? 1 : 0,
                    scale: isEditing ? 1 : 0,
                    width: isEditing ? "100vw" : 0,
                    visibility: isEditing ? "visible" : "hidden",
                }}
                className="fullscreeniaemodel"
                onClick={() => setIsEditing(!isEditing)}
            >
                <div>
                    <img
                        src={
                            formik.values.invoiceUrl
                                ? URL.createObjectURL(formik.values.invoiceUrl)
                                : addImageIcon
                        }
                        alt="Invoice Iamge"
                    />
                </div>
            </motion.div>
            <form onSubmit={formik.handleSubmit}>
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
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
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
                                        formik.setValues({
                                            ...formik.values,
                                            category:
                                                categoriesWithAssets[index]
                                                    .name,
                                        });
                                    }}
                                />
                                <p>{category.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="transaction-first-part">
                    <div
                        className="tfp-left"
                        ref={myref_left}
                        onClick={() => navigate("/")}
                    >
                        <div className="img-layer-01">
                            <div className="img-layer-02">
                                <img src={leftarrow} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="tfp-right" ref={myref_right}>
                        <div className="tfp-over">
                            <motion.button
                                type="button"
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
                                type="button"
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
                <div
                    className="transaction-second-part"
                    ref={myref_second_part}
                >
                    <div className="tsp-up">
                        <p>How much ?</p>
                    </div>
                    <div className="tsp-down">
                        <h1>₹</h1>
                        <input
                            type="nummber"
                            id="transactionAmount"
                            inputMode="numeric"
                            className="tsp-down-input"
                            ref={tsp_down_input}
                            maxLength={7}
                            placeholder="0.00"
                            required
                            value={formik.values.transactionAmount}
                            onChange={(e) => {
                                formik.handleChange(e);
                                const regex = /^[0-9.\b]*$/;
                                if (regex.test(e.target.value))
                                    formik.setValues({
                                        ...formik.values,
                                        transactionAmount: e.target.value,
                                    });
                            }}
                        />
                    </div>
                </div>
                <div className="transaction-third-part">
                    <div className="ttp-details">
                        <motion.div
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 100,
                            }}
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
                                            (cat) =>
                                                cat.name ==
                                                formik.values.category
                                        )?.source
                                    }
                                    alt="category"
                                />
                                <p>{formik.values.category}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 150,
                            }}
                            className="ttp-title"
                        >
                            <div className="ttpc-detail">
                                <p>Title</p>
                            </div>
                            <div className="ttpc-title">
                                <input
                                    type="text"
                                    id="transactionTitle"
                                    placeholder="Add a title"
                                    {...formik.getFieldProps(
                                        "transactionTitle"
                                    )}
                                    required
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 200,
                            }}
                            className="ttp-note"
                        >
                            <div className="ttpc-detail">
                                <p>Notes</p>
                            </div>
                            <div className="ttpc-note">
                                <input
                                    type="text"
                                    placeholder="Optional"
                                    {...formik.getFieldProps("notes")}
                                />
                            </div>
                            <div className="invoiceInput">
                                <label htmlFor="invoiceUrl">
                                    <img className="img" src={addImageIcon} />
                                    <input
                                        className="invoi"
                                        id="invoiceUrl"
                                        type="file"
                                        onChange={(e) =>
                                            formik.setValues({
                                                ...formik.values,
                                                invoiceUrl: e.target.files
                                                    ? e.target.files[0]
                                                    : null,
                                            })
                                        }
                                    />
                                </label>
                                <div className="invoiceView">
                                    {formik.values.invoiceUrl ? (
                                        <a onClick={() => setIsEditing(true)}>
                                            View
                                        </a>
                                    ) : (
                                        "invoice"
                                    )}
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 250,
                            }}
                            className="ttp-time-container"
                        >
                            <div className="ttp-Date">
                                <input
                                    type="date"
                                    value={date}
                                    max={today + 1}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="ttp-time">
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </motion.div>
                    </div>
                    <div className="ttp-btn">
                        <button type="submit">CONTINUE</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
