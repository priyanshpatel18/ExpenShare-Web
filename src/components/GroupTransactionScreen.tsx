import React from "react";
import addButton from "../assets/addButton.png";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../stores/store";
import categoriesImgs from "../pages/categories";

export default function GroupTransactionScreen(): React.JSX.Element {
	const { groupId } = useParams<{ groupId?: string }>();
	const navigate = useNavigate();
	const store = Store();

	return (
		<div className="GroupTransactionScreen">
			{store.selectedgroup?.groupExpenses.map((expense, index) => {
				const dateObject = new Date(expense.transactionDate);

				const img_expense = categoriesImgs.find((category) => {
					return category.name.toLocaleLowerCase() == expense.category.toLocaleLowerCase();
				});

				const borrowd = (expense.transactionAmount / (expense.splitAmong.length)).toFixed(2);
				const lent = (expense.transactionAmount - (expense.transactionAmount / (expense.splitAmong.length))).toFixed(2);

				return (
					<div key={index} className="transaction">
						<div className="date">
							<div>{dateObject.toLocaleString("default", { month: "short" })}</div>
							<div>{dateObject.getDate()}</div>
						</div>
						<div className="catImage">
							<div className="imgContainer">
								<img src={img_expense?.source} alt="" />
							</div>
						</div>
						<div className="title">
							<h3>{expense.transactionTitle}</h3>
							<p>
								{expense?.paidBy?.userName == store.userData?.userName
									? "You"
									: expense?.paidBy?.userName}{" "}
								paid {expense?.transactionAmount}
							</p>
						</div>
						<div className="amount" style={expense.paidBy?.userName == store.userData?.userName ? {color: "green"} : {color: "red"}}>
							<div>
								{expense?.paidBy?.userName == store.userData?.userName ? "You lent" : "You borrowd"}
							</div>
							<div>
								{expense.paidBy?.userName == store.userData?.userName
									? lent : borrowd}
							</div>
						</div>
					</div>
				);
			})}
			
			<div
				className="addTransactionBtn"
				onClick={() => navigate(`/groups/${groupId}/addGroupTransaction`)}
			>
				<img src={addButton} alt="add transaction" />
			</div>
		</div>
	);
}
