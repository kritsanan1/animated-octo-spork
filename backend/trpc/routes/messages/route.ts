import { z } from 'zod';
import { protectedProcedure } from '../../../middleware/auth';
import { TRPCError } from '@trpc/server';


export default protectedProcedure
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      if (!ctx.supabase) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Database not configured',
        });
      }


      const { data: message, error } = await ctx.supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', input.id)
        .eq('user_id', ctx.userId)
        .select()
        .single();


      if (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Failed to mark message as read',
        });
      }


      return message;
    } catch (error) {
      if (error instanceof TRPCError) throw error;


      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to mark message as read',
      });
    }
  });

