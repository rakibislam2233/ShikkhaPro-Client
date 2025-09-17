import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import { Label } from "../ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../../utils/validation.utils";
import { toast } from "sonner";
import type { TError } from "@/types/erro";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import { COOKIE_NAMES, setCookie } from "@/utils/cookies";
import { Button } from '../ui/Button';

const ForgotPasswordForm: React.FC = () => {
  const [forgotPassword, { isLoading: isSubmitting }] =
    useForgotPasswordMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword({
        email: data.email,
      }).unwrap();
      toast.success("OTP sent to your email!");
      // Redirect to OTP verification page with email in query params
      setCookie(COOKIE_NAMES.VERIFY_OTP_MAIL, data?.email, 1);
      setCookie(COOKIE_NAMES.FORGOT_PASSWORD_MAIL, data?.email, 1);
      navigate(`/verify-otp`);
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
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
                  <Input
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="pl-10"
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
                className="w-full cursor-pointer"
                variant="gradient"
                size="lg"
                loading={isSubmitting}
              >
                {isSubmitting ? "Sending OTP..." : "Send OTP"}
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
