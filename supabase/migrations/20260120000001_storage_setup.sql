-- Create the 'web_content' storage bucket
-- Created: 2026-01-20

INSERT INTO storage.buckets (id, name, public) 
VALUES ('web_content', 'web_content', true)
ON CONFLICT (id) DO NOTHING;

-- Set up access policies for the bucket
-- Allow public read access
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'web_content' );

-- Allow authenticated uploads (if you want to upload via SDK later)
-- CREATE POLICY "Authenticated Upload" 
-- ON storage.objects FOR INSERT 
-- WITH CHECK ( bucket_id = 'web_content' AND auth.role() = 'authenticated' );
