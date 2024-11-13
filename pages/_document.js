import { Html, Head, Main, NextScript } from "next/document";
import { DOMAIN } from "@/config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href={`${DOMAIN}/favicon.ico`} sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}