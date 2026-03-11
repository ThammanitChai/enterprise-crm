export default function Button({ children, className = '', variant = 'primary', ...props }) {
    const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition';
    const styles = {
      primary: 'bg-brand-600 text-white hover:bg-brand-700',
      secondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50',
      danger: 'bg-red-600 text-white hover:bg-red-700'
    };
  
    return (
      <button className={`${base} ${styles[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }