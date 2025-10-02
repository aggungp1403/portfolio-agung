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
  // Umum — otomatis dapat ikon via CDN (atau lokal jika disediakan)
  "HTML",
  "CSS",
  "JavaScript",
  "PHP",
  "CodeIgniter",
  { label: "Laravel", icon: "icons/laravel.png" }, // override ikon lokal
  "Vue.js",
  "React",
  "MySQL",
  "PostgreSQL",
  "Tailwind CSS",
  { label: "Figma", icon: "icons/figma.png" },     // override ikon lokal
  "Miro",

  // Tidak punya brand ikon jelas — pakai ikon lokal sendiri
  { label: "REST API",     icon: "icons/rest-api.svg" },
  { label: "User Testing", icon: "icons/user-testing.svg" },
];

export const PROJECTS = [
  {
    title: "LearnEra LMS",
    role: "Full-stack / UI Designer",
    tags: ["Laravel", "MySQL", "Blade", "Stripe/Midtrans"],
    desc: "Learning platform dengan multi-role dashboards, pembayaran, dan adaptive content.",
    links: [{ label: "Preview", href: "#" }, { label: "Code", href: "#" }],
    cover: "cover/cover1.png",
  },
  {
    title: "GO-MRT E-Ticket",
    role: "UI/UX Designer",
    tags: ["Design", "Prototype", "User Flow"],
    desc: "Alur pemesanan tiket B2C lengkap: wallet, cart, dan order tracking. Hi-fi prototype.",
    links: [{ label: "Case Study", href: "#" }],
    cover: "cover/mrt.png",
  },
  {
    title: "OCA Telkom Landing",
    role: "UI/UX Designer",
    tags: ["UI", "Design", "Prototype"],
    desc: "Landing page dengan interactive demo & section konversi.",
    links: [{ label: "Live", href: "#" }],
    cover: "cover/cover3.png",
  },
  {
    title: "FundEx Web Revamp",
    role: "UI/UX Designer",
    tags: ["UI", "Prototype", "User Flow"],
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
  },

  /* ======== Tambahan 3 Project ======== */
  {
    title: "EduGlobe",
    role: "UI Designer",
    tags: ["Figma", "Mobile App", "Hifidelity"],
    desc: "Panduan lengkap menuju universitas impian dan sukses UTBK",
    links: [{ label: "Preview", href: "#" }, { label: "Code", href: "#" }],
    cover: "cover/eduglobe.png", // simpan di public/cover/kasirq.png
  },
  {
    title: "FitPlay - WorkOut UI",
    role: "UI/UX Designer",
    tags: ["Design", "User Friendly", "Prototype"],
    desc: "Satu aplikasi untuk workout, jadwal, dan koneksi dengan komunitas fitnes",
    links: [{ label: "Preview", href: "#" }, { label: "Code", href: "#" }],
    cover: "cover/fitplay.png",
  },
  {
    title: "Taskify",
    role: "UI/UX Designer",
    tags: ["Design", "Interaktif", "Prototype"],
    desc: "Produktif setiap hari dengan manajemen tugas yang simpel.",
    links: [{ label: "Case Study", href: "#" }, { label: "Prototype", href: "#" }],
    cover: "cover/task.png",
  },
];

export const PHOTOS = [
  `${import.meta.env.BASE_URL}photos/agung-1.png`,
];
