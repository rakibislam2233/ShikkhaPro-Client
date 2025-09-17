import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Trash2,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Building,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { useAuth } from "@/hooks/useAuth";
import {
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileImageMutation,
} from "@/redux/features/profile/profileApi";
import { toast } from "sonner";
import AuthGuard from "@/components/auth/AuthGuard";
import LoadingSpinner from "../ui/LoadingSpinner";
import type { TError } from "@/types/erro";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "@/utils/validation.utils";
import { useForm } from "react-hook-form";
import imageBaseUrl from "@/utils/imageBaseUrl";

const SettingsPanel = () => {
  const { user, isLoading: userLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    fullName: user?.profile?.fullName || "",
    email: user?.email || "",
    phone: user?.profile?.phone || "",
    address: user?.profile?.address || "",
    organization: user?.profile?.organization || "",
    bio: user?.profile?.bio || "",
  });

  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileMutation();
  const [deleteProfile, { isLoading: deleteLoading }] =
    useDeleteProfileMutation();

  // change password
  const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();

  // update profile image
  const [updateProfileImage] = useUpdateProfileImageMutation();

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.profile?.fullName || "",
        email: user.email || "",
        phone: user.profile?.phone || "",
        address: user.profile?.address || "",
        organization: user.profile?.organization || "",
        bio: user.profile?.bio || "",
      });
    }
  }, [user]);

  const settingsTabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
  ];

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, GIF)");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("profileImage", file);
      try {
        await updateProfileImage(formData).unwrap();
        toast.success("Profile image updated successfully!");
      } catch (error) {
        const err = error as TError;
        toast.error(err?.data?.message || "Failed to update profile image");
      }
    }
  };

  const handleProfileSave = async () => {
    try {
      await updateProfile(profileData).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await changePassword(data).unwrap();
      reset();
      toast.success("Password changed successfully!");
    } catch (err) {
      const error = err as TError;
      toast.error(error.data.message);
    }
  };
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteProfile(undefined).unwrap();
        toast.success("Account deleted successfully");
        // Redirect to login or home page
        window.location.href = "/";
      } catch (error) {
        const err = error as TError;
        toast.error(err?.data?.message || "Failed to delete account");
      }
    }
  };

  const renderProfileTab = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Profile Information</h3>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-20 w-20 shadow-2xl rounded-full overflow-hidden bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : user?.profile?.avatar ? (
                <img
                  src={`${imageBaseUrl}${user.profile.avatar}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                profileData.fullName?.charAt(0)?.toUpperCase() ||
                user?.email?.charAt(0)?.toUpperCase() ||
                "U"
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 h-6 w-6 bg-white text-primary rounded-full flex items-center justify-center cursor-pointer transition-colors"
            >
              <Camera className="h-3 w-3" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
          <div>
            <h4 className="font-medium">Profile Picture</h4>
            <p className="text-sm text-muted-foreground">
              Click the camera icon to upload a new picture (max 5MB)
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={profileData.fullName}
              onChange={(e) =>
                setProfileData({ ...profileData, fullName: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Email cannot be changed
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({ ...profileData, address: e.target.value })
                }
                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Organization</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={profileData.organization}
              onChange={(e) =>
                setProfileData({ ...profileData, organization: e.target.value })
              }
              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            value={profileData.bio}
            onChange={(e) =>
              setProfileData({ ...profileData, bio: e.target.value })
            }
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-primary resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleProfileSave}
            disabled={updateLoading}
            className="flex items-center space-x-2 cursor-pointer"
          >
            {updateLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{updateLoading ? "Saving..." : "Save Changes"}</span>
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderSecurityTab = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Security Settings</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-lg mb-4">Change Password</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter current password"
                  className="pl-10 pr-10"
                  {...register("currentPassword")}
                  aria-invalid={!!errors.currentPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-destructive">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  className="pl-10 pr-10"
                  {...register("newPassword")}
                  aria-invalid={!!errors.newPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-destructive">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm your new password"
                  className="pl-10 pr-10"
                  {...register("confirmPassword")}
                  aria-invalid={!!errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
            <Button
              type="submit"
              className="w-full cursor-pointer"
              variant="gradient"
              size="lg"
              loading={changePasswordLoading}
            >
              {changePasswordLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : null}
              Update
            </Button>
          </form>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium mb-4 text-red-600">Danger Zone</h4>
          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
            <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">
              Delete Account
            </h5>
            <p className="text-sm text-red-600 dark:text-red-300 mb-4">
              Once you delete your account, there is no going back. All your
              quizzes and data will be permanently removed.
            </p>
            <Button
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            >
              {deleteLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              {deleteLoading ? "Deleting..." : "Delete Account"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "security":
        return renderSecurityTab();
      default:
        return renderProfileTab();
    }
  };

  if (userLoading) {
    return (
      <AuthGuard>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }
  return (
    <AuthGuard>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account preferences and customize your learning
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-3">
                {settingsTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                      w-full flex cursor-pointer items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }
                    `}
                      whileHover={{ x: isActive ? 0 : 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.name}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default SettingsPanel;
