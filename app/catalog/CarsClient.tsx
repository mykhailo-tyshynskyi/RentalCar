"use client";
import CarList from "@/components/CarList/CarList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/api/cars";
import css from './CatalogPage.module.css'
import LoadMore from "@/components/LoadMore/LoadMore";
//import FetchMessage from "@/components/FetchMessage/FetchMessage";

export default function CarsClient() {
  const {
    data,
    isError,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars"],
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
        perPage: 12,
      }),
    initialPageParam: 1,
    // definition of next page====
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    //=============================
    refetchOnMount: false,
  });
  const cars = data?.pages.flatMap((page) => page.cars) ?? [];
  console.log(cars);
  return ( 
    <div className={css.client}>
<CarList cars={cars} isLoading={isFetching} />
<LoadMore onLoadMore={fetchNextPage} isLoading={isFetchingNextPage} hasMore={hasNextPage}/>

    </div> 
  )
}
