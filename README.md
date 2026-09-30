# M33R Studio

Next.js App Router と TypeScript を使ったサイトの初期構成です。

## 開発

Node.js 20.9 以上を使用してください。

```bash
npm install
npm run dev
```

`http://localhost:3000` を開きます。

## コマンド

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm run test        # Vitest
npm run test:e2e    # Playwright（初回は npx playwright install chromium）
npm run build       # 本番ビルド
```

## GitHub Pages

`main` への push で `.github/workflows/deploy-pages.yml` が Next.js をビルドし、静的出力 `out/` を GitHub Pages に公開します。リポジトリの Settings → Pages → Source は **GitHub Actions** を選択してください。

公開URL：https://m33r-studio.github.io/

`next.config.ts` の `output: "export"` と `trailingSlash: true` により、製品・規約ページも各ディレクトリの `index.html` として生成します。画像は静的ファイルとして配信します。

## 構成

- `src/app`: ページと共通レイアウト。`/products` 以下に各製品と文書ページがあります。
- `src/content`: 最初のコンテンツを管理する TypeScript データ。
- `src/components/ui`: shadcn/ui のコンポーネント。追加時は `npx shadcn@latest add <name>`。
- `src/components`: Motion を使うクライアントコンポーネント。
- `public`: 画像・動画などの静的ファイル。ラスター画像は AVIF / WebP を優先し、表示には `next/image` を使います。

Tailwind CSS と Lucide は導入済みです。複雑なスクロール演出が必要になった箇所で `npm install gsap` を実行してください。CMS は必要になった時点で Sanity を、動画配信の規模が増えたら Mux を検討します。Vercel には Next.js プロジェクトとして接続できます。

CodeTap の Application Policy / Privacy Policy は `src/content/policies/codetap/` の MDX 本文を表示します（最終更新日：2026年9月30日）。M33RA の文書は本文未提供のため、準備中ページです。
