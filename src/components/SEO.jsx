import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'One Creative Web .com'
const DEFAULT_IMAGE = 'https://www.onecreativeweb.com/og-image.jpg'
const OG_WIDTH = 1200
const OG_HEIGHT = 630
const GEO = {
  region: 'US-SC',
  placename: 'Charleston, South Carolina, USA',
  position: '32.7765;-79.9311',
  icbm: '32.7765, -79.9311',
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard = 'summary_large_image',
  noIndex = false,
  jsonLd,
}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const pageDesc = description || 'Charleston, SC web development agency. Custom websites, web apps, e-commerce, and UI/UX design.'
  const pageImage = ogImage || DEFAULT_IMAGE
  const pageUrl = ogUrl || canonical || 'https://www.onecreativeweb.com/'
  const pageOgTitle = ogTitle || title || SITE_NAME

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        }
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={pageOgTitle} />
      <meta property="og:description" content={ogDescription || pageDesc} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content={String(OG_WIDTH)} />
      <meta property="og:image:height" content={String(OG_HEIGHT)} />
      <meta property="og:image:alt" content={pageOgTitle} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={pageOgTitle} />
      <meta name="twitter:description" content={ogDescription || pageDesc} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="geo.region" content={GEO.region} />
      <meta name="geo.placename" content={GEO.placename} />
      <meta name="geo.position" content={GEO.position} />
      <meta name="ICBM" content={GEO.icbm} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
