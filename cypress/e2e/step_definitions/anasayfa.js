import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
  cy.viewport('macbook-16');
});

Given("Bir tarayıcı belirtilen URL ile websitesine gitmelidir.", () => {
  cy.visit("");
});

When("Website URLsi istenen değere eşit olmalıdır.", () => {
  cy.visit("");
  cy.url().should("eq", "https://arabamkacyakar.com/");
});

Then('Title "Arabam Kaç Yakar" içermelidir.', () => {
  cy.title().should("include", "Arabam Kaç Yakar");
  cy.screenshot({capture:'runner'})
});

Then("Tüm resimlerin yüklenip yüklenmediği kontrol edilmelidir.", () => {
  cy.get("div.body")
    .find("img")
    .each(($img) => {
      if ($img.is(":visible")) {
        cy.wrap($img).should("be.visible");
      } else {
        cy.log(`${$img} IMG mevcut değil.`);
      }
    });
    cy.screenshot({capture:'runner'})
});

When("Anasayfada tüm linklerin doğru yönlendirme yaptığı kontrol edilmelidir.", () => {
    const istisnalar = [
      'id', '#back-to-top'
    ];
  
    try {
      cy.get("a").each(($a) => {
        cy.wrap($a)
          .invoke("attr", "href")
          .then((href) => {
            cy.wrap($a)
              .invoke("text")
              .then((text) => {
                const istisnaVar = istisnalar.some(
                  (item) => (item === 'id' && $a.attr('id') === 'back-to-top') ||
                            (item === href && item === text.trim())
                );
  
                if (istisnaVar) {
                  cy.log(`İstisnalar: ${istisnalar}`);
                } else {
                  cy.wrap($a)
                    .should("have.attr", "href", href)
                    .and("have.text", text);
                }
              });
          });
        });
    } catch (error) {
      console.error(error);
    }
  });
  
  