import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: {
		notification: "",
		status: "",
	},

	reducers: {
		updateNotification: (state, action) => {
			return { ...action.payload };
		},

		clearNotification: (state) => {
			return { notification: "", status: "" };
		},
	},
});

export const { updateNotification, clearNotification } =
	notificationSlice.actions;

export const setNotification = (notification, timeOut) => {
	return (dispatch) => {
		dispatch(updateNotification(notification));

		setTimeout(() => dispatch(clearNotification()), timeOut * 1000);
	};
};

export default notificationSlice.reducer;
