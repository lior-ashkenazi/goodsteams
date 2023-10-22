import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import {
  GetBookByIdRequest,
  GetBookByIdResponse,
  GetBooksByGenreRequest,
  GetBooksByGenreResponse,
  GetBooksByTermRequest,
  GetBooksByTermResponse,
} from "../types/apis/bookServiceApi";

export const useGetBookByIdQuery = (bookId: GetBookByIdRequest) => {
  return useQuery<GetBookByIdResponse, Error>({
    queryKey: ["Book", bookId],
    queryFn: () => apiClient.get(`book/${bookId}`),
  });
};

export const useGetBooksByTermQuery = ({
  term,
  page = 0,
  size = 10,
  sort = "title,asc",
}: GetBooksByTermRequest) => {
  return useQuery<GetBooksByTermResponse, Error>({
    queryKey: ["Book", term, page, sort],
    queryFn: () =>
      apiClient.get(`book/search`, { params: { term, page, size, sort } }),
  });
};

export const useGetBooksByGenreQuery = ({
  genreName,
  page = 0,
  size = 9,
}: GetBooksByGenreRequest) => {
  return useQuery<GetBooksByGenreResponse, Error>({
    queryKey: ["Book", genreName, page],
    queryFn: () =>
      apiClient.get(`book/genre/${genreName}`, { params: { page, size } }),
  });
};
