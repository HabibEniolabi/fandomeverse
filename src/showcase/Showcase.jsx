import ShowcaseLayout from './ShowcaseLayout.jsx';
import Cover from './sections/Cover.jsx';
import Foundations from './sections/Foundations.jsx';
import ComponentsGallery from './sections/ComponentsGallery.jsx';
import { DesktopScreens, MobileScreens } from './sections/Screens.jsx';
import Interactions from './sections/Interactions.jsx';
import DarkMode from './sections/DarkMode.jsx';

/**
 * /showcase — the design review. A live, interactive "PDF" of the whole UI system.
 * Print → Save as PDF produces a static version (see @media print in index.css).
 */
export default function Showcase() {
  return (
    <ShowcaseLayout>
      <Cover />
      <Foundations />
      <ComponentsGallery />
      <DesktopScreens />
      <MobileScreens />
      <Interactions />
      <DarkMode />
      <footer className="px-5 py-12 text-center text-sm text-muted sm:px-8 lg:px-12">
        FandomVerse UI / UX System · Built with React, Vite, Tailwind CSS & Lucide · All franchises are fictional.
      </footer>
    </ShowcaseLayout>
  );
}
