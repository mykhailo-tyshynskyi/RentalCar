"use client";
import css from "./CarFilter.module.css";
import type { Filter } from "@/types/filter";
import { SubmitEvent, SyntheticEvent } from "react";
import { toast } from "react-hot-toast";
import CustomSelect from "../CustomSelect/CustomSelect";
import { useState } from "react";

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
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

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

    const minMileage = (formData.get("minMileage") as string).trim();
    if (!/^\d+$/.test(minMileage) && minMileage !== "") {
      toast.error(`Only numbers allowed in "Mileage From" field`);
      return;
    }
    const maxMileage = (formData.get("maxMileage") as string).trim();
    if (!/^\d+$/.test(maxMileage) && maxMileage !== "") {
      toast.error(`Only numbers allowed in "Mileage To" field`);
      return;
    }
    if (minMileage >= maxMileage) {
      toast.error(`"Mileage To" must be biger then "Mileage From"`);
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
    setBrand("");
    setPrice("");
    onSearch({
      brand: undefined,
      price: undefined,
      minMileage: undefined,
      maxMileage: undefined,
    });
  };

  return (
    <div className={css.container}>
      <form
        id="car-filter"
        className={css.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className={css.field}>
          <label className={css.label} htmlFor="brand">
            Car brand
          </label>
          <CustomSelect
            name="brand"
            options={filters?.brands ?? []}
            placeholder="Choose a brand"
            value={brand}
            onChange={setBrand}
          />
        </div>
        <div className={css.field}>
          <label className={css.label} htmlFor="price">
            Price/ 1 hour
          </label>
          <div className={css.selectWraper}>
            <CustomSelect
              name="price"
              options={splitPrices()?.map(String) ?? []}
              placeholder="Choose a price"
              value={price}
              onChange={setPrice}
              formatSelectedValue={(value) => `To $${value}`}
            />
          </div>
        </div>
        <div className={css.field}>
          <label className={css.label} htmlFor="mileage">
            Сar mileage / km
          </label>
          <div className={css.inputWraper}>
            <input
              className={css.minMileage}
              name="minMileage"
              placeholder="From"
            ></input>
            <input
              className={css.maxMileage}
              name="maxMileage"
              placeholder="To"
            ></input>
          </div>
        </div>
        <div className={css.btnBox}>
          <button className={css.btn} type="submit">
            Search
          </button>
          <button className={css.btnClear} type="reset">
            Clear filters
          </button>
        </div>
      </form>
    </div>
  );
}
