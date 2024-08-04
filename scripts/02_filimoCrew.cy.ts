import files from "../constants/files";
import IMovieCrew from "../types/movieCrew";
import IMovieIMDB from "../types/movieIMDB";
import { getElementSrc, getElementText } from "../utils/selector";

let movies: IMovieIMDB[] = [];
let crews: IMovieCrew[] = [];

const formatName = (name: string) => name.split(" ").join("-");

const processPerson = (person: IMovieCrew, movie: IMovieIMDB) => {
  const name = formatName(person.name);
  const url = `https://www.filimo.com/crew/${name}`;

  cy.visit(url, { failOnStatusCode: false });

  cy.get("body").then(($body) => {
    console.log(`Processing ${movie.id} of ${movies.length}`);

    if ($body.find(".error-page__logo").length) {
      crews.push({
        id: person.id,
        role: person.role,
        name: person.name,
        name_fa: "",
        avatar_url: "",
        birth: null,
        about: "",
      });
    } else {
      cy.get(".crew-data").then(($div) => {
        const name_fa = getElementText($div, ".name-fa");
        const avatar = getElementSrc($div, ".ds-media_image");
        const birth = getElementText($div, ".crew-birth");
        const about = getElementText($div, ".js__shave");

        person.name_fa = name_fa;
        person.avatar_url = avatar;
        person.about = about;
        if (birth) {
          person.birth = parseInt(birth.split(" ")[1]);
        }
      });
    }
  });
};

describe("Crawl filimo movie crews", () => {
  before(() => {
    cy.readFile(files.movies).then((moviesFile: IMovieIMDB[]) => {
      movies = moviesFile;
    });
  });

  it("passes 0 to 50", () => {
    cy.on("uncaught:exception", () => false);

    for (let index = 0; index < 50; index++) {
      movies[index].people.forEach((person) =>
        processPerson(person, movies[index])
      );
    }
  });

  it("passes 50 to 100", () => {
    cy.on("uncaught:exception", () => false);

    for (let index = 50; index < 100; index++) {
      movies[index].people.forEach((person) =>
        processPerson(person, movies[index])
      );
    }
  });

  it("passes 100 to 150", () => {
    cy.on("uncaught:exception", () => false);

    for (let index = 100; index < 150; index++) {
      movies[index].people.forEach((person) =>
        processPerson(person, movies[index])
      );
    }
  });

  it("passes 150 to 200", () => {
    cy.on("uncaught:exception", () => false);

    for (let index = 150; index < 200; index++) {
      movies[index].people.forEach((person) =>
        processPerson(person, movies[index])
      );
    }
  });

  it("passes 200 to 250", () => {
    cy.on("uncaught:exception", () => false);

    for (let index = 200; index < 250; index++) {
      movies[index].people.forEach((person) =>
        processPerson(person, movies[index])
      );
    }
  });

  after(() => {
    cy.writeFile(files.crews, JSON.stringify(movies));
    cy.writeFile(files.crewsIncomplete, JSON.stringify(crews));
  });
});
