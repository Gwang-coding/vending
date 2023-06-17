import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
export default function HeadInfo({ title, contents, img, keywords }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="keywords" content={keywords} />
        <meta property="og:keywords" content={keywords} />
        <meta name="thumbnail" content={img} />
        <meta name="og:thumbnail" content={img} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={img} />
        <meta name="twitter:description" content={contents} />
        <meta name="publisher" content={title} />
        <meta name="author" content={title} />
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={contents} />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/assets/icons/57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/assets/icons/60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/assets/icons/72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/assets/icons/76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/assets/icons/114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/assets/icons/120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/assets/icons/144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/icons/152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/icons/180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/icons/192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/icons/32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/icons/96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/icons/16.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/assets/icons/144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="index,follow" />
      </Head>
      <NextSeo
        title={title}
        description={contents}
        canonical={``}
        openGraph={{
          title: title,
          url: `${router.asPath}`,
          description: contents,
          type: "website",
          images: [
            {
              url: img,
              width: 800,
              height: 600,
              alt: title,
              type: "image/jpeg",
            },
          ],
          site_name: title,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
    </>
  );
}

HeadInfo.defaultProps = {
  title: "",
  contents: "",
  img: "/og_image.png",
  keywords: "",
};
