import { motion } from "framer-motion";
import back from "../assets/backButton.png";
import { useNavigate } from "react-router-dom";

import { Store } from "../stores/store";

const Settings = () => {
    const navigate = useNavigate();
    const store = Store();

    return (
        <motion.div animate={{}} className="setting-section">
            <motion.button
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 170,
                }}
                className="settings-back-btn"
                onClick={() => navigate("/profile")}
            >
                <img src={back} alt="" />
            </motion.button>

            <div className="deletebtndev">
                <motion.button
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 170,
                    }}
                    className="delete"
                    onClick={() => store.deleteUser(navigate)}
                >
                    Delete Account
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Settings;
