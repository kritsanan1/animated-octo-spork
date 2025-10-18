import { protectedProcedure } from '../../../middleware/auth';
import { TRPCError } from '@trpc/server';


export default protectedProcedure.query(async ({ ctx }) => {
  try {
    if (!ctx.supabase) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Database not configured',
      });
    }


    const { data: accounts, error } = await ctx.supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', ctx.userId)
      .order('connected_at', { ascending: false });


    if (error) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.message || 'Failed to fetch social accounts',
      });
    }


    return accounts || [];
  } catch (error) {
    if (error instanceof TRPCError) throw error;


    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'Failed to fetch social accounts',
    });
  }
});

