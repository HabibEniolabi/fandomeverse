import { Compass, Home } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import usePageTitle from './usePageTitle.js';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <p className="font-display text-[96px] font-extrabold leading-none text-brand">404</p>
      <h1 className="mt-4 text-3xl font-bold">This universe doesn’t exist (yet).</h1>
      <p className="mt-3 max-w-md text-ink-2">The page you’re looking for may have moved, or never existed in this timeline.</p>
      <div className="mt-8 flex gap-3">
        <Button to="/" icon={Home}>Go home</Button>
        <Button to="/discover" variant="secondary" icon={Compass}>Discover</Button>
      </div>
    </div>
  );
}
