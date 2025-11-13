import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <button className="hamburger" aria-label="Abrir menu" onClick={() => setOpen(!open)}>☰</button>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">SNT</div>
        <nav onClick={close}>
          <NavLink to="/">{homeIcon()} Home</NavLink>
          <NavLink to="/dashboard">{dashboardIcon()} Dashboard</NavLink>
          <NavLink to="/onibus">{busIcon()} Ônibus</NavLink>
          <NavLink to="/van">{vanIcon()} Van</NavLink>
          <NavLink to="/indicadores">{chartIcon()} Indicadores</NavLink>
          <NavLink to="/ajuda">{helpIcon()} Ajuda</NavLink>
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Sessão encerrada.'); }}>{logoutIcon()} Sair</a>
        </nav>
      </aside>
      {open && <div className="backdrop" onClick={close} />}
    </>
  );
}

function baseIcon(path: string) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path}></path>
    </svg>
  );
}
function homeIcon() { return baseIcon("M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V12H10v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"); }
function dashboardIcon() { return baseIcon("M3 13h8V3H3zm10 8h8V3h-8zm-10 0h8v-6H3z"); }
function busIcon() { return baseIcon("M5 5h14a2 2 0 0 1 2 2v8a3 3 0 0 1-3 3v2a1 1 0 0 1-1 1h-2v-3H9v3H7a1 1 0 0 1-1-1v-2a3 3 0 0 1-3-3V7a2 2 0 0 1 2-2zm2 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10 0a1 1 0 1 0 .001 2.001A1 1 0 0 0 17 15z"); }
function vanIcon() { return baseIcon("M3 7h9l4 4h5v6h-2a2 2 0 0 1-2-2H7a2 2 0 0 1-2 2H3V7zm3 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 18 15z"); }
function chartIcon() { return baseIcon("M3 3v18h18M7 13v5M12 9v9M17 5v13"); }
function helpIcon() { return baseIcon("M9 9a3 3 0 1 1 3 3v2m0 4h.01"); }
function logoutIcon() { return baseIcon("M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 7l3 3-3 3m-8-3h11"); }


