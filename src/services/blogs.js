import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
	token = newToken;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

export default { getAll, setToken };
