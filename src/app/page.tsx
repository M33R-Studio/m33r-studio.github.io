import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ProductArtwork } from "@/components/product-artwork";
import { SectionNavigation } from "@/components/section-navigation";
import { ScrollAnimations } from "@/components/scroll-animations";
import { siteContent } from "@/content/site";
import { codetapContent } from "@/content/codetap";
import backgroundImage from "../../library/images/BG.png";
import codeTapImage from "../../library/images/CodeTap.png";
import motto from "../../library/svg/motto.svg";

export default function Home() {
  return (
    <main id="main-content">
      <SectionNavigation />
      <ScrollAnimations />
      <section id="top" className="hero" aria-labelledby="home-heading">
        <Image src={backgroundImage} alt="" fill sizes="100vw" preload className="hero-image" />
        <h1 id="home-heading" className="sr-only">M33R Studio</h1>
        <Image src={motto} width={429} height={79} alt="Make Beauty. Remove Friction." className="hero-motto" />
      </section>

      <div className="home-content">
        <section id="products" className="product-overview" aria-labelledby="products-heading">
          <h2 id="products-heading" className="section-label" data-scroll-reveal>Our Products</h2>
          <div className="product-gallery">
            <Link href="#m33ra" aria-label="M33RA の紹介を見る" className="gallery-card" data-scroll-reveal><ProductArtwork /></Link>
            <Link href="#codetap" aria-label="CodeTap の紹介を見る" className="gallery-card" data-scroll-reveal data-reveal-order="1">
              <Image src={codeTapImage} alt="CodeTapの認証コード入力補助画面" className="product-screenshot" sizes="(max-width: 700px) 28vw, (max-width: 1535px) 20vw, 302px" />
            </Link>
            <div className="gallery-card" role="img" aria-label="今後の製品のための仮画像" data-scroll-reveal data-reveal-order="2"><ProductArtwork /></div>
          </div>
        </section>

        <section id="m33ra" className="product-feature" aria-labelledby="m33ra-heading">
          <div className="feature-visual" data-scroll-reveal>
            <h2 id="m33ra-heading" className="section-label">M33RA - DAW</h2>
            <Link href="/products/m33ra" aria-label="M33RA の製品ページ" className="feature-artwork"><ProductArtwork /></Link>
          </div>
          <div className="feature-copy" data-scroll-reveal data-reveal-order="1">
            <p>M33RA は、M33R Studio の DAW プロジェクトです。</p>
            <p>Make Beauty. Remove Friction.<br />美しさをつくり、余計な摩擦を取り除く。この言葉を軸に、プロダクトをかたちにしていきます。</p>
            <p>製品の詳しい紹介、機能、リリース情報は現在準備中です。利用規約とプライバシーポリシーのページは、以下からご覧いただけます。</p>
            <Link href="/products/m33ra" className="text-link">Explore M33RA <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </section>

        <section id="codetap" className="product-feature product-feature-reverse" aria-labelledby="codetap-heading">
          <div className="feature-visual" data-scroll-reveal>
            <h2 id="codetap-heading" className="section-label">CodeTap</h2>
            <Link href="/products/codetap" aria-label="CodeTap の製品ページ" className="feature-artwork">
              <Image src={codeTapImage} alt="CodeTapの認証コード入力補助画面" className="product-screenshot" sizes="(max-width: 700px) 80vw, (max-width: 1535px) 41vw, 620px" />
            </Link>
          </div>
          <div className="feature-copy" data-scroll-reveal data-reveal-order="1">
            <p>{codetapContent.headline}</p>
            <p>{codetapContent.overview[0].replace("Gmail", "Gmail*")}</p>
            <p>入力欄にフォーカスするとコードを検索。表示されたコードを確認してクリックすると、入力欄に入ります。</p>
            <p className="feature-note">*「Gmail」はGoogle LLCの登録商標です。</p>
            <Link href="/products/codetap" className="text-link">Explore CodeTap <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </section>

        <section id="about" className="studio-about" aria-labelledby="about-heading">
          <div className="studio-dots" aria-hidden="true" data-scroll-reveal><span /><span /><span /></div>
          <h2 id="about-heading" className="sr-only">About M33R Studio</h2>
          <p data-scroll-reveal data-reveal-order="1">{siteContent.name}<br />{siteContent.intro}</p>
        </section>

        <section id="faq" className="faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="sr-only">よくある質問</h2>
          {siteContent.faq.map((item, index) => (
            <details className="faq-item" key={item.question} open={index === 0} data-scroll-reveal data-reveal-order={index}>
              <summary>{item.question}<ChevronDown size={18} aria-hidden="true" /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>
      </div>
    </main>
  );
}
