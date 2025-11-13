import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

type Point = { t: number; value: number };

export default function MetricChart({
  title,
  data,
  color = '#2563eb',
  yUnit,
  yDomain,
}: {
  title: string;
  data: Point[];
  color?: string;
  yUnit?: string;
  yDomain?: [number, number] | number[];
}) {
  return (
    <section className="card" style={{ height: 240 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map(p => ({ ...p, ts: new Date(p.t).toLocaleTimeString() }))} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="ts" tick={{ fontSize: 11, fill: '#64748b' }} minTickGap={24} />
          <YAxis domain={yDomain} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(v) => yUnit ? `${v}${yUnit}` : `${v}`} />
          <Tooltip formatter={(v: any) => (yUnit ? `${v}${yUnit}` : v)} labelStyle={{ color: '#475569' }} />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}


