import { TRPCError } from '@trpc/server';
import { publicProcedure } from '../create-context';


export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.token) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Missing or invalid authorization token',
    });
  }


  if (ctx.supabase) {
    const { data: { user }, error } = await ctx.supabase.auth.getUser();
    
    if (error || !user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired token',
      });
    }


    return next({
      ctx: {
        ...ctx,
        userId: user.id,
        user,
      },
    });
  }


  return next({
    ctx: {
      ...ctx,
      userId: ctx.token,
    },
  });
});

