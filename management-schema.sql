-- Management Schema for A&S IT SOLUTION Internal Dashboard

-- 1. Sales Table (Lead Log)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    status TEXT DEFAULT 'Interested' NOT NULL, -- e.g., Interested, Demo Done, SOLD, Not Interested
    notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Money Table (Finance Ledger)
CREATE TABLE IF NOT EXISTS finance_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    transaction_date DATE DEFAULT CURRENT_DATE NOT NULL,
    description TEXT NOT NULL,
    money_in NUMERIC(15, 2) DEFAULT 0.00 NOT NULL,
    money_out NUMERIC(15, 2) DEFAULT 0.00 NOT NULL,
    proof_url TEXT, -- URL or reference to screenshot
    category TEXT -- e.g., Revenue, Expense, Salary, etc.
);

-- 3. Client Table (Version & Support Log)
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    client_name TEXT NOT NULL,
    app_version TEXT DEFAULT 'v1.0' NOT NULL,
    last_visit_date DATE DEFAULT CURRENT_DATE,
    device_count INTEGER DEFAULT 1 NOT NULL,
    phone_number TEXT,
    address TEXT,
    notes TEXT
);

-- 4. Audit Logs (to track changes with logs)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL, -- INSERT, UPDATE, DELETE
    old_data JSONB,
    new_data JSONB,
    user_id UUID -- Optional: if authenticated, track who did it
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Simple RLS Policies (for now, same as others since it's personal management)
-- In a real prod app, these would be restricted to authenticated admins only.
CREATE POLICY "Allow public access for now" ON leads FOR ALL USING (true);
CREATE POLICY "Allow public access for now" ON finance_ledger FOR ALL USING (true);
CREATE POLICY "Allow public access for now" ON clients FOR ALL USING (true);
CREATE POLICY "Allow public access for now" ON audit_logs FOR ALL USING (true);

-- Functions for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
