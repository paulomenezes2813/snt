export default function Topbar({ title }: { title: string }) {
  return (
    <div className="topbar">
      <div className="title">{title}</div>
      <div className="actions">
        <input className="input" placeholder="Buscar..." />
        <button className="btn secondary">Hoje</button>
        <button className="btn">Exportar</button>
      </div>
    </div>
  );
}


