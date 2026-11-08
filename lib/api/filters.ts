import api from "./api";

interface FetchFiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export async function fetchFilters(): Promise<FetchFiltersResponse> {
  const response = await api.get<FetchFiltersResponse>("/cars/filters");
  const filters = response.data;
  return filters;
}
