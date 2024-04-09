import { apiCall, createHeadersList, getReqOptionsFactoty } from "./apiConfig";
import { backend_url } from "./config";

const baseUrl = `${backend_url}/anime/gogoanime`;
const headersList = createHeadersList();
const getReqOptions = getReqOptionsFactoty({ baseUrl, headersList });

const _apiCall = async (reqOptionsConfig, condition = true) => {
  if (condition) {
    const reqOptions = getReqOptions(reqOptionsConfig);
    const response = await apiCall(reqOptions);
    return response;
  }
};

export const getStreamUrls = async (episodeId, mediaId) => {
  const reqOptionsConfig = {
    url: `watch/${episodeId}`,
    method: "GET",
  };
  const res = await _apiCall(reqOptionsConfig, episodeId);
  return res?.data;
};

export const searchMovie = async (searchQuery) => {
  const reqOptionsConfig = { url: searchQuery, method: "GET" };
  const res = await _apiCall(reqOptionsConfig, searchQuery);
  return res?.data?.results;
};

export const searchMoviesWithGenre = async (genre) => {
  const reqOptionsConfig = { url: genre, method: "GET" };
  const res = await _apiCall(reqOptionsConfig, genre);
  return res?.data?.results;
};

export const getTopAiringMovie = () => searchMovie("top-airing")

export const getMovieInfo = async (animeId) => {
  const reqOptionsConfig = { url: `info/${animeId}`, method: "GET" };
  const res = await _apiCall(reqOptionsConfig);
  return res?.data;
};
