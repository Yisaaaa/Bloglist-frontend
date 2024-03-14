import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContextProvider";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "updateNotification":
			return action.payload;

		case "clearNotification":
			return "";

		default:
			return state;
	}
};

export const useNotificationValue = () => {
	return useContext(NotificationContext)[0];
};

export const useSetNotification = () => {
	return useContext(NotificationContext)[1];
};

export default notificationReducer;
