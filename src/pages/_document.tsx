import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
} from "next/document";
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html className="dark">
        <Head />
        <body className="bg-white dark:bg-black">
          <div className="text-black dark:text-white">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}
