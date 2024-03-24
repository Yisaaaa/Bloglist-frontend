import React, { useEffect, useState } from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const Users = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        userService.getAll().then((res) => {
            setUsers(res);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>fetching users...</div>;
    }

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
                            <div
                                key={user.id}
                                className="user flex justify-between w-36"
                            >
                                <Link to={`/users/${user.id}`}>
                                    <p className="text-3xl ">{user.username}</p>
                                </Link>
                                <p className="text-3xl">{user.blogs.length}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Users;
