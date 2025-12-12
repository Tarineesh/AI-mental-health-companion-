import React, { useState } from 'react';
import { MoodEntry } from '../types';
import { Frown, Meh, Smile, Sun, CloudRain } from 'lucide-react';

interface MoodTrackerProps {
  onLogMood: (entry: MoodEntry) => void;
  recentMoods: MoodEntry[];
}

const MOODS = [
  { value: 1, icon: CloudRain, label: 'Rough', color: 'text-blue-500', bg: 'bg-blue-50' },
  { value: 2, icon: Frown, label: 'Struggling', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { value: 3, icon: Meh, label: 'Okay', color: 'text-gray-500', bg: 'bg-gray-50' },
  { value: 4, icon: Smile, label: 'Good', color: 'text-sage-600', bg: 'bg-sage-50' },
  { value: 5, icon: Sun, label: 'Great', color: 'text-amber-500', bg: 'bg-amber-50' },
];

export const MoodTracker: React.FC<MoodTrackerProps> = ({ onLogMood, recentMoods }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedMood !== null) {
      onLogMood({
        id: Date.now().toString(),
        timestamp: Date.now(),
        rating: selectedMood,
        note
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedMood(null);
        setNote('');
      }, 2000);
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      
      {/* Check-in Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-sage-100 animate-slide-up">
        <h2 className="text-2xl font-medium text-slate-800 mb-2">How are you feeling right now?</h2>
        <p className="text-sage-500 mb-8">Take a moment to check in with yourself.</p>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-10 animate-fade-in text-center">
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 mb-4">
              <Sun size={32} />
            </div>
            <h3 className="text-xl font-medium text-slate-800">Mood logged</h3>
            <p className="text-slate-500">Thank you for checking in.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-2 md:gap-4 mb-8">
              {MOODS.map((mood) => {
                const Icon = mood.icon;
                const isSelected = selectedMood === mood.value;
                return (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${
                      isSelected 
                        ? `${mood.bg} ring-2 ring-offset-2 ring-sage-300 scale-105` 
                        : 'hover:bg-slate-50 hover:scale-105'
                    }`}
                  >
                    <Icon 
                      size={32} 
                      className={`${isSelected ? mood.color : 'text-slate-400'} transition-colors`} 
                      strokeWidth={isSelected ? 2.5 : 1.5}
                    />
                    <span className={`text-xs font-medium ${isSelected ? 'text-slate-800' : 'text-slate-400'}`}>
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note (optional)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 focus:ring-2 focus:ring-sage-200 focus:border-sage-300 resize-none h-24 mb-6"
            />

            <button
              onClick={handleSubmit}
              disabled={selectedMood === null}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                selectedMood !== null
                  ? 'bg-sage-600 text-white hover:bg-sage-700 shadow-md'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              Log Mood
            </button>
          </>
        )}
      </div>

      {/* History Card */}
      {recentMoods.length > 0 && (
        <div className="bg-white/60 rounded-3xl p-6 border border-sage-100 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Recent Check-ins</h3>
          <div className="space-y-3">
            {[...recentMoods].reverse().slice(0, 5).map((entry) => {
              const moodConfig = MOODS.find(m => m.value === entry.rating);
              const MoodIcon = moodConfig?.icon || Meh;
              return (
                <div key={entry.id} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-sage-50 shadow-sm">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${moodConfig?.bg || 'bg-gray-100'}`}>
                    <MoodIcon size={20} className={moodConfig?.color || 'text-gray-500'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-medium text-slate-700">{moodConfig?.label}</span>
                      <span className="text-xs text-slate-400">
                        {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-slate-500 truncate">{entry.note}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
