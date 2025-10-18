import { z } from 'zod';
import { protectedProcedure } from '../../../middleware/auth';
import { TRPCError } from '@trpc/server';


const platformSchema = z.enum(['facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tiktok', 'pinterest']);


export default protectedProcedure
  .input(
    z.object({
      id: z.string().uuid(),
      content: z.string().min(1).optional(),
      platforms: z.array(platformSchema).min(1).optional(),
      mediaUrls: z.array(z.string().url()).optional().nullable(),
      scheduledAt: z.string().optional().nullable(),
      status: z.enum(['draft', 'scheduled', 'published', 'failed']).optional(),
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


      const { id, ...updates } = input;


      const { data: post, error } = await ctx.supabase
        .from('posts')
        .update({
          content: updates.content,
          platforms: updates.platforms,
          media_urls: updates.mediaUrls,
          scheduled_at: updates.scheduledAt,
          status: updates.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', ctx.userId)
        .select()
        .single();


      if (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Failed to update post',
        });
      }


      return post;
    } catch (error) {
      if (error instanceof TRPCError) throw error;


      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to update post',
      });
    }
  });

