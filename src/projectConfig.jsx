// src/projectConfig.js

export const BRAND = {
  name: "Agung Pratama",
  title: "UI/UX Designer · Junior Web Developer",
  summary:
    "I build clean, fast, and accessible web experiences. Passionate about turning ideas into delightful products.",
  email: "agungppratama565@gmail.com",
  location: "Bandung, Indonesia",
  // Opsional: social links (pakai label + href biar bebas dari icon)
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
  ],
};

export const NAV = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Certificates", "certs"],
  ["Contact", "contact"],
];

export const SKILLS = [
  // Umum — akan otomatis dapat ikon via CDN (atau lokal jika disediakan)
  "HTML",
  "CSS",
  "JavaScript",
  "PHP",
  "CodeIgniter",
  "Laravel",
  "Vue.js",
  "React",
  "MySQL",
  "PostgreSQL",
  "Tailwind CSS",
  "Figma",
  "Miro",

  // Yang tidak punya brand ikon jelas — override pakai ikon lokal:
  // (Letakkan file di: public/icons/<nama-file>.svg)
  { label: "REST API",     icon: "icons/rest-api.svg" },
  { label: "laravel",         icon: "icons/laravel.png" },          // Simple Icons tidak punya "Maze"
  { label: "figma",  icon: "icons/figma.png" },
  { label: "User Testing", icon: "icons/user-testing.svg" },
];

export const PROJECTS = [
  {
    title: "LearnEra LMS",
    role: "Full-stack / UI Designer",
    tags: ["Laravel","MySQL","Blade","Stripe/Midtrans"],
    desc: "Learning platform dengan multi-role dashboards, pembayaran, dan adaptive content.",
    links: [{ label: "Preview", href: "#" }, { label: "Code", href: "#" }],
    cover: "cover/cover1.png",
  },
  {
    title: "GO-MRT E-Ticket",
    role: "UI/UX Designer",
    tags: ["Design","Prototype","User Flow"],
    desc: "Alur pemesanan tiket B2C lengkap: wallet, cart, dan order tracking. Hi-fi prototype.",
    links: [{ label: "Case Study", href: "#" }],
    cover: "cover/mrt.png",
  },
  {
    title: "OCA Telkom Landing",
    role: "UI/UX Designer",
    tags: ["UI","Design","Prototype"],
    desc: "Landing page dengan interactive demo & section konversi.",
    links: [{ label: "Live", href: "#" }],
    cover: "cover/cover3.png",
  },
  {
    title: "FundEx Web Revamp",
    role: "UI/UX Designer",
    tags: ["UI","Prototype","User Flow"],
    desc: "Perombakan tutorial, penambahan testimoni, dan perbaikan IA untuk onboarding.",
    links: [{ label: "Overview", href: "#" }],
    cover: "cover/cover4.png",
  },
  {
    title: "Gallacy E-Commerce",
    role: "Full Stack / UI Designer",
    tags: ["CodeIgniter", "Bootstrap", "SQL"],
    desc: "Website toko pakaian dengan fitur cart, coupon, dan manajemen stok.",
    links: [{ label: "Preview", href: "#" }, { label: "Code", href: "#" }],
    cover: "cover/gallacy.png",
  },
  {
  title: "UNPAR UI/UX Landing Page",
  role: "UI/UX",
  tags: ["Figma", "Prototype", "Landing Page", "A/B Test"],
  desc: "Redesign landing page admisi UNPAR: value prop jelas, struktur informasi ringkas, dan CTA yang lebih konversi.",
  links: [
    { label: "Case Study", href: "#" },
    { label: "Prototype", href: "#" },
  ],
  cover: "cover/unpar.png",
}
];

export const PHOTOS = [
  `${import.meta.env.BASE_URL}photos/agung-1.png`,
];
