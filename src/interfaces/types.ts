export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Comic {
  resourceURI: string;
  name: string;
}
export interface Comics {
  available: number;
  collectionURI: string;
  items: Array<Comic>;
}
export interface Serie {
  resourceURI: string;
  name: string;
}
export interface Series {
  available: number;
  collectionURI: string;
  items: Array<Serie>;
}

export interface Story {
  resourceURI: string;
  name: string;
}
export interface Stories {
  available: number;
  collectionURI: string;
  items: Array<Story>;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics?: Comics;
  series?: Series;
  stories?: Stories;
  events?: object;
}
export interface ComicFull {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics?: Comics;
  series?: Series;
  stories?: Stories;
  events?: object;
}
