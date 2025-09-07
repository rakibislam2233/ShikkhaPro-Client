import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import type { ForgotPasswordFormData } from "../../utils/validation.utils";
import { toast } from "sonner";
import type { TError } from "@/types/erro";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";

const ForgotPasswordForm: React.FC = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    // resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log("Forgot password data:", data);

    // Manual validation
    if (!data.email || data.email.trim().length === 0) {
      toast.error("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      await forgotPassword(data.email);
      toast.success("OTP sent to your email!");
      // Redirect to OTP verification page with email in query params
      navigate(
        `/verify-otp?email=${encodeURIComponent(
          data.email
        )}&type=reset-password`
      );
    } catch (error) {
      const err = error as TError;
      toast.error(err.data.message);
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
                <span className={`gradient-text font-semibold ext-primary`}>
                  ShikkhaPro
                </span>
              </Link>
            </motion.div>

            <CardTitle className="text-2xl font-bold">
              Forgot Password?
            </CardTitle>
            <CardDescription>
              No worries! Enter your email and we'll send you reset
              instructions.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 file:text-foreground placeholder:text-base selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-10 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                variant="gradient"
                size="lg"
                loading={isSubmitting}
              >
                {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
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

export default ForgotPasswordForm;
