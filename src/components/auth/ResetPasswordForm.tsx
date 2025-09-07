import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { 
  Eye, 
  EyeOff, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle, 
  BookOpen,
  Shield
} from "lucide-react";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import type { ResetPasswordFormData } from "../../utils/validation.utils";
import { toast } from "sonner";

const ResetPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ResetPasswordFormData>({
    // resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      token: token,
      newPassword: '',
      confirmPassword: '',
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
    
    if (strength <= 2) return { strength, label: "Weak", color: "text-red-500" };
    if (strength <= 3) return { strength, label: "Fair", color: "text-yellow-500" };
    if (strength <= 4) return { strength, label: "Good", color: "text-blue-500" };
    return { strength, label: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(newPassword || "");

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log("Reset password data:", data);
    
    // Manual validation
    if (!data.newPassword || data.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.newPassword)) {
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }
    
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords must match");
      return;
    }
    
    try {
      // Make API call to reset password
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: data.token || token,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Password reset failed');
      }

      setIsReset(true);
      toast.success('Password reset successfully!');
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const err = error as any;
      toast.error(err.message || 'Password reset failed');
    }
  };

  if (isReset) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0 bg-card/50 backdrop-blur-sm text-center">
            <CardHeader className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </motion.div>

              <div>
                <CardTitle className="text-2xl font-bold">
                  Password Reset Successful!
                </CardTitle>
                <CardDescription className="mt-2">
                  Your password has been updated successfully. 
                  <br />
                  Redirecting to sign in page...
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    );
  }

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
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-12 file:text-foreground placeholder:text-base selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-10 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    {...register("newPassword")}
                    aria-invalid={!!errors.newPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                            ? 'bg-red-500' 
                            : passwordStrength.strength <= 3
                            ? 'bg-yellow-500'
                            : passwordStrength.strength <= 4
                            ? 'bg-blue-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
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
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-12 file:text-foreground placeholder:text-base selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-10 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    {...register("confirmPassword")}
                    aria-invalid={!!errors.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                  <li className={newPassword?.length >= 8 ? "text-green-600" : ""}>
                    • At least 8 characters
                  </li>
                  <li className={/[a-z]/.test(newPassword || "") ? "text-green-600" : ""}>
                    • One lowercase letter
                  </li>
                  <li className={/[A-Z]/.test(newPassword || "") ? "text-green-600" : ""}>
                    • One uppercase letter
                  </li>
                  <li className={/\d/.test(newPassword || "") ? "text-green-600" : ""}>
                    • One number
                  </li>
                  <li className={/[@$!%*?&]/.test(newPassword || "") ? "text-green-600" : ""}>
                    • One special character
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full"
                variant="gradient"
                size="lg"
loading={isSubmitting}
              >
                {isSubmitting
                  ? "Updating Password..."
                  : "Update Password"}
                {!isSubmitting && (
                  <ArrowRight className="w-4 h-4 ml-2" />
                )}
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