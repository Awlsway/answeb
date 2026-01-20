-- Initial schema for answeb1 portfolio
-- Created: 2026-01-20

-- 1. Products Table
CREATE TABLE IF NOT EXISTS public.web_products_showcase (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL,
  language_code text CHECK (language_code IN ('en', 'my')),
  name text NOT NULL,
  tagline text,
  description text,
  features text[],
  status text,
  demo_url text,
  image_url text,
  video_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS and public read access
ALTER TABLE public.web_products_showcase ENABLE ROW LEVEL SECURITY;
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access' AND tablename = 'web_products_showcase') THEN
        CREATE POLICY "Allow public read access" ON public.web_products_showcase FOR SELECT USING (true);
    END IF;
END $$;

-- 2. Testimonials Table
CREATE TABLE IF NOT EXISTS public.web_testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  language_code text CHECK (language_code IN ('en', 'my')),
  client_name text NOT NULL,
  business_name text,
  quote text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  logo_url text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.web_testimonials ENABLE ROW LEVEL SECURITY;
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access' AND tablename = 'web_testimonials') THEN
        CREATE POLICY "Allow public read access" ON public.web_testimonials FOR SELECT USING (true);
    END IF;
END $$;

-- 3. Content Sections Table
CREATE TABLE IF NOT EXISTS public.web_content_sections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key text NOT NULL,
  language_code text CHECK (language_code IN ('en', 'my')),
  headline text,
  subtext text,
  cta_label text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.web_content_sections ENABLE ROW LEVEL SECURITY;
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access' AND tablename = 'web_content_sections') THEN
        CREATE POLICY "Allow public read access" ON public.web_content_sections FOR SELECT USING (true);
    END IF;
END $$;

-- 4. Leads Table
CREATE TABLE IF NOT EXISTS public.web_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  interest text,
  message text,
  language_code text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.web_leads ENABLE ROW LEVEL SECURITY;
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anonymous inserts' AND tablename = 'web_leads') THEN
        CREATE POLICY "Allow anonymous inserts" ON public.web_leads FOR INSERT WITH CHECK (true);
    END IF;
END $$;
