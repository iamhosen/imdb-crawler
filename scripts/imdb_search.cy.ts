import files from "../constants/files";
import { getElementText } from "../utils/selector";

const result: string[] = [];

describe("Crawl top 250 IMDB movies", () => {
  it("passes", () => {
    const query = Cypress.env("query");

    cy.visit("https://www.imdb.com/find/?q=" + query);

    cy.get(
      `[data-testid="find-results-section-title"] ul.ipc-metadata-list li .ipc-metadata-list-summary-item__tc`
    ).each(($li) => {
      cy.log("Found a movie");
      const title = getElementText($li, "a");
      result.push(title);
    });
  });

  after(() => {
    cy.writeFile(files.search, result);
  });
});
