import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cbwwhehvnzmtswohhzlv.supabase.co";
const supabaseKey = "sb_publishable_hAmEUJjYqcITKrIg0uNdSg_XgPDNZwL";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);