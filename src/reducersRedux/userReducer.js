import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import login from "../services/login";

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUser: (state, action) => {
			return action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;

export const initializeUser = () => {
	return (dispatch) => {
		let loggedUser = window.localStorage.getItem("loggedInBlogUser");

		if (loggedUser) {
			loggedUser = JSON.parse(loggedUser);
			dispatch(setUser(loggedUser));
			blogService.setToken(loggedUser.token);
		}
	};
};

export const loginUser = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await login({ username, password });

			dispatch(setUser(user));
			window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));

			blogService.setToken(user.token);
		} catch (error) {
			throw error;
		}
	};
};

export const signOutUser = (setNotification) => {
	return (dispatch) => {
		dispatch(setUser(null));
		blogService.setToken(null);
		window.localStorage.clear();
	};
};

export default userSlice.reducer;
