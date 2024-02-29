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
import Settings from "./components/Settings";
import TearmsConditions from "./pages/TearmsConditions";
import AddGroupPage from "./pages/AddGroupPage";
import AddGroupMemberPage from "./pages/AddGroupMemberPage";
import GroupHomePage from "./pages/GroupHomePage";
import NotoficationPage from "./pages/NotoficationPage";

function App(): React.JSX.Element {
    return (
		<main>
			<Routes>
				<Route path="/registration" element={<RegistrationPage />} />
				<Route path="/registerOtpVerificationPage" element={<RegisterOtpVerificationPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/forgotPassword" element={<ForgotPasswordPage />} />
				<Route
					path="/passwordResetOtpVerificationPage"
					element={<PasswordResetOtpVerificationPage />}
				/>
				<Route path="/Addtransactions" element={<AddTransaction />} />
				<Route path="/resetPasswordPage" element={<ResetPasswordPage />} />
				{/* Protected routes */}
				<Route path="/" element={<HomePage />} />
				<Route path="/transactions" element={<TransactionsPage />} />
				<Route path="/groups" element={<GroupsPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/profile/Report" element={<UserReport />} />
				<Route path="/profile/account" element={<AccountPage />} />
				<Route path="/profile/Settings" element={<Settings />} />
				<Route path="/Tearms" element={<TearmsConditions />}></Route>
				<Route path="/addGroup" element={<AddGroupPage />}></Route>
				<Route path="/addGroupMember" element={<AddGroupMemberPage />}></Route>
				<Route path="/groupHome" element={<GroupHomePage />}></Route>
				<Route path="/notofication" element={<NotoficationPage />}></Route>
			</Routes>
		</main>
	);
}

export default SplashScreen(App);
