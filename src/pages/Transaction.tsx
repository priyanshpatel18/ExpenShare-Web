// import { useLocation } from "react-router-dom";
// import "./transaction.css";
import CommenScreen from "../components/SideBar";
const Transaction = () => {
  //   const location = useLocation();
  //   const { pathname } = location;
  return (
    <div className="transactionpage">
      <CommenScreen />
      <div className="e">
        <p>transaction </p>
      </div>
    </div>
  );
};

export default Transaction;