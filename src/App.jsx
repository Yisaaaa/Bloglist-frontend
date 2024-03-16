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
					<div className="flex gap-2 items-end mb-20">
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

					<Bloglist />
				</div>
			)}
		</div>
	);
};

export default App;
