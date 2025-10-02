// src/utils.jsx
import React, { useState, useEffect } from "react";

/* ========= SLUGIFY ========= */
// untuk bikin slug url dari judul project
export function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/* ========= RESOLVE ASSET ========= */
// amanin path gambar (baik dari /public maupun URL eksternal)
export function resolveAsset(p) {
  if (!p) return null;
  if (/^https?:\/\//i.test(p)) return p; // kalau sudah URL absolut
  const rel = p.replace(/^\/+/, ""); // hapus "/" ganda di depan
  return `${import.meta.env.BASE_URL}${encodeURI(rel)}`;
}

/* ========= FLOATING BLOBS ========= */
// efek background blob estetik
export function FloatingBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-[45vmax] w-[45vmax] rounded-full bg-emerald-500/20 blur-[100px]" />
      <div className="absolute top-1/3 -right-32 h-[35vmax] w-[35vmax] rounded-full bg-emerald-400/15 blur-[110px]" />
      <div className="absolute -bottom-24 left-1/4 h-[40vmax] w-[40vmax] rounded-full bg-teal-500/15 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,0,0,0)_0%,rgba(0,0,0,.25)_100%)]" />
    </div>
  );
}

/* ========= DYNAMIC PHOTO ========= */
// carousel foto sederhana dengan auto-slide
export function DynamicPhoto({ photos = [], interval = 5000 }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || photos.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % photos.length), interval);
    return () => clearInterval(id);
  }, [paused, photos.length, interval]);

  if (!photos.length) return null;

  return (
    <div
      className="relative aspect-square w-full max-w-sm sm:max-w-md mx-auto overflow-hidden rounded-3xl ring-1 ring-emerald-500/20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {photos.map((src, i) => (
        <img
          key={src}
          src={resolveAsset(src)}
          alt={`Agung photo ${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* indicator */}
      {photos.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 w-6 rounded-full transition ${
                i === idx ? "bg-emerald-400" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
