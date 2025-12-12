import React, { useState } from 'react';
import { RESOURCES } from '../constants';
import { Clock, ChevronRight, Wind, Anchor, Moon, Heart } from 'lucide-react';

export const Resources: React.FC = () => {
  const [activeResourceId, setActiveResourceId] = useState<string | null>(null);

  const getIcon = (category: string) => {
    switch(category) {
      case 'breathing': return Wind;
      case 'grounding': return Anchor;
      case 'sleep': return Moon;
      case 'affirmation': return Heart;
      default: return Heart;
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-slate-800">Wellness Library</h2>
        <p className="text-sage-500">Simple techniques for a calmer mind.</p>
      </div>

      <div className="grid gap-4">
        {RESOURCES.map((resource) => {
          const Icon = getIcon(resource.category);
          const isActive = activeResourceId === resource.id;

          return (
            <div 
              key={resource.id} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                isActive ? 'border-sage-400 shadow-md' : 'border-sage-100 shadow-sm hover:border-sage-300'
              }`}
            >
              <button
                onClick={() => setActiveResourceId(isActive ? null : resource.id)}
                className="w-full flex items-center p-5 text-left"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 shrink-0 ${
                  isActive ? 'bg-sage-600 text-white' : 'bg-sage-50 text-sage-600'
                }`}>
                  <Icon size={24} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-slate-800">{resource.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wide">
                      {resource.category}
                    </span>
                    {resource.duration && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {resource.duration}
                      </span>
                    )}
                  </div>
                </div>

                <ChevronRight 
                  size={20} 
                  className={`text-slate-400 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} 
                />
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-slate-600 leading-relaxed whitespace-pre-line border-t border-dashed border-sage-100 mx-5 mt-2 mb-5">
                  {resource.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
