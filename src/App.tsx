import { Route, Routes, useNavigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import GroupsPage from "./pages/GroupsPage";
import { initializeSocket } from "./utils/socket";
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
import AddGroupTransaction from "./components/AddGroupTransaction";
// import GroupHomePage from "./pages/GroupHomePage";
import NotoficationPage from "./pages/NotoficationPage";
import { useEffect } from "react";
import { GroupDocument, Store } from "./stores/store";
import DynamicgroupPage from "./pages/DynamicgroupPage";
import toast from "react-hot-toast";

interface SocketResponse {
	message: string;
	requestId: string;
	groupName: string;
	groupId: string;
}

// initialize the socket
const socket = initializeSocket();

function App(): React.JSX.Element {
	const navigate = useNavigate();
	const store = Store();
	const email = store.userData?.email;

	useEffect(() => {
		socket.emit("login");

		socket.on("requestReceived", (object: SocketResponse) => {
			toast.success(object.message);

			const newNotification = {
				requestId: object.requestId,
				groupId: object.groupId,
				groupName: object.groupName,
			};

			store.setNotifications([...store.notifications, newNotification]);
		});

		socket.on("removedMember", (data: { groupId: string; message: string }) => {
			const { message, groupId } = data;

			const updatedGroups = store.groups.filter((group) => group._id !== groupId);
			store.setGroups(updatedGroups);
			toast.success(message);
		});

		socket.on("newTransaction", (message) => {
			toast.success(message);
		});

		return () => {
			socket.off("requestReceived");
			socket.off("updateGroup");
			socket.off("removedMember");
			socket.off("newTransaction");
		};
	}, [socket, email]);

	useEffect(() => {
		socket.on("updateGroup", ({ group }) => {
			const oldGroups: GroupDocument[] = Store.getState().groups;

			const indexToUpdate = oldGroups.findIndex((oldGroup) => oldGroup._id === group._id);

            console.log("updated Group: ", group);
            

			if (indexToUpdate !== -1) {
				// Update the group if it exists
				oldGroups[indexToUpdate] = group;
				if (store.selectedgroup?._id === group._id) {
					store.setselectedGroup(group);
				}
			} else {
				oldGroups.push(group);
			}
			store.setGroups(oldGroups);
		});
	}, [socket, store.selectedgroup]);

	useEffect(() => {
		async function getUserData() {
			await store.getUserData(navigate);
			await store.handleFetchGroups();
			await store.getTransactions();
		}

		getUserData();
	}, []);

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
				<Route path="/groups/:groupId/addGroupMember" element={<AddGroupMemberPage />}></Route>
				{/* <Route path="/groupHome" element={<GroupHomePage />}></Route> */}
				<Route path="/groups/:groupId" element={<DynamicgroupPage />} />{" "}
				<Route path="/groups/:groupId/addGroupTransaction" element={<AddGroupTransaction />}></Route>
				{/* Dynamic route */}
				<Route path="/notofication" element={<NotoficationPage />}></Route>
			</Routes>
		</main>
	);
}

export default SplashScreen(App);
