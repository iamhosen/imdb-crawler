export default interface IMovieCrew {
  id: string;
  role: "Director" | "Actor";
  name: string;
  name_fa?: string;
  avatar_url?: string;
  birth?: Maybe<number>;
  about?: string;
}
