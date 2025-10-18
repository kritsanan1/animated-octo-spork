import { z } from 'zod';
import { protectedProcedure } from '../../../middleware/auth';
import { TRPCError } from '@trpc/server';


export default protectedProcedure
  .input(
    z.object({
      fullName: z.string().optional(),
      avatarUrl: z.string().url().optional().nullable(),
      ayrshareApiKey: z.string().optional().nullable(),
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


      const { data: profile, error } = await ctx.supabase
        .from('users')
        .update({
          full_name: input.fullName,
          avatar_url: input.avatarUrl,
          ayrshare_api_key: input.ayrshareApiKey,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ctx.userId)
        .select()
        .single();


      if (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Failed to update profile',
        });
      }


      return profile;
    } catch (error) {
      if (error instanceof TRPCError) throw error;


      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to update profile',
      });
    }
  });

