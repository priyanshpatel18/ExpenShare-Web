import React, { useEffect, useRef, useState } from "react";

import income from "../assets/upArrow.png";
import noting from "../assets/wallet.png";
import expense from "../assets/downArrow.png";
import foods from "../assets/food.png";
import add from "../assets/addButton.png";
import Sidebar from "../components/SideBar";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import logo from "../assets/profile.png";

import Addtransaction from "./Addtransaction";
import { Link } from "react-router-dom";
interface ModalProps {
  src: string;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ src, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={src} alt="Enlarged" />
      </div>
    </div>
  );
};

const ProfilePhoto: React.FC<{
  src: string;
  onOpenModal: (src: string) => void;
}> = ({ src, onOpenModal }) => {
  return (
    <img
      src={src}
      alt="Profile"
      onClick={() => onOpenModal(src)}
      style={{ cursor: "pointer" }}
    />
  );
};
function HomePage(): React.JSX.Element {
  const universalsex: number = 0.5;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const handleOpenModal = (src: string) => {
    setSelectedPhoto(src);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const credit = 50000;
  const incomee = 4000;
  const expensee = 8000;
  const count = useMotionValue(0);
  const count2 = useMotionValue(0);
  const count3 = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const rounded2 = useTransform(count2, Math.round);
  const rounded3 = useTransform(count3, Math.round);

  useEffect(() => {
    const incomeanimation = animate(count, incomee, { duration: universalsex });

    return incomeanimation.stop;
  }, []);

  useEffect(() => {
    const expenseanimation = animate(count2, expensee, {
      duration: universalsex,
    });

    return expenseanimation.stop;
  }, []);
  useEffect(() => {
    const animation = animate(count3, credit, { duration: universalsex });

    return animation.stop;
  }, []);

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

  const expenses = ["food", "entertainment", "petshop", "haircut"];
  return (
    <div className="HomePage">
      <Sidebar />
      <Addtransaction {...props}></Addtransaction>
      <div className="right">
        <motion.div className="add">
          <img src={add} alt="" className="ad" onClick={changepage} />
        </motion.div>
        <div className="up">
          <div className="side1">
            <div className="txt">
              <ProfilePhoto src={logo} onOpenModal={handleOpenModal} />
              {modalOpen && (
                <Modal src={selectedPhoto} onClose={handleCloseModal} />
              )}
              <p className="welcome-text">Welcome ,</p>
              <p className="user-name">Priyansh Patel</p>
            </div>
            <div className="credit">
              <div className="c1">
                <p>Total Balance</p>
              </div>
              <div className="c2">
                <span>$</span>
                <motion.p>{rounded3}</motion.p>
              </div>
              <div className="c3">
                <div className="income">
                  <div className="incomelayer">
                    <div>
                      <img src={income} alt="" />
                    </div>
                  </div>
                  <div className="incomevalue">
                    <div>
                      <p>Income</p>
                    </div>
                    <div className="animateddiv">
                      <span>$</span>
                      <motion.p>{rounded}</motion.p>
                    </div>
                  </div>
                </div>

                <div className="expense">
                  <div className="expenselayer">
                    <div>
                      <img src={expense} alt="" />
                    </div>
                  </div>
                  <div className="expensevalue">
                    <div>
                      <p>Expense</p>
                    </div>
                    <div className="animateddiv">
                      <span>$</span>
                      <motion.p>{rounded2}</motion.p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <motion.div className="side2">
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {" "}
              <button>Add Expenses</button>
            </motion.div>
          </motion.div>
        </div>
        <div className="middle"></div>
        <div className="down">
          <div className="detail">
            <div className="trans">
              <p>Transactions</p>
            </div>
            <div className="viewall">
              <Link to={`/Transaction`}>
                <p>View All</p>
              </Link>
            </div>
          </div>
          <div className="detail2">
            <div className="err">
              <img src={noting} alt="" />
              <p>No Transactions Found Yet</p>
              <p>No Transactions Found Yet</p>
            </div>

            <div className="contant">
              {expenses.map((i) => (
                <motion.div className="t1">
                  <div className="Detail-of-transaction">
                    <div className="Transaction-circle">
                      <img src={foods} alt="" id={i} />
                    </div>
                    <div className="Transaction-note">
                      <p> {i}</p>
                    </div>
                  </div>
                  <div className="Value-of-transaction">$50</div>
                </motion.div>
              ))}

              <div className="space"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
