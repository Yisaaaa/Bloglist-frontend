import { useContext } from "react";
import blogService from "../services/blogs";
import { UserContext } from "../contexts/UserContextProvider";
import login from "../services/login";

const userReducer = (state, action) => {
	switch (action.type) {
		case "setUser":
			return action.payload;

		default:
			return state;
	}
};

export const useInitializeUser = () => {
	const userDispatch = useUserDispatch();
	return () => {
		let user = window.localStorage.getItem("loggedInBlogUser");

		if (user) {
			user = JSON.parse(user);
			blogService.setToken(user.token);
			userDispatch({ type: "setUser", payload: user });
		}
	};
};

export const useLoginUser = () => {
	const userDispatch = useUserDispatch();
	return async (username, password) => {
		try {
			const user = await login({ username, password });

			userDispatch({
				type: "setUser",
				payload: user,
			});
			window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));

			blogService.setToken(user.token);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};

export const useSignOutUser = () => {
	const userDispatch = useUserDispatch();

	return () => {
		userDispatch({ type: "setUser", payload: null });

		blogService.setToken(null);
		window.localStorage.clear();
	};
};

export const useUserValue = () => {
	return useContext(UserContext)[0];
};

export const useUserDispatch = () => {
	return useContext(UserContext)[1];
};

export default userReducer;
