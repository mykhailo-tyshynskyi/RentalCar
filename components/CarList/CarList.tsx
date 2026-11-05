import { Car } from "@/types/car";
import CarCard from "../CarCard/CarCard";
import css from './CarList.module.css'

interface CarListProps {
  cars: Car[];
  isLoading:boolean;
}

export default function CarList({cars,isLoading}:CarListProps) {
return(
  <div className={css.contentWraper}>
   {isLoading && (
    <div className={css.overlay}>
      
    </div>
  )}
   <ul className={css.list}>
      {cars.map(car => {
        return (
          <li className={css.listItem} key={car.id}>
            <CarCard car={car}       
            />
          </li>
        );
      })}
    </ul>
    </div>
)

}
