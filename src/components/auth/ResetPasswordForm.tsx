import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Shield,
} from "lucide-react";
import { Button } from '../ui/Button';
import { Label } from "../ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../../utils/validation.utils";
import { toast } from "sonner";
import { COOKIE_NAMES, getCookie, removeCookie } from "@/utils/cookies";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TError } from "@/types/erro";
import { Input } from "../ui/Input";

const ResetPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const email = getCookie(COOKIE_NAMES.FORGOT_PASSWORD_MAIL);

  const [resetPassword] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[@$!%*?&]/.test(password),
    ];

    strength = checks.filter(Boolean).length;

    if (strength <= 2)
      return { strength, label: "Weak", color: "text-red-500" };
    if (strength <= 3)
      return { strength, label: "Fair", color: "text-yellow-500" };
    if (strength <= 4)
      return { strength, label: "Good", color: "text-blue-500" };
    return { strength, label: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(newPassword || "");

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({
        email: email as string,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password reset successfully!");
      setTimeout(() => {
        removeCookie(COOKIE_NAMES.FORGOT_PASSWORD_MAIL);
        navigate("/login");
      }, 2000);
    } catch (error) {
      const err = error as TError;
      toast.error(err.data.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex w-fit mx-auto items-center justify-center mb-4"
            >
              <Link
                to="/"
                className="flex items-center space-x-2 text-xl font-bold"
              >
                <BookOpen className="w-8 h-8 text-primary" />
                <span className="gradient-text font-semibold text-primary">
                  ShikkhaPro
                </span>
              </Link>
            </motion.div>

            <CardTitle className="text-2xl font-bold">
              Reset Your Password
            </CardTitle>
            <CardDescription>
              Create a new strong password for your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    id="password"
                    {...register("newPassword")}
                    className="pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Password strength:</span>
                      <span className={`font-medium ${passwordStrength.color}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          passwordStrength.strength <= 2
                            ? "bg-red-500"
                            : passwordStrength.strength <= 3
                            ? "bg-yellow-500"
                            : passwordStrength.strength <= 4
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {errors.newPassword && (
                  <p className="text-sm text-destructive">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
                  <Input
                    id="confirmPassword"
                    className="pl-10"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      validate: (value) => value === newPassword,
                    })}
                    aria-invalid={!!errors.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>Your password should contain:</p>
                <ul className="space-y-1 ml-4">
                  <li
                    className={newPassword?.length >= 8 ? "text-green-600" : ""}
                  >
                    • At least 8 characters
                  </li>
                  <li
                    className={
                      /[a-z]/.test(newPassword || "") ? "text-green-600" : ""
                    }
                  >
                    • One lowercase letter
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(newPassword || "") ? "text-green-600" : ""
                    }
                  >
                    • One uppercase letter
                  </li>
                  <li
                    className={
                      /\d/.test(newPassword || "") ? "text-green-600" : ""
                    }
                  >
                    • One number
                  </li>
                  <li
                    className={
                      /[@$!%*?&]/.test(newPassword || "")
                        ? "text-green-600"
                        : ""
                    }
                  >
                    • One special character
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer"
                variant="gradient"
                size="lg"
                loading={isSubmitting}
              >
                {isSubmitting ? "Updating Password..." : "Update Password"}
                {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPasswordForm;
