---
title: 'Next.js + MDXで個人ブログ作った'
date: '2021/09/18'
description: 'この記事を読むと誰でも自前の個人ブログを作れるようになることを目指します。(記事のボリュームが想像以上に大きくなったので分割する予定です。)個人ブログや企業のエンジニアブログの...'
author: watsuyo_2
path: 'nextjs-mdx-1'
---

# Next.js + MDXで個人ブログ作った

## この記事の目標

この記事を読むと誰でも自前の個人ブログを作れるようになることを目指します。(記事のボリュームが想像以上に大きくなったので分割する予定です。)

個人ブログや企業のエンジニアブログのようなものを簡単に作ることができます。

markdownファイルを、HTMLに変換してWeb上に公開することになるので、サイトのコードと一緒に記事のGit管理を前提とした仕組みになります。

## 技術スタックと開発環境

- Next.js 14系
- TypeScript 4.4系
- MDX(markdownをHTML化)
- Vercel(デプロイサーバー)
- Macbook Pro Big Sir 11.5.2

## なんで作ったか？

最新技術で日々メンテナンスが出来るものが作りたかったのが大きいかなと思います。

個人ブログのメインユーザーは、自分自身なだけで、エンジニアが作るWebサービスの個人開発にも似たような感覚です。

Next.jsを使って見たかったといえば、それまでですが、SSGなWebサイトは2020年代に入ってから特に注目されている分野ですし、試すなら今！みたいな所もありました。

QiitaやZennもありがたく利用していますが、どうしても"いいね"のような数字にとらわれる感じで胃もたれしがちなので、消化の良さそうな個人ブログで胃の中をスッキリさせていこうと思います。

普段はVue.jsを使うことがほとんどなので、React.jsを使うのはどうなの？という点については、全然問題ないです。

ドキュメントや先駆者のブログに大体の答えは書いてあります。

## なんでNext.jsにしたのか？

流行りのフレームワークの勉強をしたかった

大きな理由はSSG(Static Site Generation)できるからです。

静的なブログサイトを作るだけのためにSSRやSPAですと、初回レンダリングやSEOに課題があるため(改善方法はありますが)、要件を素早く解消してくれるNext.jsを選定しました。

またVercelへのデプロイと組み合わせると、Vercelの自動キャッシュ機能を利用することができ、デプロイごとに静的ファイルを自動でキャッシュしてくれます。詳細↓

https://vercel.com/docs/edge-network/caching

SSGの場合、初回レンダリングやパフォーマンスの面でも優れています。

軽く、SSGについて整理をします。

SSGの大きな特徴は、予めHTMLをレンダリングしておき、ユーザーからのリクエスト(画面遷移等)に応じて用意しておいたHTMLを返却するだけといったものです。

これがSSGで無い場合は、ユーザーからのリクエストの度にHTMLを生成して、それを返却する形式になっています。

今回はそのSSGで生成するHTMLを一部、markdownからの変換されたHTMLでレンダリングするようにしています。

ブログ記事はmarkdownで記述し、所定のディレクトリに配置するだけでルーティングも良い感じにしてくれる実装を今回はしました。

## watsuyo.devのドメインはどうしたの？

domain.comで買いました。

欲しいドメイン名は初めから決めていたので、国内外のドメイン販売サービスを比較しながら一番安い所で買いました。

GitHubにmainブランチをPushすると、予め連携しておいたVercelのプロジェクトにDeployされます。

後はVecelとdomain.comにIPアドレスを設定するだけで、watsuyo.devにアクセスできます。

## 本題

### ローカルにプロジェクトを作成する

まずはローカルにNext.jsのプロジェクトを作成します。

今回はTypeScriptを使いたいので、TypeScriptのoptionをつけます。

```bash
$ yarn create next-app --typescript
```

デフォルトではpagesディレクトリがsrcディレクトリに入っていないので、srcディレクトリに移動をし、tsconfig.jsにあるエイリアスの設定も変更します。

```json
"compilerOptions": {
	"baseUrl": "src"
}
```

src以下は、現段階では以下のような構成になります。

