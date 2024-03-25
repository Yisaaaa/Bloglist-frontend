import React, { useEffect, useState } from "react";
import userService from "../services/users";
import { useParams } from "react-router-dom";

const User = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const id = useParams().id;

    useEffect(() => {
        userService.getById(id).then((res) => {
            setUser(res);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>fecthing user...</div>;
    }

    return (
        <div>
            <h1 className="user text-5xl mb-14 font-bold">{user.name}</h1>
            <p className="font-bold mb-2 text-3xl">added blogs</p>
            <div className="pl-14">
                <ul className="list-disc">
                    {user.blogs.map((blog) => (
                        <li key={blog.id}>{blog.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default User;
