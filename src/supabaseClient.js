import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://thgowurxpgxvrsubzzgl.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoZ293dXJ4cGd4dnJzdWJ6emdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODE2NDYsImV4cCI6MjA1Njc1NzY0Nn0.kdFAaovyRq41IM0R-y0GkxnBvql4HExYkx26_kaDjRk'; // Replace with your Supabase Anon Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });