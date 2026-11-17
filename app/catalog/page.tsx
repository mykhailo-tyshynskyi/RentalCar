import { fetchCars } from "@/lib/api/cars";
import css from "./CatalogPage.module.css";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import CarsClient from "./CarsClient";
import { Metadata } from "next";

export const metadata:Metadata ={
  title:"Catalog | Rental Car",
  description: "Catalog of rental cars with possibility to find the best option for you"
}

export default async function CatalogPage() {
  const queryClient = new QueryClient();
  await queryClient.infiniteQuery({
    queryKey: ["cars"],
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
        perPage: 12,
      }),
    initialPageParam: 1,
    });

  return (
    <div className={css.container}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarsClient />
      </HydrationBoundary>
    </div>
  );
}
