import { Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import GroupsPage from "./pages/GroupsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PasswordResetOtpVerificationPage from "./pages/PasswordResetOtpVerificationPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterOtpVerificationPage from "./pages/RegisterOtpVerificationPage";
import RegistrationPage from "./pages/RegistrationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TransactionsPage from "./pages/TransactionsPage";
import AddTransaction from "./components/AddTransaction";
import UserReport from "./components/UserReport";
import AccountPage from "./pages/AccountPage";

function App(): React.JSX.Element {
    return (
        <main>
            <Routes>
                <Route path="/registration" element={<RegistrationPage />} />
                <Route
                    path="/registerOtpVerificationPage"
                    element={<RegisterOtpVerificationPage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/forgotPasswordPage"
                    element={<ForgotPasswordPage />}
                />
                <Route
                    path="/passwordResetOtpVerificationPage"
                    element={<PasswordResetOtpVerificationPage />}
                />
                <Route path="/Addtransactions" element={<AddTransaction />} />

                <Route
                    path="/resetPasswordPage"
                    element={<ResetPasswordPage />}
                />
                {/* Protected routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/groups" element={<GroupsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/Report" element={<UserReport />} />
              <Route path="/accountPage" element={<AccountPage />} />
            </Routes>
        </main>
    );
}

export default SplashScreen(App);
