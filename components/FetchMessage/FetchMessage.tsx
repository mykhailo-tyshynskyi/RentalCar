import { SpinnerCircularFixed } from 'spinners-react';
import css from "./FetchMessage.module.css"

export default function FetchMessage() {
  return (
    <div className={css.centeredBox}>
<SpinnerCircularFixed size={72} thickness={150} speed={100} color="#00AAD4" secondaryColor="#F7F7F7"/>
      <h2 className={css.title}>Loading cars...</h2>
      <p className={css.text}>Please wait while we fetch the best cars for you</p>
    </div>
  );
}