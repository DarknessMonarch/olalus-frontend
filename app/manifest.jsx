export default function manifest() {
  return {
    name: "Olalus Community Health Care Services",
    short_name: "Olalus",
    description:
      "Client-centered in-home care in Pennsylvania — personal care, nursing, respite, dementia care, and community support.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#d19e1d",
    categories: ["health", "medical", "lifestyle"],
    lang: "en",
    dir: "ltr",

    icons: [
      { src: "/assets/logo.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/assets/logo.png", sizes: "384x384", type: "image/png", purpose: "any" },
      { src: "/assets/logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/assets/logo.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/favicon.ico",     sizes: "48x48",   type: "image/x-icon" },
    ],

    prefer_related_applications: false,

    shortcuts: [
      {
        name: "Book Appointment",
        short_name: "Book",
        description: "Schedule a home care consultation",
        url: "/#appointment",
        icons: [{ src: "/assets/logo.png", sizes: "96x96" }],
      },
      {
        name: "Open Positions",
        short_name: "Careers",
        description: "View our current job openings",
        url: "/career",
        icons: [{ src: "/assets/logo.png", sizes: "96x96" }],
      },
    ],

    screenshots: [
      {
        src: "/assets/banner.png",
        sizes: "1280x720",
        type: "image/png",
        platform: "wide",
        label: "Olalus Home Care — Home Screen",
      },
    ],
  };
}
