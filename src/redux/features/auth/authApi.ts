import { baseApi } from "../api/baseApi";
import type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  OtpFormData,
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
    }),
    register: builder.mutation<AuthResponse, RegisterFormData>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<OtpResponse, ForgotPasswordFormData>({
      query: (credentials) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOtp: builder.mutation<AuthResponse, OtpFormData>({
      query: (credentials) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    resendOtp: builder.mutation<OtpResponse, { email: string }>({
      query: (credentials) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordFormData>({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
    changePassword: builder.mutation<AuthResponse, ResetPasswordFormData>({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: (refreshToken) => ({
        url: "/auth/logout",
        method: "POST",
        body: refreshToken,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi;
