import type IMovieCrew from "./movieCrew";

export default interface IMovieIMDB {
  id: number;
  title: string;
  title_fa?: string;
  release_year: string;
  duration: number;
  rate?: number;
  mpa_rating: string;
  rating_stars: number;
  genre: string[];
  people: IMovieCrew[];
  image_vertical: string;
  image_horizontal?: string;
  about: string;
  about_fa?: string;
  country?: string;
}
