import { createContext, useReducer, useRef, useState } from "react";
import notificationReducer from "../reducers/notificationReducer";

export const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, {
		notification: "",
		status: "",
	});

	const timeOutIdRef = useRef(null);

	const setNotification = (notification, timeOut) => {
		if (timeOutIdRef.current) {
			clearTimeout(timeOutIdRef.current);
		}

		notificationDispatch({
			type: "updateNotification",
			payload: notification,
		});

		const id = setTimeout(() => {
			notificationDispatch({
				type: "clearNotification",
			});
		}, timeOut * 1000);

		timeOutIdRef.current = id;
	};

	return (
		<NotificationContext.Provider value={[notification, setNotification]}>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationContextProvider;
