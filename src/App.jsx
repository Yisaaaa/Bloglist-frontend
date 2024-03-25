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
                    <header className="flex justify-around bg-gray-300 p-4 mb-20">
                        <nav className="flex gap-3">
                            <ul className="hover:underline">
                                <Link to={"/"}>blogs</Link>
                            </ul>
                            <ul className="hover:underline">
                                <Link to={"/users"}>users</Link>
                            </ul>
                        </nav>
                        <div className="flex  gap-6 items-end">
                            <h1 className="text-3xl font-medium">
                                {user.name} logged in
                            </h1>
                            <button
                                onClick={handleSignOut}
                                className=" text-base bg-black text-white font-semibold px-2 py-1 rounded-md"
                            >
                                Sign out
                            </button>
                        </div>
                    </header>
                    <main>
                        <h1 className="text-5xl font-semibold mb-12">
                            Blog app
                        </h1>

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
                    </main>
                </div>
            )}
        </div>
    );
};

export default App;
