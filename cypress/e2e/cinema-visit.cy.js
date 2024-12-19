const admin = require("../fixtures/admin.json");
const adminUrl = admin.url;
const adminValid = admin.adminValid;
const adminInvalid = admin.adminInvalid;

const selector = require("../fixtures/selectors.json");
const adminTitleSelector = selector.adminTitleSelector;
const adminAuthButtonSelector = selector.adminAuthButtonSelector;

const data = require("../fixtures/data.json");
const day = data.day;
const time = data.time;
const seats = data.seats;

//--------------------------------

describe("Логинимся в админку приложения ИдёмВКино", () => {
  beforeEach(() => {
    cy.visit(adminUrl);
    cy.get(adminTitleSelector).should("contain", "Авторизация");
  });

  //--------------------------------

  it("Должно быть успешно", () => {
    cy.authAdmin(adminValid.login, adminValid.pass);
    cy.contains("Управление залами").should("be.visible");
  });

  //--------------------------------

  it("Не должен входить с пустым логином", () => {
    cy.authAdmin(adminInvalid[0].login, adminInvalid[0].pass);
    cy.get(adminAuthButtonSelector).should("be.visible");
  });

  //--------------------------------

  it("Не должен входить с пустым паролем", () => {
    cy.authAdmin(adminInvalid[1].login, adminInvalid[1].pass);
    cy.get(adminAuthButtonSelector).should("be.visible");
  });
});
