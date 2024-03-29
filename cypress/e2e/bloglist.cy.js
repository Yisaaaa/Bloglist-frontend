Cypress.Commands.add("UILogin", function (username, password) {
	cy.get("#username").type(username);
	cy.get("#password").type(password);
	cy.get("#login").click();
});

Cypress.Commands.add("NoUILogin", function (username, password) {
	// This login bypasses the ui and logs in by
	// sending a request to the backend

	cy.request({
		method: "POST",
		url: `${Cypress.env("BACKEND")}/login`,
		body: { username, password },
	}).then((response) => {
		// This should have been taken care of in the
		// frontend if were not bypassing the UI
		const user = JSON.stringify(response.body);
		localStorage.setItem("loggedInBlogUser", user);
		cy.visit("");
	});
});

Cypress.Commands.add("NoUICreateBlog", function (blog) {
	const token = JSON.parse(localStorage.getItem("loggedInBlogUser")).token;

	cy.request({
		method: "POST",
		url: `${Cypress.env("BACKEND")}/blogs`,
		body: blog,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => cy.visit(""));
});

describe("Bloglist", function () {
	let user;

	beforeEach(function () {
		// resetting the db
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

		cy.visit("");

		// Creating a dummy user
		user = {
			username: "luis",
			name: "luisryan",
			password: "secretpassword",
		};

		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
	});

	it("Login form is shown", function () {
		// Some code here to search for the login form
		cy.contains("Login to application");
		cy.contains("Username");
		cy.contains("Password");
	});

	describe("Login", function () {
		it("succeeds with right credentials", function () {
			// Logging in
			cy.UILogin(user.username, user.password);

			// Checking that the login was successful
			cy.contains("login success").should("have.class", "bg-green-300");
		});

		it("fails with wrong credentials", function () {
			// Logging in with wrong password
			cy.UILogin(user.username, "wrongpassword");

			// Checking that the login failed
			cy.contains("Wrong username or password").should(
				"have.class",
				"bg-red-300"
			);
		});

		it("is also possible by bypassing the UI", function () {
			// cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
			cy.NoUILogin(user.username, user.password);
		});
	});

	describe("When logged in", function () {
		beforeEach(function () {
			const anotherUser = {
				username: "another user",
				name: "another user",
				password: "anotherPassword",
			};

			const anotherBlog = {
				title: "A Song of Ice and Fire",
				author: "George Martin",
				url: "randomUrl",
			};

			// Creating the anotherUser user
			cy.request("POST", `${Cypress.env("BACKEND")}/users`, anotherUser);

			// logging in the anotherUser and create a blog
			cy.NoUILogin(anotherUser.username, anotherUser.password);

			cy.NoUICreateBlog(anotherBlog);

			// Signing out anotherUser
			localStorage.clear();

			cy.NoUILogin(user.username, user.password);

			const blog = {
				title: "Dune",
				author: "Frank Herbert",
				url: "http://google.com",
			};

			cy.NoUICreateBlog(blog);
		});

		it("user can create a new blog", function () {
			const blog = {
				title: "Sherlock Holmes",
				author: "Arthur Conan Doyle",
				url: "http://google.com",
			};

			cy.NoUICreateBlog(blog);

			cy.contains(`${blog.title} by ${blog.author}`);
		});

		it("user can like a blog", function () {
			cy.contains("Dune").parent().find("button").click();
			cy.contains("Dune").parent().parent().contains("like").click();

			// Checking if the like was successful
			cy.contains("Dune").parent().parent().contains("Likes 1");
			cy.contains("blog Dune was liked");
		});

		it("user can delete blog create by the user", function () {
			cy.contains("Dune").parent().find("button").click();

			// User should see a remove button
			cy.contains("remove").click();

			cy.contains("Dune").should("not.exist");
		});

		it("blogs created by the user can't be deleted by another user", function () {
			cy.contains("A Song of Ice and Fire").parent().find("button").click();

			cy.contains("A Song")
				.parent()
				.parent()
				.contains("remove")
				.should("not.exist");
		});

		it.only("blogs are sorted by the number of likes", function () {
			// Liking the Dune blog
			cy.contains("Dune").parent().find("button").click();

			cy.contains("Dune").parent().parent().find("#likeBtn").click();

			// Checking that Dune was at the top
			cy.get(".blog").eq(0).should("contain", "Dune");

			// Liking the Song of Ice and Fire blog
			cy.contains("A Song of Ice").parent().find("button").click();

			cy.get(".blog")
				.contains("A Song of Ice")
				.parent()
				.parent()
				.find("#likeBtn")
				.click();

			cy.wait(2000);

			cy.get(".blog")
				.contains("A Song of Ice")
				.parent()
				.parent()
				.find("#likeBtn")
				.click();

			// Checking that the Song of Ice and Fire is
			// at the top
			cy.get(".blog").eq(0).should("contain", "A Song of Ice");
		});
	});
});
