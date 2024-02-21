import React from "react";

const Login = ({
	handleSubmit,
	username,
	password,
	setUsername,
	setPassword,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<h1 className="text-4xl mt-3 mb-4">Login to application</h1>
			<div className="flex gap-2 mb-2 ">
				<label htmlFor="username">Username</label>
				<input
					className="border-2 rounded-md border-black p-2"
					type="text"
					id="username"
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>

			<div className="flex gap-2 mb-5">
				<label htmlFor="password">Password</label>
				<input
					className="border-2 rounded-md border-black p-2"
					type="password"
					id="password"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>

			<button
				id="login"
				className="bg-slate-900 text-white font-semibold py-1 px-3 rounded-lg"
			>
				Login
			</button>
		</form>
	);
};

export default Login;
