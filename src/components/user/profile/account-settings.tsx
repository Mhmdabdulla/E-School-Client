import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import profilePlaceholder from "/profile_placeholder.png";
import { getUserProfile, updateProfile } from "@/services/userServices";
import { useDispatch } from "react-redux";
import ChangePassword from "./change-password";
import { toast } from "sonner";
import { profileUpdateSchema, type ProfileUpdateSchemaType } from "@/schemas/profile";

interface User {
  _id: string;
  name: string;
  email: string;
  courses: number;
  title: string;
  profileImageUrl: string;
  status: "active" | "blocked";
  createdAt: Date;
}



const AccountSettings: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileUpdateSchemaType, string>>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserProfile();
      console.log(response);
      if (response.status === 200) {
        const user = response.data.user;
        setUser(user);
        setLoading(false);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.name.split(" ")[0]);
      setLastName(user.name.split(" ")[1] || "");
      setTitle(user.title);
      setImagePreview(user.profileImageUrl || null);
    }
  }, [user]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    
    // Validate file type and size
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, WEBP)", {
          position: "top-right",
          duration: 2000,
        });
        return;
      }

      if (file.size > maxSize) {
        toast.error("Image size must be less than 5MB", {
          position: "top-right",
          duration: 2000,
        });
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});

    // Validate with Zod
    const validationResult = profileUpdateSchema.safeParse({
      firstName,
      lastName,
      title,
    });

    if (!validationResult.success) {
      // Extract and display errors
      const formattedErrors: Partial<Record<keyof ProfileUpdateSchemaType, string>> = {};
      
      validationResult.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ProfileUpdateSchemaType;
        if (!formattedErrors[field]) {
          formattedErrors[field] = err.message;
        }
      });

      setErrors(formattedErrors);

      // Show first error as toast
      const firstError = validationResult.error.issues[0];
      toast.error(firstError.message, {
        position: "top-right",
        duration: 2000,
      });

      return;
    }

    // Proceed with API call
    try {
      const formData = new FormData();
      if (image) formData.append("profileImage", image);
      formData.append("name", `${firstName.trim()} ${lastName.trim()}`);
      formData.append("title", title.trim());
      
      await updateProfile(formData, dispatch);
      
      toast.success("Profile updated successfully!", {
        position: "top-right",
        duration: 2000,
      });
    } catch (error) {
      console.log(error)
      toast.error("Failed to update profile", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-background"></div>;
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div
            className="lg:col-span-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-background border border-border rounded-lg shadow-sm p-6 text-center">
              <div className="relative md:w-full md:h-full w-32 h-32 mx-auto mb-4 md:mb-20">
                <img
                  src={imagePreview || profilePlaceholder}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full border-2 border-border"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-border text-foreground hover:bg-muted"
                onClick={handleUploadClick}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPEG, PNG, WEBP (Max 5MB)
              </p>
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-background border border-border rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      First Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (errors.firstName) {
                          setErrors((prev) => ({ ...prev, firstName: undefined }));
                        }
                      }}
                      className={`bg-background border-border text-foreground ${
                        errors.firstName ? "border-destructive" : ""
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Last Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (errors.lastName) {
                          setErrors((prev) => ({ ...prev, lastName: undefined }));
                        }
                      }}
                      className={`bg-background border-border text-foreground ${
                        errors.lastName ? "border-destructive" : ""
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Username
                  </label>
                  <Input
                    readOnly
                    placeholder="Username"
                    value={user?.name || ""}
                    className="bg-muted text-foreground/70 border-border cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <Input
                    readOnly
                    type="email"
                    value={user?.email || ""}
                    className="bg-muted text-foreground/70 border-border cursor-not-allowed"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-foreground">
                      Title
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {title?.length}/50
                    </span>
                  </div>
                  <Input
                    maxLength={50}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title) {
                        setErrors((prev) => ({ ...prev, title: undefined }));
                      }
                    }}
                    className={`bg-background border-border text-foreground ${
                      errors.title ? "border-destructive" : ""
                    }`}
                    placeholder="e.g., Senior Software Engineer"
                  />
                  {errors.title && (
                    <p className="text-xs text-destructive mt-1">{errors.title}</p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleSaveClick}
                    className="bg-foreground text-background hover:bg-muted-foreground"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ChangePassword />
    </motion.div>
  );
};

export default AccountSettings;