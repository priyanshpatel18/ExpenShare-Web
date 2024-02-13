import { Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";

// pagesimport HomePage from "./pages/HomePage";
import Transaction from "./pages/Transaction";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";

import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App(): React.JSX.Element {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/OtpVerification" element={<OtpVerificationPage />} />
        <Route path="/forgotPasswordPage" element={<ForgotPasswordPage />} />
        <Route path="/resetPasswordPage" element={<ResetPasswordPage />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/Groups" element={<Groups />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default SplashScreen(App);
