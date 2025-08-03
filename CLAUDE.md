# CLAUDE.md  
むなかた子ども大学 公式サイト – コード生成用プロンプト  
（Astro × TypeScript × SCSS × microCMS × Vercel）

---

## 1. 目的
- **Astro + TypeScript + SCSS** で静的サイト／SSG (Incremental Static Regeneration) を構築する  
- **microCMS** の 10 API からデータ取得し、講座・当選者発表・過去実績などを自動生成  
- **Vercel** へデプロイ（Preview → Production）  
- 将来のコンテンツ追加はすべて microCMS 管理画面だけで完結させる  

---

## 2. 技術スタック & 主要パッケージ
| 区分 | ツール / ライブラリ | メモ |
| --- | --- | --- |
| フレームワーク | **Astro v4** | Islands / Hybrid rendering |
| 言語 | TypeScript strict | `strict: true` |
| スタイリング | SCSS (Modules) | `/src/styles/**` |
| UI コンポーネント | ナチュラル HTML + Utility SCSS | 最低限 BEM & utility mixins |
| 画像最適化 | `@astrojs/image` + `sharp` | microCMS CDN 画像も最適化 |
| フォーマット | ESLint + Prettier + Stylelint | Husky + lint-staged |
| fetch | `@microcms/client` | v3 SDK |
| デプロイ | Vercel (Edge Functions) | 環境変数は Vercel Dashboard 管理 |

---

## 3. 環境変数（`.env` サンプル）
```dotenv
MICROCMS_SERVICE_DOMAIN=mku2025
MICROCMS_API_KEY=zd2xVmqyffQvYvNQ2gkILFIlKEZMfWcojqov
4. microCMS エンドポイント / モデル
モデル名	エンドポイント	用途
mainCampusSettings	/main-campus-settings	メインキャンパス 全体フェーズ等
mainCampusCourse	/main-campus-course	メインキャンパス各講座
specialCourse	/special-course	特設講座
summerCourse	/summer-course	夏の課外授業
mkuDay	/mku-day	むなかた子ども大学の日
schoolMaster	/school-master	学校マスタ
summerCategory	/summer-category	夏の課外授業カテゴリ
globalSettings	/global-settings	サイト全体設定（currentYear 等）
newsCategory	/news-category	お知らせ / メディア掲載 カテゴリ
newsPost	/news-post	投稿本体

5. ルーティング仕様（重要）

5-0. ファイル構造規約
**必須ルール**: すべてのページは `{ページスラッグ}/index.astro` の形式で作成する
- 例: `about.astro` → `about/index.astro`, `schedule.astro` → `schedule/index.astro`
- トップページ（`src/pages/index.astro`）は例外
- ファイル移動時は import パスを適切に調整する（`../` レベルの追加）

5-1. 講座系 /course
画面	例 URL	パンくず例	物理ファイル
当該年度メインキャンパス一覧	/course/main-campus	ホーム › メインキャンパス	/src/pages/course/main-campus/index.astro
年度付き一覧	/course/main-campus/R06	ホーム › メインキャンパス › 令和6年度	/src/pages/course/main-campus/[year]/index.astro
講座詳細	/course/main-campus/R07/12345	ホーム › メインキャンパス › 令和7年度 › ◯◯コース	/src/pages/course/main-campus/[year]/[id]/index.astro

ルール : 末尾の 12345 は microCMS コンテンツ ID。年度を変えても同じ ID を保持。
currentYear (例 R07) の一覧は /course/main-campus へ 301 Redirect する Astro endpoint を実装。

5-2. 当選者発表 /results
画面	URL 例	物理ファイル
メインキャンパス当選 (講座単位)	/results/main-campus/12345	/src/pages/results/main-campus/[id]/index.astro
特設講座当選 (講座単位)	/results/special-course/abcde	/src/pages/results/special-course/[id]/index.astro

当該年度のみ表示。年度パラメータは 含めない。開催終了 (status=subStatus:closed など) になったら非表示。

5-3. 過去実績 /report
画面	URL	物理ファイル
過去実績トップ	/report	/src/pages/report/index.astro
柱別一覧	/report/main-campus	/src/pages/report/main-campus/index.astro
年度別一覧	リスト側は /course/main-campus/R06 を再利用	

5-4. その他のページ
画面	URL	物理ファイル
むなかた子ども大学について	/about	/src/pages/about/index.astro
年間スケジュール	/schedule	/src/pages/schedule/index.astro
ニュース一覧	/news	/src/pages/news/index.astro
ニュース詳細	/news/[id]	/src/pages/news/[id]/index.astro

6. 年間スケジュール ロジック
列	取得元	抽出条件 / 補足
メインキャンパス	mainCampusSettings.executedDate[] 配列	年度フィルタ後の{year, date}構造
特設講座	specialCourse.scheduleItem[] 最小 / 最大	status≠closed
むなかた子ども大学の日	mkuDay.eventDates[] 各学校	学校ごと multi-date
夏の課外授業	summerCourse.scheduleItem[] … atAnyTime なら「随時開催」表示	早/遅の日を抽出

6-1. microCMSフィルタリング規約
- **年度フィルタ**: `year[contains]令和○年度` (valueベース部分一致)
- **取得件数**: `limit: 100` (デフォルト10件では不足のため)
- **対象学年表示順**: 未就学児 → 1年～9年 → 高1～高3 → その他

7. コーディング規約（抜粋）
コンポーネントは /src/components/, ページは /src/pages/ に

fetch → lib/microcms.ts で共通ラッパ

SCSS module は Component.module.scss

画像は <Image> コンポーネント (Astro Image) 使用

npm run dev · build · preview 3 script

8. 生成手順（Claude Code 用）
新しい private GitHub リポジトリを作成 (munakata-kids-unv)

pnpm dlx create-astro@latest で with-typescript テンプレート

pnpm install -D @microcms/client sass @astrojs/image 他

/lib/microcms.ts に SDK 初期化 (serviceDomain & APIkey ENV)

ルーティング & ページコンポーネントを段階的に scaffold

vercel link → Vercel CI 設定 (環境変数登録)

pnpm run build && vercel --prod で first deploy

---

## 9. SCSS記述ルール（必須）
- **メディアクエリは必ずmixinを使用**: `@include breakpoint-up(breakpoint)` または `@include breakpoint-down(breakpoint)` を使用する
- **直接的な@media禁止**: `@media (max-width: XXXpx)` や `@media (min-width: XXXpx)` の記述は禁止
- **ブレークポイント統一**: 統一されたmixin経由でのみ指定し、一貫性を保つ
- **aタグのホバー時アンダーライン禁止**: カードやボタンなどのaタグには`text-decoration: none`を基本とし、ホバー時にもアンダーラインを表示しない

