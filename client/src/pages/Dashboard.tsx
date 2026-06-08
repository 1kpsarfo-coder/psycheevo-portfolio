import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, LogIn, Activity, TrendingUp } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = trpc.dashboard.getStats.useQuery();
  const { data: activities, isLoading: activitiesLoading } = trpc.dashboard.getRecentActivity.useQuery({
    limit: 10,
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back. Here's your activity overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {/* Total Users Card */}
          <Card className="card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users size={16} className="text-primary" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold text-foreground">{stats?.totalUsers || 0}</div>
              )}
            </CardContent>
          </Card>

          {/* Active Today Card */}
          <Card className="card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                Active Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold text-foreground">{stats?.activeUsersToday || 0}</div>
              )}
            </CardContent>
          </Card>

          {/* Total Logins Card */}
          <Card className="card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <LogIn size={16} className="text-primary" />
                Total Logins
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold text-foreground">{stats?.totalLogins || 0}</div>
              )}
            </CardContent>
          </Card>

          {/* Last Updated Card */}
          <Card className="card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity size={16} className="text-primary" />
                Last Updated
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-sm font-medium text-foreground">
                  {stats?.lastUpdated ? format(new Date(stats.lastUpdated), "MMM dd, HH:mm") : "N/A"}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card className="card-hover animate-slide-up">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events from the system</CardDescription>
          </CardHeader>
          <CardContent>
            {activitiesLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-4 py-3 border-b border-border last:border-0">
                    <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            ) : activities && activities.length > 0 ? (
              <div className="space-y-0">
                {activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex gap-4 py-4 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors px-2 -mx-2 rounded animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Event Icon */}
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Activity size={18} className="text-primary" />
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{activity.eventTitle}</p>
                      {activity.eventDescription && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {activity.eventDescription}
                        </p>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(activity.timestamp), "MMM dd, HH:mm")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Activity size={32} className="mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground">No activity yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
