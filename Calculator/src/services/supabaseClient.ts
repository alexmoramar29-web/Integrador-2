import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eqlitwaokkraftjmuhbu.supabase.co';
const supabaseKey = 'sb_publishable_aY5wKAtMwKBSvnHr2roExg_sLxuXf_H';

export const supabase = createClient(supabaseUrl, supabaseKey);