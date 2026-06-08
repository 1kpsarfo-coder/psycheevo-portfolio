import { protectedProcedure, router } from "../_core/trpc";
import { getRecentActivity, getDashboardStats, getLoginHistory, createActivityEvent } from "../db";
import { z } from "zod";

export const dashboardRouter = router({
  getStats: protectedProcedure.query(async () => {
    const stats = await getDashboardStats();
    return stats || {
      id: 0,
      totalUsers: 0,
      activeUsersToday: 0,
      totalLogins: 0,
      lastUpdated: new Date(),
    };
  }),

  getRecentActivity: protectedProcedure
    .input(z.object({ limit: z.number().default(20) }))
    .query(async ({ input }) => {
      return await getRecentActivity(input.limit);
    }),

  getUserLoginHistory: protectedProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      return await getLoginHistory(ctx.user.id, input.limit);
    }),

  recordActivity: protectedProcedure
    .input(
      z.object({
        eventType: z.string(),
        eventTitle: z.string(),
        eventDescription: z.string().optional(),
        metadata: z.record(z.string(), z.unknown()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await createActivityEvent(
        ctx.user.id,
        input.eventType,
        input.eventTitle,
        input.eventDescription,
        input.metadata
      );
      return { success: true };
    }),
});
