export interface IMovieSource {
  url: string;
  quality: string;
  isM3U8: boolean;
}

export interface IMovieTitle {
  romaji?: string;
  english?: string;
  native?: string;
  userPreferred?: string;
}

export interface ITrailerInfo {
  id: string;
  site: string;
  thumbnail: string
}

export interface IEpisodeInfo {
  airDate: number;
  description: string;
  id: string;
  image: string;
  imageHash: string;
  number: number;
  title: string
}

export interface IStreamUrls {
  headers: {
    Referer: string;
  };
  sources: IMovieSource[];
  download: string
}

export interface IMovieInfo {
  id: string;
  title: IMovieTitle;
  malId: number;
  trailer: ITrailerInfo;
  image: string;
  popularity: number;
  color: string;
  description: string;
  status: string;
  releaseDate: number;
  startDate: {
    year: number;
    month: number;
    day: number
  };
  endDate: {
    year: number;
    month: number;
    day: number
  };
  rating: number;
  genres: string[];
  season: string;
  studios: string[];
  type: string;
  totalEpisodes: number;
  currentEpisode: number;
  recommendations: {
    id: string;
    malId: string;
    title: IMovieTitle;
    status: string;
    episodes: number;
    image: string;
    cover: string;
    rating: number;
    type: string;
  };
  characters: {
    id: string;
    role: string;
    name: string[];
    image: string;
  };
  relations: {
    id: number;
    relationType: string;
    malId: number;
    title: IMovieTitle;
    status: string;
    episodes: number;
    image: string;
    color: string;
    type: string;
    cover: string;
    rating: number;
  };
  episodes: IEpisodeInfo[]
}


export interface ISearchMovie {
  [x: string]: any;
  id: string;
  malId: number;
  title: IMovieTitle;
  status: "Completed" | "Ongoing";
  image: string
  imageHash: string;
  cover: string | null;
  coverHash: string;
  popularity: number | null;
  description: string;
  rating: null | number;
  genres: string[]
  color: string;
  totalEpisodes: number;
  currentEpisodeCount: number;
  type: "OVA" | "MOVIE" | "TV";
  releaseDate: number | null;
}
