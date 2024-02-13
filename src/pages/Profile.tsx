// import { useLocation } from "react-router-dom";
// import "./Profile.css";
import CommenScreen from "../components/SideBar";
const Profile = () => {
  //   const location = useLocation();
  //   const { pathname } = location;
  return (
    <div className="Profilepage">
      <CommenScreen></CommenScreen>
      <div className="s">
        <p>Profile </p>
      </div>
    </div>
  );
};

export default Profile;
