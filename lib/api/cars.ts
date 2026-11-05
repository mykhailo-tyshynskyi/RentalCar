import api from "./api";

import type { Car } from "@/types/car";

interface FetchCarsParams {
page?: number
perPage?:number
}

interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export async function fetchCars(params:FetchCarsParams): Promise<FetchCarsResponse> {
  const response = await api.get<FetchCarsResponse>("/cars",{params});
  const cars = response.data;
  return cars;
}
