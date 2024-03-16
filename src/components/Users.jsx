import React from "react";
import userService from "../services/users";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
	const usersQuery = useQuery({
		queryKey: ["users"],
		queryFn: userService.getAll,
		refetchOnWindowFocus: false,
		retry: 1,
	});

	if (usersQuery.isPending) {
		return <div>Fetching users...</div>;
	} else if (usersQuery.isError) {
		return <div>Failed to retrieve users</div>;
	}

	const users = usersQuery.data;

	return (
		<div>
			<h2 className="text-5xl mb-6 font-bold">Users</h2>

			<div>
				<div className="users">
					<div className="flex w-80 justify-end">
						<p className="text-3xl font-bold">blogs created</p>
					</div>
					{users.map((user) => {
						return (
							<div key={user.id} className="user flex justify-between w-36">
								<p className="text-3xl ">{user.username}</p>
								<p className="text-3xl">{user.blogs.length}</p>
							</div>
						);
					})}
				</div>
			</div>

			{/* <div className="flex gap-5">
				<div className="users">
					<span>
						<br />
					</span>
					{users.map((user) => (
						<p key={user.id}>{user.username}</p>
					))}
				</div>
				<div className="blogs-created">
					<p className="">blogs created</p>
					{users.map((user) => (
						<p key={user.id}>{user.blogs.length}</p>
					))}
				</div>
			</div> */}
		</div>
	);
};

export default Users;
