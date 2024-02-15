import React, { useRef } from "react";
import leftarrow from "../assets/arrow-left.png";
import { motion } from "framer-motion";

interface df {
  myref: React.MutableRefObject<HTMLDivElement | undefined>;
  changepage2: () => void;
}

const Addtransaction = (props: df) => {
  const { myref, changepage2 } = props;
  const myref_left = useRef<HTMLDivElement>();
  const myref_right = useRef<HTMLDivElement>();
  const myref_in_btn = useRef<HTMLDivElement>();
  const myref_ex_btn = useRef<HTMLDivElement>();
  const tsp_down_input = useRef<HTMLDivElement>();
  const myref_second_part = useRef<HTMLDivElement>();

  const income = {
    backround: "#2ABD42",
  };
  const expense = {
    backround: "#FF4545",
  };

  const swichtoincome = () => {
    if (
      myref_second_part.current &&
      myref_in_btn.current &&
      myref_left.current &&
      myref_right.current &&
      myref_ex_btn.current &&
      tsp_down_input.current
    ) {
      myref_in_btn.current.style.backgroundColor = income.backround;
      myref_in_btn.current.style.color = "white";
      myref_left.current.style.backgroundColor = income.backround;
      myref_right.current.style.backgroundColor = income.backround;
      myref_second_part.current.style.backgroundColor = income.backround;
      myref_ex_btn.current.style.backgroundColor = "white";
      myref_ex_btn.current.style.color = "black";
      tsp_down_input.current.style.backgroundColor = income.backround;
    }
  };
  const swichtoexpense = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);

    if (
      myref_second_part.current &&
      myref_in_btn.current &&
      myref_left.current &&
      myref_right.current &&
      myref_ex_btn.current &&
      tsp_down_input.current
    ) {
      myref_in_btn.current.style.backgroundColor = "white";
      myref_in_btn.current.style.color = "black";
      myref_left.current.style.backgroundColor = expense.backround;
      myref_right.current.style.backgroundColor = expense.backround;
      myref_second_part.current.style.backgroundColor = expense.backround;
      myref_ex_btn.current.style.backgroundColor = expense.backround;
      myref_ex_btn.current.style.color = "white";
      tsp_down_input.current.style.backgroundColor = expense.backround;
    }
  };
  return (
    <div className="Addtransaction" ref={myref}>
      <div className="transaction-first-part">
        <div className="tfp-left" ref={myref_left}>
          {" "}
          <div onClick={changepage2} className="img-layer-01">
            <div className="img-layer-02">
              <img src={leftarrow} alt="" />
            </div>
          </div>
        </div>
        <div className="tfp-right" ref={myref_right}>
          <div className="tfp-over">
            <motion.button
              className="tfp-in"
              onClick={swichtoincome}
              ref={myref_in_btn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              INCOME
            </motion.button>
            <motion.button
              className="tfp-ex"
              ref={myref_ex_btn}
              onClick={swichtoexpense}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              EXPENSE
            </motion.button>
          </div>
        </div>
      </div>
      <div className="transaction-second-part" ref={myref_second_part}>
        <div className="tsp-up">
          <p>How much ?</p>
        </div>
        <div className="tsp-down">
          <h1>$</h1>
          <input
            type="nummber"
            className="tsp-down-input"
            ref={tsp_down_input}
            maxLength={7}
          />
        </div>
      </div>
      <div className="transaction-third-part"></div>
    </div>
  );
};

export default Addtransaction;