import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
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
					<div className="flex gap-2 items-end mb-7">
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

					<h2 className="text-5xl font-medium mb-5">Blogs</h2>
					<div className="flex flex-col gap-3 text-4xl">
						{blogs.map((blog) => (
							<Blog key={blog.id} blog={blog} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default App;
