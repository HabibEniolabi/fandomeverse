import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import AuthLayout from './AuthLayout.jsx';
import Button from '../components/common/Button.jsx';
import { PasswordInput, SocialButtons } from './Login.jsx';
import { useUI } from '../context/UIContext.jsx';
import usePageTitle from './usePageTitle.js';

export default function Signup() {
  usePageTitle('Create account');
  const { notify } = useUI();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [touched, setTouched] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const mismatch = touched && form.confirm && form.password !== form.confirm ? 'Passwords don’t match' : '';

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (form.password !== form.confirm) return;
    notify(`Welcome, ${form.name.split(' ')[0]}! (demo account)`);
  };

  return (
    <AuthLayout title="Join the FandomVerse" subtitle="Create a free account to follow universes and save what you love." seed="signup-art" category="kpop">
      <form className="space-y-5" onSubmit={submit} noValidate={false}>
        <div><label htmlFor="s-name" className="label">Name</label><input id="s-name" required className="input" placeholder="Your name" autoComplete="name" value={form.name} onChange={set('name')} /></div>
        <div><label htmlFor="s-email" className="label">Email</label><input id="s-email" type="email" required className="input" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={set('email')} /></div>
        <PasswordInput id="s-pass" label="Password" autoComplete="new-password" value={form.password} onChange={set('password')} />
        <PasswordInput id="s-confirm" label="Confirm password" autoComplete="new-password" value={form.confirm} onChange={(e) => { set('confirm')(e); setTouched(true); }} error={mismatch} />
        <p className="text-[13px] text-muted">At least 8 characters. By creating an account you agree to our (fictional) Terms.</p>
        <Button type="submit" size="lg" icon={UserPlus} className="w-full">Create Account</Button>
      </form>
      <SocialButtons />
      <p className="mt-8 text-center text-sm text-ink-2">Already have an account? <Link to="/login" className="font-semibold text-brand hover:underline">Sign in</Link></p>
    </AuthLayout>
  );
}
