import { useEffect, useState } from "react";
import {
  getAccessToken,
  hasAccessToken,
  removeAuthTokens,
} from "@/utils/cookies";
import { useGetProfileQuery } from "@/redux/features/profile/profileApi";
import type { IUser } from "@/types/user.types";

export interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
  accessToken: string | null;
}

export const useAuth = (): AuthState => {
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessToken() || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    hasAccessToken()
  );

  const {
    data: profileData,
    error: profileError,
    isLoading: profileLoading,
  } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    const token = getAccessToken();
    setAccessToken(token || null);
    setIsAuthenticated(hasAccessToken());
  }, []);

  useEffect(() => {
    if (profileError) {
      removeAuthTokens();
      setIsAuthenticated(false);
      setAccessToken(null);
    }
  }, [profileError]);

  const user = profileData?.data || null;

  return {
    isAuthenticated,
    user,
    isLoading: profileLoading,
    accessToken,
  };
};

export default useAuth;
