import Artwork from '../art/Artwork.jsx';

/** Rounded image frame with hover zoom. Wrap the parent in `group` for hover. */
export default function Media({ seed, category, variant = 'scene', productType, figure, ratio = 'aspect-[4/3]', className = '', rounded = 'rounded-2xl', label, children }) {
  return (
    <div className={`relative overflow-hidden bg-surface-2 ${ratio} ${rounded} ${className}`}>
      <div className="img-zoom absolute inset-0">
        <Artwork seed={seed} category={category} variant={variant} productType={productType} figure={figure} label={label || seed} />
      </div>
      {children}
    </div>
  );
}
