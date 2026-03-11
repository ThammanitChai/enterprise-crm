export default function Input({ label, className = '', ...props }) {
    return (
      <div className="space-y-2">
        {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
        <input
          className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none focus:border-brand-500 ${className}`}
          {...props}
        />
      </div>
    );
  }