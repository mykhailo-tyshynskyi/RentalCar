"use client"

import Icon from "../Icon/Icon";
import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
   const pathname = usePathname()
  return (
    <header className={css.header}>
        <div className={css.container}>
      <Icon id={"icon-Logo"} width={104} height={16} className={css.logo} />
      <nav className={css.navbox}>
        <Link className={`${css.navlink} ${pathname==="/"? css.active : ""}`} href="/">Home</Link>
        <Link className={`${css.navlink} ${pathname==="/catalog"? css.active : ""}`} href="/catalog">Catalog</Link>
      </nav>
      </div>
    </header>
  );
}

export default Header;
