import { useState } from "react";
import Button from "./Button";

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog, user }) => {
	const [visible, setVisible] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const toggleVisibility = () => {
		console.log("toggled");
		setVisible((prevVisible) => !prevVisible);
	};

	const deleteBlog = () => {
		const confirm = window.confirm(
			`Are you sure you want to delete ${blog.title}?`
		);

		if (confirm) {
			handleDeleteBlog(blog);
		}
	};

	console.log(visible);
	return (
		<div style={blogStyle}>
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
						<Button label={"like"} handleClick={() => handleLikeBlog(blog)} />
					</div>
					<div>{blog.user.username}</div>
					{user.id === blog.user.id && (
						<Button label={"remove"} handleClick={() => deleteBlog()} />
					)}
				</>
			)}
		</div>
	);
};

export default Blog;
