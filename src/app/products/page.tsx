import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/content/products";

export const metadata: Metadata = { title: "Products | M33R Studio" };

export default function ProductsPage() {
  return (
    <main className="flex-1 py-14 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Products</h1>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group flex min-h-48 items-end justify-between rounded-xl border p-6 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <ArrowUpRight aria-hidden="true" className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </main>
  );
}
