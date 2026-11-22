import {createClient} from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://jfnrfjziviqxndsxtupz.supabase.co';

const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_7W4IJB8vTEIdd-NLZ1FwYQ_A2obTfZg';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
