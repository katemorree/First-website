import './globals.css';
import { Archivo_Black, Montserrat, Noto_Sans_Georgian, Poppins } from 'next/font/google';
import { LanguageProvider } from '../lib/language';
import { SITE, asset } from '../lib/site';

/* Four families, because between them the site has to draw Latin, Cyrillic
   and Georgian, and no one of them does all three:

     Archivo Black    the display face. Latin only.
     Poppins          body text. Latin only.
     Montserrat       stands in for both when the page is Russian —
                      Archivo Black and Poppins have no Cyrillic at all.
     Noto Sans Georgian  the Georgian face, and the one that carries the
                      Lari sign ₾, which the other three may not.

   next/font downloads these at build time and serves them from this site,
   so there is no round trip to Google's servers while a visitor waits.
   Each one is exposed as a CSS variable that app/globals.css reads. */
const archivo = Archivo_Black({
  weight: '400', subsets: ['latin'], display: 'swap',
  variable: '--font-archivo',
});
const poppins = Poppins({
  weight: ['400', '500', '600'], subsets: ['latin'], display: 'swap',
  variable: '--font-poppins',
});
const montserrat = Montserrat({
  weight: ['500', '600', '800'], subsets: ['latin', 'cyrillic'], display: 'swap',
  variable: '--font-montserrat',
});
const georgian = Noto_Sans_Georgian({
  weight: ['400', '600', '700', '800'], subsets: ['georgian'], display: 'swap',
  variable: '--font-georgian',
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: 'Sameo Smash — Smash Burgers in Tbilisi | სამეო სმეშ',
  description:
    'Sameo Smash is a smash burger restaurant at 1 Vashlovani St, Tbilisi. Burgers from ₾20, sliders, fries, shakes and coffee. Open every day 12:00–02:00. Delivery via Wolt and Glovo.',
  openGraph: {
    type: 'website',
    siteName: 'Sameo Smash',
    title: 'Sameo Smash — Smash Burgers in Tbilisi',
    description:
      'Burgers from ₾20, sliders, fries and shakes on Vashlovani Street, Tbilisi. Open daily 12:00–02:00. Delivery via Wolt and Glovo.',
    locale: 'en_GE',
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [{ url: asset('/images/favicon.svg'), type: 'image/svg+xml' }],
    apple: asset('/images/favicon.svg'),
  },
};

export const viewport = {
  themeColor: '#0d0c0b',
};

/* Search engines read the HTML, and the HTML is English. This block tells
   them the facts about the restaurant in a form they can act on — opening
   hours in a search result, a pin on a map. Deliberately NO Review or
   AggregateRating: that would hand Google an overall score it cannot check.
   See README section 6. */
const restaurantJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${SITE.url}/#restaurant`,
  name: SITE.name,
  alternateName: SITE.nameKa,
  url: `${SITE.url}/`,
  telephone: SITE.phoneHref.replace('tel:', ''),
  servesCuisine: ['Burgers', 'American', 'Fast Casual'],
  hasMenu: `${SITE.url}/menu/`,
  priceRange: '₾20–₾30',
  currenciesAccepted: 'GEL',
  sameAs: [SITE.wolt, SITE.glovo],
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: SITE.opens,
    closes: SITE.closes,
  }],
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.street,
    addressLocality: SITE.city,
    postalCode: SITE.postalCode,
    addressCountry: SITE.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.lat, longitude: SITE.lng },
};

/* Runs before anything is painted.

   .js marks that JavaScript is running, so the fade-up reveals can start
   hidden — without it a failed script would leave the page blank.

   .lang-boot holds the page back for a moment. Every page is generated in
   English ahead of time, so a returning Russian or Georgian visitor would
   otherwise watch English flash past before their language arrived. The
   timer clears it after 1.5s come what may, so a script that never loads
   cannot leave a blank page behind. */
const BOOT = `(function (d) {
  var e = d.documentElement;
  e.classList.add('js', 'lang-boot');
  setTimeout(function () { e.classList.remove('lang-boot'); }, 1500);
})(document);`;

export default function RootLayout({ children }) {
  const fontVars = [archivo, poppins, montserrat, georgian]
    .map((f) => f.variable).join(' ');

  return (
    <html lang="en" className={fontVars}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
