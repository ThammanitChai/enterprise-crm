export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
    return (
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"
      />
    );
  }