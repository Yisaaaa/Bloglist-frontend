import React, { useRef } from "react";
import Blog from "./Blog";
import Togglable from "./Togglable";
import CreateBlog from "./CreateBlog";
import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";

const Bloglist = () => {
    const createBlogRef = useRef();

    const blogResult = useQuery({
        queryKey: ["blogs"],
        queryFn: blogService.getAll,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    if (blogResult.isPending) {
        return <div>Fetching blogs...</div>;
    } else if (blogResult.isError) {
        return <div>Failed to fetch blogs</div>;
    }

    const sortedBlogs = [...blogResult.data].sort((a, b) => {
        return b.likes - a.likes;
    });

    return (
        <div>
            <Togglable buttonLabel="new blog" ref={createBlogRef}>
                <CreateBlog createBlogRef={createBlogRef} />
            </Togglable>
            <div className="flex flex-col gap-3 text-4xl mt-4">
                {sortedBlogs.map((blog) => (
                    <Link key={blog.id} to={`/blogs/${blog.id}`}>
                        <div className="">
                            <p className="text-3xl italic hover:underline  ">
                                {blog.title} by <em>{blog.author}</em>
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Bloglist;
