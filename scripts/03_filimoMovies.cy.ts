import files from "../constants/files";
import IMovieIMDB, { IFilimoMovie } from "../types/movieIMDB";
import { getElement, getElementHref } from "../utils/selector";

let movies: IMovieIMDB[] = [];
const movieLinks: string[] = [];
const filimoMovies: IFilimoMovie[] = [];

describe("Crawl filimo movies", () => {
  before(() => {
    cy.readFile(files.rawMovies).then((moviesFile: IMovieIMDB[]) => {
      movies = moviesFile;
    });
  });

  it("Getting filimo movie links", () => {
    cy.on("uncaught:exception", () => false);

    cy.visit("https://www.filimo.com/tag/imdbtop250/imdb_rate");

    for (let index = 0; index < 10; index++) {
      cy.scrollTo("bottom");

      cy.wait(100);

      cy.get(".grid-wrapper").then(($div) => {
        const btn = getElement($div, "button#pageLoadMore");

        if (btn !== "") {
          btn.click();
        }
      });

      cy.scrollTo("bottom");
    }

    cy.get(".grid-wrapper")
      .children()
      .each(($grid) => {
        const href = getElementHref($grid, "a");

        if (href) {
          movieLinks.push(href);
        }
      });
  });

  it("Getting filimo single movie", () => {
    cy.on("uncaught:exception", () => false);

    for (let index = 0; index < movieLinks.length; index++) {
      const movie: IFilimoMovie = {
        title: "",
        title_fa: "",
        country: "",
        about: "",
      };

      cy.visit(movieLinks[index]);

      cy.get(".en-title").then(($p) => {
        movie.title = $p.text();
      });

      cy.get(".fa-title").then(($p) => {
        movie.title_fa = $p.text().trim().split("  ")[1];
      });

      cy.get(".details_poster-description-more .ui-fw-normal").then(($div) => {
        const $a = getElement($div, "a");

        if ($a !== "") {
          movie.country = $a.text();
        } else {
          movie.country = $div
            .text()
            .trim()
            .split(" - ")[1]
            .split(" ")
            .splice(-1)
            .join(" ");
        }
      });

      cy.get(".gallery_left-side_txt")
        .then(($div) => {
          movie.about = $div.text().trim();
        })
        .then(() => {
          filimoMovies.push(movie);
        });
    }
  });

  it("Make movies json", () => {
    filimoMovies.forEach((fm) => {
      const index = movies.findIndex((m) => m.title === fm.title);

      if (index !== -1) {
        movies[index].title_fa = fm.title_fa;
        movies[index].country = fm.country;
        movies[index].about_fa = fm.about;
      }
    });
  });

  after(() => {
    cy.writeFile(files.filimoMovies, JSON.stringify(movies));
  });
});
