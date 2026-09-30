import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { documents, getDocument, getProduct, products } from "@/content/products";
import CodeTapApplicationPolicy from "@/content/policies/codetap/application-policy.mdx";
import CodeTapPrivacyPolicy from "@/content/policies/codetap/privacy-policy.mdx";
import type { MDXComponents } from "mdx/types";

const policyComponents: MDXComponents = {
  h1: ({ children }) => <h2 className="policy-title">{children}</h2>,
};

type Props = { params: Promise<{ slug: string; document: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.flatMap((product) =>
    documents.map((document) => ({ slug: product.slug, document: document.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, document: documentSlug } = await params;
  const product = getProduct(slug);
  const document = getDocument(documentSlug);
  return {
    title: product && document ? `${document.title} | ${product.name} | M33R Studio` : "Document not found",
    robots: { index: product?.slug === "codetap", follow: product?.slug === "codetap" },
  };
}

export default async function DocumentPage({ params }: Props) {
  const { slug, document: documentSlug } = await params;
  const product = getProduct(slug);
  const document = getDocument(documentSlug);
  if (!product || !document) notFound();
  const Policy = product.slug === "codetap"
    ? document.slug === "application-policy" ? CodeTapApplicationPolicy : CodeTapPrivacyPolicy
    : null;

  return (
    <main className={`flex-1 py-14 sm:py-20${Policy ? " policy-page" : ""}`}>
      <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted-foreground">
        <Link className="hover:text-foreground" href="/products">Products</Link>
        {" / "}
        <Link className="hover:text-foreground" href={`/products/${product.slug}`}>{product.name}</Link>
        {` / ${document.title}`}
      </nav>
      <p className="mb-3 text-sm text-muted-foreground">{product.name}</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{document.title}</h1>
      {Policy ? (
        <article className="policy-content"><Policy components={policyComponents} /></article>
      ) : (
        <>
          <p className="mt-3 text-muted-foreground">{document.label}</p>
          <div className="mt-12 rounded-lg border bg-muted/50 p-6 text-sm leading-7">
            正式な文書は準備中です。公開前に本文を追加してください。
          </div>
        </>
      )}
    </main>
  );
}
