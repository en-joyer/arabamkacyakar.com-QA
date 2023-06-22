import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
  cy.intercept("https://pagead2.googlesyndication.com/", (req) => req.destroy());
  cy.intercept("https://googleads.g.doubleclick.net/", (req) => req.destroy());
  cy.intercept("https://www.google-analytics.com/", (req) => req.destroy());
  cy.intercept("https://rtb.fr3.eu.criteo.com/", (req) => req.destroy());
  cy.intercept("POST", "/vehicle/mesafeGetir").as("apiRequest");
});

Given(
  "Belirtilen web sayfasına gidilir.", () => {
  cy.visit("");
});

Then(
  "Hesapla butonuna tıklanır.", () => {
  cy.get(".sf-menu > :nth-child(6) > a").click();
  cy.get(".form-group > .btn").click();
  cy.screenshot()
});

Given(
  "Her hangi bir şehir seçilerek, boş değerlerle hesaplama tekrar denenir.",
  () => {
    cy.visit("/yakit-tuketimi-hesapla");
    cy.get("#city_simple")
      .find("option")
      .then(($options) => {
        const randomIndex = Cypress._.random(0, $options.length - 1);
        const randomOption = $options[randomIndex];
        const randomValue = Cypress.$(randomOption).val();
        cy.get("#city_simple").select(randomValue);
        cy.get(".form-group > .btn").click();
        cy.screenshot()
      });
  }
);

Then(
  "Yakıt tipi dizel seçilerek, boş değerlerle hesaplama tekrar denenir.",
  () => {
    cy.get("#selectfuel_simple").select("Dizel");
    cy.get(".form-group > .btn").click();
    cy.screenshot()
  }
);

Given(
  "Yakıt tüketimine -1 girilir ve denenir.", () => {
  cy.visit("/yakit-tuketimi-hesapla");
  cy.get("input#avg_simple").type("-1");
  cy.get(".form-group > .btn").click();
  cy.screenshot()
});

Then(
  "Yakıt tüketimi boş bırakılarak mesafe değeri -1 girilir ve denenir.",
  () => {
    cy.get("input#mesafe_simple").type("-1");
    cy.get(".form-group > .btn").click();
    cy.screenshot()
  }
);

Then(
  "İki alana da -1 girilerek denenir.", () => {
  cy.get("input#avg_simple").type("-1");
  cy.get("input#mesafe_simple").type("-1");
  cy.get(".form-group > .btn").click();
  cy.screenshot()
});

Given(
  "Yakıt tüketimine 0 girilir ve denenir.", () => {
  cy.visit("/yakit-tuketimi-hesapla");
  cy.get("input#avg_simple").type("0");
  cy.get(".form-group > .btn").click();
  cy.screenshot()
});

Then(
  "Yakıt tüketimi boş bırakılarak mesafe değeri 0 girilir ve denenir.",
  () => {
    cy.get("input#mesafe_simple").type("0");
    cy.get(".form-group > .btn").click();
    cy.screenshot()
  }
);

Then("İki alana da 0 girilerek denenir.", () => {
  cy.get("input#avg_simple").type("0");
  cy.get("input#mesafe_simple").type("0");
  cy.get(".form-group > .btn").click();
  cy.screenshot()
});

Then(
  "Başlangıç ve varış noktaları seçilir ve yakıt tüketimi 0 girilerek Benzin denenir.",
  () => {
    cy.visit("/yakit-tuketimi-hesapla");
    cy.get("input#txtSource").type("Uşak{downArrow}{enter}", { delay: 1000 });
    cy.get("input#txtDestination").type("Uşak{downArrow}{enter}", {
      delay: 1000,
    });
    cy.get("#avg").type("0");
    cy.get(".col-md-6 > .btn").click();
    cy.screenshot()
  }
);

Then(
  "Başlangıç ve varış noktaları seçilir ve yakıt tüketimi 0 girilerek Dizel denenir.",
  () => {
    cy.visit("/yakit-tuketimi-hesapla");
    cy.get("input#txtSource").type("Uşak{downArrow}{enter}", { delay: 1000 });
    cy.get("input#txtDestination").type("Uşak{downArrow}{enter}", {
      delay: 1000,
    });
    cy.get("#selectfuel3").select("Dizel");
    cy.get("#avg").type("0");
    cy.get(".col-md-6 > .btn").click();
    cy.screenshot()
  }
);

Then(
  '"Gidiş-Dönüş" seçilerek yukarıdaki test koşumları gerçekleştirilir.',
  () => {
    cy.visit("/yakit-tuketimi-hesapla");
    cy.get(".btn-group > :nth-child(2)").click();
    cy.get("input#txtSource").type("Uşak{downArrow}{enter}", { delay: 1000 });
    cy.get("input#txtDestination").type("Uşak{downArrow}{enter}", {delay: 1000,});
    cy.get("#avg").type("0");
    cy.get(".col-md-6 > .btn").click();
    cy.screenshot();
    cy.get("#selectfuel3").select("Dizel");
    cy.get(".col-md-6 > .btn").click();
    cy.on('uncaught:exception', (err) => {
      const errorText = err.message || '';
      if (errorText.includes('POST /vehicle/mesafeGetir 500')) {
        throw new Error('500 hatası alındı.');
      }
    });
    cy.screenshot()
  }
);
