import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://farrukhahmedkhan.me";
const siteName = "Farrukh Ahmed Khan | Senior Full Stack Engineer";
const siteDescription =
  "Farrukh Ahmed Khan is a Karachi-based Senior Full Stack Engineer building production web applications with React, Next.js, Node.js, Laravel, MongoDB, and MySQL. Available for freelance and remote work.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Farrukh Ahmed Khan",
  },
  description: siteDescription,
  keywords: [
    "Farrukh Ahmed Khan",
    "Full Stack Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Laravel Developer",
    "MERN Stack Developer",
    "Web Developer Karachi",
    "Freelance Web Developer Pakistan",
    "REST API Development",
    "Hire Full Stack Developer",
  ],
  authors: [{ name: "Farrukh Ahmed Khan", url: siteUrl }],
  creator: "Farrukh Ahmed Khan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "farrukh.dev",
    title: siteName,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 1000,
        alt: "Farrukh Ahmed Khan - Senior Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Farrukh Ahmed Khan",
  jobTitle: "Senior Full Stack Engineer",
  url: siteUrl,
  image: `${siteUrl}/profile.png`,
  email: "mailto:khanfarrukh200@gmail.com",
  telephone: "+923481339849",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: [
    "https://github.com/farrukh-ahmed-khan",
    "https://www.linkedin.com/in/farrukh-ahmed-khan/",
    "https://www.upwork.com/freelancers/farrukhahmedkhan",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Laravel",
    "TypeScript",
    "MongoDB",
    "MySQL",
    "REST APIs",
    "Full Stack Web Development",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Karachi Institute of Economics and Technology (KIET)",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
