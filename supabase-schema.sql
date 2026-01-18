-- A&S IT SOLUTION Website Database Schema
-- This schema supports bilingual content (English and Burmese)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- HERO CONTENT TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_hero_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  eyebrow TEXT NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  cta_text TEXT NOT NULL,
  services_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language)
);

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  product_title TEXT NOT NULL,
  product_desc TEXT NOT NULL,
  functions_label TEXT NOT NULL,
  functions JSONB NOT NULL, -- Array of function strings
  auth_info TEXT NOT NULL,
  platform_info TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language)
);

-- ============================================
-- PACKAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  package_type TEXT NOT NULL CHECK (package_type IN ('free', 'ans1')),
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  limit_info TEXT,
  note TEXT,
  devices TEXT,
  extra_device_fee TEXT,
  maintenance TEXT,
  consultation_label TEXT,
  consultation_online TEXT,
  consultation_physical TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language, package_type)
);

-- ============================================
-- FEATURES TABLE (Included/Excluded)
-- ============================================
CREATE TABLE IF NOT EXISTS web_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  category TEXT NOT NULL CHECK (category IN ('included', 'excluded')),
  feature_text TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language, category, feature_text)
);

-- ============================================
-- TIMELINE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  title TEXT NOT NULL,
  timeline_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language)
);

-- ============================================
-- SUPPORT INFO TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_support_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  title TEXT NOT NULL,
  support_items JSONB NOT NULL, -- Array of support rule strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language)
);

-- ============================================
-- PRICING INFO TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_pricing_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  title TEXT NOT NULL,
  pricing_items JSONB NOT NULL, -- Array of pricing strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language)
);

-- ============================================
-- MAINTENANCE INFO TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_maintenance_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  maintenance_items JSONB NOT NULL, -- Array of maintenance task strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language)
);

-- ============================================
-- REFERRAL INFO TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_referral_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  title TEXT NOT NULL,
  referral_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language)
);

-- ============================================
-- ABOUT SECTION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_about_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  title TEXT NOT NULL,
  about_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language)
);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  customer_name TEXT NOT NULL,
  customer_role TEXT,
  testimonial_text TEXT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CONTACT INFO TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  title TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  phone_label TEXT NOT NULL,
  email_label TEXT NOT NULL,
  phone_value TEXT,
  email_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language)
);

-- ============================================
-- NAVIGATION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_navigation (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  services_text TEXT NOT NULL,
  about_text TEXT NOT NULL,
  testimonials_text TEXT NOT NULL,
  contact_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language)
);

-- ============================================
-- FOOTER TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS web_footer_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL CHECK (language IN ('en', 'my')),
  footer_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(language)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE web_hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_support_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_pricing_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_maintenance_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_referral_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_footer_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON web_hero_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_services FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_packages FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_features FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_timeline FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_support_info FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_pricing_info FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_maintenance_info FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_referral_info FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_about_section FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON web_contact_info FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_navigation FOR SELECT USING (true);
CREATE POLICY "Public read access" ON web_footer_content FOR SELECT USING (true);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_web_hero_language ON web_hero_content(language);
CREATE INDEX idx_web_services_language ON web_services(language);
CREATE INDEX idx_web_packages_language_type ON web_packages(language, package_type);
CREATE INDEX idx_web_features_language_category ON web_features(language, category);
CREATE INDEX idx_web_testimonials_active ON web_testimonials(is_active, sort_order);
CREATE INDEX idx_web_contact_language ON web_contact_info(language);
CREATE INDEX idx_web_navigation_language ON web_navigation(language);

-- ============================================
-- SAMPLE DATA - You can modify this later
-- ============================================

-- Note: Run the migration script (scripts/migrate-data.js) to populate
-- this database with your existing translation data automatically.
-- Or you can manually insert data through the Supabase dashboard.
