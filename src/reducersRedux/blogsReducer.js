import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

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

		dispatch(newBlog(createdBlog));
	};
};

export const deleteBlog = (blogToDelete) => {
	return async (dispatch, getState) => {
		const blogs = getState().blogs;

		await blogService.deleteBlog(blogToDelete);

		dispatch(setBlogs(blogs.filter((blog) => blogToDelete.id !== blog.id)));
	};
};

export const likeBlog = (blogToLike) => {
	return async (dispatch, getState) => {
		const likedBlog = await blogService.likeBlog(blogToLike);
		const blogs = getState().blogs;

		dispatch(
			setBlogs(
				blogs.map((blog) => {
					return blog.id === blogToLike.id ? likedBlog : blog;
				})
			)
		);
	};
};

export default blogSlice.reducer;
