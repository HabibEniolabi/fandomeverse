import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Artwork from '../art/Artwork.jsx';
import { getCategory } from '../../data/categories.js';

/** Full-screen image viewer with Previous / Next / Close and keyboard support. */
export default function Lightbox({ images, index, onClose, onIndex }) {
  const closeRef = useRef(null);
  const img = images[index];

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [index, images.length, onClose, onIndex]);

  if (!img) return null;
  const cat = getCategory(img.category);
  const navBtn = 'flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20';

  return (
    <div className="animate-fade-in fixed inset-0 z-[90] flex flex-col bg-[#07080D]/95" role="dialog" aria-modal="true" aria-label={`Image: ${img.title}`}>
      <div className="flex items-center justify-between p-4 text-white sm:p-6">
        <p className="text-sm text-white/70">
          <span className="font-semibold text-white">{index + 1}</span> / {images.length}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={navBtn}>
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center gap-3 px-2 sm:gap-6 sm:px-6">
        <button type="button" onClick={() => onIndex((index - 1 + images.length) % images.length)} aria-label="Previous image" className={`${navBtn} hidden sm:flex`}>
          <ChevronLeft className="h-6 w-6" />
        </button>
        <figure key={img.id} className="animate-fade-in w-full max-w-5xl">
          <div className={`mx-auto overflow-hidden rounded-2xl ${img.variant === 'portrait' ? 'aspect-[3/4] max-h-[70vh]' : 'aspect-[4/3] max-h-[70vh] sm:aspect-[16/10]'}`}>
            <Artwork seed={img.seed || img.id} category={img.category} variant={img.variant || 'scene'} label={img.title} />
          </div>
          <figcaption className="mt-4 text-center text-white">
            <span className="font-semibold">{img.title}</span>
            <span className="ml-2 text-sm" style={{ color: cat.color }}>{cat.name}</span>
          </figcaption>
        </figure>
        <button type="button" onClick={() => onIndex((index + 1) % images.length)} aria-label="Next image" className={`${navBtn} hidden sm:flex`}>
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="flex justify-center gap-3 p-5 sm:hidden">
        <button type="button" onClick={() => onIndex((index - 1 + images.length) % images.length)} aria-label="Previous image" className={navBtn}><ChevronLeft className="h-6 w-6" /></button>
        <button type="button" onClick={() => onIndex((index + 1) % images.length)} aria-label="Next image" className={navBtn}><ChevronRight className="h-6 w-6" /></button>
      </div>
    </div>
  );
}
