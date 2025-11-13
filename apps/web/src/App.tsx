import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onibus from './pages/Onibus';
import Van from './pages/Van';
import Indicadores from './pages/Indicadores';
import Ajuda from './pages/Ajuda';

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Topbar title="Dashboard SNT" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onibus" element={<Onibus />} />
          <Route path="/van" element={<Van />} />
          <Route path="/indicadores" element={<Indicadores />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}


