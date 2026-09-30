import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { documents, getProduct, products } from "@/content/products";
import { CodeTapDetails } from "@/components/codetap-details";
import { codetapContent } from "@/content/codetap";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return {
    title: product ? `${product.name} | M33R Studio` : "Product not found",
    description: product?.slug === "codetap" ? codetapContent.overview[0] : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <main className="flex-1 py-14 sm:py-20">
      <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted-foreground">
        <Link className="hover:text-foreground" href="/products">Products</Link> / {product.name}
      </nav>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
      {product.slug === "codetap" ? <CodeTapDetails /> : <p className="mt-6 text-muted-foreground">製品情報は準備中です。</p>}
      <section aria-labelledby="documents-heading" className="mt-16">
        <h2 id="documents-heading" className="mb-5 text-lg font-semibold">Documents</h2>
        <div className="divide-y border-y">
          {documents.map((document) => (
            <Link
              key={document.slug}
              href={`/products/${product.slug}/${document.slug}`}
              className="flex items-center justify-between py-5 hover:text-muted-foreground"
            >
              <span>{document.title} <span className="ml-2 text-sm text-muted-foreground">{document.label}</span></span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
