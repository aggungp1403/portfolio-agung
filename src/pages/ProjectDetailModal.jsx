import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PROJECTS } from "../projectConfig";
import { slugify } from "../utils";

function Modal({ children, onClose }){
  return (
    <div className="fixed inset-0 z-[999]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}/>
      <div className="absolute left-1/2 top-1/2 w-[min(100vw-2rem,960px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl ring-1 ring-white/10 bg-neutral-950">
        {children}
      </div>
    </div>
  );
}

export default function ProjectDetailModal(){
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => slugify(p.title) === slug);

  if(!project) return null;

  return (
    <Modal onClose={() => navigate(-1)}>
      {/* Header modal */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="font-semibold">Quick View</div>
        <button
          onClick={() => navigate(-1)}
          className="h-9 w-9 grid place-items-center rounded-xl ring-1 ring-white/15 hover:bg-white/5"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-bold">{project.title}</h1>
        <div className="mt-2 text-xs px-2 py-1 rounded-lg w-fit bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20">
          {project.role}
        </div>
        <p className="mt-3 text-neutral-300/90">{project.desc}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t)=>(
            <span key={t} className="text-xs px-2 py-1 rounded-lg ring-1 ring-white/10">{t}</span>
          ))}
        </div>

        {project.links?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-3">
            {project.links.map((l)=>(
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-sm">
                {l.label} →
              </a>
            ))}
          </div>
        )}

        {/* tombol ke halaman penuh */}
        <a
          href={`#/project/${slug}`}
          className="mt-4 inline-block text-sm text-emerald-300 underline underline-offset-4"
        >
          Open full page →
        </a>
      </div>
    </Modal>
  );
}
