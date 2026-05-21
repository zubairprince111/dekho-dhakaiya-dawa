-- =========================================================================
-- 🇧🇩 Dekho Dhakaiya Dawa - Supabase Database Schema & Seed Data
-- =========================================================================

-- 1. Bribe Reports Table (কোপ খতিয়ান)
CREATE TABLE IF NOT EXISTS public.bribe_reports (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    author TEXT DEFAULT 'অজ্ঞাত পাবলিক'::text NOT NULL,
    "officeName" TEXT DEFAULT 'সরকারি অফিস'::text NOT NULL,
    area TEXT DEFAULT 'অজ্ঞাত'::text NOT NULL,
    "totalAmount" BIGINT DEFAULT 0 NOT NULL,
    "teaCups" INTEGER DEFAULT 3 NOT NULL,
    "badgeTitle" TEXT DEFAULT 'হালকার ওপর ঝাপসা'::text NOT NULL,
    comments TEXT,
    items JSONB DEFAULT '[]'::jsonb NOT NULL,
    category TEXT DEFAULT 'অন্যান্য'::text NOT NULL,
    sames INTEGER DEFAULT 0 NOT NULL
);

-- Enable Row Level Security (RLS) on bribe_reports
ALTER TABLE public.bribe_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public.bribe_reports
DROP POLICY IF EXISTS "Allow public read access to bribe_reports" ON public.bribe_reports;
CREATE POLICY "Allow public read access to bribe_reports" 
    ON public.bribe_reports FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Allow public insert access to bribe_reports" ON public.bribe_reports;
CREATE POLICY "Allow public insert access to bribe_reports" 
    ON public.bribe_reports FOR INSERT 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to bribe_reports" ON public.bribe_reports;
CREATE POLICY "Allow public update access to bribe_reports" 
    ON public.bribe_reports FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- 🛡️ Security Trigger: Protect Report Content & Prevent Vote Manipulation
-- Locks all columns so only the "sames" vote can be modified,
-- and limits "sames" increments to a maximum of +1 per update request.
CREATE OR REPLACE FUNCTION public.protect_report_content()
RETURNS TRIGGER AS $$
BEGIN
    -- 1. Lock all core details (users cannot alter core reports)
    IF OLD.author IS DISTINCT FROM NEW.author OR
       OLD."officeName" IS DISTINCT FROM NEW."officeName" OR
       OLD.area IS DISTINCT FROM NEW.area OR
       OLD."totalAmount" IS DISTINCT FROM NEW."totalAmount" OR
       OLD."teaCups" IS DISTINCT FROM NEW."teaCups" OR
       OLD."badgeTitle" IS DISTINCT FROM NEW."badgeTitle" OR
       OLD.comments IS DISTINCT FROM NEW.comments OR
       OLD.items IS DISTINCT FROM NEW.items OR
       OLD.category IS DISTINCT FROM NEW.category OR
       OLD.created_at IS DISTINCT FROM NEW.created_at THEN
        RAISE EXCEPTION 'ওস্তাদ, অন্যের খতিয়ান এডিট করা নিষেধ! শুধু "us ভাই us" ভোট দিতে পারবেন।';
    END IF;
    
    -- 2. Anti-Cheat: Prevent spoofing/botting vote increments on sames
    IF NEW.sames < OLD.sames OR NEW.sames > OLD.sames + 1 THEN
        RAISE EXCEPTION 'ওস্তাদ, এক ক্লিকে একটার বেশি ভোট দেওয়া যাবে না!';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind trigger to bribe_reports table
DROP TRIGGER IF EXISTS trg_protect_report_content ON public.bribe_reports;
CREATE TRIGGER trg_protect_report_content
    BEFORE UPDATE ON public.bribe_reports
    FOR EACH ROW
    EXECUTE FUNCTION public.protect_report_content();


-- 2. Bribe Rates Table (আজকের বাজারদর)
CREATE TABLE IF NOT EXISTS public.bribe_rates (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    service TEXT NOT NULL,
    location TEXT NOT NULL,
    avgPrice BIGINT DEFAULT 0 NOT NULL,
    trend TEXT DEFAULT 'same'::text NOT NULL -- 'up', 'down', 'same'
);

-- Enable Row Level Security (RLS) on bribe_rates
ALTER TABLE public.bribe_rates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public.bribe_rates
DROP POLICY IF EXISTS "Allow public read access to bribe_rates" ON public.bribe_rates;
CREATE POLICY "Allow public read access to bribe_rates" 
    ON public.bribe_rates FOR SELECT 
    USING (true);


-- 3. Seed Data for Bribe Rates (আজকের বাজারদর ডেমো ডেটা)
INSERT INTO public.bribe_rates (service, location, avgPrice, trend)
VALUES 
    ('পাসপোর্ট ভেরিফিকেশন', 'যেকোনো থানা', 3500, 'up'),
    ('ড্রাইভিং লাইসেন্স', 'বিআরটিএ (BRTA)', 5000, 'up'),
    ('জমির নামজারি', 'ভূমি অফিস', 15000, 'same'),
    ('ট্রেড লাইসেন্স রিনিউ', 'সিটি কর্পোরেশন', 4500, 'down'),
    ('জন্ম নিবন্ধন সনদ', 'ইউনিয়ন পরিষদ', 800, 'up')
-- ON CONFLICT DO NOTHING;
ON CONFLICT DO NOTHING;


-- 4. Initial Satirical Seed Reports (কোপ খতিয়ান ডেমো ডেটা)
INSERT INTO public.bribe_reports (author, "officeName", area, "totalAmount", "teaCups", "badgeTitle", comments, items, category, sames)
VALUES
    ('মিরপুরের মফিজ', 'বিআরটিএ (BRTA)', 'মিরপুর', 5500, 4, 'কোপের উপর কিসসা', 'ড্রাইভিং লাইসেন্স নিতে গেছিলাম, দালাল ভাই বললেন ফাইল নাকি এগোয় না। ৪ কাপ চা খাইয়ে ফাইল সচল করলাম!', '[]'::jsonb, 'লাইসেন্স', 34),
    ('অজ্ঞাত ব্যবসায়ী', 'ওয়াসা (WASA)', 'মতিঝিল', 12000, 2, 'বড় কোপ', 'অফিসের নতুন সংযোগ ফি যা তার চেয়ে মিষ্টি খাওয়ার খরচ বেশি চাইল। না দিলে নাকি লাইনে পানি আসবে না!', '[]'::jsonb, 'সংযোগ', 21),
    ('চাকরিপ্রার্থী', 'ভূমি অফিস', 'উত্তরা', 25000, 5, 'মহা কোপ', 'জমির নামজারি করতে গিয়ে ৩ মনে ঘুরে আসছি। শেষমেশ স্যারকে স্পিড মানি দিয়ে কাজটা একদিনেই করিয়ে নিলাম!', '[]'::jsonb, 'নামজারি', 45);
