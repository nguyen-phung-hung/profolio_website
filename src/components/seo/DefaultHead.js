import Head from "next/head";

const DefaultHead = () => {
  return (
    <Head>
      <title>Hung - My personal profolio website.</title>
      <meta
        name="description"
        content="This is Nguyen Phung Hung's personal profolio website."
      />
      <meta property="og:image" content="/logo.png" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000000" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default DefaultHead;
