import type IMovieCrew from "./movieCrew";

export default interface IMovieIMDB {
  id: number;
  title: string;
  title_fa?: string;
  release_year: string;
  duration: string;
  rate?: string;
  mpa_rating: string;
  genre: string[];
  people: IMovieCrew[];
  image_vertical: string;
  image_horizontal?: string;
  about: string;
  about_fa?: string;
  country?: string;
}
