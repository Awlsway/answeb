
import { createClient } from '@supabase/supabase-js';
import { Product, Testimonial, ContentSection, Lead, LanguageCode } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Using mock data.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// MOCK_DATA preserved as fallback for development
const MOCK_DATA = {
  products: [
    {
      id: '1',
      slug: 'clinic-box',
      language_code: 'en' as LanguageCode,
      name: 'Clinic-in-a-Box',
      tagline: 'The Ultimate PWA for Local Healthcare',
      description: 'Streamline your clinic operations with our comprehensive digital solution including patient management, billing, and electronic prescriptions.',
      features: ['Patient Records', 'Digital Rx', 'Automated Billing', 'Cloud Sync'],
      status: 'Live',
      image_url: 'https://picsum.photos/seed/clinic/800/600',
    },
    {
      id: '2',
      slug: 'clinic-box',
      language_code: 'my' as LanguageCode,
      name: 'ဆေးခန်းစီမံခန့်ခွဲမှုစနစ်',
      tagline: 'ပြည်တွင်းဆေးခန်းများအတွက် အဆင့်မြင့် ဒီဂျစ်တယ်ဖြေရှင်းချက်',
      description: 'လူနာမှတ်တမ်းများ၊ ငွေတောင်းခံလွှာများနှင့် ဆေးညွှန်းများကို ဒီဂျစ်တယ်စနစ်ဖြင့် လွယ်ကူစွာ စီမံခန့်ခွဲနိုင်ပါသည်။',
      features: ['လူနာမှတ်တမ်း', 'ဆေးညွှန်းစနစ်', 'ငွေတောင်းခံလွှာ', 'Cloud စနစ်'],
      status: 'အသုံးပြုနိုင်ပြီ',
      image_url: 'https://picsum.photos/seed/clinic/800/600',
    }
  ],
  testimonials: [
    {
      id: 't1',
      language_code: 'en' as LanguageCode,
      client_name: 'Dr. Zaw Min',
      business_name: 'Grace Family Clinic',
      quote: 'This software has transformed how we handle patient records. No more paper clutter!',
      rating: 5,
      logo_url: 'https://picsum.photos/seed/doc1/100/100'
    },
    {
      id: 't2',
      language_code: 'my' as LanguageCode,
      client_name: 'ဒေါက်တာဇော်မင်း',
      business_name: 'Grace မိသားစုဆေးခန်း',
      quote: 'ဤဆော့ဖ်ဝဲလ်သည် ကျွန်ုပ်တို့၏ လူနာမှတ်တမ်းများကို ကိုင်တွယ်ပုံကို လုံးဝပြောင်းလဲစေခဲ့သည်။',
      rating: 5,
      logo_url: 'https://picsum.photos/seed/doc1/100/100'
    }
  ],
  sections: [
    {
      id: 's1',
      section_key: 'hero_main',
      language_code: 'en' as LanguageCode,
      headline: 'Next-Gen Software for Modern Myanmar Businesses',
      subtext: 'We build digital tools that empower local clinics, retail shops, and service providers to scale effectively.',
      cta_label: 'View Solutions'
    },
    {
      id: 's2',
      section_key: 'hero_main',
      language_code: 'my' as LanguageCode,
      headline: 'ခေတ်မီမြန်မာလုပ်ငန်းများအတွက် အဆင့်မြင့်ဆော့ဖ်ဝဲလ်များ',
      subtext: 'ပြည်တွင်းဆေးခန်းများ၊ အရောင်းဆိုင်များနှင့် ဝန်ဆောင်မှုပေးသူများအတွက် ထိရောက်သော ဒီဂျစ်တယ်ကိရိယာများကို တည်ဆောက်ပေးပါသည်။',
      cta_label: 'ဝန်ဆောင်မှုများကြည့်ရန်'
    },
    {
      id: 's3',
      section_key: 'about_us',
      language_code: 'en' as LanguageCode,
      headline: 'Dedicated to Local Innovation',
      subtext: 'Our team focuses on creating low-cost, high-impact digital solutions designed specifically for the local market context.'
    },
    {
      id: 's4',
      section_key: 'about_us',
      language_code: 'my' as LanguageCode,
      headline: 'ဒေသတွင်း ဆန်းသစ်တီထွင်မှု',
      subtext: 'ကျွန်ုပ်တို့အဖွဲ့သည် ပြည်တွင်းဈေးကွက်အတွက် အထူးဒီဇိုင်းထုတ်ထားသော ကုန်ကျစရိတ်သက်သာပြီး ထိရောက်သည့် ဒီဂျစ်တယ်ဖြေရှင်းချက်များကို ဖန်တီးပေးရန် အာရုံစိုက်ပါသည်။'
    }
  ]
};

export const fetchAllData = async (language: LanguageCode) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Fallback to mock data if credentials are missing
    await new Promise(resolve => setTimeout(resolve, 800));
    const filteredProducts = MOCK_DATA.products.filter(p => p.language_code === language);
    const filteredTestimonials = MOCK_DATA.testimonials.filter(t => t.language_code === language);
    const filteredSections = MOCK_DATA.sections.filter(s => s.language_code === language);

    const sectionsMap: Record<string, ContentSection> = {};
    filteredSections.forEach(s => {
      sectionsMap[s.section_key] = s;
    });

    return {
      products: filteredProducts,
      testimonials: filteredTestimonials,
      sections: sectionsMap
    };
  }

  try {
    const [productsRes, testimonialsRes, sectionsRes] = await Promise.all([
      supabase.from('web_products_showcase').select('*').eq('language_code', language),
      supabase.from('web_testimonials').select('*').eq('language_code', language),
      supabase.from('web_content_sections').select('*').eq('language_code', language)
    ]);

    if (productsRes.error) throw productsRes.error;
    if (testimonialsRes.error) throw testimonialsRes.error;
    if (sectionsRes.error) throw sectionsRes.error;

    const sectionsMap: Record<string, ContentSection> = {};
    (sectionsRes.data || []).forEach(s => {
      sectionsMap[s.section_key] = s;
    });

    return {
      products: productsRes.data || [],
      testimonials: testimonialsRes.data || [],
      sections: sectionsMap
    };
  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
    throw error;
  }
};

export const submitLead = async (lead: Lead) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log('Mock lead submission:', lead);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  }

  try {
    const { error } = await supabase.from('web_leads').insert([lead]);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error submitting lead to Supabase:', error);
    throw error;
  }
};
