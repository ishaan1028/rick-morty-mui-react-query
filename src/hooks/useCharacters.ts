import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { FilterType } from "../types";
import { getCharacters } from "../services/characters.api";

export function useCharacters() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  let queryString = `?&${searchParams.toString() || ""}`;

  const page = searchParams.get(FilterType.PAGE);

  // PAGINATION
  let prevQueryString = "";
  let nextQueryString = "";
  if (!page) {
    queryString += `&${FilterType.PAGE}=${1}`;
  }

  // QUERY
  const {
    isLoading,
    data: { info, results } = {},
    error,
  } = useQuery({
    queryKey: ["characters", queryString, page || "1"],
    queryFn: () => getCharacters(queryString),
  });

  function updatePageInQueryString(queryString: string, newPage: number) {
    const urlParams = new URLSearchParams(queryString);

    urlParams.set("page", "" + newPage);

    return `?&${urlParams.toString()}`;
  }

  if (page) {
    prevQueryString = updatePageInQueryString(queryString, +page - 1);
    nextQueryString = updatePageInQueryString(queryString, +page + 1);
  }

  // PRE-FETCHING
  const pageCount = info?.pages;
  if (page && page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["characters", nextQueryString, String(+page + 1)],
      queryFn: () => getCharacters(nextQueryString),
    });

  if (page && +page > 1 && page <= pageCount)
    queryClient.prefetchQuery({
      queryKey: ["characters", prevQueryString, String(+page - 1)],
      queryFn: () => getCharacters(prevQueryString),
    });

  return { isLoading, info, results, error };
}
