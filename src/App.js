import React, { useState, useEffect } from "react";
import {
  Shield,
  MapPin,
  Calendar,
  Users,
  Plus,
  History,
  LayoutGrid,
  UserCircle,
  Skull,
  Loader2,
  X,
  Clock,
  AlertTriangle,
  Target,
  Swords,
  Zap,
  Activity,
} from "lucide-react";

export default function SystemFinal() {
  const [view, setView] = useState("portails");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 1. Force l'ajout de Tailwind au document
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);

    // 2. Horloge
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="system-container">
      {/* CSS DE SECOURS (Si Tailwind ne charge pas) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root { --cyan: #00f2ff; --dark: #05070a; --card: #0d1421; }
        body { background-color: var(--dark) !important; color: white !important; margin: 0; font-family: 'Segoe UI', sans-serif; }
        .system-container { min-height: 100vh; background: radial-gradient(circle at center, #0a1628 0%, #05070a 100%); }
        
        /* Layout Fixes si Tailwind échoue */
        .header-fixed { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #0a0f18; border-bottom: 1px solid #1e293b; }
        .main-centered { max-width: 1100px; margin: 0 auto; padding: 2rem; }
        .grid-custom { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        
        /* Glow Effects */
        .glow-border { border: 1px solid rgba(0, 242, 255, 0.3); box-shadow: 0 0 15px rgba(0, 242, 255, 0.1); border-radius: 12px; }
        .rank-s { border-color: #ff004c !important; box-shadow: 0 0 15px rgba(255, 0, 76, 0.2) !important; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.8; } 100% { opacity: 1; } }
        
        .card-bg { background: var(--card); padding: 1.5rem; border-radius: 12px; position: relative; overflow: hidden; }
        .nav-btn { background: #1e293b; border: none; color: #94a3b8; padding: 8px 20px; border-radius: 8px; cursor: pointer; text-transform: uppercase; font-weight: bold; font-size: 12px; margin: 0 5px; }
        .nav-btn.active { background: var(--cyan); color: black; }
      `,
        }}
      />

      {/* HEADER STYLISÉ */}
      <header className="header-fixed border-b border-cyan-900/30">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500 rounded-lg">
            <Shield className="text-cyan-400" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest text-white uppercase italic m-0">
              SYSTÈME DE PORTAILS
            </h1>
            <div className="flex items-center gap-2 text-[10px] text-cyan-500 font-bold uppercase tracking-widest">
              <Activity size={10} /> État : Synchronisé
            </div>
          </div>
        </div>

        <nav>
          <button
            onClick={() => setView("portails")}
            className={`nav-btn ${view === "portails" ? "active" : ""}`}
          >
            Portails
          </button>
          <button
            onClick={() => setView("roster")}
            className={`nav-btn ${view === "roster" ? "active" : ""}`}
          >
            Roster
          </button>
        </nav>

        <div className="text-right hidden sm:block">
          <div className="text-cyan-400 font-mono font-bold text-lg leading-none">
            {time.toLocaleTimeString([], { hour12: false })}
          </div>
          <div className="text-[9px] text-slate-500 font-bold uppercase mt-1 italic">
            Mission Time
          </div>
        </div>
      </header>

      {/* CONTENU CENTRÉ */}
      <main className="main-centered">
        {/* STATS BARS */}
        <div className="stats-grid">
          <StatBox
            label="Portails Actifs"
            val="14"
            color="cyan"
            icon={<Target size={20} />}
          />
          <StatBox
            label="Hunters en Raid"
            val="128"
            color="purple"
            icon={<Swords size={20} />}
          />
          <StatBox
            label="Menace"
            val="ÉLEVÉE"
            color="red"
            icon={<AlertTriangle size={20} />}
          />
          <StatBox
            label="Mana"
            val="4.2k"
            color="emerald"
            icon={<Zap size={20} />}
          />
        </div>

        {view === "portails" && (
          <section>
            <div className="flex items-center gap-3 mb-8 border-l-4 border-cyan-500 pl-4">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                Anomalies Détectées
              </h2>
            </div>

            <div className="grid-custom">
              <GateCard
                name="FORTERESSE DE L'OMBRE SANGLANTE"
                rank="S"
                boss="Monarque de Fer"
                location="Secteur 04, Est"
                count="1/12"
              />
              <GateCard
                name="NID DES ARACHNÉES"
                rank="C"
                boss="Reine Arachné"
                location="Zone Urbaine 12"
                count="3/8"
              />
              <GateCard
                name="CRYPTES D'ORICHALQUE"
                rank="A"
                boss="Golem de Sang"
                location="Secteur 01"
                count="0/10"
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// Composant Statistique
function StatBox({ label, val, color, icon }) {
  const colors = {
    cyan: "border-cyan-500 text-cyan-400",
    purple: "border-purple-500 text-purple-400",
    red: "border-red-600 text-red-500",
    emerald: "border-emerald-500 text-emerald-400",
  };
  return (
    <div className={`card-bg border-l-4 shadow-lg ${colors[color]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase m-0">
            {label}
          </p>
          <p className="text-2xl font-black m-0">{val}</p>
        </div>
        <span className="opacity-40">{icon}</span>
      </div>
    </div>
  );
}

// Composant Carte de Portail
function GateCard({ name, rank, boss, location, count }) {
  const isSRank = rank === "S";
  const rankColors = {
    S: "text-red-500 border-red-500/50 bg-red-500/10",
    A: "text-amber-400 border-amber-500/50 bg-amber-500/10",
    C: "text-cyan-400 border-cyan-500/50 bg-cyan-500/10",
  };

  return (
    <div className={`card-bg glow-border ${isSRank ? "rank-s" : ""}`}>
      <div className="flex justify-between mb-4">
        <span
          className={`px-2 py-1 rounded text-[10px] font-black border ${
            rankColors[rank] || "text-white border-white"
          }`}
        >
          {rank}-RANK
        </span>
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
          Disponible
        </span>
      </div>

      <h3 className="text-lg font-black text-white leading-tight mb-4 uppercase h-12 overflow-hidden">
        {name}
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <MapPin size={14} className="text-cyan-500" /> {location}
        </div>
        <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Skull size={14} className="text-red-500" />
            <span className="text-[10px] text-red-200 font-bold uppercase">
              {boss}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase mb-1">
            <span>Effectifs</span>
            <span>{count}</span>
          </div>
          <div className="h-1.5 bg-black rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-cyan-500 w-1/3 shadow-[0_0_8px_cyan]"></div>
          </div>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-black text-[10px] font-black rounded-lg uppercase transition-all">
          Rejoindre
        </button>
      </div>
    </div>
  );
}
