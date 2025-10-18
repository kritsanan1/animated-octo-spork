import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import ayrshareCreatePostRoute from "./routes/ayrshare/create-post/route";
import ayrshareGetHistoryRoute from "./routes/ayrshare/get-history/route";
import ayrshareGetAnalyticsRoute from "./routes/ayrshare/get-analytics/route";
import ayrshareDeletePostRoute from "./routes/ayrshare/delete-post/route";
import ayrshareGetProfilesRoute from "./routes/ayrshare/get-profiles/route";
import ayrshareGenerateJwtRoute from "./routes/ayrshare/generate-jwt/route";
import ayrshareGetPostRoute from "./routes/ayrshare/get-post/route";
import ayrshareUpdatePostRoute from "./routes/ayrshare/update-post/route";
import getUserProfileRoute from "./routes/user/get-profile/route";
import updateUserProfileRoute from "./routes/user/update-profile/route";
import createPostRoute from "./routes/posts/create-post/route";
import getPostsRoute from "./routes/posts/get-posts/route";
import updatePostRoute from "./routes/posts/update-post/route";
import deletePostRoute from "./routes/posts/delete-post/route";
import getAccountsRoute from "./routes/social-accounts/get-accounts/route";
import connectAccountRoute from "./routes/social-accounts/connect-account/route";
import disconnectAccountRoute from "./routes/social-accounts/disconnect-account/route";
import getDashboardStatsRoute from "./routes/analytics/get-dashboard-stats/route";
import getMessagesRoute from "./routes/messages/get-messages/route";
import markAsReadRoute from "./routes/messages/mark-as-read/route";


export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  ayrshare: createTRPCRouter({
    createPost: ayrshareCreatePostRoute,
    getHistory: ayrshareGetHistoryRoute,
    getAnalytics: ayrshareGetAnalyticsRoute,
    deletePost: ayrshareDeletePostRoute,
    getProfiles: ayrshareGetProfilesRoute,
    generateJWT: ayrshareGenerateJwtRoute,
    getPost: ayrshareGetPostRoute,
    updatePost: ayrshareUpdatePostRoute,
  }),
  user: createTRPCRouter({
    getProfile: getUserProfileRoute,
    updateProfile: updateUserProfileRoute,
  }),
  posts: createTRPCRouter({
    create: createPostRoute,
    get: getPostsRoute,
    update: updatePostRoute,
    delete: deletePostRoute,
  }),
  socialAccounts: createTRPCRouter({
    get: getAccountsRoute,
    connect: connectAccountRoute,
    disconnect: disconnectAccountRoute,
  }),
  analytics: createTRPCRouter({
    getDashboardStats: getDashboardStatsRoute,
  }),
  messages: createTRPCRouter({
    get: getMessagesRoute,
    markAsRead: markAsReadRoute,
  }),
});


export type AppRouter = typeof appRouter;

