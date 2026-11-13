import { SpinnerCircularFixed } from "spinners-react";
import css from "./page.module.css";

const Loading = () => {
  return (
    <div className={css.loadingSpinner}>
      <SpinnerCircularFixed
        size={100}
        thickness={150}
        speed={100}
        color="#00AAD4"
        secondaryColor="#FFF"
      />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
