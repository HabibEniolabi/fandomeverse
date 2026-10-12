import { useLayoutEffect, useRef, useState } from 'react';
import { ExternalLink, Lock } from 'lucide-react';

/**
 * Renders a live route inside a scaled iframe — a real browser at 1440px or a 390px phone.
 * Media queries respond to the iframe width, so mobile frames show the true mobile layout.
 */
export default function DeviceFrame({ path, device = 'desktop', height, theme, title, interactive = true, className = '' }) {
  const w = device === 'mobile' ? 390 : 1440;
  const h = height || (device === 'mobile' ? 844 : 900);
  const ref = useRef(null);
  const [scale, setScale] = useState(0.25);
  const sep = path.includes('?') ? '&' : '?';
  const src = `${path}${sep}frame=1${theme ? `&theme=${theme}` : ''}`;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => setScale(el.clientWidth / w);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  const iframe = (
    <div ref={ref} className="relative w-full overflow-hidden bg-bg" style={{ height: h * scale }}>
      <iframe
        src={src}
        title={title || path}
        loading="lazy"
        tabIndex={interactive ? 0 : -1}
        className={`absolute left-0 top-0 origin-top-left border-0 ${interactive ? '' : 'pointer-events-none'}`}
        style={{ width: w, height: h, transform: `scale(${scale})` }}
      />
    </div>
  );

  if (device === 'mobile') {
    return (
      <div className={`device-frame relative rounded-[38px] bg-[#0E0F16] p-[9px] shadow-lift ring-1 ring-black/10 ${className}`}>
        <div className="relative overflow-hidden rounded-[30px]">
          {iframe}
          <span className="pointer-events-none absolute left-1/2 top-1.5 h-[18px] w-[76px] -translate-x-1/2 rounded-full bg-[#0E0F16]" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <div className={`device-frame overflow-hidden rounded-xl border border-line bg-surface shadow-soft ${className}`}>
      <div className="flex h-8 items-center gap-2 border-b border-line bg-surface-2 px-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="mx-auto flex h-5 min-w-0 max-w-[60%] flex-1 items-center justify-center gap-1 rounded-md bg-surface px-2 text-[10px] text-muted">
          <Lock className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
          <span className="truncate">fandomverse.app{path.split('?')[0]}</span>
        </span>
        <a href={path} target="_blank" rel="noreferrer" className="print-hide flex h-6 w-6 items-center justify-center rounded text-muted hover:text-ink" aria-label={`Open ${title || path} in a new tab`}>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
      {iframe}
    </div>
  );
}
