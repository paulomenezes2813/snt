export default function Indicadores() {
  const demanda = [
    { ponto: 'Terminal A', embarque: 25, desembarque: 5, ocupacaoTrecho: 0.5 },
    { ponto: 'Ponto B', embarque: 10, desembarque: 12, ocupacaoTrecho: 0.65 },
  ];
  const oferta = [
    { viagem: 'Linha Central - 08:00', kmExecutados: 19.2, cumprimentoHorario: 0.96, desviosRota: 1 },
    { viagem: 'Linha Central - 09:00', kmExecutados: 20.5, cumprimentoHorario: 0.88, desviosRota: 0 },
  ];
  const conducao = [
    { viagem: '08:00', frenagem: 2, aceleracao: 1, curvas: 1 },
    { viagem: '09:00', frenagem: 0, aceleracao: 1, curvas: 0 },
  ];
  const infraestrutura = [
    { horario: '10:12', tipo: 'Pavimento', descricao: 'Buraco na via próximo ao Ponto B' },
  ];

  return (
    <div>
      <h2>Indicadores</h2>
      <div className="grid">
        <section className="card">
          <h3>Demanda</h3>
          <ul className="list">
            {demanda.map((d, i) => (
              <li key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><strong>{d.ponto}</strong></div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span className="badge info">+{d.embarque}</span>
                    <span className="badge">-{d.desembarque}</span>
                    <span className="pill">Ocup. {(d.ocupacaoTrecho * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="card">
          <h3>Oferta</h3>
          <ul className="list">
            {oferta.map((o, i) => (
              <li key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><strong>{o.viagem}</strong></div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span className="badge">{o.kmExecutados.toFixed(1)} km</span>
                    <span className={`badge ${o.cumprimentoHorario >= .95 ? 'success' : ''}`}>{(o.cumprimentoHorario*100).toFixed(0)}%</span>
                    <span className={`badge ${o.desviosRota ? 'warn' : ''}`}>Desvios {o.desviosRota}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="card">
          <h3>Condução</h3>
          <ul className="list">
            {conducao.map((c, i) => (
              <li key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><strong>Viagem {c.viagem}</strong></div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span className={`badge ${c.frenagem ? 'warn' : ''}`}>Fren {c.frenagem}</span>
                    <span className="badge">Acel {c.aceleracao}</span>
                    <span className="badge">Curvas {c.curvas}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="card">
          <h3>Infraestrutura</h3>
          <ul className="list">
            {infraestrutura.map((e, i) => (
              <li key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><strong>{e.horario}</strong></div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span className="badge">{e.tipo}</span>
                    <span className="pill">{e.descricao}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}


