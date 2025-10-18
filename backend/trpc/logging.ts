import { publicProcedure } from '../create-context';


export const loggedProcedure = publicProcedure.use(async ({ path, type, next }) => {
  const start = Date.now();
  
  console.log(`[TRPC] ${type} ${path} - Started`);
  
  const result = await next();
  
  const duration = Date.now() - start;
  console.log(`[TRPC] ${type} ${path} - Completed in ${duration}ms`);
  
  return result;
});

