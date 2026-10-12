import { useCallback, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import Artwork from '../art/Artwork.jsx';
import Lightbox from './Lightbox.jsx';
import { getCategory } from '../../data/categories.js';

const ratioClass = { tall: 'aspect-[3/4]', wide: 'aspect-[4/3]', square: 'aspect-square' };

/** Balanced masonry gallery (CSS columns) with lightbox. */
export default function Gallery({ images, columns = 'columns-2 md:columns-3' }) {
  const [open, setOpen] = useState(null);
  const onClose = useCallback(() => setOpen(null), []);
  return (
    <>
      <div className={`${columns} gap-4 [column-fill:_balance]`}>
        {images.map((img, i) => {
          const cat = getCategory(img.category);
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl text-left"
              aria-label={`Open image: ${img.title}`}
            >
              <div className={`${ratioClass[img.ratio] || 'aspect-square'} img-zoom`}>
                <Artwork seed={img.seed || img.id} category={img.category} variant={img.variant || 'scene'} label={img.title} />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-sm font-semibold text-white">{img.title}</span>
                <span className="text-xs font-medium" style={{ color: cat.color }}>{cat.name}</span>
              </div>
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#17171F] opacity-0 transition group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
          );
        })}
      </div>
      {open != null && <Lightbox images={images} index={open} onClose={onClose} onIndex={setOpen} />}
    </>
  );
}
