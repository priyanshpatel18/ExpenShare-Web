import React, { useEffect, useRef, useState } from "react";
// import "./Homepage.css";
import income from "../assets/income.png";
import noting from "../assets/nothing.png";
import expense from "../assets/expense.png";
import food from "../assets/food.png";
import add from "../assets/add.png";
import CommenScreen from "../components/SideBar";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import logo from "../assets/LOGO3.png";

// import { useRef, useState } from "react";
// import { useState } from "react";

import Addtransaction from "./Addtransaction";
function HomePage(): React.JSX.Element {
  const universalsex: number = 0.5;

  // const [credit, setcredit] = useState(50000);
  // const [incomee, setincome] = useState(4000);
  // const [expensee, setexpense] = useState(8000);
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

  const myref = useRef<HTMLDivElement>();
  // const myref2 = useRef<HTMLDivElement>();
  //   let route = ["Home", "transaction", "Groups", "Profile"];
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
      <CommenScreen />
      <Addtransaction {...props}></Addtransaction>
      <div className="right">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="add"
        >
          <img src={add} alt="" className="ad" onClick={changepage} />
        </motion.div>
        <div className="up">
          <div className="side1">
            <div className="txt">
              <img src={logo} alt="" />
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
                  <div>
                    <img src={income} alt="" />
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
                  <div>
                    <img src={expense} alt="" />
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
                      <img src={food} alt="" />
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
