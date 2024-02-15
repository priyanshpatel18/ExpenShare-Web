import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommenScreen from "../components/SideBar";
import usersStore from "../stores/usersStore";

// import GroupFrame from "./GroupFrame";
// import { useLocation } from "react-router-dom";
const Groups = () => {
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
    <div className="GroupPage">
      <CommenScreen profile={profile}/>
      <div className="d">
        <p>Groups</p>
      </div>
    </div>
  );
};

export default Groups;
