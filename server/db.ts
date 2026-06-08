import { desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function recordLoginHistory(userId: number, ipAddress?: string, userAgent?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot record login: database not available");
    return;
  }

  try {
    const { loginHistory: lh } = await import("../drizzle/schema");
    await db.insert(lh).values({
      userId,
      ipAddress,
      userAgent,
      loginMethod: "oauth",
    });
  } catch (error) {
    console.error("[Database] Failed to record login history:", error);
  }
}

export async function getLoginHistory(userId: number, limit: number = 10) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get login history: database not available");
    return [];
  }

  try {
    const { loginHistory: lh } = await import("../drizzle/schema");
    const result = await db
      .select()
      .from(lh)
      .where(eq(lh.userId, userId))
      .orderBy((t) => [desc(t.loginTime)])
      .limit(limit);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get login history:", error);
    return [];
  }
}

export async function createActivityEvent(
  userId: number | null,
  eventType: string,
  eventTitle: string,
  eventDescription?: string,
  metadata?: Record<string, unknown>
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create activity event: database not available");
    return;
  }

  try {
    const { activityFeed: af } = await import("../drizzle/schema");
    await db.insert(af).values({
      userId,
      eventType,
      eventTitle,
      eventDescription,
      metadata: metadata ? JSON.stringify(metadata) : undefined,
    });
  } catch (error) {
    console.error("[Database] Failed to create activity event:", error);
  }
}

export async function getRecentActivity(limit: number = 20) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get activity: database not available");
    return [];
  }

  try {
    const { activityFeed: af } = await import("../drizzle/schema");
    const result = await db
      .select()
      .from(af)
      .orderBy((t) => [desc(t.timestamp)])
      .limit(limit);
    return result.map((item) => ({
      ...item,
      metadata: item.metadata ? JSON.parse(item.metadata) : undefined,
    }));
  } catch (error) {
    console.error("[Database] Failed to get activity:", error);
    return [];
  }
}

export async function getDashboardStats() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get dashboard stats: database not available");
    return null;
  }

  try {
    const { dashboardStats: ds, users: u, loginHistory: lh } = await import("../drizzle/schema");
    
    // Get or create stats record
    let stats = await db.select().from(ds).limit(1);
    
    if (stats.length === 0) {
      const totalUsers = await db.select({ count: sql`COUNT(*)` }).from(u);
      const totalLogins = await db.select({ count: sql`COUNT(*)` }).from(lh);
      
      await db.insert(ds).values({
        totalUsers: (totalUsers[0]?.count as number) || 0,
        activeUsersToday: 0,
        totalLogins: (totalLogins[0]?.count as number) || 0,
      });
      
      stats = await db.select().from(ds).limit(1);
    }
    
    return stats[0] || null;
  } catch (error) {
    console.error("[Database] Failed to get dashboard stats:", error);
    return null;
  }
}

// TODO: add feature queries here as your schema grows.
