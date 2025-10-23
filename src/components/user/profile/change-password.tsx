import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { changePasswordSchema, type ChangePasswordSchemaType } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "../../../services/userServices";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";



const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    const { currentPassword, newPassword } = data;
    if (currentPassword === newPassword) {
      toast.error("passwords are same", { position: "top-right" });
      return;
    }
    const response: AxiosResponse = await changePassword(
      currentPassword,
      newPassword
    );

    if (response.status === 200) {
      toast.success(response.data.message || "password changed successfully", {
        position: "top-right",
      });
      reset()
    } else {
      toast.error(
        response.data.message ||
          "error while changing password. Please try again",
        {
          position: "top-right",
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4 border rounded-md p-4">
      <h2 className="mb-6 text-xl font-semibold">Change password</h2>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Current Password
        </label>
        <div className="relative">
          <Input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-xs">
              {errors.currentPassword.message}
            </p>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">New Password</label>
        <div className="relative">
          <Input
            type={showNewPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs">{errors.newPassword.message}</p>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <div className="pt-4">
        <Button className="">Change Password</Button>
      </div>
    </form>
  );
};

export default ChangePassword;