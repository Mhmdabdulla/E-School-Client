import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPassword } from "@/services/authServices";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {resetPasswordSchema, type ResetPasswordSchemaType} from "@/schemas/auth"



const ResetPasswordDialog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(true); // Track the dialog open state
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");  
    setToken(token);
  }, [location]);

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    if (!token) {
      setError("Invalid or expired token");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(token, data.confirmPassword);
      if (response.status === 200) {
        navigate("/login");
        toast.success("Password reset successfully. You can now log in.", {
          position: "top-right",
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response.data.message || "Something went wrong. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return null; 
  }

  const handleDialogClose = () => {
    setOpen(false); 
    navigate("/login"); 
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-sm">
          Reset Password
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Reset your password</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 text-center py-3">
            Please enter a new password to reset your account.
          </DialogDescription>
        </DialogHeader>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
          <div className="flex flex-col gap-3">
            <Label className="font-semibold text-sm">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                className="pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 font-mono text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label className="font-semibold text-sm">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                className="pr-10"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                {...register("confirmPassword")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 font-mono text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ?
              (
                <div className="flex items-center justify-center gap-1">
                <div className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin mr-2"></div>
                 Resetting...
                </div>
              )
              : "Reset Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordDialog;