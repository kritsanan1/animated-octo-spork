export interface EnvConfig {
  AYRSHARE_API_KEY?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  CLERK_SECRET_KEY?: string;
  STRIPE_SECRET_KEY?: string;
}


export const getEnvConfig = (): EnvConfig => {
  return {
    AYRSHARE_API_KEY: process.env.AYRSHARE_API_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  };
};

