-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID NOT NULL references auth.users(id)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount NUMERIC NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  user_id UUID NOT NULL references auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories (optional, but good for starting)
-- Note: In a real multi-user app, you might want these to be per-user or system-wide.
-- For now, we'll assume the user might run this.
-- INSERT INTO categories (name, icon, color, type) VALUES ... 
