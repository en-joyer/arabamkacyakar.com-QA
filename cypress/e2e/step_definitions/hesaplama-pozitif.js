import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given(
  "Uşak ve Ankara şehirleri seçilir ve belirtilen araç seçilenerek hesaplama işlemi gerçekleştirilir.",
  () => {


    function getRandomInt(min, max){      
        return Math.floor(Math.random() * (max - min + 1)) + min;    
    } 

    cy.visit("/yakit-tuketimi-hesapla");
    cy.get("input#txtSource").type("Uşak{downArrow}{enter}", { delay: 1000 });
    cy.get("input#txtDestination").type("Ankara{downArrow}{enter}", { delay: 1000,});
    cy.get('[for="yes-button"]').click();
    cy.get(":nth-child(3) > .col-xs-12 > .form-control").select("Toyota");
    cy.get("#selectyourcarserial > .row > .col-xs-12 > .form-control")
    .select("Corolla");
    cy.get('#selectyourcarsafe > .row > .col-xs-12 > .form-control')
    .select(1)
    cy.get("#selectyourcartype > .row > .col-xs-12 > .form-control")
    .select(1)
    cy.get("#selectyourcarmodel > .row > .col-xs-12 > .form-control")
    .select(1)
    cy.get(".col-md-6 > .btn")
    .click();
    cy.wait(1000)
    cy.screenshot({capture:'runner'});
  }
);
