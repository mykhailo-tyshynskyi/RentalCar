import api from "./api";

import type { Car } from "@/types/car";
import { CarFilterValues } from "@/components/CarFilter/CarFilter";

interface FetchCarsParams {
page?: number
perPage?:number
filters?:CarFilterValues
}

interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export async function fetchCars({page,perPage,filters}:FetchCarsParams): Promise<FetchCarsResponse> {
  const response = await api.get<FetchCarsResponse>("/cars",{params:{page,perPage,...filters}});
  const cars = response.data;
  return cars;
}
