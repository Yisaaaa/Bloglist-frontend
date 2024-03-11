import Button from "./Button";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogsReducer";

const Blog = ({ blog }) => {
	const dispatch = useDispatch();

	const handleDeleteBlog = () => {
		const confirm = window.confirm(
			`Are you sure you want to delete ${blog.title}?`
		);

		if (confirm) {
			dispatch(deleteBlog(blog));
		}
	};

	const handleLikeBlog = async (blog) => {
		dispatch(likeBlog(blog));
	};

	const user = useSelector((state) => state.user);

	const [visible, setVisible] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const toggleVisibility = () => {
		setVisible((prevVisible) => !prevVisible);
	};

	return (
		<div className="blog" style={blogStyle}>
			<div className="flex gap-4 align-middle">
				<div>
					{blog.title} by <em>{blog.author}</em>
				</div>
				<Button
					label={!visible ? "view" : "hide"}
					handleClick={() => toggleVisibility()}
				/>
			</div>

			{visible && (
				<>
					<div>{blog.url}</div>
					<div className="flex align-middle gap-4">
						<div>Likes {blog.likes}</div>
						<Button
							id="likeBtn"
							label={"like"}
							handleClick={() => handleLikeBlog(blog)}
						/>
					</div>
					<div>{blog.user.username}</div>
					{user.id === blog.user.id && (
						<Button label={"remove"} handleClick={() => handleDeleteBlog()} />
					)}
				</>
			)}
		</div>
	);
};

export default Blog;
