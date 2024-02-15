// import { useLocation } from "react-router-dom";
// import "./Profile.css";
import { useNavigate } from "react-router-dom";
import CommenScreen from "../components/SideBar";
import usersStore from "../stores/usersStore";
import { useEffect, useState } from "react";
const Profile = () => {
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
    <div className="Profilepage">
      <CommenScreen profile={profile}/>
      <div className="s">
        <p>Profile </p>
      </div>
    </div>
  );
};

export default Profile;
