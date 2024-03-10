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

export default blogSlice.reducer;
