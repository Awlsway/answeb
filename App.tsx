
import React, { useState, useEffect } from 'react';
import { LanguageCode, AppState, Lead } from './types';
import { fetchAllData, submitLead } from './supabaseService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    language: 'en',
    products: [],
    testimonials: [],
    sections: {},
    isLoading: true,
    error: null,
  });

  const loadData = async (lang: LanguageCode) => {
    setState(prev => ({ ...prev, isLoading: true, language: lang }));
    try {
      const data = await fetchAllData(lang);
      setState(prev => ({ ...prev, ...data, isLoading: false }));
    } catch (err) {
      setState(prev => ({ ...prev, error: 'Failed to load content', isLoading: false }));
    }
  };

  useEffect(() => {
    loadData(state.language);
  }, []);

  const handleLanguageChange = (lang: LanguageCode) => {
    loadData(lang);
  };

  const handleLeadSubmit = async (lead: Lead) => {
    try {
      await submitLead(lead);
      return true;
    } catch (err) {
      return false;
    }
  };

  if (state.isLoading && state.products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-black selection:text-white">
      <Navbar currentLang={state.language} onLangChange={handleLanguageChange} />
      
      <main className="flex-grow">
        <Hero section={state.sections['hero_main']} isLoading={state.isLoading} />
        
        <ProductSection products={state.products} language={state.language} />
        
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
              {state.language === 'en' ? 'Our Vision' : 'ကျွန်ုပ်တို့၏ မျှော်မှန်းချက်'}
            </h2>
            <p className="text-xl md:text-2xl font-medium text-black leading-snug">
              {state.sections['about_us']?.subtext}
            </p>
          </div>
        </section>

        <Testimonials testimonials={state.testimonials} language={state.language} />
        <ContactForm language={state.language} onSubmit={handleLeadSubmit} />
      </main>

      <Footer language={state.language} />
    </div>
  );
};

export default App;
