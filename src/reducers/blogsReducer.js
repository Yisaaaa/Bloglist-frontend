import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		newBlog: (state, action) => {
			state.push(action.payload);
		},

		setBlogs: (state, action) => {
			return action.payload;
		},
	},
});

export const { newBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();

		dispatch(setBlogs(blogs));
	};
};

export const createBlog = (blog) => {
	console.log(blog);

	return async (dispatch) => {
		const createdBlog = await blogService.createBlog(blog);

		console.log("dispatch", createBlog);
		dispatch(newBlog(createdBlog));

		// trying to put notification actions here
		dispatch(
			setNotification(
				{
					notification: `a new blog ${createdBlog.title} by ${createdBlog.author} was created`,
					status: "success",
				},
				3
			)
		);
	};
};

export const deleteBlog = (blogToDelete) => {
	return async (dispatch, getState) => {
		const blogs = getState().blogs;

		await blogService.deleteBlog(blogToDelete);

		dispatch(setBlogs(blogs.filter((blog) => blogToDelete.id !== blog.id)));
		dispatch(
			setNotification(
				{
					notification: `blog ${blogToDelete.title} was deleted `,
					status: "success",
				},
				3
			)
		);
	};
};

export const likeBlog = (blogToLike) => {
	return async (dispatch, getState) => {
		const likedBlog = await blogService.likeBlog(blogToLike);
		const blogs = getState().blogs;

		dispatch(
			setBlogs(
				blogs.map((blog) => {
					console.log(blog.id, blogToLike.id);
					return blog.id === blogToLike.id ? likedBlog : blog;
				})
			)
		);

		dispatch(
			setNotification(
				{
					notification: `blog ${blogToLike.title} was liked`,
					status: "success",
				},
				3
			)
		);
	};
};

export default blogSlice.reducer;
