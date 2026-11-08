import css from "./ResetFilter.module.css";

export default function ResetFilter() {
  return (
    <button className={css.btn} type="reset" form="car-filter">
      Reset filters
    </button>
  );
}
