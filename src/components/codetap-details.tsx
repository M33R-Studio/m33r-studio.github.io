import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { codetapContent } from "@/content/codetap";
import codeTapImage from "../../library/images/CodeTap.png";

export function CodeTapDetails() {
  return (
    <div className="codetap-details">
      <section className="codetap-overview" aria-labelledby="overview-heading">
        <div>
          <h2 id="overview-heading" className="codetap-headline"><strong>{codetapContent.headline}</strong></h2>
          <div className="codetap-prose">
            {codetapContent.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <figure className="codetap-preview">
          <Image src={codeTapImage} alt="CodeTapの認証コード入力補助画面" className="product-screenshot" sizes="(max-width: 900px) 88vw, (max-width: 1535px) 38vw, 550px" />
        </figure>
      </section>

      <section className="codetap-section" aria-labelledby="usage-heading">
        <h2 id="usage-heading" className="product-section-title">使い方</h2>
        <ol className="codetap-steps">
          {codetapContent.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <p className="codetap-fallback"><strong>{codetapContent.fallbackLabel}</strong>{codetapContent.fallback}</p>
      </section>

      <section className="codetap-section" aria-labelledby="qa-heading">
        <h2 id="qa-heading" className="product-section-title">Q&amp;A</h2>
        <div className="codetap-qa">
          {codetapContent.qa.map(({ question, answer }, index) => (
            <details className="faq-item" key={question} open={index === 0}>
              <summary><span>Q. {question}</span><ChevronDown size={18} aria-hidden="true" /></summary>
              <p>A. {answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
