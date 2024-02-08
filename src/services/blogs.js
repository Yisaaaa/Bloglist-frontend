import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getAll = async () => {
	const request = await axios.get(baseUrl);
	return request.data;
};

const createBlog = async (blog) => {
	console.log(token);
	const request = await axios.post(baseUrl, blog, {
		headers: { Authorization: token },
	});
	console.log("created", request.data);
	return request.data;
};

const likeBlog = async (blog) => {
	blog = { ...blog, likes: blog.likes + 1, user: blog.user._id };
	const request = await axios.put(`${baseUrl}/${blog.id}`, blog, {
		headers: { Authorization: token },
	});

	return request.data;
};

export default { getAll, setToken, createBlog, likeBlog };
