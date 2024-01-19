import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";

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
		} catch (exception) {
			console.log("something went wrong");
		}
	};

	const handleCreateBlog = async (event) => {
		event.preventDefault();
		const createdBlog = await blogService.createBlog(newBlog);
		setNewBlog({ title: "", author: "", url: "" });
		setBlogs((oldBlogs) => [...oldBlogs, createdBlog]);
	};

	return (
		<>
			{user === null ? (
				<div>
					<h1 className="text-4xl mt-3 mb-4">Login to application</h1>
					<form onSubmit={handleSubmit}>
						<div className="flex gap-2 mb-2 ">
							<label htmlFor="username">Username</label>
							<input
								className="border-2 rounded-md border-black p-2"
								type="text"
								id="username"
								value={username}
								onChange={({ target }) =>
									setUsername(target.value)
								}
							/>
						</div>

						<div className="flex gap-2 mb-5">
							<label htmlFor="password">Password</label>
							<input
								className="border-2 rounded-md border-black p-2"
								type="password"
								id="password"
								value={password}
								onChange={({ target }) =>
									setPassword(target.value)
								}
							/>
						</div>

						<button className="bg-slate-900 text-white font-semibold py-1 px-3 rounded-lg">
							Login
						</button>
					</form>
				</div>
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

					<div>
						<h2 className="text-4xl font-medium mb-5">
							Create new
						</h2>

						<form onSubmit={handleCreateBlog}>
							<div>
								<label
									className="text-3xl mr-3"
									htmlFor="title"
								>
									title:
								</label>
								<input
									className="border-2 border-gray-300 rounded-md mb-3"
									type="text"
									id="title"
									value={newBlog.title}
									onChange={({ target }) =>
										setNewBlog({
											...newBlog,
											title: target.value,
										})
									}
								/>
							</div>

							<div>
								<label
									className="text-3xl mr-2"
									htmlFor="author"
								>
									author:
								</label>
								<input
									className="border-2 border-gray-300 rounded-md mb-3"
									type="text"
									id="author"
									value={newBlog.author}
									onChange={({ target }) =>
										setNewBlog({
											...newBlog,
											author: target.value,
										})
									}
								/>
							</div>
							<div>
								<label className="text-3xl mr-3" htmlFor="url">
									url:
								</label>
								<input
									className="border-2 border-gray-300 rounded-md mb-3"
									type="text"
									id="author"
									value={newBlog.url}
									onChange={({ target }) =>
										setNewBlog({
											...newBlog,
											url: target.value,
										})
									}
								/>
							</div>
							<button
								type="submit"
								className=" text-2xl font-bold px-2 py-1 bg-gray-900 text-white rounded-md"
							>
								create
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default App;
