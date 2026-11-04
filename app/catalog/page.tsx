import { fetchCars } from "@/lib/api/cars";
import css from "./CatalogPage.module.css";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import CarsClient from "./CarsClient";

export default async function CatalogPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  return (
    <div className={css.container}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarsClient />
      </HydrationBoundary>
    </div>
  );
}
