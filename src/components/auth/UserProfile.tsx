import React from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card.tsx";
import { useAuth } from "@/hooks/useAuth";
import { User, Mail, Calendar } from "lucide-react";
import LoadingSpinner from "../ui/LoadingSpinner";

interface UserProfileProps {
  variant?: "full" | "compact" | "minimal";
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  variant = "full",
  className = "",
}) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        Unable to load user profile
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Avatar
          src={user?.profile?.avatar}
          alt={user?.profile?.fullName}
          size="sm"
        />
        <span className="font-medium text-sm">{user?.profile?.fullName}</span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <Avatar
            src={user?.profile?.avatar}
            alt={user?.profile?.fullName}
            size="md"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{user?.profile?.fullName}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary">{user.role || "Student"}</Badge>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <Avatar 
          src={user?.profile?.avatar} 
          alt={user?.profile?.fullName || user?.email} 
          size="lg" 
        />

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h2 className="text-xl font-bold">{user?.profile?.fullName || user?.email}</h2>
            <Badge variant="secondary">{user?.role || "Student"}</Badge>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>

            {user?.profile?.phone && (
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{user?.profile?.phone}</span>
              </div>
            )}

            {user?.metadata?.createdAt && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Joined{" "}
                  {new Date(user?.metadata?.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;
