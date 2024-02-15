// import { useLocation } from "react-router-dom";
// import "./transaction.css";
import { useNavigate } from "react-router-dom";
import CommenScreen from "../components/SideBar";
import usersStore from "../stores/usersStore";
import { useEffect, useState } from "react";
const Transaction = () => {
  //   const location = useLocation();
  //   const { pathname } = location;

  const navigate = useNavigate();
  const store = usersStore();
  const [profile, setProfile] = useState("");

  useEffect(() => {
		const getUserData = async () => {
			const userData = await store.getUserData(navigate);
			console.log(userData?.profilePicture);
			if (userData?.profilePicture !== undefined) {
				setProfile(userData.profilePicture);
			}
		};

		getUserData();
  });



  return (
    <div className="transactionpage">
      <CommenScreen profile={profile}/>
      <div className="e">
        <p>transaction </p>
      </div>
    </div>
  );
};

export default Transaction;
