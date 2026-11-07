"use client";
import css from "./CarFilter.module.css";
import type { Filter } from "@/types/filter";
import { SubmitEvent, SyntheticEvent } from "react";
import { toast } from 'react-hot-toast';


interface CarFilterProps {
  filters?: Filter;
  onSearch: (query: CarFilterValues) => void;
}

export interface CarFilterValues {
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
}

export default function Filter({ filters, onSearch }: CarFilterProps) {
  console.log(filters);

  
  // Create ann array of prices, step 10=========================
  const min = filters?.price.min;
  const max = filters?.price.max;
  function splitPrices() {
    if (min !== undefined && max !== undefined) {
      const priceArr: number[] = [min];
      const start = min % 100 == 0 ? min + 10 : min + 10 - (min % 10);
      for (let i = start; i < max; i += 10) {
        priceArr.push(i);
      }
      if (min !== max) {
        priceArr.push(max);
      }
      return priceArr;
    }
  }
  //======================================================
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const brand = formData.get("brand") as string;
    const price = formData.get("price") as string;

    const minMileage = (formData.get("minMileage") as string).trim();
    if (!/^\d+$/.test(minMileage)&& minMileage!=="") {
       toast.error(`Only numbers allowed in "Mileage From" field`);
      return;
    }
    const maxMileage = (formData.get("maxMileage") as string).trim();
    if (!/^\d+$/.test(maxMileage)&& maxMileage!=="") {
       toast.error(`Only numbers allowed in "Mileage To" field`);
      return;
    }

    const query: CarFilterValues = {
      ...(brand && { brand }),
      ...(price && { price }),
      ...(minMileage && { minMileage }),
      ...(maxMileage && { maxMileage }),
    };
    onSearch(query);
  };

  const handleReset = (e: SyntheticEvent<HTMLFormElement>) => {
    onSearch({
      brand: undefined,
      price: undefined,
      minMileage: undefined,
      maxMileage: undefined,
    });
  };

  return (
    <div className={css.container}>
      <form id="car-filter" className={css.form} onSubmit={handleSubmit} onReset={handleReset}>
        <div className={css.field}>
          <label htmlFor="brand">Car brend</label>
          <select name="brand" id="brand" defaultValue="">
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
            <option value="">Choose a price</option>
            {splitPrices()?.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>
        <div className={css.field}>
          <label htmlFor="mileage">Сar mileage / km</label>
          <div className={css.inputWraper}>
            <input name="minMileage"  placeholder="From"></input>
            <input name="maxMileage"  placeholder="To"></input>
          </div>
        </div>
        <button type="submit">Search</button>
        <button type="reset">Clear filters</button>
      </form>
    </div>
  );
}
