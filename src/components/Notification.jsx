import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector((state) => state.notification);

	// console.log(notification.status);
	let bg, border;

	if (notification.status === "success") {
		bg = "bg-green-300";
		border = "border-green-600";
	} else if (notification.status === "error") {
		bg = "bg-red-300";
		border = "border-red-600";
	}

	if (!notification.notification) {
		return;
	}

	return (
		<div className={`py-4 px-2 ${border} border-4 ${bg} mb-8`}>
			{notification.notification}
		</div>
	);
};

export default Notification;
