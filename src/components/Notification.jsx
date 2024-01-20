import React from "react";

const Notification = ({ notification }) => {
	console.log(notification.status);
	let bg, border;

	if (notification.status === "success") {
		bg = "bg-green-300";
		border = "border-green-600";
	} else if (notification.status === "error") {
		bg = "bg-red-300";
		border = "border-red-600";
	}

	console.log(bg, border);

	return (
		<div className={`py-4 px-2 ${border} border-4 ${bg} mb-8`}>
			{notification.message}
		</div>
	);
};

export default Notification;
