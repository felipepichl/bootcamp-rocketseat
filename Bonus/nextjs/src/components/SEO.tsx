import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  shouldExcludeTitleSiffix?: boolean;
  shouldIncludePage?: boolean;
}

export default function SEO({
  title,
  description,
  image,
  shouldExcludeTitleSiffix = false,
  shouldIncludePage = true,
}: SEOProps) {
  const pageTitle = `${title} ${shouldExcludeTitleSiffix && '| DevCommerce'}`;

  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
}