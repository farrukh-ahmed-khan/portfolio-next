import {
  FiBriefcase,
  FiCode,
  FiCloud,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiGlobe,
  FiLayout,
  FiServer,
  FiSmartphone,
  FiTerminal,
} from "react-icons/fi";
import {
  SiExpress,
  SiLaravel,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export const iconMap = {
  FiBriefcase,
  FiCode,
  FiCloud,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiGlobe,
  FiLayout,
  FiServer,
  FiSmartphone,
  FiTerminal,
  SiExpress,
  SiLaravel,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
};

export const portfolioData = {
  initials: "FA",
  name: "Farrukh Ahmed Khan",
  title: "Full-Stack Developer",
  bio: "I build and ship web and mobile applications with React, Next.js, React Native, Expo, Node.js, TypeScript, and PostgreSQL. From REST APIs and database design to AI integrations and App Store and Google Play releases, I own features from development to production.",
  about:
    "I'm a Karachi-based full-stack developer with 4+ years of experience building and shipping production web and mobile applications with React, Next.js, Node.js, TypeScript, PostgreSQL, and MongoDB. My work spans REST API design, relational and NoSQL data modelling, integrations with Stripe, Square, QuickBooks, CharmHealth EHR, and AWS S3, and production deployment. I own features end to end in Agile teams alongside UX, backend, and QA.",
  highlight: "I've shipped a cross-platform React Native and Expo app to both the App Store and Google Play, with deep links, live match dashboards, and interactive venue maps.",
  heroTitles: ["Full-Stack Developer", "React & Next.js Developer", "React Native & Expo Developer", "Node.js API Developer"],
  technologies: ["React", "Next.js", "React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Google Gemini", "Stripe", "AWS"],
  resumeUrl: "/Farrukh-Ahmed-Khan-CV.pdf",
  stats: [
    { value: 4, suffix: "+", label: "Years Experience" },
    { value: 30, suffix: "+", label: "Web & Mobile Apps" },
    { value: 3, suffix: "", label: "Professional Roles" },
  ],
  experience: [
    {
      company: "Softnox Technologies",
      role: "Senior Full-Stack Engineer",
      period: "June 2023 - Present",
      highlights: [
        "Design and build custom web applications with React.js, Node.js, TypeScript, and MongoDB.",
        "Develop and maintain REST APIs and scalable microservices using Node.js and Express.js.",
        "Translate design mockups into reusable React components styled with SCSS and Tailwind CSS.",
        "Participate in database design, implementation, and query optimization on MongoDB.",
        "Collaborate with UX and backend teams in an Agile environment with daily standups and sprint delivery.",
      ],
    },
    {
      company: "AxeCorp Technologies",
      role: "Full-Stack Engineer",
      period: "March 2022 - June 2023",
      highlights: [
        "Built user interfaces and backend services for multiple client projects on the MERN stack.",
        "Designed and developed REST APIs with Node.js and Express.js, integrating them with React frontends.",
        "Improved code reusability and rendering efficiency across shared React component libraries.",
        "Debugged and refactored legacy codebases to reduce defects and improve maintainability.",
      ],
    },
    {
      company: "TexvnX",
      role: "Frontend Developer",
      period: "March 2021 - February 2022",
      highlights: [
        "Built responsive user interfaces and state management with React.js, HTML, CSS, and JavaScript.",
        "Consumed and implemented REST APIs, ensuring reliable frontend-backend integration.",
        "Contributed backend work using Node.js, Express.js, and MongoDB.",
      ],
    },
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    institution: "Karachi Institute of Economics and Technology (PAF-KIET), Karachi, Pakistan",
    period: "2020 - 2024",
    certifications: ["Frontend Development", "MERN Stack Development"],
  },
  skills: {
    "frontend": [
      {
        "name": "React 19",
        "icon": "SiReact"
      },
      {
        "name": "Next.js (App Router, SSR/SSG)",
        "icon": "SiNextdotjs"
      },
      {
        "name": "Redux",
        "icon": "SiRedux"
      },
      {
        "name": "Vite",
        "icon": "FiCode"
      },
      {
        "name": "Tailwind CSS",
        "icon": "SiTailwindcss"
      },
      {
        "name": "Material UI / Ant Design",
        "icon": "SiMui"
      },
      {
        "name": "shadcn/ui / Bootstrap",
        "icon": "FiLayout"
      },
      {
        "name": "Responsive Design",
        "icon": "FiLayout"
      }
    ],
    "mobile": [
      {
        "name": "React Native",
        "icon": "SiReact"
      },
      {
        "name": "Expo",
        "icon": "FiSmartphone"
      },
      {
        "name": "TypeScript",
        "icon": "SiTypescript"
      },
      {
        "name": "iOS & Android Delivery",
        "icon": "FiSmartphone"
      },
      {
        "name": "App Store & Google Play Releases",
        "icon": "FiGlobe"
      },
      {
        "name": "Deep Links & Universal Links",
        "icon": "FiGlobe"
      },
      {
        "name": "Offline-Tolerant Live Data",
        "icon": "FiDatabase"
      }
    ],
    "backend": [
      {
        "name": "Node.js",
        "icon": "SiNodedotjs"
      },
      {
        "name": "Express / NestJS",
        "icon": "SiExpress"
      },
      {
        "name": "Laravel",
        "icon": "SiLaravel"
      },
      {
        "name": "REST API Design",
        "icon": "FiServer"
      },
      {
        "name": "JWT Authentication / RBAC",
        "icon": "FiCode"
      },
      {
        "name": "Microservices / Webhooks",
        "icon": "FiServer"
      },
      {
        "name": "WordPress (ACF)",
        "icon": "FiLayout"
      }
    ],
    "databases": [
      {
        "name": "PostgreSQL",
        "icon": "SiPostgresql"
      },
      {
        "name": "MySQL",
        "icon": "SiMysql"
      },
      {
        "name": "MongoDB",
        "icon": "SiMongodb"
      },
      {
        "name": "Supabase / Firebase",
        "icon": "FiDatabase"
      },
      {
        "name": "Prisma",
        "icon": "FiDatabase"
      },
      {
        "name": "Sequelize / Mongoose",
        "icon": "FiDatabase"
      }
    ],
    "integrations": [
      {
        "name": "Google Gemini",
        "icon": "FiCpu"
      },
      {
        "name": "Stripe Checkout, Subscriptions & Billing",
        "icon": "FiCode"
      },
      {
        "name": "Square",
        "icon": "FiCode"
      },
      {
        "name": "QuickBooks Online",
        "icon": "FiBriefcase"
      },
      {
        "name": "CharmHealth EHR",
        "icon": "FiGlobe"
      },
      {
        "name": "Printify",
        "icon": "FiGlobe"
      },
      {
        "name": "Twilio / SMS",
        "icon": "FiSmartphone"
      },
      {
        "name": "Nodemailer",
        "icon": "FiServer"
      }
    ],
    "languages": [
      {
        "name": "JavaScript",
        "icon": "FiCode"
      },
      {
        "name": "TypeScript",
        "icon": "SiTypescript"
      },
      {
        "name": "Python",
        "icon": "FiCode"
      },
      {
        "name": "PHP",
        "icon": "FiCode"
      },
      {
        "name": "C#",
        "icon": "FiCode"
      },
      {
        "name": "SQL",
        "icon": "FiDatabase"
      },
      {
        "name": "HTML5 / CSS3 / SCSS",
        "icon": "FiLayout"
      }
    ],
    "cloud": [
      {
        "name": "AWS S3 / EC2",
        "icon": "FiCloud"
      },
      {
        "name": "Vercel",
        "icon": "FiCloud"
      },
      {
        "name": "Git / GitHub",
        "icon": "FiGitBranch"
      },
      {
        "name": "CI/CD",
        "icon": "FiGitBranch"
      },
      {
        "name": "DNS & Domain Configuration",
        "icon": "FiGlobe"
      },
      {
        "name": "Email Infrastructure",
        "icon": "FiServer"
      },
      {
        "name": "Cloudflare",
        "icon": "FiCloud"
      },
      {
        "name": "Error Monitoring",
        "icon": "FiTerminal"
      }
    ],
    "practices": [
      {
        "name": "Agile / Scrum",
        "icon": "FiBriefcase"
      },
      {
        "name": "Code Review",
        "icon": "FiGitBranch"
      },
      {
        "name": "SEO & Core Web Vitals",
        "icon": "FiGlobe"
      },
      {
        "name": "Cross-Browser Development",
        "icon": "FiLayout"
      },
      {
        "name": "Performance Optimization",
        "icon": "FiCode"
      }
    ]
  },
  projects: [
    {
      title: "CueLogic",
      description: "Billiards tournament platform with a companion mobile scorekeeper shipped to the App Store and Google Play. Built single-elimination, double-elimination, and round-robin engines with automated brackets, scheduling, byes, live scoring, dispute handling, and ELO rankings. Delivered role-based organizer, player, and super-admin experiences with team registration, venue and table management, Stripe billing, SMS/email messaging, and analytics. Developed the Expo and React Native app with TypeScript, deep links, live match dashboards, and pinch-to-zoom venue maps.",
      category: "Web & Mobile",
      tags: ["React", "React Native", "Expo", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "Stripe"],
      image: "/images/projects/cuelogic.jpg",
      github: "",
      live: "https://cuelogic.app/",
      appLinks: [
        { label: "App Store", href: "https://apps.apple.com/app/cuelogic-scorekeeper/id6803483701" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=app.cuelogic.player" },
      ],
    },
    {
      title: "OutfitIQ",
      description: "AI personal styling and wardrobe assistant generating personalized outfit, color-palette, and makeup recommendations from occasion, skin tone, and garment preferences. Built with Next.js, React, and TypeScript, integrating Google Gemini text and vision models to validate uploaded clothing images, identify garments, colors, and textures, and return structured styling advice. Used Gemini image generation for multi-look fashion visuals with prompt variation, retries, timeouts, and graceful fallbacks. Combined AI output with a deterministic recommendation engine and MongoDB/Mongoose persistence, client-side image compression, favorites, and look comparison.",
      category: "AI",
      tags: ["Next.js", "React", "TypeScript", "Google Gemini", "MongoDB", "Mongoose"],
      image: "/images/projects/outfitiq.jpg",
      github: "",
      live: "https://outfit-iq-ai.vercel.app/",
    },
    {
      title: "Zelos Foundation",
      description: "Financial literacy and mentorship platform for nonprofit learning and community programs. Built with Next.js App Router, React, TypeScript, Tailwind CSS, Ant Design, MongoDB, and Mongoose. Implemented JWT authentication with HTTP-only cookies, email verification, password recovery, and role/permission-based access for mentees, families, schools, moderators, and admins. Developed audience- and school-scoped content libraries with drip unlocking, completion tracking, subscriptions, school licensing, seat limits, and invitation workflows. Integrated Stripe checkout, subscriptions, promo codes, and gift cards with Printify fulfilment, AWS S3 media uploads, admin dashboards, and analytics.",
      category: "Full Stack",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Ant Design", "MongoDB", "Stripe", "Printify", "AWS S3"],
      image: "/images/projects/zelos.jpg",
      previewLabel: "Public landing page",
      github: "",
      live: "https://zelosfoundation.org/",
    },
    {
      title: "Texas Center Wellness",
      description: "Healthcare booking platform covering services, providers, blog content, and scheduling. Built a responsive Next.js App Router frontend with React, TypeScript, and Tailwind CSS. Integrated CharmHealth EHR for provider availability, patient creation, questionnaires, and appointment booking, rescheduling, and cancellation. Connected Square payments and refunds with QuickBooks Online OAuth, invoices, webhooks, and automated token refresh through Express APIs backed by MySQL and Sequelize. Delivered dynamic metadata, LocalBusiness/Article structured data, canonical tags, generated sitemaps, and Google Analytics.",
      category: "Full Stack",
      tags: ["Next.js", "TypeScript", "Express", "MySQL", "Sequelize", "CharmHealth EHR", "Square", "QuickBooks Online"],
      image: "/images/projects/texas-wellness.jpg",
      github: "",
      live: "https://texascenterwellness.com/",
    },
    {
      title: "Gofer Assistants",
      description: "Service marketplace connecting customers with freelance assistants for pet care, cleaning, and home services. Developed secure Laravel REST APIs for authentication, service listings, bookings, and payments over a MySQL relational schema. Integrated Stripe booking charges and payouts, and shipped an admin panel and production deployment with payment webhooks and email notifications.",
      category: "Full Stack",
      tags: ["Laravel", "MySQL", "Stripe", "REST APIs"],
      image: "/images/projects/gofer.jpg",
      github: "",
      live: "https://goferassistants.com/",
    },
  ],
  testimonials: [
    {
      name: "Chris Hill",
      role: "Founder, CueClub",
      rating: 5,
      quote:
        "I have been very impressed with Farrukh's attention to detail. He was able to create a solid sandbox for future iterations and design considerations.",
    },
    {
      name: "Samuel Jediael Bautista Sosa",
      role: "Client",
      rating: 5,
      quote:
        "Farrukh is a true professional. He delivered exactly what I expected on time and handled the project with great attention to detail. Very easy to communicate with.",
    },
    {
      name: "Baynton Jesse",
      role: "Client",
      rating: 5,
      quote:
        "The seller's expertise and attention to detail resulted in a top-notch deliverable. Highly recommended for quality work.",
    },
    {
      name: "Ria Kumar",
      role: "Founder, OutfitIQ",
      rating: 5,
      quote: "Great developer to work with. Highly recommend.",
    },
  ],
  contact: {
    email: "khanfarrukh200@gmail.com",
    phone: "+923481339849",
    location: "Karachi, Pakistan",
    socials: {
      github: "https://github.com/farrukh-ahmed-khan",
      linkedin: "https://www.linkedin.com/in/farrukh-ahmed-khan/",
      portfolio: "https://farrukhahmedkhan.me/",
      upwork: "https://www.upwork.com/freelancers/farrukhahmedkhan",
    },
  },
};

export const skillCategories = [
  {
    "key": "frontend",
    "label": "Frontend",
    "icon": "FiLayout",
    "description": "Responsive interfaces, state management, and Next.js App Router with SSR/SSG."
  },
  {
    "key": "mobile",
    "label": "Mobile",
    "icon": "FiSmartphone",
    "description": "Cross-platform iOS and Android apps, from development to App Store and Google Play releases."
  },
  {
    "key": "backend",
    "label": "Backend",
    "icon": "FiServer",
    "description": "REST APIs, authentication, permissions, and scalable application services."
  },
  {
    "key": "databases",
    "label": "Databases & ORMs",
    "icon": "FiDatabase",
    "description": "Relational and NoSQL data modelling, persistence, and query optimization."
  },
  {
    "key": "integrations",
    "label": "Integrations & AI",
    "icon": "FiCpu",
    "description": "Gemini text, vision, and image-generation APIs, payment systems, and business integrations."
  },
  {
    "key": "languages",
    "label": "Languages",
    "icon": "FiCode",
    "description": "Languages used across frontend, backend, and database development."
  },
  {
    "key": "cloud",
    "label": "Cloud & DevOps",
    "icon": "FiCloud",
    "description": "Production deployment, delivery pipelines, domains, and infrastructure."
  },
  {
    "key": "practices",
    "label": "Practices",
    "icon": "FiBriefcase",
    "description": "Agile delivery, code quality, SEO, and browser performance."
  }
];
