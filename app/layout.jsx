import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { portfolioData } from "@/data/portfolioData";
import avatarAsset from "@/data/avatarAsset.json";
import "./globals.css";
import "./cosmic.css";

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

const siteUrl = portfolioData.contact.socials.portfolio;
const siteName = `${portfolioData.name} | ${portfolioData.title}`;
const siteDescription =
  "Farrukh Ahmed Khan is a Karachi-based full-stack developer with 4+ years of experience building web and mobile apps with React, Next.js, React Native, Expo, Node.js, TypeScript, and PostgreSQL. Shipped to the App Store and Google Play.";

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
    "React Native Developer",
    "Expo Developer",
    "iOS and Android App Development",
    "TypeScript",
    "PostgreSQL",
    "Google Gemini Integration",
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
        width: 1254,
        height: 1254,
        alt: `${portfolioData.name} - ${portfolioData.title}`,
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
  themeColor: "#080b18",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Farrukh Ahmed Khan",
  jobTitle: portfolioData.title,
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
  knowsAbout: Object.values(portfolioData.skills).flat().map(skill => skill.name),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: portfolioData.education.institution,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preload" href={avatarAsset.url} as="fetch" type="model/gltf-binary" crossOrigin="anonymous" />
      </head>
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
