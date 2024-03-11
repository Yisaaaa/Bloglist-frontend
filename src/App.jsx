import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import Notification from "./components/Notification";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { deleteBlog, initializeBlogs, likeBlog } from "./reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
	const dispatch = useDispatch();

	const blogs = useSelector((state) => state.blogs);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [user, setUser] = useState(null);

	const sortedBlogs = [...blogs].sort((a, b) => {
		return b.likes - a.likes;
	});

	const createBlogRef = useRef();

	useEffect(() => {
		dispatch(initializeBlogs());
	}, []);

	useEffect(() => {
		let loggedUser = window.localStorage.getItem("loggedInBlogUser");

		if (loggedUser) {
			loggedUser = JSON.parse(loggedUser);
			setUser(loggedUser);
			blogService.setToken(loggedUser.token);
		}
	}, []);

	const handleSignOut = (event) => {
		event.preventDefault();
		setUser(null);
		blogService.setToken(null);
		window.localStorage.clear();

		dispatch(
			setNotification({ notification: "signed out", status: "success" }, 3)
		);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const user = await login({ username, password });
			setUser(user);
			window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUsername("");
			setPassword("");

			dispatch(
				setNotification(
					{
						notification: "Logged in successfully",
						status: "success",
					},
					3
				)
			);
		} catch (exception) {
			dispatch(
				setNotification(
					{
						notification: "Wrong username or password",
						status: "error",
					},
					3
				)
			);
		}
	};

	const handleLikeBlog = async (blog) => {
		dispatch(likeBlog(blog));
	};

	const handleDeleteBlog = (blog) => {
		dispatch(deleteBlog(blog));
	};

	return (
		<div className="px-12 py-4">
			<Notification />
			{user === null ? (
				<Login
					handleSubmit={handleSubmit}
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
				/>
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
							<Blog
								key={blog.id}
								handleLikeBlog={handleLikeBlog}
								handleDeleteBlog={handleDeleteBlog}
								blog={blog}
								user={user}
							/>
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
