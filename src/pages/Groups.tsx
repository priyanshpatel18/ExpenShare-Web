import { motion } from "framer-motion";
import Sidebar from "../components/SideBar";
import Addtransaction from "./Addtransaction";
import { useRef, useState } from "react";
import add from "../assets/addButton.png";

// import GroupFrame from "./GroupFrame";
// import { useLocation } from "react-router-dom";
const Groups = () => {
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
    <div className="GroupPage">
      <Sidebar></Sidebar>
      <Addtransaction {...props}></Addtransaction>
      <div className="d">
        <motion.div className="add">
          <img src={add} alt="" className="ad" onClick={changepage} />
        </motion.div>
        <p>Groups</p>
      </div>
    </div>
  );
};

export default Groups;
