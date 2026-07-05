# 30秒でできる 年収シミュレーター

経験者エンジニア向けの、1ページ完結型の年収シミュレーターです。回答と結果はブラウザの `localStorage` に保存され、外部DBなしで動きます。

## セットアップ方法

```bash
pnpm install
```

## 開発環境の起動方法

Mac側に `node` / `npm` / `pnpm` が入っていない場合は、まずこれを使ってください。

```bash
./start-local.command
```

または Finder で `start-local.command` をダブルクリックします。

起動後、ブラウザで `http://localhost:3001` を開きます。自動でブラウザも開くようにしています。

通常のNode.js環境がある場合は、以下でも起動できます。

```bash
pnpm dev
```

起動後、ブラウザで `http://localhost:3000` を開きます。

`pnpm` がない場合は以下を使います。

```bash
npm run dev
```

## バナー画像の差し替え方法

バナー画像は `public/banners/` に置いています。

- `public/banners/strategy-career.png`
- `public/banners/other-career.png`
- `public/banners/sidejob.png`

同じファイル名で画像を差し替えると、そのまま画面に反映されます。別のファイル名にする場合は `lib/constants.ts` の `SERVICES` 内にある `image` を変更してください。

## リンクURLの変更方法

サービスバナーのリンクは `lib/constants.ts` の `SERVICES` で管理しています。`href` を変更すると、クリック先を変更できます。

## 年収計算ロジックの変更方法

計算ロジックは `lib/simulation.ts` にあります。

- エンジニア歴: `experienceRanges`
- 今のお仕事: `roleRanges`
- 担当範囲: `scopeRanges`
- 年齢補正: `getAgeRange`
- 結果理由の文言: `scopeReason` / `roleReason`
- 転職温度感の文言: `buildMessage`

現在年収に各項目の加算幅を足し、10万円単位に丸めて想定年収レンジを表示しています。

## Vercelへのデプロイ方法

### GitHub経由で公開する場合

1. GitHubに新規リポジトリを作成します。
2. このプロジェクトをGitHubにpushします。
3. Vercelで `Add New...` → `Project` を選択します。
4. GitHubリポジトリを選択します。
5. Framework Preset が `Next.js` になっていることを確認します。
6. Build Command は `pnpm build` のままでデプロイします。
7. Output Directory は未指定のままで問題ありません。

### Vercel側の推奨設定

- Framework Preset: `Next.js`
- Install Command: 自動設定
- Build Command: `pnpm build`
- Output Directory: 未指定
- Environment Variables: 不要

このサイトは外部DBを使わないため、Vercelに環境変数を設定する必要はありません。
