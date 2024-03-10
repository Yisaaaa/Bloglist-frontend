import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogsReducer,
	},
});

store.subscribe(() => {
	console.log(store.getState());
});

export default store;