src配下に配置するかしないかの判断基準は、画面実装に直接関係があるかで判断しています。

```
src
├── pages
│   ├── _app.tsx
│   ├── api
│   │   └── hello.ts
│   └── index.tsx
└── styles
    ├── Home.module.css
    └── globals.css
```

今後、共通コンポーネント作成した時には `components`といったディレクトリ配下にコンポーネントを配置して、`components`もsrc配下に配置するのが妥当かと思います。

以下は、今回の最終目標的な構成になります。

```
src
├── Head.tsx
├── components
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── styled
│       ├── PostContainer.ts
│       ├── StyledAnchorLink.ts
│       ├── StyledCard.ts
│       └── StyledLink.ts
├── global.ts
├── logic
│   ├── getAllPosts.ts
│   └── style.ts
├── pages
│   ├── _app.tsx
│   ├── _documents.tsx
│   ├── blog
│   │   ├── [title].tsx
│   │   └── sample-blog
│   │       └── index.md
│   ├── index.tsx
└── type.ts
```

プロジェクト作成ができたら

```bash
$ yarn dev
```

でローカルサーバーを立ち上げます。

立ち上がったらブラウザで確認してみると、以下のような画面が表示されると思います。

[![http://localhost:3000/](https://i.gyazo.com/731048b56c77bb2cc75491013675900a.png)](https://gyazo.com/731048b56c77bb2cc75491013675900a.png)

ひとまず、ブログを作る第一歩は完成しました。

適宜、commitをしておきましょう

次はpackageです。

初期の段階で以下のようなpackage.jsonになっていると思うので

```json
{
  略
  "dependencies": {
    "next": "11.1.2",
    "react": "17.0.2",
    "react-dom": "17.0.2"
  },
  "devDependencies": {
    "@types/react": "17.0.21",
    "eslint": "7.32.0",
    "eslint-config-next": "11.1.2",
    "typescript": "4.4.3"
  }
}
```

今回の開発で必要になるyarn packageをインストールします。

```json
{
　略
  "dependencies": {
    "@emotion/styled": "^11.3.0",
    "@theme-ui/presets": "^0.11.2",
    "front-matter": "^4.0.2",
    "gray-matter": "^4.0.3",
    "next": "11.1.2",
    "next-mdx-enhanced": "^5.0.0",
    "next-mdx-remote": "^3.0.4",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-icons": "^4.2.0",
    "theme-ui": "^0.11.2"
  },
  "devDependencies": {
    "@types/react": "17.0.21",
    "@typescript-eslint/eslint-plugin": "^4.30.0",
    "@typescript-eslint/parser": "^4.30.0",
    "babel-plugin-emotion": "^11.0.0",
    "eslint": "^7.32.0",
    "eslint-config-next": "11.1.2",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-react": "^7.25.1",
    "eslint-plugin-react-hooks": "^4.2.0",
    "prettier": "2.4.1",
    "typescript": "4.4.3"
  }
}
```

markdownで書いたブログをHTML化するためにMDX関係のpackageを追加します

```bash
$ yarn next-mdx-enhanced next-mdx-remote gray-matter
```

今回は@emotion/styledを使用して、スタイルを当てたいと思います。

```bash
$ yarn add @emotion/styled
```

```bash
$ yarn add -D babel-plugin-emotion
```

ダークモードを実装するために、theme-uiを追加します。

```bash
$ yarn add theme-ui @theme-ui/presets
```

Reactでiconを使いたいときはiconをコンポーネントとしてimportできる、react-iconsが便利です。

```bash
$ yarn add react-icons
```

今回、開発で必要なyarn moduleは以上ですが、お好みでESLintやprettierの設定をすると、開発体験を向上できるかと思います。

moduleを入れ終わったら再度、yarn devで正しく表示されているかを確認してみましょう。

画面を更新するようなことはしていないと思うので、先ほどと同じ画面が表示されるはずです。

1つの記事で全て書き切ろうと思いましたが、ここまでかなりのボリュームになったので、続きは次回のブログにしようかなと思います。

次は早速、markdownで書いたブログをHTML化して表示させてみます。
