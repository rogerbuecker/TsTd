/// <reference types="cypress" />

describe("Canvas", () => {
  //All tests related to the html5 canvas element and its setup here...
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("display the right default page", () => {
    cy.get("#canvas").should("have.length", 1);
    cy.get("#game-over").should("not.have.class", "visible");
    cy.title().should("eq", "RTD | Minimalistic tower defense in the browser");
    cy.compareSnapshot("login", 0.0);
  });

  it("display canvas on different viewports", () => {
    cy.get("#canvas").should("be.visible");
    cy.viewport("macbook-15");
    cy.wait(200);
    cy.get("#canvas").should("be.visible");
    cy.viewport("macbook-13");
    cy.wait(200);
    cy.get("#canvas").should("be.visible");
    cy.viewport("macbook-11");
    cy.wait(200);
    cy.get("#canvas").should("be.visible");
    cy.viewport("ipad-2");
    cy.wait(200);
    cy.get("#canvas").should("be.visible");
    cy.viewport("ipad-mini");
    cy.wait(200);
    cy.get("#canvas").should("be.visible");
    cy.viewport("iphone-6+");
    cy.wait(200);
    cy.get("#canvas").should("be.visible");
    cy.viewport("iphone-6");
    cy.wait(200);
    cy.get("#canvas").should("be.visible");
    cy.viewport("iphone-5");
    cy.wait(200);
    cy.get("#canvas").should("be.visible");
    cy.viewport("iphone-4");
    cy.wait(200);
    cy.get("#canvas").should("be.visible");
    cy.viewport("iphone-3");
    cy.wait(200);
    cy.get("#canvas").should("be.visible");
  });
});
