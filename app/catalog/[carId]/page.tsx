"use client";

import css from "./CarInfoPage.module.css";
import { useParams } from "next/navigation";
import { fetchCar } from "@/lib/api/cars";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import OrderForm from "@/components/OrderForm/OrderForm";
import CarInfo from "@/components/CarInfo/CarInfo";
import { Toaster } from "react-hot-toast";
import { notFound } from "next/navigation";
import Loading from "@/app/loading";
import { isAxiosError } from "axios";

export default function CarInfoPage() {
  const { carId } = useParams<{ carId: string }>();
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCar({ id: carId }),
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
   }

  return (
    isSuccess && (
      <div className={css.container}>
        <div className={css.boxImgForm}>
          <div className={css.imageBox}>
            <Image src={data.img} alt="car" fill></Image>
          </div>
          <OrderForm id={carId} />
        </div>
        <div className={css.boxInfo}>
          <CarInfo car={data} />
        </div>
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
            duration: 6000,
          }}
        />
      </div>
    )
  );
}
