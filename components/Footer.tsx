
import React from 'react';
import { LanguageCode } from '../types';

interface FooterProps {
  language: LanguageCode;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-white border-t border-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale">
            <div className="w-5 h-5 bg-black rounded flex items-center justify-center text-[10px] text-white font-bold">S</div>
            <span className="text-[10px] font-bold tracking-widest uppercase">SupaSolutions</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
