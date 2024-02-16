import { motion } from "framer-motion";
import CommenScreen from "../components/SideBar";
import Addtransaction from "./Addtransaction";
import add from "../assets/addButton.png";
import { useRef, useState } from "react";
const Transaction = () => {
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
    <div className="transactionpage">
      <CommenScreen />
      <Addtransaction {...props} />
      <div className="e">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="add"
        >
          <img src={add} alt="" className="ad" onClick={changepage} />
        </motion.div>
        <p>transaction </p>
      </div>
    </div>
  );
};

export default Transaction;
