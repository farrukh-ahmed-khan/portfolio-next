import {
  FiBriefcase,
  FiCode,
  FiGitBranch,
  FiGlobe,
  FiLayout,
  FiServer,
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
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export const iconMap = {
  FiBriefcase,
  FiCode,
  FiGitBranch,
  FiGlobe,
  FiLayout,
  FiServer,
  FiTerminal,
  SiExpress,
  SiLaravel,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
};

export const portfolioData = {
  initials: "FA",
  name: "Farrukh Ahmed Khan",
  title: "Senior Full Stack Engineer",
  bio: "I build responsive, user-friendly web and mobile applications with React.js, Next.js, Node.js, Laravel, TypeScript, MongoDB, and MySQL. My work spans polished frontends, REST APIs, integrations, database design, and production-ready full stack systems.",
  about:
    "I'm a Karachi-based Senior Full Stack Engineer with hands-on experience across React.js, Next.js, Redux, Node.js, Express.js, NestJS, Laravel, MongoDB, Firebase, and MySQL. I translate UI/UX designs into responsive components, develop secure REST APIs, integrate third-party services, maintain scalable microservices, and collaborate in agile teams to ship reliable digital products.",
  heroTitles: ["Senior Full Stack Engineer", "React & Next.js Developer", "Node.js API Builder"],
  resumeUrl: "/Farrukh-Ahmed-Khan-CV.pdf",
  stats: [
    { value: 6, suffix: "+", label: "Years Experience" },
    { value: 25, suffix: "+", label: "Projects Delivered" },
    { value: 3, suffix: "+", label: "Professional Roles" },
  ],
  experience: [
    {
      company: "Softnox Technologies",
      role: "Senior Full Stack Engineer",
      period: "June 2025 - Present",
      highlights: [
        "Design and develop custom web applications using React.js, Node.js, TypeScript, and MongoDB.",
        "Build REST APIs with Node.js and Express.js while supporting scalable microservices.",
        "Translate design mockups into responsive React components with SCSS and Tailwind CSS.",
      ],
    },
    {
      company: "Softnox Technologies",
      role: "Senior Frontend Developer",
      period: "June 2023 - June 2025",
      highlights: [
        "Led high-performance web application development with React.js and Next.js.",
        "Optimized frontend architecture and state management with Redux and Context API.",
        "Collaborated with backend teams for seamless API integration and data flow.",
      ],
    },
    {
      company: "AxeCorp Technologies",
      role: "Full Stack Engineer",
      period: "March 2022 - June 2023",
      highlights: [
        "Designed and implemented MERN stack interfaces and REST APIs.",
        "Improved React.js code reusability and resolved issues in legacy codebases.",
        "Delivered intuitive UI features with strong frontend and backend integration.",
      ],
    },
    {
      company: "TexvnX",
      role: "Frontend Developer",
      period: "March 2021 - February 2022",
      highlights: [
        "Built React.js user interfaces and state management flows.",
        "Integrated REST APIs and supported backend work with Node.js, Express.js, and MongoDB.",
        "Developed responsive pages using HTML, JavaScript, and CSS.",
      ],
    },
  ],
  education: {
    degree: "Bachelor of Computer Science",
    institution: "Karachi Institute of Economics and Technology (KIET)",
    period: "2020 - 2024",
    certifications: ["Frontend Development", "MERN Stack Development"],
  },
  skills: {
    frontend: [
      { name: "React", icon: "SiReact", level: 95 },
      { name: "Next.js", icon: "SiNextdotjs", level: 90 },
      { name: "Redux Toolkit", icon: "SiRedux", level: 88 },
      { name: "TypeScript", icon: "SiTypescript", level: 86 },
      { name: "Tailwind CSS", icon: "SiTailwindcss", level: 90 },
      { name: "Bootstrap / MUI / Ant Design", icon: "SiMui", level: 84 },
    ],
    backend: [
      { name: "Node.js", icon: "SiNodedotjs", level: 90 },
      { name: "Express.js / NestJS", icon: "SiExpress", level: 86 },
      { name: "Laravel / PHP", icon: "SiLaravel", level: 82 },
      { name: "REST APIs", icon: "FiServer", level: 92 },
      { name: "MongoDB", icon: "SiMongodb", level: 86 },
      { name: "MySQL / Firebase", icon: "SiMysql", level: 84 },
    ],
    tools: [
      { name: "Git / GitHub", icon: "FiGitBranch", level: 90 },
      { name: "AWS", icon: "FiServer", level: 75 },
      { name: "API Integration", icon: "FiGlobe", level: 90 },
      { name: "VS Code / Visual Studio", icon: "FiTerminal", level: 88 },
      { name: "Agile Collaboration", icon: "FiBriefcase", level: 84 },
      { name: "Responsive UI", icon: "FiLayout", level: 92 },
    ],
  },
  projects: [
    {
      title: "CueLogic",
      description: "Billiards tournament platform with automated single-elimination, double-elimination, and round-robin brackets, scheduling, live scoring, dispute handling, and ELO rankings. Built organizer, player, and admin dashboards with Stripe billing, messaging, and analytics, plus a React Native and Expo scorekeeper shipped to the App Store and Google Play.",
      category: "Web & Mobile",
      tags: ["React", "React Native", "Expo", "Node.js", "Prisma", "PostgreSQL"],
      image: "https://placehold.co/900x700/2563eb/f4f7fb?text=CueLogic",
      github: "",
      live: "https://cuelogic.app/",
    },
    {
      title: "OutfitIQ",
      description: "AI personal styling and wardrobe assistant generating outfit, color-palette, and makeup recommendations. Integrated Google Gemini text, vision, and image-generation APIs for clothing analysis and multi-look fashion visuals, combined with rule-based recommendations, MongoDB persistence, image compression, favorites, and look comparison.",
      category: "AI Applications",
      tags: ["Next.js", "React", "TypeScript", "Google Gemini", "MongoDB"],
      image: "https://placehold.co/900x700/2563eb/f4f7fb?text=OutfitIQ",
      github: "",
      live: "https://outfit-iq-ai.vercel.app/",
    },
    {
      title: "Zelos Foundation",
      description: "Financial literacy and mentorship platform with secure role-based access for mentees, families, schools, moderators, and admins. Built scoped learning libraries with drip unlocking and completion tracking, school licensing and invitations, Stripe subscriptions and gift cards, Printify fulfilment, AWS S3 uploads, and admin analytics.",
      category: "Full Stack",
      tags: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Printify", "AWS S3"],
      image: "https://placehold.co/900x700/2563eb/f4f7fb?text=Zelos+Foundation",
      github: "",
      live: "https://zelosfoundation.org/",
    },
    {
      title: "Texas Center Wellness",
      description: "Healthcare booking platform with service and provider pages, a blog, and CharmHealth EHR integration for patient intake, availability, and appointment management. Integrated Square payments and refunds, QuickBooks Online invoices and webhooks, Express APIs, and MySQL data models, alongside structured data, dynamic metadata, and sitemaps.",
      category: "Full Stack",
      tags: ["Next.js", "TypeScript", "Express", "MySQL", "CharmHealth EHR", "Square", "QuickBooks"],
      image: "https://placehold.co/900x700/2563eb/f4f7fb?text=Texas+Center+Wellness",
      github: "",
      live: "https://texascenterwellness.com/",
    },
    {
      title: "Gofer Assistants",
      description: "Service marketplace connecting customers with freelance assistants for pet care, cleaning, and home services. Developed secure Laravel REST APIs for authentication, listings, bookings, and payments over MySQL, integrated Stripe booking charges and payouts, and delivered an admin panel, payment webhooks, email notifications, and production deployment.",
      category: "Full Stack",
      tags: ["Laravel", "PHP", "MySQL", "Stripe", "REST APIs"],
      image: "https://placehold.co/900x700/2563eb/f4f7fb?text=Gofer+Assistants",
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
    key: "frontend",
    label: "Frontend",
    icon: "FiLayout",
    description: "Responsive React and Next.js interfaces with practical state management.",
  },
  {
    key: "backend",
    label: "Backend",
    icon: "FiCode",
    description: "REST APIs, integrations, services, and database-backed application logic.",
  },
  {
    key: "tools",
    label: "Tools & Workflow",
    icon: "FiBriefcase",
    description: "Version control, cloud basics, agile delivery, and production handoff.",
  },
];
