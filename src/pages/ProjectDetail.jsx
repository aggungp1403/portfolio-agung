import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PROJECTS, BRAND } from "../projectConfig";
import { slugify, FloatingBlobs } from "../utils";

function ProjectDetailContent({ project }) {
  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold">{project.title}</h1>
      <div className="mt-2 text-xs px-2 py-1 rounded-lg w-fit bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20">
        {project.role}
      </div>

      <p className="mt-4 text-neutral-300/90">{project.desc}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 rounded-lg ring-1 ring-white/10"
          >
            {t}
          </span>
        ))}
      </div>

      {project.links?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-sm"
            >
              {l.label} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = PROJECTS.find((p) => slugify(p.title) === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 grid place-items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">404</h1>
          <p className="mt-2 text-neutral-400">Project tidak ditemukan.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <FloatingBlobs />

      <header className="sticky top-0 z-50 backdrop-blur bg-neutral-950/80 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <span className="font-bold text-emerald-400">←</span>
            <span className="font-semibold">{BRAND.name}</span>
          </button>
          <span className="text-sm text-neutral-400">Project Detail</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
        <ProjectDetailContent project={project} />
      </main>
    </div>
  );
}
