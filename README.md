# OGP Handson 🖼️

OGP Handson は、Astro と Satori を使って記事ごとの OGP 画像をビルド時に生成するハンズオンのために用意されたブログサンプルです。

## Setup locally 🖥️

OGP Handson の開発環境をローカルで立ち上げる場合は以下の手順に従ってください。

### Attention

- 事前に [Node.js](https://nodejs.org) (v22.23.4 以上) をインストールしておく必要があります。

### 1. clone git repository

```bash
git clone "https://github.com/Juna1013/ogp-handson" && cd "./ogp-handson"
```

### 2. install dependencies

```bash
npm install
```

### 3. start development server

```bash
npm run dev
```

ブラウザで <http://localhost:4321> を開くと記事一覧が表示されます。

### 4. check OGP images

生成された OGP 画像は以下の URL から確認できます。

- トップページ: <http://localhost:4321/og/home.png>
- 各記事: `http://localhost:4321/og/<記事ID>.png` (例: <http://localhost:4321/og/first-post.png>)

## Build 📦

```bash
npm run build
```

`./dist/` に静的サイトと OGP 画像が出力されます。ビルド結果は以下で確認できます。

```bash
npm run preview
```
