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

export default { getAll, setToken, createBlog };
