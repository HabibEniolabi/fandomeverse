import { memo, useId } from 'react';

/**
 * Procedural, copyright-safe artwork.
 * Every image on FandomVerse is generated from a seed + category palette,
 * so the UI never depends on copyrighted characters or external image hosts.
 *
 * variant: 'scene' (landscape key-art) | 'portrait' (character bust) | 'product'
 */

export const palettes = {
  anime: { deep: '#1B1030', mid: '#5B1F4F', accent: '#F45B9C', light: '#FFD3E4', alt: '#FFB35C' },
  gaming: { deep: '#0A1330', mid: '#173A7A', accent: '#3978F6', light: '#C4D9FF', alt: '#35E0C8' },
  movies: { deep: '#221008', mid: '#6B2A10', accent: '#FF8A3D', light: '#FFE3C6', alt: '#FFD166' },
  tv: { deep: '#130F2C', mid: '#33236D', accent: '#7459E8', light: '#DCD3FF', alt: '#5CC8FF' },
  kpop: { deep: '#1D0A25', mid: '#57175E', accent: '#D94DCE', light: '#FAD1F5', alt: '#8C7CFF' },
  comics: { deep: '#1D1506', mid: '#5E4200', accent: '#E5A900', light: '#FFF0C2', alt: '#E5484D' },
  manga: { deep: '#061A1B', mid: '#0F4D4B', accent: '#16A6A1', light: '#D2F4F1', alt: '#F2EFE6' },
};

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeRng(seed) {
  let s = hash(seed) || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function ridge(r, baseY, amp, step, w = 800, h = 600) {
  const pts = [`0,${h}`];
  for (let x = 0; x <= w + step; x += step) {
    pts.push(`${x},${Math.round(baseY - r() * amp)}`);
  }
  pts.push(`${w},${h}`);
  return pts.join(' ');
}

function skyline(r, baseY, count, maxH, w = 800) {
  const blocks = [];
  let x = -10;
  for (let i = 0; i < count && x < w; i++) {
    const bw = 40 + r() * 60;
    const bh = maxH * (0.35 + r() * 0.65);
    blocks.push({ x, y: baseY - bh, w: bw, h: bh + 200 });
    x += bw + 2 + r() * 6;
  }
  return blocks;
}

/* ---------------- Scene ---------------- */
function Scene({ p, r, cat, id, figure }) {
  const sunX = 430 + r() * 250;
  const sunY = 140 + r() * 90;
  const sunR = 80 + r() * 45;
  const stars = Array.from({ length: 36 }, () => ({ x: r() * 800, y: r() * 300, s: 0.6 + r() * 1.8, o: 0.2 + r() * 0.7 }));

  return (
    <>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.deep} />
          <stop offset="0.62" stopColor={p.mid} />
          <stop offset="1" stopColor={p.accent} />
        </linearGradient>
        <radialGradient id={`${id}sun`} cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor={p.light} />
          <stop offset="0.55" stopColor={p.alt} />
          <stop offset="1" stopColor={p.accent} />
        </radialGradient>
        <radialGradient id={`${id}glow`}>
          <stop offset="0" stopColor={p.accent} stopOpacity="0.6" />
          <stop offset="1" stopColor={p.accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.deep} stopOpacity="0" />
          <stop offset="1" stopColor={p.deep} stopOpacity="0.85" />
        </linearGradient>
        <pattern id={`${id}dots`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="2.2" fill={p.light} opacity="0.18" />
        </pattern>
      </defs>
      <rect width="800" height="600" fill={`url(#${id}sky)`} />
      {cat === 'comics' && <rect width="800" height="600" fill={`url(#${id}dots)`} />}
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="#fff" opacity={s.o * (cat === 'movies' ? 0.4 : 0.8)} />
      ))}
      <circle cx={sunX} cy={sunY} r={sunR * 2.6} fill={`url(#${id}glow)`} />

      {cat === 'comics' && (
        <polygon
          fill={p.alt}
          opacity="0.9"
          points={Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const rad = i % 2 ? sunR * 1.1 : sunR * 1.9;
            return `${sunX + Math.cos(a) * rad},${sunY + Math.sin(a) * rad}`;
          }).join(' ')}
        />
      )}
      <circle cx={sunX} cy={sunY} r={cat === 'tv' || cat === 'manga' ? sunR * 0.8 : sunR} fill={`url(#${id}sun)`} />
      {cat === 'manga' && <circle cx={sunX + sunR * 0.35} cy={sunY - sunR * 0.1} r={sunR * 0.7} fill={p.deep} opacity="0.35" />}

      {cat === 'anime' && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={sunX - sunR} y={sunY + sunR * 0.15 + i * sunR * 0.22} width={sunR * 2} height={4 + i * 3} fill={p.mid} />
          ))}
          <polygon points={ridge(r, 440, 120, 90)} fill={p.mid} opacity="0.9" />
          <polygon points={ridge(r, 510, 90, 70)} fill={p.deep} />
          {Array.from({ length: 14 }, (_, i) => (
            <ellipse key={i} cx={r() * 800} cy={200 + r() * 380} rx="6" ry="3" fill={p.light} opacity={0.5 + r() * 0.4} transform={`rotate(${r() * 180})`} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
          ))}
        </>
      )}

      {cat === 'gaming' && (
        <>
          {skyline(r, 420, 14, 140).map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={p.mid} opacity="0.95" />
          ))}
          <rect y="420" width="800" height="180" fill={p.deep} />
          {Array.from({ length: 8 }, (_, i) => {
            const y = 420 + Math.pow(i / 7, 1.8) * 180;
            return <line key={`h${i}`} x1="0" x2="800" y1={y} y2={y} stroke={p.alt} strokeOpacity="0.45" strokeWidth="1.5" />;
          })}
          {Array.from({ length: 17 }, (_, i) => (
            <line key={`v${i}`} x1={400} y1={420} x2={-400 + i * 100} y2={600} stroke={p.alt} strokeOpacity="0.4" strokeWidth="1.5" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={`p${i}`} x={60 + r() * 680} y={60 + r() * 260} width="10" height="10" fill={p.alt} opacity={0.4 + r() * 0.5} />
          ))}
        </>
      )}

      {cat === 'movies' && (
        <>
          {[0, 1, 2].map((i) => {
            const bx = 160 + i * 240 + r() * 40;
            return <polygon key={i} points={`${bx - 14},600 ${bx + 14},600 ${bx + 140 - i * 120},0 ${bx - 60 - i * 110},0`} fill={p.light} opacity="0.07" />;
          })}
          <polygon points={ridge(r, 470, 70, 120)} fill={p.mid} opacity="0.85" />
          {skyline(r, 540, 18, 120).map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={p.deep} />
          ))}
        </>
      )}

      {cat === 'tv' && (
        <>
          <polygon points={ridge(r, 470, 60, 140)} fill={p.mid} opacity="0.7" />
          {skyline(r, 520, 16, 230).map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={p.deep} />
              {Array.from({ length: Math.floor(b.h / 40) }, (_, j) =>
                r() > 0.55 ? <rect key={j} x={b.x + 8 + (j % 2) * (b.w / 2 - 4)} y={b.y + 14 + j * 22} width="8" height="6" fill={p.alt} opacity="0.75" /> : null
              )}
            </g>
          ))}
        </>
      )}

      {cat === 'kpop' && (
        <>
          {Array.from({ length: 7 }, (_, i) => {
            const x = 60 + i * 115;
            const col = [p.light, p.alt, p.accent][i % 3];
            return <polygon key={i} points={`${x},0 ${x + 26},0 ${400 + (x - 400) * 0.25 + 30},470 ${400 + (x - 400) * 0.25 - 30},470`} fill={col} opacity="0.12" />;
          })}
          {Array.from({ length: 22 }, (_, i) => (
            <circle key={i} cx={r() * 800} cy={60 + r() * 360} r={6 + r() * 26} fill={[p.light, p.alt, p.accent][i % 3]} opacity={0.12 + r() * 0.25} />
          ))}
          <ellipse cx="400" cy="560" rx="520" ry="110" fill={p.deep} />
          <ellipse cx="400" cy="520" rx="300" ry="36" fill={p.accent} opacity="0.35" />
          {Array.from({ length: 40 }, (_, i) => (
            <circle key={`c${i}`} cx={20 + i * 20} cy={570 + (i % 3) * 8} r="3" fill={p.light} opacity="0.7" />
          ))}
        </>
      )}

      {cat === 'comics' && (
        <>
          {skyline(r, 470, 12, 200).map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={i % 2 ? p.deep : p.mid} stroke="#0B0B0F" strokeWidth="6" />
          ))}
          <rect y="560" width="800" height="40" fill="#0B0B0F" />
        </>
      )}

      {cat === 'manga' && (
        <>
          <polygon points={ridge(r, 420, 140, 110)} fill={p.mid} opacity="0.75" />
          {Array.from({ length: 7 }, (_, i) => {
            const y = 450 + i * 24;
            let d = `M 0 ${y}`;
            for (let x = 0; x <= 800; x += 50) d += ` Q ${x + 25} ${y - 14 + r() * 8} ${x + 50} ${y}`;
            return <path key={i} d={d} stroke={p.light} strokeOpacity={0.6 - i * 0.06} strokeWidth="2.2" fill="none" />;
          })}
          <rect y="440" width="800" height="160" fill={p.deep} opacity="0.35" />
        </>
      )}

      {figure && (
        <g transform={`translate(${170 + r() * 60} 330)`} fill="#07070C">
          <circle cx="40" cy="18" r="15" />
          <path d="M20 36 Q40 28 60 36 L70 120 L58 120 L52 190 L44 190 L40 130 L36 190 L28 190 L22 120 L10 120 Z" />
          <path d="M18 40 L-10 170 L4 170 Z" opacity="0.9" />
          <rect x="62" y="-10" width="4" height="150" transform="rotate(18 64 60)" fill={p.light} opacity="0.9" />
        </g>
      )}
      <rect y="300" width="800" height="300" fill={`url(#${id}fade)`} opacity="0.55" />
    </>
  );
}

