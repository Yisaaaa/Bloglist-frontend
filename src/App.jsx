import { useEffect } from "react";
import Notification from "./components/Notification";
import Login from "./components/Login";
import { useSetNotification } from "./reducers/notificationReducer";
import {
	useInitializeUser,
	useUserValue,
	useSignOutUser,
} from "./reducers/userReducer";
import Bloglist from "./components/Bloglist";
import { Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
	const setNotification = useSetNotification();
	const initializeUser = useInitializeUser();
	const signOutUser = useSignOutUser();

	const user = useUserValue();

	useEffect(() => {
		initializeUser();
	}, []);

	const handleSignOut = (event) => {
		event.preventDefault();
		signOutUser();

		setNotification(
			{
				notification: "signed out successfully",
				isError: false,
			},
			3
		);
	};

	return (
		<div className="px-12 py-4">
			<Notification />
			{user === null ? (
				<Login />
			) : (
				<div>
					<h1 className="text-6xl font-bold mb-8">Blogs</h1>
					<div className="flex flex-col gap-6 items-start mb-20">
						<h1 className="text-5xl font-medium">
							Logged in as {user.username}
						</h1>
						<button
							onClick={handleSignOut}
							className="bg-black text-white font-semibold px-3 rounded-md"
						>
							Sign out
						</button>
					</div>

					{/* <Bloglist /> */}
					<Routes>
						<Route path="/" element={<Bloglist />} />
						<Route path="/users" element={<Users />} />
						<Route path="/users/:id" element={<User />} />
					</Routes>
				</div>
			)}
		</div>
	);
};

export default App;
