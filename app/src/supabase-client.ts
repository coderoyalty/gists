import { createClient } from "@supabase/supabase-js";
import config from "./config";

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_API_KEY);

export default supabase;
