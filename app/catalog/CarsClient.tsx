"use client";
import CarList from "@/components/CarList/CarList";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/api/cars";
import { fetchFilters } from "@/lib/api/filters";
import css from "./CatalogPage.module.css";
import LoadMore from "@/components/LoadMore/LoadMore";
import CarFilter from "@/components/CarFilter/CarFilter";
import { CarFilterValues } from "@/components/CarFilter/CarFilter";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import NoCarsFound from "@/components/NoCarsFound/NoCarsFound";

export default function CarsClient() {
  // request for filters =================================================
  const { data: filterData, isError: isFilterError } = useQuery({
    queryKey: ["filter"],
    queryFn: fetchFilters,
  });
  console.log(filterData);
  // request for cars =================================================
  const filterInitialVal: CarFilterValues = {};
  const [filters, setFilters] = useState<CarFilterValues>(filterInitialVal);
  const {
    data,
    isError,
    error,
    isLoading,
    isSuccess,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
        perPage: 12,
        filters,
      }),
    initialPageParam: 1,
    // definition of next page
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    refetchOnMount: false,
  });
  const cars = data?.pages.flatMap((page) => page.cars) ?? [];
  console.log(cars);
  //=============================================================

  return (
    <div className={css.client}>
      <CarFilter filters={filterData} onSearch={(query) => setFilters(query)} />
      <CarList cars={cars} isLoading={isFetching} />
      <LoadMore
        onLoadMore={fetchNextPage}
        isLoading={isFetchingNextPage}
        hasMore={hasNextPage}
      />
      {isSuccess && cars.length===0 && <NoCarsFound />}

      <Toaster
        position="top-center"
        toastOptions={{
                   style: {
            fontSize: "16px",
            padding: "10px 14px",
            maxWidth: "360px",
            width: "auto",
            whiteSpace: "nowrap",
          },
        }}
      />
    </div>
  );
}
