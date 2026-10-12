import { useState } from 'react';
import { CheckCircle2, Github, Instagram, Mail, MapPin, Phone, Send, Twitter, Youtube } from 'lucide-react';
import PageContainer, { PageHeader } from '../components/layout/PageContainer.jsx';
import Button from '../components/common/Button.jsx';
import usePageTitle from './usePageTitle.js';

const details = [
  { icon: MapPin, label: 'Location', value: 'Yaba Tech Hub, Lagos, Nigeria' },
  { icon: Mail, label: 'Email', value: 'hello@fandomverse.example' },
  { icon: Phone, label: 'Phone', value: '+234 800 000 0000' },
];
const socials = [
  { icon: Instagram, label: 'Instagram', handle: '@fandomverse' },
  { icon: Twitter, label: 'X / Twitter', handle: '@fandomverse' },
  { icon: Youtube, label: 'YouTube', handle: 'FandomVerse' },
  { icon: Github, label: 'GitHub', handle: 'fandomverse' },
];

export default function Contact() {
  usePageTitle('Contact');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'General question', message: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <PageContainer>
      <PageHeader eyebrow="Contact" title="Let’s talk fandom" description="Questions, partnerships, press or feedback — we read every message." />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div className="card p-6 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center py-16 text-center">
              <CheckCircle2 className="h-12 w-12 text-[#22A559]" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold">Message sent!</h2>
              <p className="mt-2 max-w-sm text-ink-2">Thanks, {form.name.split(' ')[0] || 'friend'}. This is a showcase, so nothing was actually sent — but we appreciate the thought.</p>
              <Button variant="secondary" className="mt-6" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: 'General question', message: '' }); }}>Send another</Button>
            </div>
          ) : (
            <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div><label htmlFor="c-name" className="label">Name</label><input id="c-name" required value={form.name} onChange={set('name')} className="input" placeholder="Your name" autoComplete="name" /></div>
              <div><label htmlFor="c-email" className="label">Email</label><input id="c-email" type="email" required value={form.email} onChange={set('email')} className="input" placeholder="you@example.com" autoComplete="email" /></div>
              <div className="sm:col-span-2">
                <label htmlFor="c-subject" className="label">Subject</label>
                <select id="c-subject" value={form.subject} onChange={set('subject')} className="input cursor-pointer">
                  {['General question', 'Partnerships', 'Press', 'Report an issue', 'Feedback'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-msg" className="label">Message</label>
                <textarea id="c-msg" required rows={6} value={form.message} onChange={set('message')} className="input h-auto resize-y py-3" placeholder="Tell us what’s on your mind..." />
              </div>
              <div className="sm:col-span-2"><Button type="submit" size="lg" iconRight={Send}>Send message</Button></div>
            </form>
          )}
        </div>
        <aside className="space-y-8">
          <ul className="space-y-4">
            {details.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <span><span className="block text-sm text-muted">{label}</span><span className="font-semibold">{value}</span></span>
              </li>
            ))}
          </ul>
          <div>
            <h2 className="mb-3 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Socials</h2>
            <ul className="grid grid-cols-2 gap-2">
              {socials.map(({ icon: Icon, label, handle }) => (
                <li key={label}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="flex h-12 items-center gap-3 rounded-xl border border-line bg-surface px-3 text-sm font-medium hover:border-ink/25" aria-label={`${label}: ${handle}`}>
                    <Icon className="h-[18px] w-[18px] text-ink-2" aria-hidden="true" />{handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-surface-2 p-5 text-[15px] text-ink-2">
            <p className="font-semibold text-ink">Office hours</p>
            <p className="mt-1">Mon – Fri, 9:00 – 18:00 WAT. We usually reply within one working day.</p>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
