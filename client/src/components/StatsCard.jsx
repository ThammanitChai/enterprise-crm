export default function StatsCard({ label, value, hint }) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-soft border border-slate-100">
        <p className="text-sm text-slate-500">{label}</p>
        <h3 className="text-3xl font-bold mt-2">{value}</h3>
        {hint && <p className="text-xs text-slate-400 mt-2">{hint}</p>}
      </div>
    );
  }