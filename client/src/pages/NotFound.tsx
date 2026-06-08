import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="relative container max-w-md mx-auto px-4">
        <div className="text-center animate-fade-in">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/10 rounded-full animate-pulse-subtle blur-xl" />
              <div className="relative w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-destructive" />
              </div>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-2">404</h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-sm mx-auto">
            Sorry, the page you are looking for doesn't exist. It may have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              size="lg"
              className="animate-scale-in"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            <Button
              onClick={handleGoBack}
              variant="outline"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
