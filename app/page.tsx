import css from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import bannerIMG from "@/public/images/banner.jpg";

export default function Home() {
  return (
    <div className={css.container}>
      <div className={css.banner}>
        <Image className={css.picture}
          src={bannerIMG}
          alt="car background"
          fill
          priority
        />
        <h1>Find your perfect rental car</h1>
        <p>Reliable and budget-friendly rentals for any journey</p>
        <Link href="/catalog">View Catalog</Link>
      </div>
    </div>
  );
}
