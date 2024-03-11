import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogsReducer,
		user: userReducer,
	},
});

store.subscribe(() => {
	console.log(store.getState());
});

export default store;
