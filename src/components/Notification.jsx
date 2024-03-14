import React from "react";
// import { useSelector } from "react-redux";
import { useNotificationValue } from "../reducers/notificationReducer";

const Notification = () => {
	// const notification = useSelector((state) => state.notification);

	const notification = useNotificationValue();

	// console.log(notification.status);
	let bg, border;

	if (!notification.notification) {
		return;
	}
	if (notification.isError) {
		bg = "bg-red-300";
		border = "border-red-600";
	} else {
		bg = "bg-green-300";
		border = "border-green-600";
	}

	return (
		<div className={`py-4 px-2 ${border} border-4 ${bg} mb-8`}>
			{notification.notification}
		</div>
	);
};

export default Notification;
