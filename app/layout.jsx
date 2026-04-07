import { Toaster } from "sonner";
import "@/app/styles/global.css";
import Script from "next/script";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ChatWidget from "@/app/components/ChatWidget";
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

const SITE_URL = "https://olalusgroupllc.com";
const BANNER_URL =
  "https://raw.githubusercontent.com/DarknessMonarch/olalus/refs/heads/master/public/assets/banner.png";

export const viewport = {
   themeColor: "#d19e1d",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Olalusgroupllc - ",
    template: "%s | Olalusgroupllc",
  },
  applicationName: "Olalusgroupllc",
  description:
    "",
  authors: [{ name: "Olalusgroupllc", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "Olalusgroupllc",
  ],

  referrer: "origin-when-cross-origin",
  creator: "swiftsyn",
  publisher: "Olalusgroupllc",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Olalusgroupllc",
    title: "Olalusgroupllc",
    description:
      "",
    images: [
      {
        url: BANNER_URL,
        width: 1200,
        height: 630,
        alt: "Olalusgroupllc",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Olalusgroupllc",
    description:
      "",
    images: [BANNER_URL],
    creator: "@Olalusgroupllc",
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
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
    canonical: `${SITE_URL}`,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Olalusgroupllc",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.png`,
  description:
    "Olalusgroupllc -",
  sameAs: [
    "https://www.facebook.com/Olalusgroupllc",
    "https://instagram.com/Olalusgroupllc",
    "https://www.tiktok.com/@Olalusgroupllc",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "Olalusgroupllc@gmail.com",
    contactType: "Customer Support",
    url: SITE_URL,
    telephone: "",
    areaServed: "Worldwide",
    availableLanguage: "English",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2251",
  },
  hasOfferCatalog: {
    "@type": "",
    name: "",
    itemListElement: [
      {
        "@type": "",
        name: "",
        itemListElement: [
          {
            "@type": "",
            itemOffered: {
              "@type": "",
              name: "",
            },
          },
        ],
      },
  
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${inter.className}`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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
                  { pageLanguage: 'en', includedLanguages: 'en,es,fr,ar,zh-CN,zh-TW,pt,ru,de,it,ja,ko,vi,tl,hi,pl,nl,tr,sw,uk', autoDisplay: false },
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

        <Script
          id="ga-tag"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-', {
                page_path: window.location.pathname,
                custom_map: {
                  'custom_parameter_1': 'conversation_category'
                }
              });
              
              gtag('config', 'G-', {
                'custom_map.category': 'templates'
              });
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
        <div className={styles.appLayout}>
          <Navbar />
          {children}
          <Footer />
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
