import { baseApi } from "../api/baseApi";
import { 
  setAccessToken, 
  setRefreshToken, 
  removeAuthTokens,
  setCookie,
  COOKIE_NAMES
} from "../../../utils/cookies";
import type { 
  LoginFormData, 
  RegisterFormData, 
  ForgotPasswordFormData, 
  ResetPasswordFormData, 
  OtpFormData 
} from "../../../utils/validation.utils";

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      fullName: string;
      isVerified: boolean;
    };
    accessToken: string;
    refreshToken: string;
  };
}

interface OtpResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    otpSent: boolean;
  };
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginFormData>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(credentials, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data.accessToken) {
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    register: builder.mutation<AuthResponse, RegisterFormData>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(credentials, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data.accessToken) {
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
          }
        } catch (error) {
          console.error('Registration failed:', error);
        }
      },
    }),
    forgotPassword: builder.mutation<OtpResponse, ForgotPasswordFormData>({
      query: (credentials) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(credentials, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            setCookie(COOKIE_NAMES.FORGOT_PASSWORD_MAIL, credentials.email, 1);
          }
        } catch (error) {
          console.error('Forgot password failed:', error);
        }
      },
    }),
    verifyOtp: builder.mutation<AuthResponse, OtpFormData>({
      query: (credentials) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(credentials, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data.accessToken) {
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
            setCookie(COOKIE_NAMES.VERIFY_OTP_MAIL, credentials.email, 1);
          }
        } catch (error) {
          console.error('OTP verification failed:', error);
        }
      },
    }),
    resendOtp: builder.mutation<OtpResponse, { email: string }>({
      query: (credentials) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation<{ success: boolean; message: string }, ResetPasswordFormData>({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          removeAuthTokens();
        } catch (error) {
          removeAuthTokens();
          console.error('Logout failed:', error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi;
