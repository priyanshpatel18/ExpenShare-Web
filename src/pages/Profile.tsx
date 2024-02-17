import { motion } from "framer-motion";
import { useRef, useState } from "react";
import CommenScreen from "../components/SideBar";
import add from "../assets/addButton.png";
import Addtransaction from "./Addtransaction";
// import usersStore from "../stores/usersStore";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  // const store = usersStore();
  // const navigate = useNavigate();
  // const [user, setUser] = useState({})
  const myref = useRef<HTMLDivElement>(null);
  const [isclick, setisclick] = useState(false);

  const changepage = () => {
    if (myref.current) {
      myref.current.style.top = "0%";
      setisclick(!isclick);
    }
  };

  const changepage2 = () => {
    if (myref.current) {
      myref.current.style.top = "150%";
      setisclick(!isclick);
    }
  };

  const props = {
    myref,
    changepage2,
  };

  // useEffect(() => {
  // 	    const UserData = async function () {
  // 		      const data = await store.getUserData(navigate);
  // 		      setUser(data ?? {});
  // 	    };

  // 	    UserData();
  //   }, []);

  return (
    <div className="Profilepage">
      <CommenScreen />
      <Addtransaction {...props} />
      <div className="ProfileSide">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="add"
        >
          <img src={add} alt="" className="ad" onClick={changepage} />
        </motion.div>
        <p>Profile </p>
      </div>
    </div>
  );
};

export default Profile;
