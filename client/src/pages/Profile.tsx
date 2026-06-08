import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Mail, User, Calendar, Clock, LogIn, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function Profile() {
  const { user } = useAuth();
  const { data: loginHistory, isLoading: historyLoading } = trpc.dashboard.getUserLoginHistory.useQuery({
    limit: 20,
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account information and view login history.</p>
        </div>

        {/* Account Details Card */}
        <Card className="card-hover animate-slide-up">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Name */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="text-lg font-semibold text-foreground mt-1">{user?.name || "Not set"}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg font-semibold text-foreground mt-1">{user?.email || "Not set"}</p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Badge variant="default" className="capitalize">
                    {user?.role || "user"}
                  </Badge>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p className="text-lg font-semibold text-foreground mt-1 capitalize">{user?.role || "User"}</p>
                </div>
              </div>

              {/* Account Created */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Account Created</p>
                  <p className="text-lg font-semibold text-foreground mt-1">
                    {user?.createdAt ? format(new Date(user.createdAt), "MMMM dd, yyyy") : "N/A"}
                  </p>
                </div>
              </div>

              {/* Last Signed In */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Last Signed In</p>
                  <p className="text-lg font-semibold text-foreground mt-1">
                    {user?.lastSignedIn ? format(new Date(user.lastSignedIn), "MMMM dd, yyyy HH:mm") : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login History Card */}
        <Card className="card-hover animate-slide-up">
          <CardHeader>
            <CardTitle>Login History</CardTitle>
            <CardDescription>Your recent authentication events</CardDescription>
          </CardHeader>
          <CardContent>
            {historyLoading ? (
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
            ) : loginHistory && loginHistory.length > 0 ? (
              <div className="space-y-0">
                {loginHistory.map((login, index) => (
                  <div
                    key={login.id}
                    className="flex gap-4 py-4 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors px-2 -mx-2 rounded animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Login Icon */}
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <LogIn size={18} className="text-primary" />
                    </div>

                    {/* Login Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">
                        {login.loginMethod === "oauth" ? "OAuth Login" : "Login"}
                      </p>
                      {login.ipAddress && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin size={12} />
                          <span className="font-mono">{login.ipAddress}</span>
                        </div>
                      )}
                      {login.userAgent && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{login.userAgent}</p>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(login.loginTime), "MMM dd, HH:mm")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <LogIn size={32} className="mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground">No login history available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
