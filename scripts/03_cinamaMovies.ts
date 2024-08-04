import * as fs from "fs";
import files from "../constants/files";
import IMovieIMDB from "../types/movieIMDB";

const readJsonFile = (filePath: string): any => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
};

// Function to save a JSON object to a file
const saveJsonFile = (filePath: string, data: any): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonContent, "utf8");
};

// Main function
const main = (): void => {
  try {
    const movies: IMovieIMDB[] = readJsonFile(files.crews);
    const cinamaMovies = readJsonFile(files.cinamaMovies);

    movies.forEach((movie, index) => {
      movie.title_fa = cinamaMovies[index].persian_title;
      movie.about_fa = cinamaMovies[index].persian_plot;
      movie.image_horizontal = cinamaMovies[index].image.cover;
    });

    saveJsonFile(files.movies, movies);
  } catch (error) {}
};

main();
