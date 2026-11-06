"use client";
import css from "./CarFilter.module.css";
import type { Filter } from "@/types/filter";

interface CarFilterProps {
  filters?: Filter;
}

export default function Filter({ filters }: CarFilterProps) {
  console.log(filters);
  const min = filters?.price.min;
  const max = filters?.price.max;
  function splitPrices() {
    if(min!==undefined && max!==undefined){
    const priceArr: number[] = [min];
    const start = min % 100 == 0 ? min + 10 :min + 10 - (min % 10);
    for (let i = start; i < max; i += 10) {
      priceArr.push(i);
    }
    if (min !== max) {
      priceArr.push(max);
    }
    return priceArr;
}
  }

  return (
    <div className={css.container}>
      <form className={css.form}>
        <div className={css.field}>
          <label htmlFor="brend">Car brend</label>
          <select name="brend" id="brend" defaultValue="">
            <option value="">Choose a brand</option>
            {filters?.brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className={css.field}>
          <label htmlFor="price">Price/ 1 hour</label>
          <select name="price" id="price">
           { splitPrices()?.map((price)=>(
            <option key={price} value={price}>
                {price}
              </option>
           ))}
          </select>
        </div>
        <div className={css.field}>
          <label htmlFor="mileage">Сar mileage / km</label>
          <div className={css.inputWraper}>
            <input name="from"></input>
            <input name="to"></input>
          </div>
        </div>
        <button type="submit">Search</button>
        <button type="reset">Clear filters</button>
      </form>
    </div>
  );
}
