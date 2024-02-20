describe("Bloglist", function () {
	beforeEach(function () {
		cy.visit("http://localhost:5173");
	});

	it("Login form is shown", function () {
		// Some code here to search for the login form
		cy.contains("Login to application");
		cy.contains("Username");
		cy.contains("Password");
	});
});