/* ---------------- Portrait ---------------- */
const hairShapes = [
  // spiky
  'M205 300 L200 230 L235 250 L240 185 L275 225 L300 170 L322 222 L360 182 L365 245 L400 228 L395 300 Q300 250 205 300 Z',
  // bob
  'M198 360 Q190 210 300 205 Q410 210 402 360 L380 370 Q392 270 300 262 Q208 270 220 370 Z',
  // long
  'M195 520 Q170 210 300 200 Q430 210 405 520 L372 520 Q392 290 300 270 Q208 290 228 520 Z',
  // swept
  'M200 320 Q205 205 310 200 Q420 205 400 300 Q340 245 250 275 L220 330 Z',
];

function Portrait({ p, r, id }) {
  const hair = hairShapes[Math.floor(r() * hairShapes.length)];
  const visor = r() > 0.45;
  const bun = r() > 0.75;
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.mid} />
          <stop offset="1" stopColor={p.deep} />
        </linearGradient>
        <radialGradient id={`${id}halo`} cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor={p.light} />
          <stop offset="0.45" stopColor={p.alt} />
          <stop offset="1" stopColor={p.accent} />
        </radialGradient>
        <linearGradient id={`${id}body`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0A0A10" />
          <stop offset="0.7" stopColor={p.deep} />
          <stop offset="1" stopColor={p.mid} />
        </linearGradient>
        <linearGradient id={`${id}visor`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={p.accent} />
          <stop offset="1" stopColor={p.light} />
        </linearGradient>
        <pattern id={`${id}lines`} width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="2" height="18" fill={p.light} opacity="0.08" />
        </pattern>
      </defs>
      <rect width="600" height="800" fill={`url(#${id}bg)`} />
      <rect width="600" height="800" fill={`url(#${id}lines)`} />
      <circle cx="300" cy="330" r="215" fill={`url(#${id}halo)`} />
      <circle cx="300" cy="330" r="250" fill="none" stroke={p.light} strokeOpacity="0.35" strokeWidth="2" />
      <circle cx={120 + r() * 360} cy={90 + r() * 80} r="6" fill={p.light} opacity="0.8" />
      <g fill={`url(#${id}body)`}>
        <path d="M90 800 C100 610 190 545 300 545 C410 545 500 610 510 800 Z" />
        <rect x="262" y="440" width="76" height="120" rx="30" />
        <ellipse cx="300" cy="345" rx="98" ry="120" />
        {bun && <circle cx="300" cy="200" r="42" />}
        <path d={hair} />
      </g>
      <path d="M240 560 L300 650 L360 560" fill="none" stroke={p.accent} strokeWidth="6" strokeLinecap="round" />
      <path d="M90 800 C100 610 190 545 300 545" fill="none" stroke={p.light} strokeOpacity="0.35" strokeWidth="3" />
      {visor ? (
        <rect x="205" y="322" width="190" height="24" rx="12" fill={`url(#${id}visor)`} opacity="0.95" />
      ) : (
        <>
          <ellipse cx="262" cy="338" rx="9" ry="5" fill={p.light} />
          <ellipse cx="338" cy="338" rx="9" ry="5" fill={p.light} />
        </>
      )}
      <rect y="620" width="600" height="180" fill={p.deep} opacity="0.25" />
    </>
  );
}

