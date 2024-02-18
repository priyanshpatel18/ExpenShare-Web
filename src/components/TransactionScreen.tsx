import React, { useEffect } from "react";
import usersStore from "../stores/usersStore";

export default function TransactionScreen(props: any): React.JSX.Element {
	// const [transaction, setTransaction] = useState([{},{},{}])
	const store = usersStore();

	useEffect(() => {		
		async function getTransactions() {
			const data = await store.getAllTransactions({ email: props?.user?.email || "" });
            console.log(data);
		}
        getTransactions();
	});

	return <div className="TransactionScreen">{"TransactionScreen"}</div>;
}
