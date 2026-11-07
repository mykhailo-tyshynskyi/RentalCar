import api from "./api";

import type { Car } from "@/types/car";
import { CarFilterValues } from "@/components/CarFilter/CarFilter";
// fetch All Cars================================================

interface FetchCarsParams {
  page?: number;
  perPage?: number;
  filters?: CarFilterValues;
}

interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export async function fetchCars({
  page,
  perPage,
  filters,
}: FetchCarsParams): Promise<FetchCarsResponse> {
  const response = await api.get<FetchCarsResponse>("/cars", {
    params: { page, perPage, ...filters },
  });
  const cars = response.data;
  return cars;
}

// fetch One car ==============================================================================

interface FetchCarParams {
  id: string;
}

type FetchCarResponse = Car;

export async function fetchCar({
  id,
}: FetchCarParams): Promise<FetchCarResponse> {
  const response = await api.get<FetchCarResponse>(`/cars/${id}`);
  const car = response.data;
  return car;
}

// Send order ==============================================================================

interface SendOrderParams {
  id: string;
  data: {
    name: string;
    email: string;
    comment: string;
  };
}

interface SendOrderResponse {
  message: string;
}

export async function sendOrder({
  id,
  data,
}: SendOrderParams): Promise<SendOrderResponse> {
  const response = await api.post<SendOrderResponse>(`/cars/${id}/booking-requests`,data);
  const message = response.data;
  return message;
}
