import { IMovieInfo, ISearchMovie, IStreamUrls } from "@/types";
import { apiService } from "../services/ApiService";


export const getStreamUrls = async (
    episodeId: string,
): Promise<IStreamUrls> => {
    const url = `watch/${episodeId}`;
    const response = await apiService.request<IStreamUrls>(url, "GET");
    return response?.data;
};

export const searchMovie = async (
    searchQuery: string
): Promise<ISearchMovie> => {
    const url = `${searchQuery}`;
    const response = await apiService.request<ISearchMovie>(url, "GET");
    return response.data.results;
};

export const searchMoviesWithGenre = async (
    genre: string
): Promise<ISearchMovie> => {
    const url = `${genre}`;
    const response = await apiService.request<ISearchMovie>(url, "GET");
    return response.data.results;
};

export const getTrendingMovies = async (): Promise<ISearchMovie[]> => {
    const url = "trending";
    const response = await apiService.request<any>(url, "GET");
    return response.data.results;
};

export const getMovieInfo = async (
    movieId: string
): Promise<IMovieInfo> => {
    const url = `info/${movieId}`;
    const response = await apiService.request<any>(url, "GET");
    return response.data;
};
