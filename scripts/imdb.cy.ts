import IMovieCrew from "../types/movieCrew";
import type IMovieIMDB from "../types/movieIMDB";

const ITEMS_TO_CRAWL = 250;
const movies: IMovieIMDB[] = [];

describe("Crawl top 250 IMDB movies", () => {
  it("passes", () => {
    cy.visit("https://www.imdb.com/chart/top/");

    cy.wait(1000);

    cy.scrollTo("bottom");

    for (let index = 0; index < ITEMS_TO_CRAWL; index++) {
      const movie: IMovieIMDB = {
        id: index + 1,
        title: "",
        release_year: "",
        duration: "",
        mpa_rating: "",
        rate: "",
        genre: [],
        people: [],
        image_vertical: "",
        about: "",
      };

      const openMovieModalButton = `.ipc-metadata-list-summary-item:nth-child(${
        index + 1
      }) .ipc-icon-button`;

      cy.get(openMovieModalButton).click();

      cy.get('[data-testid="btp_ml"] > .ipc-inline-list__item').each(
        (li, index) => {
          switch (index) {
            case 0:
              movie.release_year = li.text();
              break;
            case 1:
              movie.duration = li.text();
              break;
            case 2:
              movie.mpa_rating = li.text();
              break;
          }
        }
      );

      // Get movie title
      cy.get(".ipc-promptable-base__content")
        .first()
        .find("div")
        .find(".ipc-title")
        .then(($div) => {
          movie.title = $div.text();
        });

      // Get movie image
      cy.get(".ipc-promptable-base__content .ipc-media img").then(($img) => {
        movie.image_vertical =
          $img.attr("srcset")?.split(", ")?.at(-1)?.split(" ")[0] || "";
      });

      cy.wait(1000);

      // Get about
      cy.get(".ipc-promptable-base__content .cTFzHt").then(($div) => {
        movie.about = $div.text();
      });

      // Get genre
      cy.get('[data-testid="btp_gl"] > .ipc-inline-list__item').each((li) => {
        movie.genre.push(li.text());
      });

      // Get rate
      cy.get(".ipc-rating-star--baseAlt > .ipc-rating-star--rating").then(
        (star) => {
          movie.rate = star.text();
        }
      );

      // Get director
      cy.get('[data-testid="p_ct"] a').each((a, index) => {
        const id = movie.id + "-" + index;

        if (index === 0) {
          movie.people.push({
            id,
            role: "Director",
            name: a.text(),
          } as IMovieCrew);
        } else {
          movie.people.push({
            id,
            role: "Actor",
            name: a.text(),
          } as IMovieCrew);
        }
      });

      // Close Modal
      cy.get(".ipc-icon-button--baseAlt:nth-child(1) > .ipc-icon")
        .click()
        .then(() => {
          movies.push(movie);
        });
    }
  });

  after(() => {
    cy.writeFile("./data/top-250-imdb-movies.json", JSON.stringify(movies));
  });
});
