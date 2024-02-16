import Blog from "./Blog";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("<Blog />", () => {
	test("blog renders its content", () => {
		const blog = {
			title: "This is a test blog",
			author: "Yisaaaa",
			url: "https://google.com",
			likes: 100,
		};

		render(<Blog blog={blog} />);

		screen.getByText("This is a test blog by");
		screen.getByText("Yisaaaa");

		const urlElement = screen.queryByText("https://google.com");
		const likesElement = screen.queryByText("Likes 100");

		expect(urlElement).toBeNull();
		expect(likesElement).toBeNull();
	});
});
