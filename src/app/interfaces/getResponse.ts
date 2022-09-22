import { Hero } from "./hero";

export interface GetResponse {
    _embedded: {
      heroes: Hero[];
      _links: {self: {href: string}};
    };
  }