import {
  LegacyRef,
  MutableRefObject,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import leftarrow from "../assets/arrow-left.png";
import { motion } from "framer-motion";

interface df {
  myref: RefObject<HTMLDivElement>;
  changepage2: () => void;
}

const Addtransaction = (props: df) => {
  const [value, setValue] = useState("");
  const [isexpense, setisexpense] = useState(true);
  const handleChange = (e: { target: { value: string } }) => {
    const inputValue = e.target.value;
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };
  useEffect(() => {
    console.log(isexpense);
  }, [isexpense]);

  const { myref, changepage2 } = props;
  const myref_left: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const myref_right: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const myref_in_btn: Ref<HTMLButtonElement> = useRef(null);
  const myref_ex_btn: Ref<HTMLButtonElement> = useRef(null);
  const tsp_down_input: LegacyRef<HTMLInputElement> = useRef(null);
  const myref_second_part: MutableRefObject<HTMLDivElement | null> =
    useRef(null);

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
      setisexpense(false);
    }
  };
  const swichtoexpense = () => {
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
      setisexpense(true);
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
            value={value}
            className="tsp-down-input"
            ref={tsp_down_input}
            maxLength={7}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="transaction-third-part"></div>
    </div>
  );
};

export default Addtransaction;
