import React, { useState, useEffect } from 'react';
import type { ViewState, Faction, Character, WorldIntel, NovelChapter } from './types';
import { WORLD_INTEL, FACTIONS, NOVEL_CHAPTERS } from './constants';
import { GlitchText } from './components/GlitchText';

// Icons
const IconArchive = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconHome = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconArrowLeft = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const IconBook = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;

// Category Icons
const IconPlanet = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
const IconHazard = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IconDna = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"/></svg>;
const IconBeast = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-.6 0-1.2.5-1.2 1.1v2.1C10 5.6 9.4 6 8.8 6c-3 0-5.5 2.2-6.4 5.2-.6 2.1.2 4.3 2 5.5.9.6 2 1 3.2 1 .3 0 .7 0 1-.1L9 21c0 .6.4 1 1 1h4c.6 0 1-.4 1-1l.4-3.4c.3.1.6.1 1 .1 1.2 0 2.3-.3 3.2-1 1.7-1.1 2.6-3.3 2-5.5-.9-3-3.4-5.2-6.4-5.2-.6 0-1.2-.4-1.2-.8V3.1c0-.6-.6-1.1-1.2-1.1Z"/></svg>;
const IconBox = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z"/><path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z"/><path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z"/><path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z"/></svg>;
const IconHex = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>;


