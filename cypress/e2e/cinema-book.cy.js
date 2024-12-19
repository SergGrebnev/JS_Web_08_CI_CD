const client = require("../fixtures/client.json");
const clientUrl = client.url;

const selector = require("../fixtures/selectors.json");
const navigationByDays = selector.navigationByDays;
const poster = selector.poster;
const cinemaHall = selector.cinemaHall;
const buttonOk = selector.buttonOk;

const data = require("../fixtures/data.json");
const day = data.day;
const time = data.time;
const seats = data.seats;

//--------------------------------

describe("Функциональность приложения ИдёмВКино", () => {
  beforeEach(() => {
    cy.visit(clientUrl);
  });

  //--------------------------------

  it("Корректное отображение главной страницы", () => {
    cy.get(navigationByDays).should("have.length", 7); // Количество доступных дней
  });

  //--------------------------------

  it("Должна быть возможность забронировать", () => {
    cy.get(navigationByDays + `:nth-of-type(${day})`).click();
    cy.get(poster).contains(time).click();
    seats.forEach(({ row, seat }) => {
      cy.get(cinemaHall + ` > :nth-child(${row}) > :nth-child(${seat})`).click();
    });
    cy.timeout(20000);
    cy.get(buttonOk).should("be.visible").click();
    cy.get(".ticket__chairs").should(($list) => {
      // проверяем каждое из забронированных мест
      seats.forEach(({ row, seat }) => {
        expect($list).to.contain(`${row}/${seat}`);
      });
    });
  });
});
