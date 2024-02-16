import Blog from "./Blog";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
	const blog = {
		title: "This is a test blog",
		author: "Yisaaaa",
		url: "https://google.com",
		likes: 100,
		user: {
			username: "yisa",
			id: "12093",
		},
	};

	const user = {
		username: "yisa",
		id: "120380",
	};

	let container;
	let handleLikeBlog;
	beforeEach(() => {
		handleLikeBlog = jest.fn();

		container = render(
			<Blog blog={blog} user={user} handleLikeBlog={handleLikeBlog} />
		).container;
	});

	test("blog renders its content", () => {
		screen.getByText("This is a test blog by");
		screen.getByText("Yisaaaa");

		const urlElement = screen.queryByText("https://google.com");
		const likesElement = screen.queryByText("Likes 100");

		expect(urlElement).toBeNull();
		expect(likesElement).toBeNull();
	});

	test("blog renders url and likes count when view button is cliked", async () => {
		const user = userEvent.setup();

		const viewButton = screen.getByText("view");

		await user.click(viewButton);

		// screen.debug();
		screen.getByText(blog.url);
		screen.getByText(`Likes ${blog.likes}`);
	});

	test("clicking like button twice will call handleLikeBlog twice", async () => {
		const user = userEvent.setup();

		const viewButton = screen.getByText("view");
		await user.click(viewButton);

		const likeButton = screen.getByText("like");
		await user.click(likeButton);
		await user.click(likeButton);

		expect(handleLikeBlog.mock.calls).toHaveLength(2);
	});
});
