import type { Car } from "@/types/car";
import css from "./CarCard.module.css";
import Image from "next/image";
import Link from "next/link";


interface CarCardProps {
  car: Car;
  
}

export default function CarCard({ car }: CarCardProps) {
    console.log(car);

   
  return (
    <div className={css.card}>
      <div className={css.imageBox}>
        <Image className={css.image} src={car.img} alt="car background" fill loading="lazy" />
      </div>
      <div className={css.mainInfo}>
        <h2>{`${car.brand} `}<span className={css.accent}>{car.model}</span>{`, ${car.year}`}</h2>
        <p>{`$${car.rentalPrice}`}</p>
      </div>
      <div className={css.stratchBox}>
      <ul className={css.moreInfo}>
        <li>{car.location.city}</li>
        <li>{car.location.country}</li>
        <li>{car.rentalCompany}</li>
        <li>{car.type}</li>
        <li>{`${car.mileage} km`}</li>
      </ul>
      <Link className={css.btn} href={`/catalog/${car.id}`}>Read more</Link>
      </div>
    </div>
  );
}
