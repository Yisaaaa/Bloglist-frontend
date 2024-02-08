import { useState } from "react";
import Button from "./Button";

const Blog = ({ blog, handleLikeBlog }) => {
	const [visible, setVisible] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const toggleVisibility = () => {
		setVisible((prevVisible) => setVisible(!prevVisible));
	};

	return (
		<div style={blogStyle}>
			<div className="flex gap-4 align-middle">
				<div>
					{blog.title} by <em>{blog.author}</em>
				</div>
				<Button
					label={!visible ? "view" : "hide"}
					handleClick={toggleVisibility}
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
				</>
			)}
		</div>
	);
};

export default Blog;
