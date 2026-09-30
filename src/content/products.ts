export const products = [
  { slug: "m33ra", name: "M33RA" },
  { slug: "codetap", name: "CodeTap" },
] as const;

export const documents = [
  { slug: "application-policy", title: "Application Policy", label: "利用規約" },
  { slug: "privacy-policy", title: "Privacy Policy", label: "プライバシーポリシー" },
] as const;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getDocument(slug: string) {
  return documents.find((document) => document.slug === slug);
}
