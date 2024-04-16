export interface IStreamUrls {
  headers: {
    Referer: string;
  };
  sources: {
    url: string;
    quality: string;
    isM3U8: boolean;
  }[];
  download: string
}

export interface IMovieInfo {
  id: string,
  title: {
    romaji?: string;
    english?: string;
    native?: string;
    userPreferred?: string;
  };
  malId: number,
  trailer: {
    id: string,
    site: string,
    thumbnail: string
  },
  image: string,
  popularity: number,
  color: string,
  description: string,
  status: string,
  releaseDate: number,
  startDate: {
    year: number,
    month: number,
    day: number
  },
  endDate: {
    year: number,
    month: number,
    day: number
  },
  rating: number,
  genres: string[],
  season: string,
  studios: string[],
  type: string,
  recommendations: {
    id: string,
    malId: string,
    title: {
      romaji?: string;
      english?: string;
      native?: string;
      userPreferred?: string;
    };
    status: string,
    episodes: number,
    image: string,
    cover: string,
    rating: number,
    type: string,
  },
  characters: {
    id: string,
    role: string,
    name: string[],
    image: string,
  },
  relations: {
    id: number,
    relationType: string,
    malId: number,
    title: {
      romaji?: string;
      english?: string;
      native?: string;
      userPreferred?: string;
    };
    status: string,
    episodes: number,
    image: string,
    color: string,
    type: string,
    cover: string,
    rating: number,
  },
  episodes: {
    id: string,
    title: string,
    episode: string,
  }
}

export interface IEpisode {
  id: string;
  url: string;
  title: string;
  number: number;
  season: number;
}

export interface ISearchMovie {
  [x: string]: any;
  id: string;
  malId: number;
  title: {
    romaji?: string;
    english?: string;
    native?: string;
    userPreferred?: string;
  };
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
