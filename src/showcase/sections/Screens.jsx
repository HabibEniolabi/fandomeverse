import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ShowcaseSection } from '../ShowcaseLayout.jsx';
import DeviceFrame from '../DeviceFrame.jsx';
import { desktopScreens, mobileScreens } from '../screens.js';

export function DesktopScreens() {
  return (
    <ShowcaseSection id="desktop" index="03" title="Desktop screens" description="Live 1440px renders of every page. Scroll and click inside any frame — they are the real app.">
      <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
        {desktopScreens.map((s, i) => (
          <figure key={s.key} className="print-block">
            <DeviceFrame path={s.path} title={`${s.title} — desktop`} />
            <figcaption className="mt-3 flex items-center justify-between gap-3">
              <span>
                <span className="mr-2 font-mono text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-semibold">{s.title}</span>
                <span className="ml-2 font-mono text-[12px] text-muted">{s.path}</span>
              </span>
              <Link to={`/showcase/${s.group}`} className="print-hide inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand hover:underline">
                Inspect <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </figcaption>
          </figure>
        ))}
      </div>
    </ShowcaseSection>
  );
}

export function MobileScreens() {
  return (
    <ShowcaseSection id="mobile" index="04" title="Mobile screens" description="Real 390px layouts in simulated phone frames — not shrunken desktops. Navigation collapses into a slide-in drawer; the chatbot becomes a bottom sheet.">
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {mobileScreens.map((s) => (
          <figure key={s.key} className="print-block">
            <DeviceFrame path={s.path} device="mobile" title={`${s.title} — mobile`} />
            <figcaption className="mt-3 text-center">
              <span className="block font-semibold">{s.title}</span>
              <span className="font-mono text-[11px] text-muted">{s.path}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </ShowcaseSection>
  );
}
