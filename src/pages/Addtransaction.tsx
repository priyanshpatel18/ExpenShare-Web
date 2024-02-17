import { motion } from "framer-motion";
import { ChangeEvent, LegacyRef, MutableRefObject, Ref, useRef, useState } from "react";
import leftarrow from "../assets/leftArrow.png";

import categoriesWithAssets from "../categories";

interface df {
	myref: React.RefObject<HTMLDivElement>;
	changepage2: () => void;
	changepage: () => void;
}

const Addtransaction = (props: df) => {
	const [value, setValue] = useState("");
	// const [isexpense, setisexpense] = useState(true);

	const handleChange = (event: { target: { value: string } }) => {
		// Ensure only numeric values are entered
		const inputValue = event.target.value.replace(/^[^.]*\.[^.]*$/, "");
		setValue(inputValue);
		console.log(value);
	};

	const { myref, changepage2 } = props;
	const myref_left: MutableRefObject<HTMLDivElement | null> = useRef(null);
	const myref_right: MutableRefObject<HTMLDivElement | null> = useRef(null);
	const myref_in_btn: Ref<HTMLButtonElement> = useRef(null);
	const myref_ex_btn: Ref<HTMLButtonElement> = useRef(null);
	const tsp_down_input: LegacyRef<HTMLInputElement> = useRef(null);
	const myref_second_part: MutableRefObject<HTMLDivElement | null> = useRef(null);

	const income = {
		backround: "#2ABD42",
	};
	const expense = {
		backround: "#FF4545",
	};

	const swichtoincome = () => {
		if (
			myref_second_part.current &&
			myref_in_btn.current &&
			myref_left.current &&
			myref_right.current &&
			myref_ex_btn.current &&
			tsp_down_input.current
		) {
			// setisexpense(false);
			myref_in_btn.current.style.backgroundColor = income.backround;
			myref_in_btn.current.style.color = "white";
			myref_left.current.style.backgroundColor = income.backround;
			myref_right.current.style.backgroundColor = income.backround;
			myref_second_part.current.style.backgroundColor = income.backround;
			myref_ex_btn.current.style.backgroundColor = "white";
			myref_ex_btn.current.style.color = "black";
			tsp_down_input.current.style.backgroundColor = income.backround;
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
			// setisexpense(true);
			myref_in_btn.current.style.backgroundColor = "white";
			myref_in_btn.current.style.color = "black";
			myref_left.current.style.backgroundColor = expense.backround;
			myref_right.current.style.backgroundColor = expense.backround;
			myref_second_part.current.style.backgroundColor = expense.backround;
			myref_ex_btn.current.style.backgroundColor = expense.backround;
			myref_ex_btn.current.style.color = "white";
			tsp_down_input.current.style.backgroundColor = expense.backround;
		}
	};

	const [currentTime, setCurrentTime] = useState(
		new Date().toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		}),
	);
	const dateObject = new Date();
	const today = new Date().toISOString().split("T")[0];
	const year = dateObject.getFullYear();
	const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is zero-based
	const day = String(dateObject.getDate()).padStart(2, "0");
	const newDate = `${year}-${month}-${day}`;

	const [date, setDate] = useState(newDate);

	const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputDate = event.target.value;

		setDate(inputDate);
	};

	const handlechangetime = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentTime(e.target.value);
	};

	const categories_page_ref: MutableRefObject<HTMLDivElement | null> = useRef(null);

	const switchtocategoriespage = () => {
		if (categories_page_ref.current) {
			categories_page_ref.current.style.scale = "1";
		}
	};
	const closecategories = () => {
		if (categories_page_ref.current) {
			categories_page_ref.current.style.scale = "0";
		}
	};

	return (
		<div className="Addtransaction" ref={myref}>
			<div className="categories-page" ref={categories_page_ref}>
				<div className="transaction-first-part-dopel">
					<div className="tfp-left-dopel" ref={myref_left}>
						<div className="img-layer-02" onClick={closecategories}>
							<img src={leftarrow} alt="" />
						</div>
					</div>
					<div className="tfp-right-dopel" ref={myref_right}>
						<div className="tfp-search">
							<input type="text" className="search-categories" />
						</div>
					</div>
				</div>
				<div className="category-grid">
					{categoriesWithAssets.map((category, index) => (
						<div key={index} className="category-item">
							<img src={category.source} alt={category.name} />
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
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
						>
							INCOME
						</motion.button>
						<motion.button
							className="tfp-ex"
							ref={myref_ex_btn}
							onClick={swichtoexpense}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.8 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
						className="tsp-down-input"
						ref={tsp_down_input}
						maxLength={7}
						value={value}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="transaction-third-part">
				<div className="ttp-details">
					<div className="ttp-category" onClick={switchtocategoriespage}>
						<div className="ttpc-detail">
							<p>Select a Category</p>
						</div>
						<div className="ttpc-img">
							<img src="" alt="" />
						</div>
					</div>

					<div className="ttp-title">
						<div className="ttpc-detail">
							<p>Title</p>
						</div>
						<div className="ttpc-title">
							<input type="text" />
						</div>
					</div>
					<div className="ttp-note">
						<div className="ttpc-detail">
							<p>Notes</p>
						</div>
						<div className="ttpc-note">
							<input type="text" />
						</div>
					</div>
					<div className="ttp-time-container">
						<div className="ttp-Date">
							<input type="date" onChange={handleDateChange} value={date} max={today} />
						</div>
						<div className="ttp-time">
							<input type="time" value={currentTime} onChange={handlechangetime} />
						</div>
					</div>
				</div>
				<div className="ttp-btn">
					<button>CONTINUE</button>
				</div>
			</div>
		</div>
	);
};

export default Addtransaction;
