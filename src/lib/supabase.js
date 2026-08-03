import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fplzpgrkcfrvzhgdukkm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwbHpwZ3JrY2ZydnpoZ2R1a2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwODg0ODgsImV4cCI6MjEwMDY2NDQ4OH0.Q3XXh4u5MnWimxAc0USgYhDPlOzvPvhE-GZWW0Fs9lo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
