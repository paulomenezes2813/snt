import { useEffect, useState } from 'react';

type Vehicle = { id: string; plate: string; capacity: number; active: boolean; };

export default function Van() {
  const [list, setList] = useState<Vehicle[]>([]);
  useEffect(() => {
    // Mock de vans
    const timeout = setTimeout(() => {
      setList([
        { id: 'v101', plate: 'VAN-101', capacity: 18, active: true },
        { id: 'v102', plate: 'VAN-102', capacity: 18, active: true },
      ]);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div>
      <h2>Van</h2>
      <div className="grid">
        {list.map(v => (
          <section key={v.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 600 }}>{v.plate}</div>
              <span className={`badge ${v.active ? 'success' : 'warn'}`}>{v.active ? 'Ativo' : 'Inativo'}</span>
            </div>
            <div className="muted" style={{ marginTop: 8 }}>Capacidade</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="progress" style={{ flex: 1 }}>
                <div className="bar" style={{ width: `${Math.min(100, (v.capacity / 20) * 100)}%` }} />
              </div>
              <span className="pill">{v.capacity} lugares</span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}


