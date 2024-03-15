import { useEffect, useRef, useContext } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import { useSetNotification } from "./reducers/notificationReducer";
import { useQuery } from "@tanstack/react-query";
import blogService from "./services/blogs";
import {
	useInitializeUser,
	useUserValue,
	useSignOutUser,
} from "./reducers/userReducer";

const App = () => {
	const setNotification = useSetNotification();
	const initializeUser = useInitializeUser();
	const signOutUser = useSignOutUser();

	const user = useUserValue();

	const blogResult = useQuery({
		queryKey: ["blogs"],
		queryFn: blogService.getAll,
		retry: 2,
		refetchOnWindowFocus: false,
	});

	const createBlogRef = useRef();

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

	if (blogResult.isPending) {
		return <div>Fetching blogs...</div>;
	} else if (blogResult.isError) {
		return <div>Failed to fetch blogs</div>;
	}

	const sortedBlogs = [...blogResult.data].sort((a, b) => {
		return b.likes - a.likes;
	});

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

					<h2 className="text-4xl font-medium mb-5">Blogs</h2>
					<div className="flex flex-col gap-3 text-4xl mb-16">
						{sortedBlogs.map((blog) => (
							<Blog key={blog.id} blog={blog} />
						))}
					</div>

					<Togglable buttonLabel="new blog" ref={createBlogRef}>
						<CreateBlog createBlogRef={createBlogRef} />
					</Togglable>
				</div>
			)}
		</div>
	);
};

export default App;
