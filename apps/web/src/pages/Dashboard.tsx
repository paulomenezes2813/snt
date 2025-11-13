import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { useRealtimeMonitor } from '../utils/realtime';
import MetricChart from '../components/MetricChart';

type Summary = {
  demanda: { passageirosMovimentados: number; ocupacaoMedia: string; };
  oferta: { kmExecutados: string; cumprimentoHorario: string; desviosRota: number; };
  conducao: { eventosBruscos: number; };
  infraestrutura: { eventos: number; };
};

export default function Dashboard() {
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const { state: rt, computed } = useRealtimeMonitor(1500);

  useEffect(() => {
    // Mock de dados locais
    const timeout = setTimeout(() => {
      const mock: Summary = {
        demanda: { passageirosMovimentados: 110, ocupacaoMedia: (0.58).toFixed(2) },
        oferta: { kmExecutados: (39.7).toFixed(1), cumprimentoHorario: (95.2).toFixed(1), desviosRota: 1 },
        conducao: { eventosBruscos: 4 },
        infraestrutura: { eventos: 1 },
      };
      setData(mock);
      setLoading(false);
    }, 350);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (!data) return <p>Sem dados.</p>;

  return (
    <>
      <div className="kpis">
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18M7 13v5M12 9v9M17 5v13"/></svg>}
          label="Passageiros movimentados"
          value={String(data.demanda.passageirosMovimentados)}
          trend="+12% hoje"
          progress={72}
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v7"/></svg>}
          label="Ocupação média"
          value={`${(Number(data.demanda.ocupacaoMedia) * 100).toFixed(0)}%`}
          trend="+3 pts"
          progress={Number(data.demanda.ocupacaoMedia) * 100}
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v4H4zM4 12h10v8H4zM16 12h4v8h-4z"/></svg>}
          label="KM executados"
          value={`${data.oferta.kmExecutados} km`}
          trend="+1.4 km"
          progress={68}
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 13l2-2 2 2M12 3v8"/></svg>}
          label="Cumprimento de horário"
          value={`${data.oferta.cumprimentoHorario}%`}
          trend="meta: 95%"
          progress={parseFloat(data.oferta.cumprimentoHorario)}
        />
      </div>

      <div className="grid" style={{ marginBottom: 16 }}>
        <MetricChart title="Ocupação (%) ao longo do tempo" data={rt.occupancySeries} yUnit="%" yDomain={[0, 100]} />
        <MetricChart title="Cumprimento de horário (min)" data={rt.scheduleDeltaSeries} yUnit="m" />
      </div>
      <div className="grid" style={{ marginBottom: 16 }}>
        <MetricChart title="Quilometragem acumulada (km)" data={rt.kilometersSeries} yUnit=" km" />
      </div>

      <section className="card" style={{ marginBottom: 16 }}>
        <h3>Monitor em tempo real</h3>
        <div className="grid">
          <div className="card" style={{ padding: 12 }}>
            <div className="label">Ocupação atual</div>
            <div className="value">{computed.occupancyPercent}%</div>
            <div className="progress" aria-label="ocupacao">
              <div className="bar" style={{ width: `${computed.occupancyPercent}%` }} />
            </div>
            <div className="muted" style={{ marginTop: 6 }}>Capacidade {rt.capacity} assentos</div>
            <div style={{ marginTop: 8 }}>
              <span className={`badge ${computed.accuracyPercent >= 95 ? 'success' : 'warn'}`}>Acurácia {computed.accuracyPercent}%</span>
            </div>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="label">Localização</div>
            <div className="value">{rt.lat.toFixed(5)}, {rt.lng.toFixed(5)}</div>
            <div className="muted">Quilometragem: {rt.kilometers.toFixed(2)} km</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
              <span className="pill">{computed.scheduleLabel}</span>
              <span className={`pill ${rt.routeDeviationMin ? '' : ''}`}>Desvio {rt.routeDeviationMin} min</span>
            </div>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="label">Condução</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className={`badge ${rt.harshBraking ? 'warn' : ''}`}>Frenagens {rt.harshBraking}</span>
              <span className="badge">Acelerações {rt.harshAcceleration}</span>
              <span className="badge">Curvas {rt.sharpTurns}</span>
              <span className="badge">Marcha lenta {rt.idlingMinutes} min</span>
            </div>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="label">Infraestrutura</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="muted">Pavimento</span>
              <div className="progress" style={{ width: 140 }}>
                <div className="bar" style={{ width: `${(rt.pavementQuality / 5) * 100}%` }} />
              </div>
              <span className="pill">{rt.pavementQuality.toFixed(1)} / 5</span>
            </div>
            <ul className="list" style={{ marginTop: 8 }}>
              {rt.unusualEvents.length === 0 ? (
                <li><span className="muted">Sem eventos recentes</span></li>
              ) : rt.unusualEvents.map((e, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span><span className="dot warn" /> {e.type}</span>
                  <span className="muted">{e.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="grid">
        <section className="card">
          <h3>Demanda por ponto</h3>
          <ul className="list">
            <li>Terminal A — <span className="badge info">+25</span> <span className="badge">-5</span> <span className="muted">Ocupação 50%</span></li>
            <li>Ponto B — <span className="badge info">+10</span> <span className="badge">-12</span> <span className="muted">Ocupação 65%</span></li>
          </ul>
        </section>
        <section className="card">
          <h3>Oferta de serviço</h3>
          <ul className="list">
            <li>Linha Central 08:00 — <span className="badge">19.2 km</span> <span className="badge success">96%</span> <span className="badge warn">Desvios: 1</span></li>
            <li>Linha Central 09:00 — <span className="badge">20.5 km</span> <span className="badge">88%</span> <span className="badge">Desvios: 0</span></li>
          </ul>
        </section>
      </div>
    </>
  );
}


