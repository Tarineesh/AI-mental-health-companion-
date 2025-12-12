import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { MoodTracker } from './components/MoodTracker';
import { Resources } from './components/Resources';
import { Message, ViewState, MoodEntry } from './types';
import { INITIAL_MESSAGE } from './constants';
import { MessageSquare, Heart, BookOpen, Leaf, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'model',
      text: INITIAL_MESSAGE
    }
  ]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const handleLogMood = (entry: MoodEntry) => {
    setMoodHistory(prev => [...prev, entry]);
  };

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
        currentView === view
          ? 'bg-sage-600 text-white shadow-md'
          : 'text-slate-600 hover:bg-sage-100 hover:text-sage-700'
      }`}
    >
      <Icon size={20} strokeWidth={currentView === view ? 2.5 : 2} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen w-full bg-sage-50 overflow-hidden relative">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col p-6 bg-white border-r border-sage-200 shadow-sm z-10">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-sage-600 rounded-lg flex items-center justify-center text-white">
            <Leaf size={20} />
          </div>
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Serene</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem view="chat" icon={MessageSquare} label="Companion" />
          <NavItem view="mood" icon={Heart} label="Check-in" />
          <NavItem view="resources" icon={BookOpen} label="Library" />
        </nav>

        <div className="p-4 bg-sage-50 rounded-2xl border border-sage-100 mt-auto">
          <p className="text-xs text-sage-500 text-center leading-relaxed">
            "Breathe. You are exactly where you need to be."
          </p>
        </div>
      </aside>

      {/* Mobile Header & Overlay */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-sage-200 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sage-600 rounded-lg flex items-center justify-center text-white">
            <Leaf size={18} />
          </div>
          <span className="font-semibold text-slate-800">Serene</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-20 pt-20 px-6 animate-fade-in">
          <nav className="space-y-4">
            <NavItem view="chat" icon={MessageSquare} label="Companion" />
            <NavItem view="mood" icon={Heart} label="Mood Check-in" />
            <NavItem view="resources" icon={BookOpen} label="Wellness Library" />
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative h-full pt-16 md:pt-0">
        <div className="absolute inset-0 max-w-5xl mx-auto p-4 md:p-6 lg:p-8 h-full">
          {currentView === 'chat' && (
            <div className="h-full animate-fade-in">
              <ChatInterface messages={messages} setMessages={setMessages} />
            </div>
          )}
          
          {currentView === 'mood' && (
             <div className="h-full animate-fade-in">
              <MoodTracker onLogMood={handleLogMood} recentMoods={moodHistory} />
            </div>
          )}

          {currentView === 'resources' && (
             <div className="h-full animate-fade-in">
              <Resources />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
