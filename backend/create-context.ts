import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { createClient } from '@supabase/supabase-js';
import { getEnvConfig } from '../types/env';


export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const env = getEnvConfig();
  
  const authHeader = opts.req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '') || null;


  let supabase = null;
  if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
    supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
      global: {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    });
  }


  return {
    req: opts.req,
    token,
    supabase,
    env,
  };
};


export type Context = Awaited<ReturnType<typeof createContext>>;


const t = initTRPC.context<Context>().create({
  transformer: superjson,
});


export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