/* ---------------- Product ---------------- */
function MiniScene({ p, x, y, w, h, id }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}ms`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.deep} />
          <stop offset="1" stopColor={p.accent} />
        </linearGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}ms)`} />
      <circle cx={x + w * 0.62} cy={y + h * 0.38} r={w * 0.2} fill={p.alt} />
      <polygon points={`${x},${y + h} ${x},${y + h * 0.72} ${x + w * 0.3},${y + h * 0.58} ${x + w * 0.55},${y + h * 0.75} ${x + w * 0.8},${y + h * 0.6} ${x + w},${y + h * 0.7} ${x + w},${y + h}`} fill={p.deep} />
    </g>
  );
}

function Emblem({ p, cx, cy, s = 1 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={48 * s} fill={p.alt} />
      <circle cx={cx} cy={cy} r={48 * s} fill={p.accent} opacity="0.55" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={cx - 48 * s} y={cy + (6 + i * 12) * s} width={96 * s} height={(3 + i * 1.5) * s} fill={p.deep} />
      ))}
    </g>
  );
}

function Product({ p, r, id, type }) {
  let shape;
  switch (type) {
    case 'tee':
      shape = (
        <>
          <path d="M190 170 L252 140 Q300 175 348 140 L410 170 L470 242 L418 278 L400 258 L400 468 L200 468 L200 258 L182 278 L130 242 Z" fill={p.deep} />
          <path d="M252 140 Q300 175 348 140" fill="none" stroke={p.mid} strokeWidth="8" />
          <Emblem p={p} cx={300} cy={290} />
        </>
      );
      break;
    case 'hoodie':
      shape = (
        <>
          <path d="M200 175 Q300 95 400 175 L460 300 L450 470 L412 470 L405 300 L405 480 L195 480 L195 300 L188 470 L150 470 L140 300 Z" fill={p.mid} />
          <path d="M235 180 Q300 110 365 180 Q300 235 235 180 Z" fill={p.deep} />
          <rect x="235" y="380" width="130" height="60" rx="18" fill={p.deep} opacity="0.6" />
          <circle cx="300" cy="300" r="26" fill="none" stroke={p.light} strokeWidth="6" />
          <line x1="300" y1="274" x2="300" y2="326" stroke={p.light} strokeWidth="6" />
          <line x1="280" y1="200" x2="276" y2="260" stroke={p.light} strokeWidth="4" />
          <line x1="320" y1="200" x2="324" y2="260" stroke={p.light} strokeWidth="4" />
        </>
      );
      break;
    case 'figure':
      shape = (
        <>
          <ellipse cx="300" cy="470" rx="120" ry="26" fill={p.deep} />
          <rect x="180" y="444" width="240" height="26" fill={p.deep} />
          <ellipse cx="300" cy="444" rx="120" ry="26" fill={p.mid} />
          <polygon points="300,250 140,215 180,290" fill={p.accent} />
          <polygon points="300,250 460,215 420,290" fill={p.accent} />
          <rect x="268" y="330" width="26" height="110" rx="10" fill={p.deep} />
          <rect x="306" y="330" width="26" height="110" rx="10" fill={p.deep} />
          <rect x="255" y="235" width="90" height="115" rx="30" fill={p.mid} />
          <circle cx="300" cy="200" r="46" fill="#F3D9C4" />
          <path d="M252 196 Q256 140 304 145 Q352 150 350 200 Q320 170 270 185 Z" fill={p.deep} />
          <rect x="262" y="190" width="76" height="14" rx="7" fill={p.alt} />
        </>
      );
      break;
    case 'poster':
      shape = (
        <>
          <rect x="178" y="98" width="244" height="344" fill="#fff" />
          <MiniScene p={p} x={192} y={112} w={216} h={286} id={id} />
          <rect x="192" y="410" width="120" height="8" fill={p.deep} />
          <rect x="192" y="424" width="70" height="6" fill={p.accent} />
        </>
      );
      break;
    case 'lightstick':
      shape = (
        <>
          <circle cx="300" cy="210" r="140" fill={p.accent} opacity="0.18" />
          <rect x="283" y="290" width="34" height="200" rx="14" fill={p.deep} />
          <rect x="276" y="286" width="48" height="22" rx="8" fill={p.mid} />
          <circle cx="300" cy="200" r="92" fill={p.light} />
          <circle cx="300" cy="200" r="92" fill={p.accent} opacity="0.35" />
          <circle cx="300" cy="200" r="60" fill="none" stroke="#fff" strokeWidth="6" opacity="0.8" />
          <polygon points="300,150 314,188 354,188 322,210 334,250 300,226 266,250 278,210 246,188 286,188" fill="#fff" opacity="0.9" />
        </>
      );
      break;
    case 'book':
      shape = (
        <>
          <rect x="206" y="112" width="210" height="330" rx="6" fill={p.deep} />
          <rect x="196" y="112" width="24" height="330" rx="4" fill={p.mid} />
          <MiniScene p={p} x={236} y={150} w={160} h={170} id={id} />
          <rect x="236" y="340" width="150" height="12" fill={p.light} />
          <rect x="236" y="362" width="96" height="8" fill={p.accent} />
        </>
      );
      break;
    case 'vinyl':
      shape = (
        <>
          <rect x="150" y="130" width="240" height="240" fill={p.mid} />
          <MiniScene p={p} x={164} y={144} w={212} h={212} id={id} />
          <circle cx="370" cy="290" r="130" fill="#141418" />
          {[112, 96, 80, 64].map((rr) => (
            <circle key={rr} cx="370" cy="290" r={rr} fill="none" stroke="#2A2A33" strokeWidth="2" />
          ))}
          <circle cx="370" cy="290" r="40" fill={p.accent} />
          <circle cx="370" cy="290" r="6" fill="#141418" />
        </>
      );
      break;
    case 'cap':
      shape = (
        <>
          <path d="M170 330 Q175 180 300 175 Q425 180 430 330 Z" fill={p.deep} />
          <path d="M150 330 Q300 300 470 330 Q480 360 440 372 Q300 350 170 372 Q140 360 150 330 Z" fill={p.mid} />
          <circle cx="300" cy="180" r="10" fill={p.mid} />
          <polygon points="300,220 340,280 300,300 260,280" fill={p.accent} />
        </>
      );
      break;
    case 'mug':
    default:
      shape = (
        <>
          <path d="M390 230 Q470 230 468 310 Q466 390 390 380" fill="none" stroke={p.deep} strokeWidth="26" />
          <rect x="170" y="170" width="230" height="270" rx="22" fill={p.deep} />
          <circle cx="285" cy="300" r="60" fill={p.alt} />
          <circle cx="310" cy="285" r="52" fill={p.deep} />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={210 + r() * 150} cy={200 + r() * 200} r="3" fill={p.light} />
          ))}
        </>
      );
  }

  return (
    <>
      <defs>
        <linearGradient id={`${id}pbg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.light} stopOpacity="0.55" />
          <stop offset="1" stopColor={p.light} stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="#F4F0E8" />
      <rect width="600" height="600" fill={`url(#${id}pbg)`} />
      <circle cx="300" cy="290" r="210" fill="#fff" opacity="0.45" />
      <ellipse cx="300" cy="500" rx="170" ry="16" fill={p.deep} opacity="0.12" />
      {shape}
    </>
  );
}

function Artwork({ seed = 'fandomverse', category = 'anime', variant = 'scene', productType, figure = false, label, className = '' }) {
  const rawId = useId();
  const id = 'a' + rawId.replace(/[^a-zA-Z0-9]/g, '');
  const p = palettes[category] || palettes.anime;
  const r = makeRng(`${seed}-${variant}`);
  const hue = variant === 'scene' ? Math.round((hash(seed) % 29) - 14) : 0;
  const viewBox = variant === 'portrait' ? '0 0 600 800' : variant === 'product' ? '0 0 600 600' : '0 0 800 600';

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${className}`}
      style={hue ? { filter: `hue-rotate(${hue}deg)` } : undefined}
      role="img"
      aria-label={label || seed}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'portrait' && <Portrait p={p} r={r} id={id} />}
      {variant === 'product' && <Product p={p} r={r} id={id} type={productType} />}
      {variant === 'scene' && <Scene p={p} r={r} id={id} cat={category} figure={figure} />}
    </svg>
  );
}

export default memo(Artwork);
