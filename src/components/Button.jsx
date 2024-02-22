import React from "react";

const Button = ({ label, handleClick, id }) => {
	return (
		<button
			id={id}
			onClick={handleClick}
			className="bg-slate-900 text-white text-2xl font-semibold py-1 px-3 rounded-lg"
		>
			{label}
		</button>
	);
};

export default Button;
