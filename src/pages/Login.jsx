import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import AuthLayout from './AuthLayout.jsx';
import Button from '../components/common/Button.jsx';
import { useUI } from '../context/UIContext.jsx';
import usePageTitle from './usePageTitle.js';

export function PasswordInput({ id, label, value, onChange, autoComplete, error }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative">
        <input id={id} type={show ? 'text' : 'password'} required minLength={8} value={value} onChange={onChange} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-err` : undefined} className={`input pr-12 ${error ? '!border-[#D93F3F]' : ''}`} placeholder="••••••••" />
        <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:text-ink">
          {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
        </button>
      </div>
      {error && <p id={`${id}-err`} className="mt-1.5 text-[13px] text-[#D93F3F]">{error}</p>}
    </div>
  );
}

export function SocialButtons() {
  return (
    <>
      <div className="my-6 flex items-center gap-3 text-[13px] text-muted"><span className="h-px flex-1 bg-line" />or continue with<span className="h-px flex-1 bg-line" /></div>
      <div className="grid grid-cols-2 gap-3">
        {['Google', 'Discord'].map((p) => (
          <button key={p} type="button" className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-surface text-sm font-semibold hover:bg-surface-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-2 text-[11px] font-bold">{p[0]}</span>{p}
          </button>
        ))}
      </div>
    </>
  );
}

export default function Login() {
  usePageTitle('Sign in');
  const { notify } = useUI();
  const [form, setForm] = useState({ email: '', password: '', remember: true });
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to pick up where you left off." seed="login-art" category="anime">
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); notify('Signed in (demo — no account was created)'); }}>
        <div>
          <label htmlFor="l-email" className="label">Email</label>
          <input id="l-email" type="email" required className="input" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <PasswordInput id="l-pass" label="Password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-2">
            <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} className="h-[18px] w-[18px] rounded accent-[rgb(var(--brand))]" />
            Remember me
          </label>
          <a href="#" onClick={(e) => { e.preventDefault(); notify('Password reset email sent (demo)'); }} className="text-sm font-semibold text-brand hover:underline">Forgot password?</a>
        </div>
        <Button type="submit" size="lg" icon={LogIn} className="w-full">Sign In</Button>
      </form>
      <SocialButtons />
      <p className="mt-8 text-center text-sm text-ink-2">New to FandomVerse? <Link to="/signup" className="font-semibold text-brand hover:underline">Create an account</Link></p>
    </AuthLayout>
  );
}
