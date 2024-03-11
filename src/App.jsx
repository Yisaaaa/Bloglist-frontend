import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import { deleteBlog, initializeBlogs, likeBlog } from "./reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser, signOutUser } from "./reducers/userReducer";

const App = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);

	const blogs = useSelector((state) => state.blogs);

	const sortedBlogs = [...blogs].sort((a, b) => {
		return b.likes - a.likes;
	});

	const createBlogRef = useRef();

	useEffect(() => {
		dispatch(initializeBlogs());
	}, []);

	useEffect(() => {
		dispatch(initializeUser());
	}, []);

	const handleSignOut = (event) => {
		event.preventDefault();
		dispatch(signOutUser());
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
