import { motion } from "framer-motion";
import CommenScreen from "../components/SideBar";
import add from "../assets/add.png";
import { useRef, useState } from "react";

import Addtransaction from "./Addtransaction";
const Profile = () => {
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
  return (
    <div className="Profilepage">
      <CommenScreen></CommenScreen>
      <Addtransaction {...props} />
      <div className="ProfileSide">
        <motion.div className="add">
          <img src={add} alt="" className="ad" onClick={changepage} />
        </motion.div>
        <p>Profile </p>
      </div>
    </div>
  );
};

export default Profile;
