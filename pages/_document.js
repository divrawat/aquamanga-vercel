import { Html, Head, Main, NextScript } from "next/document";
import { DOMAIN } from "@/config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href={`${DOMAIN}/favicon.ico`} sizes="any" />
        <meta name="google-site-verification" content="6-XtSzr71_G64E3c4EdsVm7VnQEg2oKk7U9CASyxZKA" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}