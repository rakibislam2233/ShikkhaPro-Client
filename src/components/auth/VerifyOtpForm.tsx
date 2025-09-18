import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Shield,
  ArrowLeft,
  BookOpen,
  RotateCcw,
  Clock,
  Loader,
} from "lucide-react";
import { Button } from '../ui/Button';
import { Label } from "../ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card.tsx";
import { otpSchema, type OtpFormData } from "../../utils/validation.utils";
import { toast } from "sonner";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/authApi";
import type { TError } from "@/types/erro";
import { COOKIE_NAMES, getCookie, removeCookie } from "@/utils/cookies";
import { zodResolver } from "@hookform/resolvers/zod";

const VerifyOtpForm: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResendLoading }] = useResendOtpMutation();
  const navigate = useNavigate();
  const email = getCookie(COOKIE_NAMES.VERIFY_OTP_MAIL);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
    defaultValues: {
      email: email,
      otp: "",
    },
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Update form value
    setValue("otp", newOtp.join(""));
    trigger("otp");

    // Focus next input
    if (element.value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setValue("otp", newOtp.join(""));
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      setValue("otp", pastedData);
      trigger("otp");

      // Focus the last input
      otpRefs.current[5]?.focus();
    }
  };

  const onSubmit = async (data: OtpFormData) => {
    try {
      await verifyOtp({
        email: data.email,
        otp: data.otp,
      }).unwrap();
      toast.success("OTP verified successfully!");
      setTimeout(() => {
        removeCookie(COOKIE_NAMES.VERIFY_OTP_MAIL);
        navigate("/reset-password");
      }, 1500);
    } catch (error) {
      const err = error as TError;
      toast.error(err.data.message || "OTP verification failed");
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({ email: email as string }).unwrap();
      toast.success("OTP resent successfully!");
      setCountdown(120);
      setCanResend(false);
      setOtp(new Array(6).fill(""));
      setValue("otp", "");
      otpRefs.current[0]?.focus();
    } catch (error) {
      const err = error as TError;
      toast.error(err.data.message || "Failed to resend OTP");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
              Verify Reset Code
            </CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to your email to reset your password
              <br />
              <span className="font-medium text-foreground">
                {email || "your email"}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-3">
                <Label className="text-center block">
                  Enter Verification Code
                </Label>
                <div
                  className="flex justify-center space-x-2"
                  onPaste={handlePaste}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpRefs.current[index] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center text-lg font-bold border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors bg-background"
                      disabled={isLoading || isSubmitting}
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="text-sm text-destructive text-center">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    {countdown > 0
                      ? `Resend code in ${formatTime(countdown)}`
                      : "Code expired"}
                  </span>
                </div>

                {canResend && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleResendOtp}
                    className="text-primary hover:text-primary-foreground hover:bg-primary cursor-pointer"
                  >
                    {isResendLoading ? (
                      <h1 className="flex items-center">
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Resending...
                      </h1>
                    ) : (
                      <h1 className="flex items-center">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Resend Code
                      </h1>
                    )}
                  </Button>
                )}
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer"
                variant="default"
                size="lg"
                disabled={otp.join("").length !== 6}
              >
                {isLoading || isSubmitting ? "Verifying..." : "Verify Account"}
                {!isLoading && !isSubmitting && (
                  <Shield className="w-4 h-4 ml-2" />
                )}
              </Button>
            </form>

            <div className="text-center space-y-2">
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

export default VerifyOtpForm;
