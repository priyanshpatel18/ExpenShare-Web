import { motion } from "framer-motion";
import CommenScreen from "../components/SideBar";
import Addtransaction from "./Addtransaction";
import { useRef, useState } from "react";
import add from "../assets/add.png";

// import GroupFrame from "./GroupFrame";
// import { useLocation } from "react-router-dom";
const Groups = () => {
  const myref = useRef<HTMLDivElement>();
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
    <div className="GroupPage">
      <CommenScreen></CommenScreen>
      <Addtransaction {...props}></Addtransaction>
      <div className="d">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="add"
        >
          <img src={add} alt="" className="ad" onClick={changepage} />
        </motion.div>
        <p>Groups</p>
      </div>
    </div>
  );
};

export default Groups;
