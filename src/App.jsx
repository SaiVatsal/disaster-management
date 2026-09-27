import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  AlertTriangle,
  Flame,
  Waves,
  Radio,
  MapPin,
  ShieldAlert,
  Users,
  Truck,
  PlusCircle,
  Megaphone,
  CheckCircle2,
  Layers,
  Crosshair,
  Compass,
  Activity,
  Send,
  Zap,
  PhoneCall
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedSeverity,
    setSelectedSeverity,
    selectedIncidentId,
    setSelectedIncidentId,
    stats,
    incidents,
    resources,
    broadcasts,
    allocateResource,
    addIncident,
    sendBroadcast
  } = useStore();

  // New Incident Modal
  const [showNewIncidentModal, setShowNewIncidentModal] = useState(false);
  const [incTitle, setIncTitle] = useState('');
  const [incType, setIncType] = useState('Flood');
  const [incSeverity, setIncSeverity] = useState('Critical');
  const [incLocation, setIncLocation] = useState('');
  const [incPop, setIncPop] = useState('');
  const [incDesc, setIncDesc] = useState('');

  // Broadcast Message State
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastChannel, setBroadcastChannel] = useState('EAS High Priority');

  const selectedInc = incidents.find(i => i.id === selectedIncidentId) || incidents[0];

  const filteredIncidents = incidents.filter(i =>
    selectedSeverity === 'All' ? true : i.severity === selectedSeverity
  );

  const handleIncidentSubmit = (e) => {
    e.preventDefault();
    if (!incTitle.trim()) return;
    addIncident({
      title: incTitle,
      type: incType,
      severity: incSeverity,
      location: incLocation || 'Grid Sector 5',
      affectedPopulation: Number(incPop) || 1200,
      description: incDesc || 'Immediate emergency responder intervention requested.'
    });
    setShowNewIncidentModal(false);
    setIncTitle('');
    setIncLocation('');
    setIncPop('');
    setIncDesc('');
  };

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    sendBroadcast(broadcastText, broadcastChannel);
    setBroadcastText('');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans flex flex-col selection:bg-red-600 selection:text-white">
      {/* Top Ops Command Bar */}
      <header className="bg-[#18181b] border-b border-zinc-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/30">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-black text-lg text-white tracking-wider font-mono block leading-tight flex items-center gap-2">
                AEGIS-RESPONSE <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              </span>
              <span className="text-[10px] text-red-400 font-mono font-bold tracking-widest uppercase">
                CRITICAL DISASTER COMMAND & INCIDENT MATRIX
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs font-mono font-bold">
              <button
                onClick={() => setActiveTab('map')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'map' ? 'bg-red-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Incident Map
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'resources' ? 'bg-red-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Logistics Board
              </button>
              <button
                onClick={() => setActiveTab('broadcast')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'broadcast' ? 'bg-red-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                EAS Broadcasts
              </button>
            </nav>

            <button
              onClick={() => setShowNewIncidentModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-lg shadow-red-600/30"
            >
              <PlusCircle className="w-4 h-4" /> Log Incident
            </button>
          </div>
        </div>
      </header>

      {/* Emergency Status Ticker */}
      <div className="bg-red-950/80 border-b border-red-900/60 px-4 py-2 text-xs font-mono flex items-center justify-between text-red-200">
        <div className="flex items-center gap-4 truncate">
          <span className="flex items-center gap-1 font-black text-red-400">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-spin" /> LIVE EAS ALERTS:
          </span>
          <span className="truncate">{broadcasts[0]?.text || 'Active regional coordination protocols in effect.'}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-zinc-400 shrink-0">
          <span>Field Teams: <strong className="text-white">{stats.fieldTeamsDeployed}</strong></span>
          <span>Sheltered: <strong className="text-emerald-400">{stats.evacueesSheltered}</strong></span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* INTERACTIVE INCIDENT MAP VIEW */}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left 2 Cols: Tactical Radar / Map Canvas */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-[#18181b] border border-zinc-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 font-mono text-xs">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-red-500" /> TACTICAL DISASTER SECTOR MAP
                  </span>
                  <div className="flex gap-2">
                    {['All', 'Critical', 'Severe'].map(sev => (
                      <button
                        key={sev}
                        onClick={() => setSelectedSeverity(sev)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          selectedSeverity === sev ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Radar Grid Viewport */}
                <div className="relative h-[480px] bg-zinc-950/90 rounded-2xl border border-zinc-800/80 my-4 overflow-hidden flex items-center justify-center">
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

                  {/* Concentric Sonar Rings */}
                  <div className="absolute w-72 h-72 rounded-full border border-red-500/20 pointer-events-none"></div>
                  <div className="absolute w-[420px] h-[420px] rounded-full border border-red-500/10 pointer-events-none"></div>

                  {/* Interactive Incident Markers */}
                  {filteredIncidents.map(inc => {
                    const isSelected = inc.id === selectedIncidentId;
                    return (
                      <div
                        key={inc.id}
                        onClick={() => setSelectedIncidentId(inc.id)}
                        style={{ top: `${inc.coordinates.y}%`, left: `${inc.coordinates.x}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                      >
                        {/* Pulsing Sonar Ring */}
                        <div className={`absolute -inset-2 rounded-full ${inc.severity === 'Critical' ? 'bg-red-500/40 sonar-ping' : 'bg-amber-500/30'}`}></div>

                        <div className={`relative w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition transform group-hover:scale-125 ${
                          isSelected
                            ? 'bg-white text-zinc-950 border-2 border-red-500 scale-110'
                            : inc.severity === 'Critical'
                            ? 'bg-red-600 text-white'
                            : 'bg-amber-500 text-black'
                        }`}>
                          {inc.type === 'Flood' ? '🌊' : inc.type === 'Wildfire' ? '🔥' : '⚡'}
                        </div>

                        {/* Hover/Selected Tag */}
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 px-2 py-1 rounded-lg whitespace-nowrap text-[10px] font-mono font-bold shadow-lg pointer-events-none z-20">
                          {inc.title}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
                  <span>LAT/LON SECTOR 41.88°N, 87.62°W</span>
                  <span className="text-red-400 font-bold">{filteredIncidents.length} Active Hotspots Plotted</span>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Selected Incident Details */}
            <div className="space-y-4">
              {selectedInc && (
                <div className="bg-[#18181b] border-2 border-red-600/60 rounded-3xl p-6 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-black ${
                      selectedInc.severity === 'Critical' ? 'bg-red-600 text-white' : 'bg-amber-500 text-black'
                    }`}>
                      {selectedInc.severity.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{selectedInc.reportedTime}</span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-red-400 font-bold">{selectedInc.id} • {selectedInc.type}</span>
                    <h3 className="font-extrabold text-lg text-white leading-snug mt-1">{selectedInc.title}</h3>
                    <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-red-400" /> {selectedInc.location}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/80 p-3 rounded-2xl border border-zinc-800">
                    {selectedInc.description}
                  </p>

                  {/* Resource Fulfillment Matcher */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-zinc-300">
                      <span>RESOURCE FULFILLMENT</span>
                      <span>STATUS</span>
                    </div>

                    {selectedInc.requiredResources.map((res, rIdx) => {
                      const pct = Math.round((res.fulfilled / res.requested) * 100);
                      return (
                        <div key={rIdx} className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-xs font-mono space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-zinc-200 font-bold">{res.name}</span>
                            <span className="text-red-400">{res.fulfilled} / {res.requested}</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-red-600 rounded-full" style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Field Team Dispatch */}
                  <div className="pt-2 border-t border-zinc-800 space-y-1 text-xs font-mono">
                    <span className="text-zinc-400 block font-bold">DEPLOYED UNITS:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedInc.assignedTeams.map((team, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 bg-zinc-800 text-zinc-200 rounded-lg text-[11px] font-bold border border-zinc-700">
                          ⚡ {team}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LOGISTICS & RESOURCE BOARD */}
        {activeTab === 'resources' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h2 className="font-extrabold text-xl text-white font-mono">Disaster Relief Logistics Depot</h2>
              <p className="text-xs text-zinc-400 font-mono">Warehouse stockpile status and real-time field deployments</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map(res => (
                <div key={res.id} className="bg-[#18181b] p-5 rounded-2xl border border-zinc-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">{res.category}</span>
                      <h3 className="font-bold text-sm text-white">{res.name}</h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-red-400">{res.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-zinc-900 p-3 rounded-xl text-xs font-mono">
                    <div>
                      <span className="text-zinc-400 block">Available Stock</span>
                      <span className="text-lg font-black text-emerald-400">{res.available} {res.unit}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">Active Deployed</span>
                      <span className="text-lg font-black text-red-500">{res.deployed} {res.unit}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => allocateResource(res.id, 2)}
                    disabled={res.available <= 0}
                    className="w-full py-2 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 text-white font-mono font-bold text-xs rounded-xl transition shadow-md"
                  >
                    Deploy 2 {res.unit} to Active Front
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EAS BROADCAST CENTER */}
        {activeTab === 'broadcast' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h2 className="font-extrabold text-xl text-white font-mono">Emergency Alert System (EAS) Radio Console</h2>
              <p className="text-xs text-zinc-400 font-mono">Push geofenced emergency warnings directly to civilian devices and tactical radios</p>
            </div>

            <form onSubmit={handleBroadcastSubmit} className="bg-[#18181b] p-6 rounded-2xl border border-zinc-800 space-y-4 font-mono text-xs shadow-xl">
              <div className="space-y-1">
                <label className="text-zinc-300 font-bold">Broadcast Transmission Channel</label>
                <select
                  value={broadcastChannel}
                  onChange={e => setBroadcastChannel(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500"
                >
                  <option value="EAS High Priority">EAS High Priority (Civilian Alert)</option>
                  <option value="Field Teams Tactical">Field Teams Tactical Net</option>
                  <option value="Hospital Coordination">Hospital & Triage Channel</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-bold">Emergency Warning Text</label>
                <textarea
                  rows="3"
                  required
                  placeholder="e.g. MANDATORY EVACUATION: Sector 4 Lowlands proceed immediately to East High Shelter."
                  value={broadcastText}
                  onChange={e => setBroadcastText(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500 font-sans"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider"
              >
                <Megaphone className="w-4 h-4" /> Transmit EAS Emergency Flash
              </button>
            </form>

            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-xs text-zinc-400 font-mono uppercase">Broadcast Transmission Log</h3>
              {broadcasts.map(bc => (
                <div key={bc.id} className="bg-[#18181b] p-4 rounded-2xl border border-zinc-800 space-y-1 font-mono text-xs">
                  <div className="flex justify-between items-center text-red-400">
                    <span className="font-bold">{bc.channel}</span>
                    <span className="text-zinc-500">{bc.time}</span>
                  </div>
                  <p className="text-zinc-200 font-sans">{bc.text}</p>
                  <span className="text-[10px] text-zinc-500 block pt-1">Issued by: {bc.sender}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* NEW INCIDENT MODAL */}
      {showNewIncidentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-zinc-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl font-mono text-xs">
            <h3 className="font-black text-base text-white">Log Critical Incident</h3>
            <form onSubmit={handleIncidentSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-zinc-300 font-bold">Incident Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hazardous chemical spill near rail depot"
                  value={incTitle}
                  onChange={e => setIncTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-300 font-bold">Disaster Type</label>
                  <select
                    value={incType}
                    onChange={e => setIncType(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="Flood">Flood / Water</option>
                    <option value="Wildfire">Wildfire</option>
                    <option value="Infrastructure">Infrastructure Collapse</option>
                    <option value="Hazmat">Hazmat / Chemical</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-300 font-bold">Severity</label>
                  <select
                    value={incSeverity}
                    onChange={e => setIncSeverity(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="Critical">Critical (Tier 1)</option>
                    <option value="Severe">Severe (Tier 2)</option>
                    <option value="Moderate">Moderate (Tier 3)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-bold">Sector / Grid Coordinates</label>
                <input
                  type="text"
                  placeholder="e.g. Sector 7 North Bridge"
                  value={incLocation}
                  onChange={e => setIncLocation(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewIncidentModal(false)}
                  className="w-1/2 py-2.5 bg-zinc-800 text-zinc-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-md"
                >
                  Deploy & Pin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-[#18181b] py-5 px-4 text-center text-xs font-mono text-zinc-500">
        AEGIS-RESPONSE • TACTICAL DISASTER MATRIX • REAL-TIME EMERGENCY RESOURCE ALLOCATION
      </footer>
    </div>
  );
}
