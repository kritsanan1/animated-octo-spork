import { z } from 'zod';
import { protectedProcedure } from '../../../middleware/auth';
import { TRPCError } from '@trpc/server';


export default protectedProcedure
  .input(
    z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }).optional()
  )
  .query(async ({ ctx, input }) => {
    try {
      if (!ctx.supabase) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Database not configured',
        });
      }


      const endDate = input?.endDate || new Date().toISOString();
      const startDate = input?.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();


      const { data: analytics, error } = await ctx.supabase
        .from('analytics')
        .select('*')
        .eq('user_id', ctx.userId)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false });


      if (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Failed to fetch analytics',
        });
      }


      const totalEngagement = analytics?.reduce((sum, a) => sum + a.total_engagement, 0) || 0;
      const totalReach = analytics?.reduce((sum, a) => sum + a.total_reach, 0) || 0;
      const totalPosts = analytics?.reduce((sum, a) => sum + a.total_posts, 0) || 0;
      const avgEngagementRate = analytics?.length
        ? analytics.reduce((sum, a) => sum + a.engagement_rate, 0) / analytics.length
        : 0;


      const platformBreakdown = analytics?.reduce((acc, a) => {
        if (!acc[a.platform]) {
          acc[a.platform] = {
            engagement: 0,
            reach: 0,
            posts: 0,
            followers: a.followers_count || 0,
          };
        }
        acc[a.platform].engagement += a.total_engagement;
        acc[a.platform].reach += a.total_reach;
        acc[a.platform].posts += a.total_posts;
        return acc;
      }, {} as Record<string, any>);


      return {
        totalEngagement,
        totalReach,
        totalPosts,
        avgEngagementRate,