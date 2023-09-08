import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alata&family=Bai+Jamjuree:wght@400;600&family=Josefin+Sans:wght@300&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Alata&family=Bai+Jamjuree:wght@400;600&family=Codystar:wght@300;400&family=Eczar&family=Josefin+Sans:wght@300&family=Marvel:wght@400;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
