import axios from "axios";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { LegacyRef, MutableRefObject, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { GroupTransactionRequest, Groupmember, Store } from "../stores/store";
// images
import greenTick from "../assets/greenTick.png";
import leftarrow from "../assets/leftArrow.png";
import savemoneyy from "../assets/saveimage.jpg";
import savemoney from "../assets/savemoney.png";
import categoriesWithAssets from "../pages/categories";

export default function AddGroupTransaction(): React.JSX.Element {
	const { groupId } = useParams<{ groupId?: string }>();
	const [members, setMembers] = useState<Groupmember[]>([]);
	const [isEditing, setIsEditing] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	console.log(groupId);
	

	const store = Store();
	const navigate = useNavigate();

	// changing date to hyphen from slash
	const [time, setTime] = useState(
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

	// categoris page open close logic
	const categories_page_ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
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
	const myref_circle: MutableRefObject<HTMLDivElement | null> = useRef(null);

	const tsp_down_input: LegacyRef<HTMLInputElement> = useRef(null);
	const myref_second_part: MutableRefObject<HTMLDivElement | null> = useRef(null);

	const formik = useFormik<GroupTransactionRequest>({
		initialValues: {
			groupId: groupId?.replace(":", "") as string,
			splitAmong: [],
			category: categoriesWithAssets[0].name,
			transactionAmount: "",
			transactionTitle: "",
			transactionDate: new Date().toISOString(),
		},
		onSubmit: async (values, { resetForm }) => {
			const transactionDate = new Date(`${date}T${time}`).toISOString();
			formik.setValues({
				...formik.values,
				transactionDate: transactionDate,
			});

			console.log(values);
			const res = await store.addGroupTransaction(values);
			if (res) resetForm();
		},
	});

	const expensecat = categoriesWithAssets.filter((category) =>
		category.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const sourceimage = categoriesWithAssets;
	const filteredCategories = expensecat;

	// Dependency added to execute when members state changes
	const fetchMembers = async () => {
		try {
			if (!store.selectedgroup) return;
			const membersData = await Promise.all(
				store.selectedgroup?.members.map(async (memberId) => {
					const response = await axios.get(`/user/membersdetail/${memberId}`);
					return response.data;
				}),
			);

			setMembers(membersData);
			console.log("Group members : ", membersData);
			
		} catch (err) {
			if (axios.isAxiosError(err)) {
				toast.error(err.response?.data.message);
			} else {
				console.error(err);
			}
		}
	};

	function handleSelectUser(user: Groupmember) {
		// Check if the user is already in formik.values.splitAmong
		const isSelected = formik.values.splitAmong.some(
			(selectedUser) => selectedUser.userName === user.userName,
		);

		if (isSelected) {
			// If selected, remove the user from formik.values.splitAmong
			const updatedSelectedUsers = formik.values.splitAmong.filter(
				(selectedUser) => selectedUser.userName !== user.userName,
			);
			formik.setValues({
				...formik.values,
				splitAmong: updatedSelectedUsers,
			});
		} else {
			// If not selected, add the user to formik.values.splitAmong
			formik.setValues((prevValues) => ({
				...prevValues,
				splitAmong: [...prevValues.splitAmong, user],
			}));
		}
	}

	useEffect(() => {
		// Fetch member details for each member in the group
		console.log("selected Group : ", store.selectedgroup);

		fetchMembers();
	}, []);

	return (
		<div className="Addtransaction AddGroupTransaction">
			<motion.div
				animate={{
					x: 0,
					opacity: isEditing ? 1 : 0,
					scale: isEditing ? 1 : 0,
					width: isEditing ? "100vw" : 0,
					visibility: isEditing ? "visible" : "hidden",
				}}
				className="fullscreeniaemodel"
				// onClick={() => setIsEditing(!isEditing)}
			>
				<div className="selectSplit">
					<button type="button" className="selectAllBtn">
						Select All
					</button>
					<div className="memberList">
						{members.map((member, index) => {
							return (
								<div className="member" key={index} onClick={() => handleSelectUser(member)}>
									<div className="checkBox">
										{formik.values.splitAmong.includes(member) && (
											<img src={greenTick} alt="tick" />
										)}
									</div>
									<div className="userName">{member.userName}</div>
								</div>
							);
						})}
					</div>
					<div className="buttons">
						<button type="button" className="cancel" onClick={() => setIsEditing(!isEditing)}>
							Cancel
						</button>
						<button type="button" className="ok" onClick={() => setIsEditing(!isEditing)}>
							OK
						</button>
					</div>
				</div>
			</motion.div>
			<form onSubmit={formik.handleSubmit}>
				<div className="categories-page" ref={categories_page_ref}>
					<div className="transaction-first-part-dopel">
						<div className="tfp-left-dopel" ref={myref_left}>
							<div className="img-layer-02" onClick={closeCategorisPage}>
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
										formik.setValues({
											...formik.values,
											category: categoriesWithAssets[index].name,
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
						onClick={() => navigate(`/groups/:${groupId}`)}
					>
						<div className="img-layer-01">
							<div className="img-layer-02">
								<img src={leftarrow} alt="" />
							</div>
						</div>
					</div>
				</div>
				<div className="transaction-second-part" ref={myref_second_part}>
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
							maxLength={8}
							placeholder="0.00"
							required
							value={formik.values.transactionAmount}
							onChange={(e) => {
								formik.handleChange(e);
								const regex = /^[0-9]+(\.[0-9]+)?$/;
								if (regex.test(e.target.value))
									formik.setValues({
										...formik.values,
										transactionAmount: e.target.value,
									});
							}}
						/>
					</div>
				</div>

				<div className="circal-01" ref={myref_circle}></div>
				<img className="decorationimg" src={savemoney} alt="" />
				<img className="decorationimg02" src={savemoneyy} alt="" />
				<div className="circal-02"></div>
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
										sourceimage.find((cat) => cat.name == formik.values.category)?.source
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
									{...formik.getFieldProps("transactionTitle")}
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
							onClick={() => setIsEditing(true)}
						>
							<h3>Select Spliting</h3>
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
								<input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
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
