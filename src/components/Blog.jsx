import Button from "./Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSetNotification } from "../reducers/notificationReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
	const setNotification = useSetNotification();
	const queryClient = useQueryClient();

	const deleteBlogMutation = useMutation({
		mutationFn: blogService.deleteBlog,
		onSuccess: () => {
			const blogsLeft = queryClient
				.getQueryData(["blogs"])
				.filter((prevBlog) => blog.id !== prevBlog.id);
			queryClient.setQueryData(["blogs"], blogsLeft);
			setNotification(
				{
					notification: `blog ${blog.title} was deleted `,
					isError: false,
				},
				3
			);
		},
		onError: (error) => {
			console.log(error);
			setNotification(
				{
					notification: `Something went wrong. Failed to delete ${blog.title}`,
					isError: true,
				},
				3
			);
		},
	});

	const likeBlogMutation = useMutation({
		mutationFn: blogService.likeBlog,
		onSuccess: (likedBlog) => {
			const blogs = queryClient.getQueryData(["blogs"]).map((blog) => {
				return blog.id === likedBlog.id ? likedBlog : blog;
			});

			queryClient.setQueryData(["blogs"], blogs);

			setNotification(
				{
					notification: `blog ${blog.title} liked successfully`,
					isError: false,
				},
				3
			);
		},
		onError: () => {
			setNotification({
				notification: `Something went wrong. Failed to like blog ${blog.title}`,
			});
		},
	});

	const handleDeleteBlog = () => {
		const confirm = window.confirm(
			`Are you sure you want to delete ${blog.title}?`
		);

		if (confirm) {
			deleteBlogMutation.mutate(blog);
		}
	};

	const handleLikeBlog = async (blog) => {
		likeBlogMutation.mutate(blog);
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
