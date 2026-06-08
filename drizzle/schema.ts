import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Login history table to track user authentication events.
 * Each login creates a new record with timestamp and metadata.
 */
export const loginHistory = mysqlTable("loginHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  loginTime: timestamp("loginTime").defaultNow().notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  loginMethod: varchar("loginMethod", { length: 64 }).default("oauth"),
});

export type LoginHistory = typeof loginHistory.$inferSelect;
export type InsertLoginHistory = typeof loginHistory.$inferInsert;

/**
 * Activity feed table to track user interactions and system events.
 * Used for dashboard real-time activity display.
 */
export const activityFeed = mysqlTable("activityFeed", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  eventType: varchar("eventType", { length: 64 }).notNull(),
  eventTitle: varchar("eventTitle", { length: 255 }).notNull(),
  eventDescription: text("eventDescription"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  metadata: text("metadata"),
});

export type ActivityFeed = typeof activityFeed.$inferSelect;
export type InsertActivityFeed = typeof activityFeed.$inferInsert;

/**
 * Dashboard statistics table for storing aggregated metrics.
 * Helps with efficient dashboard data retrieval.
 */
export const dashboardStats = mysqlTable("dashboardStats", {
  id: int("id").autoincrement().primaryKey(),
  totalUsers: int("totalUsers").default(0),
  activeUsersToday: int("activeUsersToday").default(0),
  totalLogins: int("totalLogins").default(0),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow(),
});

export type DashboardStats = typeof dashboardStats.$inferSelect;
export type InsertDashboardStats = typeof dashboardStats.$inferInsert;