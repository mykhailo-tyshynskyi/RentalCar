'use client';

import css from "./page.module.css"

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return (
    <div className={css.error}>
      <h2>Something went wrong during loading this page</h2>
      <p>{error.message}</p>
    </div>
  );
}

export default Error;
