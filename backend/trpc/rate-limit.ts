import { TRPCError } from '@trpc/server';
import { publicProcedure } from '../create-context';


const requestCounts = new Map<string, { count: number; resetAt: number }>();


const RATE_LIMIT = 100;
const WINDOW_MS = 60 * 1000;


export const rateLimitedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const clientId = ctx.req.headers.get('x-forwarded-for') || 
                   ctx.req.headers.get('x-real-ip') || 
                   'unknown';


  const now = Date.now();
  const record = requestCounts.get(clientId);


  if (record && now < record.resetAt) {
    if (record.count >= RATE_LIMIT) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'Rate limit exceeded. Please try again later.',
      });
    }
    record.count++;
  } else {
    requestCounts.set(clientId, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
  }


  setTimeout(() => {
    const current = requestCounts.get(clientId);
    if (current && now >= current.resetAt) {
      requestCounts.delete(clientId);
    }
  }, WINDOW_MS);


  return next();
});