const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [activeFactionId, setActiveFactionId] = useState<string>('INDEX');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [bootSequence, setBootSequence] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (bootSequence) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white font-mono uppercase tracking-widest">
        <div className="animate-pulse mb-4 text-orange-500 font-bold">System Initializing...</div>
        <div className="w-80 h-2 bg-gray-800 rounded-sm overflow-hidden">
          <div className="h-full bg-white animate-[width_2s_ease-out_forwards]" style={{ width: '0%' }}></div>
        </div>
        <div className="mt-3 text-xs text-gray-500">Connecting to CATERPILLAR-186f Database</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-ark-black text-ark-white overflow-hidden font-sans selection:bg-orange-500 selection:text-black relative">
      {/* Modal for Character Details */}
      {selectedCharacter && (
        <CharacterDetailView char={selectedCharacter} onClose={() => setSelectedCharacter(null)} factionName={FACTIONS.find(f => f.characters.some(c => c.id === selectedCharacter.id))?.name || 'UNKNOWN'} />
      )}

      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 bg-ark-dark border-r border-ark-gray flex flex-col justify-between shrink-0 z-40 overflow-y-auto">
        <div>
          <div className="p-6 border-b border-ark-gray flex items-center gap-3 sticky top-0 bg-ark-dark z-10">
             <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-xl clip-corner-bl">
                C
             </div>
             <div className="hidden md:block">
                <h1 className="font-bold tracking-tighter text-lg leading-none">DATABASE</h1>
                <span className="text-[10px] text-gray-500 tracking-widest">VER 3.0.2</span>
             </div>
          </div>
          
          <div className="mt-8 flex flex-col gap-2 px-2 pb-8">
            <NavButton 
              active={view === 'DASHBOARD'} 
              onClick={() => setView('DASHBOARD')} 
              icon={<IconHome />} 
              label="DASHBOARD" 
            />
            <NavButton 
              active={view === 'ARCHIVE'} 
              onClick={() => setView('ARCHIVE')} 
              icon={<IconArchive />} 
              label="WORLD ARCHIVE" 
            />
            
            {/* Factions Menu with Submenu */}
            <div className="flex flex-col">
              <NavButton 
                active={view === 'FACTIONS'} 
                onClick={() => { setView('FACTIONS'); setActiveFactionId('INDEX'); }} 
                icon={<IconUsers />} 
                label="FACTIONS" 
              />
              
              {/* Submenu List */}
              {view === 'FACTIONS' && (
                <div className="hidden md:flex flex-col ml-12 border-l border-gray-800 my-2 gap-1 animate-[fadeIn_0.3s_ease-out]">
                  {FACTIONS.map(faction => (
                    <button
                      key={faction.id}
                      onClick={() => setActiveFactionId(faction.id)}
                      className={`
                        text-left px-4 py-2 text-xs font-mono uppercase transition-colors relative
                        ${activeFactionId === faction.id 
                          ? 'text-orange-500 font-bold' 
                          : 'text-gray-500 hover:text-gray-300'
                        }
                      `}
                    >
                       {activeFactionId === faction.id && (
                         <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-[1px] w-2 h-[1px] bg-orange-500"></div>
                       )}
                       {faction.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Novel Menu */}
            <NavButton 
              active={view === 'NOVEL'} 
              onClick={() => setView('NOVEL')} 
              icon={<IconBook />} 
              label="NOVEL" 
            />
          </div>
        </div>

        <div className="p-6 border-t border-ark-gray hidden md:block text-xs text-gray-600 font-mono sticky bottom-0 bg-ark-dark">
          <p>TERMINAL: ONLINE</p>
          <p>USER: GUEST</p>
          <p>LOC: UNKNOWN</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black z-0">
        {/* Header Bar */}
        <header className="h-16 bg-ark-black/90 backdrop-blur border-b border-ark-gray flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <span className="text-orange-500 font-mono text-xs">/// SYSTEM.ROOT</span>
              <div className="h-4 w-[1px] bg-gray-700"></div>
              <h2 className="text-xl font-bold uppercase tracking-wider">{view}</h2>
              {view === 'FACTIONS' && activeFactionId !== 'INDEX' && (
                <>
                  <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                  <span className="text-sm text-gray-400 font-mono uppercase">
                    {FACTIONS.find(f => f.id === activeFactionId)?.name}
                  </span>
                </>
              )}
           </div>
           <div className="flex gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
           </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          {view === 'DASHBOARD' && <DashboardView setView={setView} setFactionView={(id) => { setView('FACTIONS'); setActiveFactionId(id); }} />}
          {view === 'ARCHIVE' && <ArchiveView />}
          {view === 'FACTIONS' && <FactionView activeFactionId={activeFactionId} setActiveFactionId={setActiveFactionId} onCharacterSelect={setSelectedCharacter} />}
          {view === 'NOVEL' && <NovelView />}
        </div>
      </main>
    </div>
  );
};

// --- Sub-Components ---

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`
      flex items-center gap-4 px-4 py-3 w-full transition-all duration-200 clip-corner-tr text-sm font-bold tracking-wide
      ${active 
        ? 'bg-white text-black translate-x-1' 
        : 'text-gray-400 hover:text-white hover:bg-ark-gray'
      }
    `}
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
  </button>
);

const DashboardView: React.FC<{ setView: (v: ViewState) => void; setFactionView: (id: string) => void }> = ({ setView, setFactionView }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-[fadeIn_0.5s_ease-out]">
      <section className="relative h-64 md:h-80 border border-white/20 p-8 flex flex-col justify-end overflow-hidden bg-gradient-to-t from-black to-gray-900 group cursor-pointer clip-corner-both" onClick={() => setView('ARCHIVE')}>
         <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <h1 className="text-9xl font-black text-white/5 font-mono select-none">186f</h1>
         </div>
         <div className="relative z-10">
            <div className="text-orange-500 font-mono text-sm mb-2">PLANETARY STATUS: UNSTABLE</div>
            <GlitchText text="CATERPILLAR-186f" className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white" />
            <p className="max-w-2xl text-gray-400 text-sm md:text-base border-l-2 border-orange-500 pl-4">
               인류가 정착한 안개와 비의 행성. 붕괴 현상과 케루빔, 그리고 그곳에서 살아가는 이종족들의 기록.
            </p>
         </div>
         <div className="absolute bottom-4 right-4 flex gap-2">
            <span className="px-2 py-1 bg-white text-black text-xs font-bold">ACCESS</span>
         </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <DashboardCard 
           title="FACTIONS" 
           subtitle="ORGANIZATIONS & GROUPS" 
           desc="붕괴 대응 기관 및 외곽 세력 정보 열람" 
           onClick={() => setFactionView('INDEX')}
           index="01"
         />
         <DashboardCard 
           title="PHENOMENA" 
           subtitle="COLLAPSE & OCULAR" 
           desc="붕괴 현상과 오큘러 위협 분석 보고서" 
           onClick={() => setView('ARCHIVE')}
           index="02"
         />
         <DashboardCard 
           title="PERSONNEL" 
           subtitle="CHARACTER FILES" 
           desc="등록된 에이전트 및 주요 인물 프로필" 
           onClick={() => setFactionView('INDEX')}
           index="03"
         />
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{ title: string; subtitle: string; desc: string; onClick: () => void; index: string }> = ({ title, subtitle, desc, onClick, index }) => (
  <div onClick={onClick} className="bg-ark-dark border border-white/10 p-6 hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer h-48 flex flex-col justify-between clip-corner-bl relative">
     <div className="absolute top-4 right-4 text-xs font-mono opacity-50">{index}</div>
     <div>
        <h3 className="text-2xl font-bold mb-1 group-hover:translate-x-1 transition-transform">{title}</h3>
        <p className="text-xs font-mono opacity-60 uppercase">{subtitle}</p>
     </div>
     <div className="border-t border-current pt-4 opacity-70 text-sm">
        {desc}
     </div>
  </div>
);

const ArchiveView: React.FC = () => {
  const getIconByCategory = (category: WorldIntel['category']) => {
    switch (category) {
      case 'PLANET': return <IconPlanet />;
      case 'PHENOMENON': return <IconHazard />;
      case 'DEMI_HUMAN': return <IconDna />;
      case 'INDIGENOUS_LIFE': return <IconBeast />;
      case 'MATERIAL': return <IconComponent />;
      case 'ITEM': return <IconBox />;
      default: return <IconHex />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto grid gap-8 pb-20 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-3xl font-black uppercase">World Archive</h2>
        <div className="h-1 w-20 bg-orange-500"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WORLD_INTEL.map((item, idx) => (
          <div key={idx} className="bg-ark-dark/50 border-l-4 border-white p-6 hover:border-orange-500 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-orange-400">{getIconByCategory(item.category)}</span>
                {item.title}
              </h3>
              <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-orange-400 font-mono">{item.category.replace('_', ' ')}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FactionView: React.FC<{ activeFactionId: string; setActiveFactionId: (id: string) => void; onCharacterSelect: (char: Character) => void }> = ({ activeFactionId, setActiveFactionId, onCharacterSelect }) => {
  
  if (activeFactionId === 'INDEX') {
    return (
      <div className="max-w-7xl mx-auto animate-[fadeIn_0.5s_ease-out] pb-20">
         <div className="flex flex-col gap-2 mb-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter">FACTION OVERVIEW</h2>
            <div className="h-1 w-24 bg-orange-500"></div>
            <p className="text-gray-400 text-sm mt-2 max-w-2xl">
              CATERPILLAR-186f의 주요 세력 및 기관 데이터베이스입니다. 각 세력의 항목을 선택하여 소속 인원 및 상세 정보를 열람하십시오.
            </p>
         </div>

         <div className="grid grid-cols-1 gap-6">
            {FACTIONS.map(faction => (
               <div 
                 key={faction.id} 
                 onClick={() => setActiveFactionId(faction.id)}
                 className="bg-ark-dark/40 border border-white/5 p-6 md:p-8 hover:bg-ark-dark hover:border-orange-500/50 cursor-pointer transition-all duration-300 group relative overflow-hidden clip-corner-bl flex flex-col md:flex-row gap-6 md:items-start"
               >
                  {/* Decorative ID */}
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 font-black text-6xl md:text-8xl uppercase select-none transition-opacity pointer-events-none">
                     {faction.id.substring(0, 3)}
                  </div>
                  
                  <div className="flex-1 relative z-10">
                     <div className="flex items-center gap-3 text-xs font-mono text-orange-500 mb-2">
                        <span>{faction.location.toUpperCase()}</span>
                        <span>//</span>
                        <span>{faction.type.toUpperCase()}</span>
                     </div>
                     <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-orange-500 transition-colors uppercase tracking-tight">{faction.name}</h3>
                     <p className="text-gray-300 text-sm leading-relaxed max-w-4xl border-l-2 border-gray-700 pl-4 group-hover:border-orange-500 transition-colors">
                        {faction.description}
                     </p>
                     
                     <div className="mt-6 flex items-center text-xs font-bold text-gray-500 group-hover:text-white transition-colors uppercase tracking-widest">
                        <span>View Personnel Records</span>
                        <div className="w-8 h-[1px] bg-current ml-3 mr-1"></div>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    );
  }

  const activeFaction = FACTIONS.find(f => f.id === activeFactionId) || FACTIONS[0];

  return (
    <div className="flex flex-col gap-6 h-full pb-20 animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-4">
        <button 
          onClick={() => setActiveFactionId('INDEX')}
          className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-orange-500 transition-colors mb-4"
        >
          <IconArrowLeft />
          BACK TO OVERVIEW
        </button>
      </div>

      {/* Faction Details & Characters */}
      <div className="flex-1 bg-ark-dark/30 border border-white/5 p-4 md:p-8 clip-corner-tr overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-end justify-between border-b border-gray-700 pb-4 mb-4">
             <div>
               <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight">{activeFaction.name}</h2>
               <span className="text-orange-500 font-mono text-xs">{activeFaction.location.toUpperCase()} // {activeFaction.type.toUpperCase()}</span>
             </div>
             <div className="hidden md:block text-4xl font-bold text-white/5 select-none">{activeFaction.id.toUpperCase()}</div>
          </div>
          {/* Main description is already shown in Index, but repeating it here for context is good, or we can focus on Lore Sections */}
          <p className="text-gray-300 max-w-2xl text-sm md:text-base leading-relaxed mb-6">
            {activeFaction.description}
          </p>

          {/* Lore Sections (New Feature for Laws, etc.) */}
          {activeFaction.loreSections && activeFaction.loreSections.map((section, idx) => (
            <div key={idx} className="mb-6 bg-black/40 border border-dashed border-gray-700 p-6 relative">
              <div className="absolute -top-3 left-4 bg-ark-dark px-2 text-xs font-bold text-orange-500 border border-gray-700">
                {section.title}
              </div>
              <p className="text-sm font-mono whitespace-pre-wrap leading-relaxed text-gray-400">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 inline-block"></span>
            Registered Personnel ({activeFaction.characters.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {activeFaction.characters.map(char => (
              <CharacterCard key={char.id} char={char} onClick={() => onCharacterSelect(char)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CharacterCard: React.FC<{ char: Character; onClick: () => void }> = ({ char, onClick }) => {
  return (
    <div onClick={onClick} className="bg-black border border-gray-800 hover:border-orange-500 transition-all duration-300 p-5 group flex flex-col h-full relative overflow-hidden cursor-pointer">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent -mr-8 -mt-8 rounded-full"></div>
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-lg text-white group-hover:text-orange-400 transition-colors">{char.name}</h4>
          <span className="text-xs text-gray-500 font-mono">{char.race}</span>
        </div>
        {char.role && (
          <span className="text-[10px] border border-gray-700 px-1.5 py-0.5 text-gray-400 font-mono uppercase">
            {char.role}
          </span>
        )}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        <p className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed line-clamp-4">
          {char.description}
        </p>
        
        {char.orlando && (
          <div className="bg-ark-dark/80 p-2 text-[10px] border-l-2 border-orange-500">
            <span className="text-gray-500 block mb-0.5">ORLANDO</span>
            <span className="text-orange-100">{char.orlando}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-dashed border-gray-800">
         <p className="text-xs text-gray-500 italic truncate">"{char.quote}"</p>
      </div>

      {/* Height stat */}
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-gray-700">
        HT: {char.height || 'N/A'}
      </div>
    </div>
  );
};

const CharacterDetailView: React.FC<{ char: Character; onClose: () => void; factionName: string }> = ({ char, onClose, factionName }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      <div className="absolute inset-0 z-0 bg-striped opacity-5 pointer-events-none"></div>
      
      {/* Background Image Layer (Dimmed) */}
       {char.imageUrl && (
          <div className="absolute left-0 top-0 h-full w-full md:w-1/2 opacity-20 md:opacity-50 pointer-events-none overflow-hidden">
             <img 
               src={char.imageUrl} 
               alt="" 
               className="h-full w-full object-cover object-top opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black"></div>
          </div>
       )}
      
      {/* Back Button */}
      <button 
        onClick={onClose} 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white/50 hover:text-white hover:bg-white/10 px-4 py-2 transition-all group"
      >
        <div className="group-hover:-translate-x-1 transition-transform">
          <IconArrowLeft />
        </div>
        <span className="font-bold tracking-widest">BACK</span>
      </button>

      {/* Main Content Container */}
      <div className="w-full h-full max-w-7xl relative z-10 flex flex-col md:flex-row p-6 md:p-12 pointer-events-none">
        
        {/* Right Content Panel - Scrollable Text Information */}
        <div className="w-full md:w-2/3 ml-auto h-full pointer-events-auto flex flex-col">
            <div className="bg-black/80 backdrop-blur border border-white/20 p-8 h-full flex flex-col clip-corner-tr shadow-2xl overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-orange-500/50 rounded-tr-3xl pointer-events-none"></div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-50">
                     <span className="font-bold tracking-widest text-xs">STATUS</span>
                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </div>

                {/* Header */}
                <div className="mb-8 border-b border-white/10 pb-6">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3 text-xs font-mono text-orange-500 mb-1">
                            <span>/// CLASSIFIED FILES</span>
                            <span>::</span>
                            <span>{factionName.toUpperCase()}</span>
                        </div>
                        <div className="text-4xl font-black text-white/10 font-mono select-none">{char.id.toUpperCase()}</div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2">{char.name}</h1>
                    <div className="flex flex-wrap gap-2">
                       {char.role && <span className="px-2 py-1 bg-white text-black text-xs font-bold font-mono">{char.role}</span>}
                       <span className="px-2 py-1 border border-white/30 text-xs font-bold font-mono text-gray-400">{char.race}</span>
                       {char.height && <span className="px-2 py-1 border border-white/30 text-xs font-bold font-mono text-gray-400">{char.height}</span>}
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto pr-4 space-y-8 custom-scrollbar">
                    {/* Description */}
                    <section>
                        <h3 className="text-orange-500 font-bold tracking-widest text-sm mb-3 flex items-center gap-2">
                            <span className="w-1 h-4 bg-orange-500"></span>
                            PROFILE OVERVIEW
                        </h3>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base font-sans">
                            {char.description}
                        </p>
                    </section>
                    
                    {/* Background Story - New Field */}
                    {char.background && (
                      <section>
                          <h3 className="text-orange-500 font-bold tracking-widest text-sm mb-3 flex items-center gap-2">
                              <span className="w-1 h-4 bg-orange-500"></span>
                              BACKGROUND ARCHIVE
                          </h3>
                          <div className="bg-white/5 p-4 rounded-sm border border-white/10">
                              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base font-sans">
                                  {char.background}
                              </p>
                          </div>
                      </section>
                    )}

                    {/* Combat Analysis - New Field */}
                    {char.combatAnalysis && (
                      <section>
                          <h3 className="text-orange-500 font-bold tracking-widest text-sm mb-3 flex items-center gap-2">
                              <span className="w-1 h-4 bg-orange-500"></span>
                              TACTICAL ANALYSIS
                          </h3>
                          <div className="bg-white/5 p-4 rounded-sm border border-white/10 border-l-4 border-l-orange-500">
                              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base font-sans">
                                  {char.combatAnalysis}
                              </p>
                          </div>
                      </section>
                    )}

                    {/* Orlando / Equipment */}
                    {char.orlando && (
                         <section>
                            <h3 className="text-orange-500 font-bold tracking-widest text-sm mb-3 flex items-center gap-2">
                                <span className="w-1 h-4 bg-orange-500"></span>
                                ORLANDO // EQUIPMENT
                            </h3>
                            <div className="bg-white/5 border-l-2 border-orange-500 p-4">
                                <p className="text-gray-200 text-sm font-mono">{char.orlando}</p>
                            </div>
                        </section>
                    )}

                    {/* Tags */}
                    {char.tags && (
                        <section>
                            <h3 className="text-gray-500 font-bold tracking-widest text-xs mb-3">COMBAT TAGS</h3>
                            <div className="flex flex-wrap gap-2">
                                {char.tags.map(tag => (
                                    <span key={tag} className="text-xs font-mono text-gray-400 bg-gray-900 px-2 py-1 rounded">#{tag}</span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Footer Quote */}
                <div className="mt-6 pt-6 border-t border-dashed border-gray-700">
                    <p className="font-serif italic text-lg text-gray-400 text-center">"{char.quote}"</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const NovelView: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<NovelChapter | null>(null);

  // Added '카헤르딘' to the keywords list
  const keywords = ['붕괴', '오큘러', '케루빔', '오를란도', '이종족', '앤스', '아페', '알토', '카헤르딘'];
  
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let paragraphClass = "text-gray-300"; // default color
      
      if (line.trim().startsWith("-언제 이런걸 썼대?")) {
        paragraphClass = "text-yellow-400";
      } else if (line.trim().startsWith("-모르는게 약일걸.")) {
        paragraphClass = "text-amber-500";
      } else if (line.trim().startsWith("-이런거 쓸 시간에")) {
        paragraphClass = "text-purple-400";
      } else if (line.trim().startsWith("-우와...")) {
        paragraphClass = "text-green-400";
      } else if (line.trim().startsWith("-깡통이라고")) {
        paragraphClass = "text-orange-500";
      } else if (line.trim().startsWith("-이야~")) {
        paragraphClass = "text-blue-400";
      } else if (line.trim().startsWith("-딱 너같은")) {
        paragraphClass = "text-gray-400";
      }

      // Keyword highlighting logic
      const regex = new RegExp(`(${keywords.join('|')})`, 'g');
      const parts = line.split(regex);
      
      return (
        <div key={idx} className={`${paragraphClass} min-h-[1.5em] leading-relaxed`}>
          {parts.map((part, partIdx) => 
            keywords.includes(part) 
              ? <span key={partIdx} className="text-orange-500 font-bold">{part}</span> 
              : part
          )}
        </div>
      );
    });
  };

  if (selectedChapter) {
     return (
        <div className="animate-[fadeIn_0.3s_ease-out] pb-20 max-w-5xl mx-auto">
           {/* Navigation */}
           <button
             onClick={() => setSelectedChapter(null)}
             className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors mb-6 group"
           >
             <IconArrowLeft />
             <span className="group-hover:translate-x-1 transition-transform">BACK TO LIST</span>
           </button>

           {/* Header Area - White on Black context, Inverted */}
           <div className="bg-white text-black p-8 md:p-12 clip-corner-tr mb-2">
              <div className="flex justify-between items-start">
                 <div>
                    <span className="font-mono text-xs font-bold border border-black px-1.5 py-0.5 mb-4 inline-block">
                        CLASSIFIED RECORD
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                       {selectedChapter.title}
                    </h1>
                 </div>
                 <div className="text-6xl font-mono font-black opacity-10 select-none">
                    {NOVEL_CHAPTERS.findIndex(c => c.id === selectedChapter.id).toString().padStart(2, '0')}
                 </div>
              </div>
           </div>

           {/* Content Area */}
           <div className="border border-white/20 bg-black p-8 md:p-12 min-h-[50vh]">
              <div className="font-sans text-lg max-w-3xl">
                 {renderContent(selectedChapter.content)}
              </div>
              <div className="mt-12 pt-8 border-t border-dashed border-gray-800 text-center text-xs text-gray-600 font-mono">
                 // END OF FILE // {selectedChapter.id.toUpperCase()}
              </div>
           </div>
        </div>
     );
  }

  return (
     <div className="max-w-4xl mx-auto pb-20 animate-[fadeIn_0.5s_ease-out]">
        {/* Title Section */}
        <div className="flex flex-col gap-2 mb-12">
            <div className="flex items-center gap-4">
               <h2 className="text-5xl font-black uppercase tracking-tighter text-white">NOVEL ARCHIVE</h2>
               <span className="bg-white text-black px-2 py-1 text-xs font-bold font-mono">CONFIDENTIAL</span>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-transparent"></div>
            <p className="text-gray-400 text-sm mt-2 font-mono">
               // ACCESSING ENCRYPTED NARRATIVE DATABASE...
            </p>
        </div>

        {/* List */}
        <div className="grid gap-4">
           {NOVEL_CHAPTERS.map((chapter, idx) => (
              <div
                 key={chapter.id}
                 onClick={() => setSelectedChapter(chapter)}
                 className="group cursor-pointer relative"
              >
                 {/* Shadow box effect */}
                 <div className="absolute inset-0 bg-white translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                 {/* Main box */}
                 <div className="relative bg-black border border-white p-6 md:p-8 flex justify-between items-center hover:bg-white hover:text-black transition-colors duration-300">
                    <div className="flex items-center gap-6">
                       <span className="text-4xl font-mono font-black opacity-30 group-hover:opacity-100 transition-opacity">
                          {String(idx + 1).padStart(2, '0')}
                       </span>
                       <h3 className="text-xl md:text-2xl font-bold font-mono uppercase tracking-tight">
                          {chapter.title}
                       </h3>
                    </div>
                    <div className="group-hover:translate-x-2 transition-transform">
                       <IconArrowLeft className="rotate-180" />
                    </div>
                 </div>
              </div>
           ))}
        </div>
     </div>
  );
};

export default App;