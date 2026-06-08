import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(user?: AuthenticatedUser | null): { ctx: TrpcContext; clearedCookies: Array<{ name: string; options: Record<string, unknown> }> } {
  const clearedCookies: Array<{ name: string; options: Record<string, unknown> }> = [];

  const defaultUser: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "oauth",
    role: "user",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user: user === undefined ? defaultUser : user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

describe("Authentication Flow", () => {
  describe("auth.me", () => {
    it("returns the current authenticated user", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const user = await caller.auth.me();

      expect(user).toBeDefined();
      expect(user?.id).toBe(1);
      expect(user?.email).toBe("test@example.com");
      expect(user?.name).toBe("Test User");
    });

    it("returns null for unauthenticated users", async () => {
      const { ctx } = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      const user = await caller.auth.me();

      expect(user).toBeNull();
    });
  });

  describe("auth.logout", () => {
    it("clears the session cookie and returns success", async () => {
      const { ctx, clearedCookies } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.logout();

      expect(result).toEqual({ success: true });
      expect(clearedCookies).toHaveLength(1);
      expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
      expect(clearedCookies[0]?.options).toMatchObject({
        maxAge: -1,
        secure: true,
        sameSite: "none",
        httpOnly: true,
        path: "/",
      });
    });

    it("works for both authenticated and unauthenticated users", async () => {
      const { ctx: authCtx, clearedCookies: authCookies } = createAuthContext();
      const { ctx: unauthCtx, clearedCookies: unauthCookies } = createAuthContext(null);

      const authCaller = appRouter.createCaller(authCtx);
      const unauthCaller = appRouter.createCaller(unauthCtx);

      const authResult = await authCaller.auth.logout();
      const unauthResult = await unauthCaller.auth.logout();

      expect(authResult).toEqual({ success: true });
      expect(unauthResult).toEqual({ success: true });
      expect(authCookies).toHaveLength(1);
      expect(unauthCookies).toHaveLength(1);
    });
  });

  describe("Protected Routes", () => {
    it("dashboard.getStats requires authentication", async () => {
      const { ctx } = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.dashboard.getStats();
        expect.fail("Should have thrown an error");
      } catch (error: unknown) {
        expect((error as { code?: string }).code).toBe("UNAUTHORIZED");
      }
    });

    it("dashboard.getRecentActivity requires authentication", async () => {
      const { ctx } = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.dashboard.getRecentActivity({ limit: 10 });
        expect.fail("Should have thrown an error");
      } catch (error: unknown) {
        expect((error as { code?: string }).code).toBe("UNAUTHORIZED");
      }
    });

    it("dashboard.getUserLoginHistory requires authentication", async () => {
      const { ctx } = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.dashboard.getUserLoginHistory({ limit: 10 });
        expect.fail("Should have thrown an error");
      } catch (error: unknown) {
        expect((error as { code?: string }).code).toBe("UNAUTHORIZED");
      }
    });

    it("dashboard.recordActivity requires authentication", async () => {
      const { ctx } = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.dashboard.recordActivity({
          eventType: "test",
          eventTitle: "Test Event",
        });
        expect.fail("Should have thrown an error");
      } catch (error: unknown) {
        expect((error as { code?: string }).code).toBe("UNAUTHORIZED");
      }
    });
  });

  describe("User Roles", () => {
    it("distinguishes between admin and regular users", async () => {
      const adminUser: AuthenticatedUser = {
        id: 2,
        openId: "admin-user-123",
        email: "admin@example.com",
        name: "Admin User",
        loginMethod: "oauth",
        role: "admin",
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-01"),
        lastSignedIn: new Date(),
      };

      const { ctx: adminCtx } = createAuthContext(adminUser);
      const { ctx: userCtx } = createAuthContext();

      const adminCaller = appRouter.createCaller(adminCtx);
      const userCaller = appRouter.createCaller(userCtx);

      const adminUser_ = await adminCaller.auth.me();
      const regularUser = await userCaller.auth.me();

      expect(adminUser_?.role).toBe("admin");
      expect(regularUser?.role).toBe("user");
    });
  });
});
