-- Supabase Row Level Security (RLS) Setup Script
-- Run this in your Supabase project's SQL editor

-- 1. Enable RLS on the table
ALTER TABLE bribe_reports ENABLE ROW LEVEL SECURITY;

-- 2. Allow public read access (SELECT)
-- This allows anyone to view the reports on the site
CREATE POLICY "Allow public select" 
ON bribe_reports 
FOR SELECT 
USING (true);

-- Note: We DO NOT create an UPDATE or INSERT policy for anonymous users.
-- Submissions and Voting are handled securely via backend API routes 
-- (`api.submit-report.ts` and `api.vote.ts`) which use the SERVICE_ROLE_KEY 
-- to bypass RLS safely and validate inputs before modifying the database.
