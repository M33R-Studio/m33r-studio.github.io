import Image from "next/image";
import Link from "next/link";
import logo from "../../library/svg/M33R.svg";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" aria-label="M33R Studio ホーム" className="brand"><Image src={logo} width={212} height={51} alt="M33R" /></Link>
      <nav aria-label="メインナビゲーション">
        <Link href="/products">Products</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}
