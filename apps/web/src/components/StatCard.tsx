type Props = {
  icon: JSX.Element;
  label: string;
  value: string;
  trend?: string;
  progress?: number; // 0..100
};

export default function StatCard({ icon, label, value, trend, progress }: Props) {
  return (
    <div className="stat">
      <div className="icon">{icon}</div>
      <div>
        <div className="label">{label}</div>
        <div className="value">{value}</div>
        {trend && <div className="trend">{trend}</div>}
        {typeof progress === 'number' && (
          <div className="progress" aria-label="progresso">
            <div className="bar" style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}


