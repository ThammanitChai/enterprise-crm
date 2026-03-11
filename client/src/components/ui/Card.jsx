export default function Card({ title, children, right }) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-soft border border-slate-100">
        {(title || right) && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            {right}
          </div>
        )}
        {children}
      </div>
    );
  }