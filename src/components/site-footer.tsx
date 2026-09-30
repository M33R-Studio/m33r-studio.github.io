import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/site";
import meerkat from "../../library/svg/Meerkat.svg";

export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand" data-scroll-reveal>
          <Link href="/" aria-label="M33R Studio ホーム"><Image src={meerkat} width={49} height={45} alt="M33R Studio のミーアキャット" /></Link>
          <p>M33R Studio</p>
          <small>Make Beauty.<br />Remove Friction.</small>
        </div>
        <div data-scroll-reveal data-reveal-order="1"><h2>Products</h2><Link href="/products/m33ra">M33RA</Link><Link href="/products/codetap">CodeTap</Link><Link href="/products">All products</Link></div>
        <div data-scroll-reveal data-reveal-order="2"><h2>Studio</h2><Link href="/#about">About</Link><Link href="/#faq">FAQ</Link><a href={`mailto:${siteContent.contactEmail}`}>CodeTapのお問い合わせ</a></div>
        <div data-scroll-reveal data-reveal-order="3"><h2>Resources</h2><Link href="/products/m33ra/application-policy">M33RA 利用規約</Link><Link href="/products/m33ra/privacy-policy">M33RA プライバシー</Link><Link href="/products/codetap/application-policy">CodeTap 利用規約</Link><Link href="/products/codetap/privacy-policy">CodeTap プライバシー</Link></div>
      </div>
      <p className="footer-copyright" data-scroll-reveal>© M33R Studio</p>
    </footer>
  );
}
