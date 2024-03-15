import React from "react";
import { useState } from "react";
import { useSetNotification } from "../reducers/notificationReducer";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import blogService from "../services/blogs";

const CreateBlog = ({ createBlogRef }) => {
	const setNotification = useSetNotification();
	const queryClient = useQueryClient();

	const [newBlog, setNewBlog] = useState({
		title: "",
		author: "",
		url: "",
	});

	const createBlogMutation = useMutation({
		mutationFn: blogService.createBlog,
		onSuccess: (newBlog) => {
			const blogs = queryClient.getQueryData(["blogs"]).concat(newBlog);
			queryClient.setQueryData(["blogs"], blogs);

			setNotification(
				{
					notification: `a new blog ${newBlog.title} by ${newBlog.author} was created`,
					isError: false,
				},
				3
			);

			setNewBlog({
				title: "",
				author: "",
				url: "",
			});
		},
		onError: (error) => {
			setNotification(
				{
					notification: `Something went wrong. Failed to create blog ${blog.title}`,
					isError: true,
				},
				3
			);
		},
	});

	const handleCreateBlog = async (event) => {
		event.preventDefault();

		// Close the blog form here
		createBlogRef.current.toggleVisibility();

		createBlogMutation.mutate(newBlog);
	};

	return (
		<form onSubmit={handleCreateBlog}>
			<h2 className="text-4xl font-medium mb-5">Create new</h2>
			<div>
				<label className="text-3xl mr-3" htmlFor="title">
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
				<label className="text-3xl mr-2" htmlFor="author">
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
					id="url"
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
	);
};

export default CreateBlog;
