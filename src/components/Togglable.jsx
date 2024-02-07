import React, { forwardRef, useImperativeHandle, useState } from "react";
import Button from "./Button";

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible((prevVisibility) => !prevVisibility);
	};

	useImperativeHandle(ref, () => {
		return { toggleVisibility };
	});

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button
					label={props.buttonLabel}
					handleClick={() => toggleVisibility()}
				/>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button label={"cancel"} handleClick={() => toggleVisibility()} />
			</div>
		</div>
	);
});

export default Togglable;
