import { Toaster } from "sonner";
import "@/app/styles/global.css";
import Script from "next/script";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ChatWidget from "@/app/components/ChatWidget";
import RouteAnimator from "@/app/components/RouteAnimator";
import styles from "@/app/styles/app.module.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://olalusgroupllc.com";
const SITE_NAME = "Olalus Community Health Care Services";
const DESCRIPTION =
  "Olalus Community Health Care Services provides client-centered, in-home care in Pennsylvania. Services include personal care, nursing, respite care, dementia care, and community support — delivered by certified professionals.";
const BANNER_URL = `${SITE_URL}/assets/banner.png`;
const KEYWORDS = [
  "home care Pennsylvania",
  "in-home care services",
  "Olalus Community Health Care",
  "personal care assistance",
  "dementia care Pennsylvania",
  "respite care",
  "nursing home care",
  "community health care",
  "senior care Collingdale PA",
  "home health aide",
  "Olalus",
  "olalusgroup",
];

export const viewport = {
  themeColor: "#d19e1d",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | Trusted Home Care in Pennsylvania`,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: "Olalus Group",
  description: DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  generator: "Next.js",
  keywords: KEYWORDS,

  referrer: "origin-when-cross-origin",
  creator: "Olalus Group LLC",
  publisher: SITE_NAME,

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Trusted Home Care in Pennsylvania`,
    description: DESCRIPTION,
    images: [
      {
        url: BANNER_URL,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Trusted Home Care`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Trusted Home Care in Pennsylvania`,
    description: DESCRIPTION,
    images: [BANNER_URL],
    creator: "@olalusgroupllc",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "",
    yandex: "",
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Olalus Group LLC",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/assets/logo.png`,
  },
  image: BANNER_URL,
  description: DESCRIPTION,
  foundingDate: "2015",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 300 },
  areaServed: {
    "@type": "State",
    name: "Pennsylvania",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "320 Macdade Blvd., Suite 103",
    addressLocality: "Collingdale",
    addressRegion: "PA",
    postalCode: "19023",
    addressCountry: "US",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-610-237-7199",
      contactType: "customer service",
      availableLanguage: "English",
      areaServed: "US",
    },
  ],
  email: "olalusnursing@aol.com",
  telephone: "+1-610-237-7199",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "16:30",
  },
  sameAs: [
    "https://www.facebook.com/olalusgroupllc",
    "https://twitter.com/olalusgroupllc",
    "https://www.linkedin.com/company/olalusgroupllc",
    "https://www.youtube.com/@olalusgroupllc",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home Care Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Personal Care Assistance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dementia & Alzheimer's Care" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nursing Care" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Respite Care" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home & Community Support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Medication Management" } },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: "+1-610-237-7199",
  address: {
    "@type": "PostalAddress",
    streetAddress: "320 Macdade Blvd., Suite 103",
    addressLocality: "Collingdale",
    addressRegion: "PA",
    postalCode: "19023",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.9112,
    longitude: -75.2768,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "16:30",
  },
  image: BANNER_URL,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${inter.className}`} suppressHydrationWarning>
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var gtEl = document.createElement('div');
              gtEl.id = 'google_translate_element';
              gtEl.style.cssText = 'position:fixed;top:-9999px;left:0;width:200px;height:50px;opacity:0;pointer-events:none;';
              document.body.appendChild(gtEl);
              window.googleTranslateElementInit = function() {
                new window.google.translate.TranslateElement(
                  { pageLanguage: 'en', includedLanguages: 'en,es,fr,ar,zh-CN,zh-TW,pt,ru,de,it,ja,ko,vi,tl,hi,pl,nl,tr,sw,uk', autoDisplay: false, layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
                  'google_translate_element'
                );
              };
              var gtScript = document.createElement('script');
              gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
              gtScript.async = true;
              document.body.appendChild(gtScript);
            `,
          }}
        />

        <Toaster
          position="top-center"
          richColors={true}
          toastOptions={{
            style: {
              background: "#d19e1d",
              border: "1px solid #d19e1d",
              color: "#111827",
              borderRadius: "15px",
            },
          }}
        />
        <RouteAnimator />
        <div id="app-layout" className={styles.appLayout}>
          <Navbar />
          {children}
          <Footer />
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
