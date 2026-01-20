
import React from 'react';
import { ContentSection } from '../types';

interface HeroProps {
  section: ContentSection | undefined;
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ section, isLoading }) => {
  return (
    <section className="bg-white pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-[1.1] mb-6">
          {section?.headline}
        </h1>
        <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
          {section?.subtext}
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#solutions"
            className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
          >
            {section?.cta_label || 'View Solutions'}
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5 bg-white border border-gray-200 text-black text-sm font-medium rounded hover:bg-gray-50 transition-colors"
          >
            Inquiry
          </a>
        </div>
      </div>
    </section>
  );
};
