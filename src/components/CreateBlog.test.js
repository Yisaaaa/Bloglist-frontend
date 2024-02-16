import React from "react";
import CreateBlog from "./CreateBlog";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("<CreateBlog />", () => {
	let container;
	let handleCreateBlog;

	beforeEach(() => {
		handleCreateBlog = jest.fn();
		container = render(
			<CreateBlog handleCreateBlog={handleCreateBlog} />
		).container;
	});

	test("clicking the create button should call the handleCreateBlog passed as prop with the right details", async () => {
		const user = userEvent.setup();

		const createButton = screen.getByText("create");

		const titleInput = container.querySelector("#title");
		const authorInput = container.querySelector("#author");
		const urlInput = container.querySelector("#url");

		const blog = {
			title: "Sherlock Holmes",
			author: "Arthur Conan",
			url: "https://google.com",
		};

		await user.type(titleInput, blog.title);
		await user.type(authorInput, blog.author);
		await user.type(urlInput, blog.url);

		await user.click(createButton);

		// console.log(handleCreateBlog.mock.calls[0][0].title);

		expect(handleCreateBlog.mock.calls).toHaveLength(1);

		const blogFromForm = handleCreateBlog.mock.calls[0][0];
		expect(blogFromForm).toMatchObject(blog);
	});
});
