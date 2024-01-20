import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import Notification from "./components/Notification";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [newBlog, setNewBlog] = useState({
		title: "",
		author: "",
		url: "",
	});
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
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
		displayNotification({ message: "signed out", status: "success" });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const user = await login({ username, password });
			setUser(user);
			window.localStorage.setItem(
				"loggedInBlogUser",
				JSON.stringify(user)
			);
			blogService.setToken(user.token);
			setUsername("");
			setPassword("");

			displayNotification({
				message: "login success",
				status: "success",
			});
		} catch (exception) {
			displayNotification({
				message: "Wrong username or password",
				status: "error",
			});

			console.log("something went wrong");
		}
	};

	const handleCreateBlog = async (event) => {
		event.preventDefault();

		// No error handler
		const createdBlog = await blogService.createBlog(newBlog);
		setNewBlog({ title: "", author: "", url: "" });
		setBlogs((oldBlogs) => [...oldBlogs, createdBlog]);

		displayNotification({
			message: `a new blog ${newBlog.title} by ${newBlog.author} was created`,
			status: "success",
		});
	};

	const displayNotification = (notification) => {
		console.log("notify");
		setNotification(notification);

		setTimeout(() => {
			setNotification(null);
		}, 3000);
	};

	return (
		<div className="px-12 py-4">
			{notification !== null && (
				<Notification notification={notification} />
			)}
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
						{blogs.map((blog) => (
							<Blog key={blog.id} blog={blog} />
						))}
					</div>

					<CreateBlog
						handleCreateBlog={handleCreateBlog}
						newBlog={newBlog}
						setNewBlog={setNewBlog}
					/>
				</div>
			)}
		</div>
	);
};

export default App;
