import { createSlice } from "@reduxjs/toolkit";
import blogs from "../services/blogs";
import blogsReducer from "./blogsReducer";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
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

export const loginUser = (username, password, stateSetter) => {
	return async (dispatch) => {
		try {
			const user = await login({ username, password });

			dispatch(setUser(user));
			window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));

			blogService.setToken(user.token);

			stateSetter.setUsername("");
			stateSetter.setPassword("");

			dispatch(
				setNotification(
					{
						notification: "Logged in successfully",
						status: "success",
					},
					3
				)
			);
		} catch (error) {
			dispatch(
				setNotification(
					{
						notification: "Wrong username or password",
						status: "error",
					},
					3
				)
			);
		}
	};
};

export const signOutUser = () => {
	return (dispatch) => {
		dispatch(setUser(null));
		blogService.setToken(null);
		window.localStorage.clear();

		dispatch(
			setNotification(
				{
					notification: "signed out successfully",
					status: "success",
				},
				3
			)
		);
	};
};

export default userSlice.reducer;
