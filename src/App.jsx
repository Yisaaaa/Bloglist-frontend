import { useEffect } from "react";
import Notification from "./components/Notification";
import Login from "./components/Login";
import { useSetNotification } from "./reducers/notificationReducer";
import {
    useInitializeUser,
    useUserValue,
    useSignOutUser,
} from "./reducers/userReducer";
import Bloglist from "./components/Bloglist";
import { Routes, Route, Link, useMatch, useParams } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "./services/blogs";
import Blog from "./components/Blog";

const App = () => {
    const setNotification = useSetNotification();
    const initializeUser = useInitializeUser();
    const signOutUser = useSignOutUser();

    const blogsResult = useQuery({
        queryKey: ["blogs"],
        queryFn: blogService.getAll,
    });

    const match = useMatch("/blogs/:id");

    let blog;

    if (blogsResult.isSuccess && match) {
        const blogs = blogsResult.data;
        blog = blogs.find((blog) => {
            return match.params.id === blog.id;
        });
    }

    const user = useUserValue();

    useEffect(() => {
        initializeUser();
    }, []);

    const handleSignOut = (event) => {
        event.preventDefault();
        signOutUser();

        setNotification(
            {
                notification: "signed out successfully",
                isError: false,
            },
            3
        );
    };

    return (
        <div className="px-12 py-4">
            <Notification />
            {user === null ? (
                <Login />
            ) : (
                <div>
                    <h1 className="text-6xl font-bold mb-8">Blogs</h1>
                    <div className="flex flex-col gap-6 items-start mb-20">
                        <h1 className="text-5xl font-medium">
                            Logged in as {user.username}
                        </h1>
                        <button
                            onClick={handleSignOut}
                            className="bg-black text-white font-semibold px-3 rounded-md"
                        >
                            Sign out
                        </button>
                    </div>

                    {/* <Bloglist /> */}
                    <Routes>
                        <Route path="/" element={<Bloglist />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<User />} />
                        <Route
                            path="/blogs/:id"
                            element={
                                blog ? (
                                    <Blog blog={blog} />
                                ) : (
                                    <div>fetching blog</div>
                                )
                            }
                        />
                    </Routes>
                </div>
            )}
        </div>
    );
};

export default App;
