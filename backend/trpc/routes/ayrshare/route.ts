import { z } from 'zod';
import { publicProcedure } from '../../../create-context';
import { TRPCError } from '@trpc/server';


const platformSchema = z.enum(['facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tiktok', 'pinterest']);


export default publicProcedure
  .input(
    z.object({
      apiKey: z.string().min(1, 'API key is required'),
      id: z.string().min(1, 'Post ID is required'),
      post: z.string().optional(),
      platforms: z.array(platformSchema).optional(),
      mediaUrls: z.array(z.string().url()).optional(),
      scheduleDate: z.string().optional(),
    })
  )
  .mutation(async ({ input }) => {
    try {
      const response = await fetch('https://app.ayrshare.com/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${input.apiKey}`,
        },
        body: JSON.stringify({
          id: input.id,
          post: input.post,
          platforms: input.platforms,
          mediaUrls: input.mediaUrls,
          scheduleDate: input.scheduleDate,
        }),
      });


      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Failed to update post',
        });
      }


      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to update post',
      });
    }
  });

