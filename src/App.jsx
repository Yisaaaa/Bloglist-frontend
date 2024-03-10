import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import Notification from "./components/Notification";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
	const dispatch = useDispatch();

	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [user, setUser] = useState(null);

	const sortedBlogs = blogs.sort((a, b) => {
		return b.likes - a.likes;
	});

	const createBlogRef = useRef();

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

		dispatch(
			setNotification({ notification: "signed out", status: "success" }, 3)
		);
		// displayNotification({ message: "signed out", status: "success" });
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

			// displayNotification({
			// 	message: "login success",
			// 	status: "success",
			// });

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
			// displayNotification({
			// 	message: "Wrong username or password",
			// 	status: "error",
			// });

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

	const handleCreateBlog = async (newBlog) => {
		// Close the blog form here
		// Some code...
		createBlogRef.current.toggleVisibility();

		// No error handler

		try {
			const createdBlog = await blogService.createBlog(newBlog);
			setBlogs((oldBlogs) => [...oldBlogs, createdBlog]);

			// displayNotification({
			// 	message: `a new blog ${newBlog.title} by ${newBlog.author} was created`,
			// 	status: "success",
			// });

			dispatch(
				setNotification(
					{
						notification: `a new blog ${newBlog.title} by ${newBlog.author} was created`,
						status: "success",
					},
					3
				)
			);
		} catch (error) {
			setNotification(
				{
					notification: `Failed to create blog`,
					status: "error",
				},
				3
			);
		}
	};

	const handleLikeBlog = async (blog) => {
		const updatedBlog = await blogService.likeBlog(blog);

		setBlogs((oldBlogs) => {
			return oldBlogs.map((oldBlog) =>
				oldBlog.id === blog.id ? updatedBlog : oldBlog
			);
		});

		// displayNotification({
		// 	message: `blog ${blog.title} was liked`,
		// 	status: "success",
		// });

		dispatch(
			setNotification(
				{ notification: `blog ${blog.title} was liked`, status: "success" },
				3
			)
		);
	};

	const handleDeleteBlog = async (blog) => {
		await blogService.deleteBlog(blog);

		setBlogs((oldBlogs) => {
			let newBlogs = [];
			oldBlogs.forEach((oldBlog) => {
				if (oldBlog.id !== blog.id) {
					newBlogs.push(oldBlog);
				}
			});
			return newBlogs;
		});

		// displayNotification({
		// 	message: `blog ${blog.title} was deleted`,
		// 	status: "success",
		// });

		dispatch(
			setNotification({
				notification: `blog ${blog.title} was deleted`,
				status: "success",
			})
		);
	};

	// const displayNotification = (notification) => {
	// 	console.log("notify");
	// 	setNotification(notification);

	// 	setTimeout(() => {
	// 		setNotification(null);
	// 	}, 3000);
	// };

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

					{/* <CreateBlog
						handleCreateBlog={handleCreateBlog}
						newBlog={newBlog}
						setNewBlog={setNewBlog}
					/> */}

					<Togglable buttonLabel="new blog" ref={createBlogRef}>
						<CreateBlog handleCreateBlog={handleCreateBlog} />
					</Togglable>
				</div>
			)}
		</div>
	);
};

export default App;
