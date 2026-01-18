# A&S IT SOLUTION - Website Setup Guide

## Database Setup

### Step 1: Run the SQL Schema in Supabase

1. Go to your Supabase project dashboard: https://elatnpxydxuocnjobwcl.supabase.co
2. Navigate to the **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-schema.sql` file
5. Paste it into the SQL editor
6. Click **Run** to execute the schema

This will create all the necessary tables for your website content.

### Step 2: Populate the Database with Existing Content

After creating the tables, you need to populate them with your existing translation data.

#### Option A: Run the Migration Script (Recommended)

```bash
# Install dependencies if not already done
npm install

# Run the migration script
node scripts/migrate-data.js
```

This script will automatically transfer all your existing content from `translations.js` into the Supabase database.

#### Option B: Manual Data Entry

Alternatively, you can manually add content through the Supabase dashboard:
1. Go to **Table Editor** in Supabase
2. Select each table
3. Click **Insert row** to add data manually

## Development

### Start the Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:5173`

## Features

### Dynamic Content
- All content is now stored in Supabase
- Update content in Supabase dashboard and see changes reflected immediately
- Real-time updates when data changes

### Bilingual Support
- Toggle between English and Burmese
- All content supports both languages

### Dark Mode
- Click the theme toggle button in the navigation
- Preference is saved in localStorage

### Modern Design
- Glassmorphism effects
- Smooth animations
- Gradient accents
- Responsive design

## Managing Content

To update website content:

1. Go to your Supabase dashboard
2. Navigate to **Table Editor**
3. Select the table you want to edit (e.g., `hero_content`, `services`, etc.)
4. Edit the data directly
5. Changes will appear on the website immediately (with real-time updates)

## Troubleshooting

### Database Connection Issues
- Verify your `.env` file has the correct Supabase URL and anon key
- Check that the Supabase project is active

### Content Not Showing
- Ensure you've run the migration script or manually added data
- Check browser console for errors
- Verify RLS (Row Level Security) policies are set correctly in Supabase

### Migration Script Errors
- Make sure you've run the SQL schema first
- Check that all tables exist in Supabase
- Verify your Supabase credentials in the script
