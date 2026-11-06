import { Car } from "@/types/car";
import CarCard from "../CarCard/CarCard";
import css from "./CarList.module.css";
import FetchMessage from "@/components/FetchMessage/FetchMessage";
import { useEffect } from "react";
interface CarListProps {
  cars: Car[];
  isLoading: boolean;
}

export default function CarList({ cars, isLoading }: CarListProps) {
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousHtmlOverflow;
    };
  }, [isLoading]);

  return (
    <div className={css.contentWraper}>
      {isLoading && (
        <div className={css.overlay}>
          <FetchMessage />
        </div>
      )}
      <ul className={`${css.list} ${isLoading ? css.loading : ""}`}>
        {cars.map((car) => {
          return (
            <li className={css.listItem} key={car.id}>
              <CarCard car={car}/>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
