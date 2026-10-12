import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Monitor, Smartphone } from 'lucide-react';
import ShowcaseLayout from './ShowcaseLayout.jsx';
import DeviceFrame from './DeviceFrame.jsx';
import Tabs from '../components/common/Tabs.jsx';
import Button from '../components/common/Button.jsx';
import { screenGroups } from './screens.js';

/** /showcase/:screen — a focused review page for one screen group (desktop, mobile, light & dark). */
export default function ShowcaseScreen() {
  const { screen } = useParams();
  const group = screenGroups[screen];
  const [route, setRoute] = useState(0);

  if (!group) {
    return (
      <ShowcaseLayout sections={false}>
        <div className="p-12">
          <h1 className="text-3xl font-bold">Unknown screen “{screen}”</h1>
          <Link to="/showcase" className="mt-4 inline-block font-semibold text-brand">Back to showcase</Link>
        </div>
      </ShowcaseLayout>
    );
  }
  const current = group.routes[Math.min(route, group.routes.length - 1)];

  return (
    <ShowcaseLayout sections={false} activeScreen={screen}>
      <div className="px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-[1180px]">
          <Link to="/showcase" className="print-hide inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink"><ArrowLeft className="h-4 w-4" /> All screens</Link>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Screen review</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{group.title}</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{group.description}</p>
            </div>
            <Button href={current.path} variant="secondary" iconRight={ExternalLink} target="_blank" rel="noreferrer">Open live page</Button>
          </div>
          {group.routes.length > 1 && (
            <Tabs className="print-hide mt-8" tabs={group.routes.map((r, i) => ({ value: String(i), label: r.label }))} value={String(route)} onChange={(v) => setRoute(Number(v))} label="Screen variant" />
          )}

          <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_280px]">
            <section className="print-block" aria-label="Desktop">
              <p className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-muted"><Monitor className="h-4 w-4" /> Desktop · 1440px</p>
              <DeviceFrame key={current.path} path={current.path} height={1100} title={`${group.title} desktop`} />
            </section>
            <section className="print-block" aria-label="Mobile">
              <p className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-muted"><Smartphone className="h-4 w-4" /> Mobile · 390px</p>
              <DeviceFrame key={current.path + 'm'} path={current.path} device="mobile" title={`${group.title} mobile`} className="mx-auto max-w-[280px]" />
            </section>
          </div>

          <div className="print-page mt-14 grid gap-6 md:grid-cols-2">
            {['light', 'dark'].map((m) => (
              <figure key={m} className="print-block">
                <DeviceFrame key={current.path + m} path={current.path} theme={m} title={`${group.title} ${m}`} />
                <figcaption className="mt-2 text-center text-sm font-semibold capitalize">{m} mode</figcaption>
              </figure>
            ))}
          </div>

          <div className="print-block mt-14 rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Design notes</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.notes.map((n) => <li key={n} className="flex gap-2 text-[15px]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{n}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </ShowcaseLayout>
  );
}
