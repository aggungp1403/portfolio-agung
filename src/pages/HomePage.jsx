// src/pages/HomePage.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { PROJECTS, SKILLS, BRAND, NAV, PHOTOS } from "../projectConfig";
import { FloatingBlobs, DynamicPhoto, slugify, resolveAsset } from "../utils";

/* ========= SCROLL HOOK ========= */
const useScrollTo = () => {
  const refs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    certs: useRef(null),
    contact: useRef(null),
  };
  const scrollTo = (key) =>
    refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return { refs, scrollTo };
};

/* ========= CERTIFICATES HOOK ========= */
function useCertificates() {
  const [data, setData] = useState(null); // null = loading
  const [err, setErr] = useState(null);

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}data/certificates.json`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then(setData)
      .catch((e) => {
        console.error(e);
        setErr(e);
        setData([]); // fallback ke array kosong
      });
  }, []);

  return { certs: data ?? [], loading: data === null && !err, error: err };
}

/* ========= SMALL UTILS ========= */
const cn = (...a) => a.filter(Boolean).join(" ");

// Skill meta resolver: supports string ("Laravel") or object ({ label, icon })
const getSkillMeta = (s) => {
  const item = typeof s === "string" ? { label: s } : s || {};
  const label = item.label || item.name || "Skill";
  let icon = item.icon;

  if (!icon) {
    const slug = slugify(label);
    const candidates = [
      `icons/${slug}.svg`,
      `icons/${slug}.png`,
      `icons/${slug}.webp`,
    ];
    for (const p of candidates) {
      const src = resolveAsset(p);
      if (src) {
        icon = src;
        break;
      }
    }
  }
  return { label, icon };
};

/* ========= HOME PAGE ========= */
export default function HomePage() {
  const { refs, scrollTo } = useScrollTo();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // add subtle shadow to header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // filter projects
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return PROJECTS.filter((p) => {
      const inTag = tag === "All" || p.tags?.includes(tag);
      const haystack = `${p.title} ${p.role} ${(p.tags || []).join(" ")} ${p.desc}`.toLowerCase();
      return inTag && haystack.includes(q);
    });
  }, [query, tag]);

  // certificates
  const { certs, loading } = useCertificates();
  const displayCerts = useMemo(() => {
    if (certs.length >= 6) return certs.slice(0, 6);
    if (certs.length === 0) return [];
    return Array.from({ length: 6 }, (_, i) => ({
      ...certs[i % certs.length],
      _dup: i >= certs.length,
    }));
  }, [certs]);

  // kumpulan tag unik untuk filter
  const allTags = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags || [])))],
    []
  );

  // close mobile menu on route change (safety)
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-600/30">
      {/* Decorative background: grid + soft gradient */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(16,185,129,0.10),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      >
        <div className="h-full w-full opacity-[0.06] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <FloatingBlobs />

      <div className="relative z-10">
        {/* NAV */}
        <header
          className={cn(
            "sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-white/10 transition-shadow",
            scrolled && "shadow-[0_6px_30px_-12px_rgba(16,185,129,0.35)]"
          )}
        >
          <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => scrollTo("home")}
              className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 rounded-xl"
            >
              <div className="h-9 w-9 rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-500/30 grid place-items-center">
                <span className="font-bold text-emerald-400">A</span>
              </div>
              <span className="font-semibold group-hover:text-emerald-400 transition-colors">{BRAND.name}</span>
            </button>

            <div className="hidden md:flex items-center gap-6 text-sm">
              {NAV.map(([label, key]) => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className="relative hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 rounded"
                >
                  <span>{label}</span>
                  <span className="pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-px w-0 bg-emerald-400/70 transition-all group-hover:w-full" />
                </button>
              ))}
            </div>

            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl ring-1 ring-white/15 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              ☰
            </button>
          </nav>

          {open && (
            <div className="md:hidden border-t border-white/10 bg-neutral-950/95">
              <div className="mx-auto max-w-7xl px-3 py-3 grid gap-2">
                {NAV.map(([label, key]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setOpen(false);
                      scrollTo(key);
                    }}
                    className="text-left px-3 py-2 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* HERO */}
        <section ref={refs.home} className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Hi, I&apos;m <span className="text-emerald-400">{BRAND.name}</span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-neutral-300">{BRAND.title}</p>
              <p className="mt-4 text-neutral-300/90 max-w-prose">{BRAND.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo("projects")}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                  See Projects
                </button>
                {BRAND.resume && (
                  <a
                    href={BRAND.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl ring-1 ring-white/15 hover:bg-white/5 text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                  >
                    View Résumé
                  </a>
                )}
              </div>
              {/* quick social proof row */}
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                <span className="px-2 py-1 rounded-lg bg-white/5 ring-1 ring-white/10">UI/UX • Web Dev</span>
                <span className="px-2 py-1 rounded-lg bg-white/5 ring-1 ring-white/10">Laravel • React</span>
                <span className="px-2 py-1 rounded-lg bg-white/5 ring-1 ring-white/10">Bandung, {BRAND.location}</span>
              </div>
            </div>

            <DynamicPhoto photos={PHOTOS} />
          </div>
        </section>

        {/* ABOUT */}
        <section ref={refs.about} className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h2 className="text-2xl sm:text-3xl font-bold">About</h2>
          <p className="mt-4 text-neutral-300/90 max-w-3xl">
            I&apos;m Agung, a <span className="text-emerald-400 font-medium">UI/UX designer</span> and{" "}
            <span className="text-emerald-400 font-medium">web developer</span> who focuses on clean UI,
            accessibility, and thoughtful micro-interactions. Based in {BRAND.location}.
          </p>
        </section>

        {/* SKILLS */}
        <section ref={refs.skills} className="bg-neutral-900/40 border-y border-white/10">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Skills</h2>
              <span className="hidden sm:inline text-xs text-neutral-400">Scroll • Tap • Explore</span>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {SKILLS.map((s) => {
                const { label, icon } = getSkillMeta(s);
                return (
                  <div
                    key={label}
                    className="rounded-2xl ring-1 ring-white/10 bg-neutral-900/60 px-4 py-3 text-sm font-medium text-neutral-200 hover:ring-emerald-500/30 hover:bg-neutral-900/80 transition-colors flex items-center gap-2"
                  >
                    {icon ? (
                      <img
                        src={icon}
                        alt=""
                        loading="lazy"
                        className="h-4 w-4"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    ) : (
                      <span aria-hidden className="inline-block h-4 w-4 rounded bg-emerald-500/40" />
                    )}
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section ref={refs.projects} className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Projects</h2>
              <p className="mt-2 text-neutral-300/90">Filter by tag or search.</p>
            </div>
            <div className="flex w-full sm:w-auto items-center gap-3">
              <label className="sr-only" htmlFor="tagSelect">Filter by tag</label>
              <select
                id="tagSelect"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="flex-1 sm:flex-none px-3 py-2 rounded-xl ring-1 ring-white/15 bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                aria-label="Filter by tag"
              >
                {allTags.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <div className="relative flex-1 sm:flex-none">
                <label className="sr-only" htmlFor="searchProjects">Search projects</label>
                <input
                  id="searchProjects"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl ring-1 ring-white/15 bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                  aria-label="Search projects"
                />
                <span className="pointer-events-none absolute left-3 top-2.5 text-neutral-500">⌕</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => {
              const slug = slugify(p.title);
              const cover = resolveAsset(p.cover);
              return (
                <Link
                  key={p.title}
                  to={`/project/${slug}`}
                  state={{ backgroundLocation: location }}
                  className="group rounded-3xl ring-1 ring-white/10 bg-neutral-900/70 overflow-hidden hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.25)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                  aria-label={`Open ${p.title}`}
                >
                  {/* COVER IMAGE */}
                  <div className="relative h-40 bg-neutral-900">
                    {cover && (
                      <img
                        src={cover}
                        alt={`${p.title} cover`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    {/* subtle sheen */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute -inset-x-6 -top-8 h-24 rotate-6 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold group-hover:text-emerald-400 transition-colors">
                        {p.title}
                      </h3>
                      {p.role && (
                        <span className="text-xs px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20">
                          {p.role}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-neutral-300/90 line-clamp-3">{p.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(p.tags || []).map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded-lg ring-1 ring-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-emerald-300 underline underline-offset-4">
                      Quick view →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* OPTIONAL: empty state kalau filter kosong */}
          {filtered.length === 0 && (
            <div className="mt-8 rounded-2xl ring-1 ring-white/10 bg-neutral-900/60 p-6 text-center">
              <div className="mx-auto mb-3 h-10 w-10 rounded-xl grid place-items-center ring-1 ring-white/10 bg-emerald-500/10">🙃</div>
              <p className="text-neutral-300">
                No projects found for <span className="text-emerald-300 font-medium">{tag}</span>
                {query ? (
                  <>
                    {" "}with “{query}”.
                  </>
                ) : null}
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setTag("All");
                }}
                className="mt-3 text-sm text-emerald-300 underline underline-offset-4"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        {/* CERTIFICATES */}
        <section ref={refs.certs} className="bg-neutral-900/40 border-y border-white/10">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Certificates</h2>
              {!loading && (
                <span className="text-xs text-neutral-400">
                  Showing {displayCerts.length} of {Math.max(certs.length, displayCerts.length)}
                </span>
              )}
            </div>

            {/* loading skeleton */}
            {loading && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-2xl ring-1 ring-white/10 bg-neutral-900/70 p-5 animate-pulse">
                    <div className="mb-4 h-28 w-full rounded-xl bg-neutral-800" />
                    <div className="h-3 w-24 bg-neutral-800 rounded" />
                    <div className="mt-2 h-4 w-3/4 bg-neutral-800 rounded" />
                    <div className="mt-2 h-3 w-1/2 bg-neutral-800 rounded" />
                  </div>
                ))}
              </div>
            )}

            {/* list 6 item */}
            {!loading && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayCerts.map((c, i) => (
                  <div key={`${c.name}-${i}`} className="rounded-2xl ring-1 ring-white/10 bg-neutral-900/70 p-5">
                    {/* Thumbnail */}
                    {(() => {
                      const src = resolveAsset(c.image);
                      return src ? (
                        <div className="mb-4 aspect-[3/2] w-full overflow-hidden rounded-xl ring-1 ring-white/10 bg-neutral-900">
                          <img
                            src={src}
                            alt={c.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.parentElement?.classList.add(
                                "bg-gradient-to-br",
                                "from-emerald-500/10",
                                "to-transparent"
                              );
                            }}
                          />
                        </div>
                      ) : null;
                    })()}

                    {/* Text */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm text-neutral-400">{c.year || "-"}</div>
                        <div className="mt-1 font-semibold">
                          {c.name}
                          {c._dup ? " (duplicate)" : ""}
                        </div>
                        <div className="text-sm text-neutral-300">{c.issuer}</div>
                      </div>
                      {c.url ? (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-300 text-sm underline underline-offset-4"
                        >
                          Link
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CONTACT */}
        <section ref={refs.contact} className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h2 className="text-2xl sm:text-3xl font-bold">Contact</h2>
          <ul className="mt-6 space-y-2 text-sm text-neutral-300">
            <li>📧 {BRAND.email}</li>
            <li>📍 {BRAND.location}</li>
          </ul>
        </section>

        {/* Back to top button */}
        <BackToTop onClick={() => scrollTo("home")} />
      </div>
    </div>
  );
}

function BackToTop({ onClick }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={onClick}
      aria-label="Back to top"
      className={cn(
        "fixed right-4 bottom-4 rounded-2xl p-3 ring-1 ring-white/15 bg-neutral-900/80 backdrop-blur hover:bg-neutral-900/95",
        "transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      ↑
    </button>
  );
}
