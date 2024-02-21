Cypress.Commands.add("UILogin", function (username, password) {
	cy.get("#username").type(username);
	cy.get("#password").type(password);
	cy.get("#login").click();
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
	});
});
