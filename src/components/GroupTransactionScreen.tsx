import React from "react";
import addButton from "../assets/addButton.png";
import { useNavigate, useParams } from "react-router-dom";

export default function GroupTransactionScreen(): React.JSX.Element {
    const { groupId } = useParams<{ groupId?: string }>();
    const navigate = useNavigate();

    return (
		<div className="GroupTransactionScreen">
			{"transactions Screen"}
			<div
				className="addTransactionBtn"
				onClick={() => navigate(`/groups/:${groupId}/addGroupTransaction`)}
			>
				<img src={addButton} alt="add transaction" />
			</div>
		</div>
	);
}