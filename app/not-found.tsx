import css from "./page.module.css";

export default function NotFound() {
  return (
    <div className={css.error}>
      <h2>404 - Page not found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}