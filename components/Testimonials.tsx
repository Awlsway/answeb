
import React from 'react';
import { Testimonial, LanguageCode } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  language: LanguageCode;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, language }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((t) => (
            <div key={t.id} className="flex flex-col">
              <div className="mb-6">
                <p className="text-lg font-medium text-black leading-snug">
                  “{t.quote}”
                </p>
              </div>
              <div className="mt-auto flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 grayscale">
                  <img src={t.logo_url} alt={t.client_name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-black">{t.client_name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t.business_name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
