import css from "./NoCarsFound.module.css";
import ResetFilter from "../ResetFilter/ResetFilter";
import Image from "next/image";
import noCar from "@/public/images/NoCar.png";
export default function NoCarsFound() {
  return (
    <div className={css.container}>
      <Image
        className={css.img}
        src={noCar}
        alt="no car found"
        width={414}
        height={388}
      ></Image>
      <h2 className={css.title}>No cars found</h2>
      <p className={css.text}>
        We couldn`t find any cars that match your current filters. Try changing
        your search criteria or reset the filters.
      </p>
      <ResetFilter />
    </div>
  );
}
