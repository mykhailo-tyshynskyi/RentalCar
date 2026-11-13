import type { Car } from "@/types/car";
import css from "./CarInfo.module.css"
import Icon from "../Icon/Icon";

interface CarInfoProps {
  car: Car;
}

export default function CarInfo({ car }: CarInfoProps) {
  return (
    <div className={css.infoWraper}>
      <h2 className={css.mainTitle}>
        {`${car.brand} ${car.model}, ${car.year}`}
        <span className={css.art}>{`Article: ${car.stockNumber}`}</span>
      </h2>
      <p className={css.location}>{`${car.location.city}, ${car.location.country}`}</p>
      <p className={css.price}>{`$${car.rentalPrice}`}</p>
      <p className={css.descr}>{car.description}</p>
      <h3 className={css.subTitle}>Rental Conditions: </h3>
      <ul className={`${css.list} ${css.border}`}>
        {car.rentalConditions.map((item) => {
          return <li  key={item}>
            <Icon id={"icon-check-circle"} width={16} height={16}/>
            {item}
            </li>;
        })}
      </ul>
      <h3 className={css.subTitle}>Car Specifications: </h3>
      <ul className={`${css.list} ${css.border}`}>
        <li>
          <Icon id={"icon-calendar"} width={16} height={16}/>
          {`Year: ${car.year}`}</li>
        <li><Icon id={"icon-car"} width={16} height={16}/>{`Type: ${car.type}`}</li>
        <li><Icon id={"icon-fuel-pump"} width={16} height={16}/>{`Fuel Consumption: ${car.fuelConsumption}`}</li>
        <li><Icon id={"icon-gear"} width={16} height={16}/>{`Engine: ${car.engine}`}</li>
        <li><Icon id={"icon-road-horizon"} width={16} height={16}/>{`Mileage: ${car.mileage}`}</li>
      </ul>
      <h3 className={css.subTitle}>Features</h3>
      <ul className={css.list}>
        {car.features.map((item) => {
          return <li key={item}>
            <Icon id={"icon-check-circle"} width={16} height={16}/>
            {item}</li>;
        })}
      </ul>
    </div>
  );
}
