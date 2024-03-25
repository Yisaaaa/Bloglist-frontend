import Button from "./Button";
import { useState } from "react";
import { useSetNotification } from "../reducers/notificationReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useUserValue } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
    const [comment, setComment] = useState("");

    const navigate = useNavigate();
    const setNotification = useSetNotification();
    const queryClient = useQueryClient();
    const user = useUserValue();

    const deleteBlogMutation = useMutation({
        mutationFn: blogService.deleteBlog,
        onSuccess: () => {
            const blogsLeft = queryClient
                .getQueryData(["blogs"])
                .filter((prevBlog) => blog.id !== prevBlog.id);
            queryClient.setQueryData(["blogs"], blogsLeft);

            navigate("/");

            setNotification(
                {
                    notification: `blog ${blog.title} was deleted `,
                    isError: false,
                },
                3
            );
        },
        onError: (error) => {
            console.log(error);
            setNotification(
                {
                    notification: `Something went wrong. Failed to delete ${blog.title}`,
                    isError: true,
                },
                3
            );
        },
    });

    const likeBlogMutation = useMutation({
        mutationFn: blogService.likeBlog,
        onSuccess: (likedBlog) => {
            const blogs = queryClient.getQueryData(["blogs"]).map((blog) => {
                return blog.id === likedBlog.id ? likedBlog : blog;
            });

            queryClient.setQueryData(["blogs"], blogs);

            setNotification(
                {
                    notification: `blog ${blog.title} liked successfully`,
                    isError: false,
                },
                3
            );
        },
        onError: () => {
            setNotification({
                notification: `Something went wrong. Failed to like blog ${blog.title}`,
            });
        },
    });

    const addCommentMutation = useMutation({
        mutationFn: blogService.addComment,
        onSuccess: (updatedBlog) => {
            console.log(updatedBlog);
            const blogs = queryClient.getQueryData(["blogs"]);

            queryClient.setQueryData(
                ["blogs"],
                blogs.map((blog) =>
                    blog.id === updatedBlog.id ? updatedBlog : blog
                )
            );

            setComment("");

            setNotification(
                {
                    notification: `added comment on blog ${updatedBlog.title}`,
                    isError: false,
                },
                3
            );
        },
    });

    const handleAddComment = (event) => {
        event.preventDefault();
        const payload = { blog, comment };
        addCommentMutation.mutate(payload);
    };

    const handleDeleteBlog = () => {
        const confirm = window.confirm(
            `Are you sure you want to delete ${blog.title}?`
        );

        if (confirm) {
            deleteBlogMutation.mutate(blog);
        }
    };

    const handleLikeBlog = (blog) => {
        likeBlogMutation.mutate(blog);
    };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    return (
        <div className="blog" style={blogStyle}>
            <div className="flex gap-4 align-middle mb-4">
                <div className="text-4xl font-semibold">
                    {blog.title} by <em>{blog.author}</em>
                </div>
            </div>
            <div>
                <div className="underline">{blog.url}</div>
                <div className="flex align-middle gap-4">
                    <div>Likes {blog.likes}</div>
                    <Button
                        id="likeBtn"
                        label={"like"}
                        handleClick={() => handleLikeBlog(blog)}
                    />
                </div>
                <div>added by {blog.user.username}</div>
                {user.id === blog.user.id && (
                    <Button
                        label={"remove"}
                        handleClick={() => handleDeleteBlog()}
                    />
                )}

                <div className="mt-6 mb-6">
                    <p className="text-3xl font-medium mb-3">comments</p>

                    <form
                        onSubmit={handleAddComment}
                        className="flex gap-4 mb-3"
                    >
                        <input
                            type="text"
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-72 border-gray-800 border-2 px-1 text-xl"
                        />
                        <button
                            type="submit"
                            className="text-lg bg-gray-900 text-white font-bold rounded-md px-2 py-1"
                        >
                            add comment
                        </button>
                    </form>

                    <ul className="list-disc ml-8">
                        {blog.comments &&
                            blog.comments.map((comment, index) => {
                                const key = index;
                                index++;
                                return <li key={key}>{comment}</li>;
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Blog;
