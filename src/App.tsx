import { Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";

import HomePage from "./pages/HomePage";
import Transaction from "./pages/Transaction";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";

// eslint-disable-next-line react-refresh/only-export-components
function App(): React.JSX.Element {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/Groups" element={<Groups />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </main>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default SplashScreen(App);
