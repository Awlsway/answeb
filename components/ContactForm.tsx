
import React, { useState } from 'react';
import { LanguageCode, Lead } from '../types';

interface ContactFormProps {
  language: LanguageCode;
  onSubmit: (lead: Lead) => Promise<boolean>;
}

export const ContactForm: React.FC<ContactFormProps> = ({ language, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Lead>>({
    interest: 'Clinic App',
    language_code: language
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const success = await onSubmit({ ...formData as Lead, language_code: language });
    if (success) {
      setStatus('success');
      setFormData({ interest: 'Clinic App' });
    } else {
      setStatus('error');
    }
  };

  const labels = {
    en: { title: 'Contact', name: 'Name', email: 'Email', message: 'Message', submit: 'Send Inquiry', success: 'Inquiry Sent.' },
    my: { title: 'ဆက်သွယ်ရန်', name: 'အမည်', email: 'အီးမေးလ်', message: 'စာသား', submit: 'ပေးပို့ရန်', success: 'ပေးပို့ပြီးပါပြီ။' }
  }[language];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 text-center">
          {labels.title}
        </h2>

        {status === 'success' ? (
          <div className="text-center py-10">
            <p className="text-sm font-bold text-black">{labels.success}</p>
            <button onClick={() => setStatus('idle')} className="mt-4 text-xs text-gray-400 hover:text-black">New Message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              required
              placeholder={labels.name}
              className="w-full px-4 py-3 bg-gray-50 text-sm border-none rounded focus:ring-1 focus:ring-black outline-none transition-all"
              value={formData.name || ''}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input
              required
              type="email"
              placeholder={labels.email}
              className="w-full px-4 py-3 bg-gray-50 text-sm border-none rounded focus:ring-1 focus:ring-black outline-none transition-all"
              value={formData.email || ''}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <textarea
              required
              placeholder={labels.message}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 text-sm border-none rounded focus:ring-1 focus:ring-black outline-none transition-all resize-none"
              value={formData.message || ''}
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
            <button
              disabled={status === 'submitting'}
              type="submit"
              className="w-full bg-black text-white text-xs font-bold py-3 uppercase tracking-widest rounded hover:bg-gray-800 transition-all disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending...' : labels.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
