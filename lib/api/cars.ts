import api from "./api";

import type { Car } from "@/types/car";

interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export async function fetchCars(): Promise<FetchCarsResponse> {
  const response = await api.get<FetchCarsResponse>("/cars");
  const cars = response.data;
  return cars;
}
