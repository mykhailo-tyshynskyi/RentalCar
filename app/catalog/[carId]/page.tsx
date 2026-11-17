import { Metadata } from "next";
import CarInfoPageClient from "./CarInfoPageClient";
import { fetchCar } from "@/lib/api/cars";

type Props = {
  params: Promise<{ carId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { carId } = await params;
  try {
    const car = await fetchCar({ id: carId });

    return {
      title: `${car.brand} ${car.model} | RentalCar`,
      description: car.description,
    };
  } catch {
    return {
      title: "Car not found | RentalCar",
    };
  }
}

export default function CarInfoPage() {
  return <CarInfoPageClient />;
}
