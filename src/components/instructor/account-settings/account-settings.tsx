import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileUpload } from "./profile-upload";
import { useAppSelector } from "@/redux/store";
import { updateInstructorProfile } from "@/services/instructorServices";
import type { IInstructor } from "@/types/instructor";
import { updateProfile } from "@/services/userServices";
import { useDispatch } from "react-redux";
import { updateInstructor } from "@/redux/slices/instructorSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Validation functions
function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required";
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  if (trimmed.length > 30) return "Name must be less than 30 characters";
  if (!/[a-zA-Z]/.test(trimmed)) return "Name must contain at least one letter";
  return null;
}

function validatePhoneNumber(phoneNumber: string, phoneCode: string): string | null {
  const trimmed = phoneNumber.trim();
  if (!trimmed) return null; // Phone number is optional
  
  // Remove any spaces, dashes, or parentheses
  const cleaned = trimmed.replace(/[\s\-()]/g, '');
  
  // Check if it contains only digits
  if (!/^\d+$/.test(cleaned)) {
    return "Phone number must contain only digits";
  }
  
  // Validate length based on country code
  const lengthRules: Record<string, { min: number; max: number }> = {
    "+91": { min: 10, max: 10 }, // India
    "+1": { min: 10, max: 10 },  // US/Canada
    "+44": { min: 10, max: 11 }, // UK
    "+880": { min: 10, max: 11 }, // Bangladesh
  };
  
  const rule = lengthRules[phoneCode] || { min: 7, max: 15 };
  
  if (cleaned.length < rule.min) {
    return `Phone number must be at least ${rule.min} digits`;
  }
  if (cleaned.length > rule.max) {
    return `Phone number must be at most ${rule.max} digits`;
  }
  
  return null;
}

function validateTitle(title: string): string | null {
  const trimmed = title.trim();
  if (!trimmed) return null; // Title is optional
  if (trimmed.length < 3) return "Title must be at least 3 characters";
  if (trimmed.length > 50) return "Title must be less than 50 characters";
  return null;
}

function validateBiography(biography: string): string | null {
  const trimmed = biography.trim();
  if (!trimmed) return null; // Biography is optional
  if (trimmed.length < 10) return "Biography must be at least 10 characters";
  if (trimmed.length > 500) return "Biography must be less than 500 characters";
  return null;
}

export function AccountSettings() {
  const instructor = useAppSelector((state) => state.auth.user);
  const instructorDetails = useAppSelector((state) => state.instructor.instructor);

  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("+91");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [image, setImage] = useState<File | string | null>(null);
  const [, setInitialImage] = useState<string | null>(null);

  // Error states
  const [errors, setErrors] = useState({
    firstName: "",
    phoneNumber: "",
    title: "",
    biography: "",
  });

  const initialValues = {
    firstName: instructor?.name || "",
    phoneCode: instructorDetails?.countryCode || "+91",
    phoneNumber: instructorDetails?.phoneNumber || "",
    title: instructor?.title || "",
    biography: instructorDetails?.bio || "",
  };

  useEffect(() => {
    setFirstName(initialValues.firstName);
    setPhoneCode(initialValues.phoneCode);
    setPhoneNumber(initialValues.phoneNumber);
    setTitle(initialValues.title);
    setBiography(initialValues.biography);
    setImage(instructor?.profileImageUrl || null);
    setInitialImage(instructor?.profileImageUrl || null);
  }, [
    initialValues.biography,
    initialValues.firstName,
    initialValues.phoneCode,
    initialValues.phoneNumber,
    initialValues.title,
    instructor,
    instructorDetails,
  ]);

  const clearError = (field: keyof typeof errors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateAllFields = (): boolean => {
    const newErrors = {
      firstName: validateName(firstName) || "",
      phoneNumber: validatePhoneNumber(phoneNumber, phoneCode) || "",
      title: validateTitle(title) || "",
      biography: validateBiography(biography) || "",
    };

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const getUpdatedData = () => {
    const trimmed = {
      firstName: firstName.trim(),
      phoneCode: phoneCode.trim(),
      phoneNumber: phoneNumber.trim(),
      title: title.trim(),
      biography: biography.trim(),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedFields: any = {};

    if (trimmed.firstName !== initialValues.firstName.trim()) {
      updatedFields.name = trimmed.firstName;
    }
    if (trimmed.phoneCode !== initialValues.phoneCode.trim()) {
      updatedFields.phoneCode = trimmed.phoneCode;
    }
    if (trimmed.phoneNumber !== initialValues.phoneNumber.trim()) {
      updatedFields.phoneNumber = trimmed.phoneNumber;
    }
    if (trimmed.title !== initialValues.title.trim()) {
      updatedFields.title = trimmed.title;
    }
    if (trimmed.biography !== initialValues.biography.trim()) {
      updatedFields.biography = trimmed.biography;
    }

    if (Object.keys(updatedFields).length === 0) {
      return null;
    }

    return updatedFields;
  };

  const handleSave = async () => {
    // Validate all fields
    if (!validateAllFields()) {
      toast.error("Please fix the validation errors", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    const updatedData = getUpdatedData();
    const { biography, phoneCode, phoneNumber, ...basicInstructorDetails } = updatedData ?? {};

    if (
      !biography &&
      !phoneCode &&
      !phoneNumber &&
      Object.keys(basicInstructorDetails).length === 0 &&
      typeof image === "string"
    ) {
      toast.info("No changes detected", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Update instructor-specific fields
      if (biography || phoneCode || phoneNumber) {
        const updated: Partial<IInstructor> = {};
        if (biography) {
          updated.bio = biography;
        }
        if (phoneCode) {
          updated.countryCode = phoneCode;
        }
        if (phoneNumber) {
          updated.phoneNumber = phoneNumber;
        }

        const data = await updateInstructorProfile(instructor?._id, updated);
        dispatch(updateInstructor(data.instructor));
      }

      // Update basic user fields and profile image
      if (Object.keys(basicInstructorDetails).length !== 0 || typeof image !== "string") {
        const formData = new FormData();

        for (const key in basicInstructorDetails) {
          const value = basicInstructorDetails[key as keyof typeof basicInstructorDetails]?.trim();
          if (value) {
            formData.append(key, value);
          }
        }

        if (image && typeof image !== "string") {
          formData.append("profileImage", image);
        }

        await updateProfile(formData, dispatch);
      }

      toast.success("Profile updated successfully", {
        position: "top-right",
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full name <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      clearError("firstName");
                    }}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <Select value={phoneCode} onValueChange={setPhoneCode}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+880">+880</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+91">+91</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex-1 space-y-1">
                  <Input
                    id="phone"
                    placeholder="Your phone number..."
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      clearError("phoneNumber");
                    }}
                    className={errors.phoneNumber ? "border-red-500" : ""}
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-500">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="title">Title</Label>
                <span className="text-xs text-muted-foreground">{title.length}/50</span>
              </div>
              <Input
                id="title"
                placeholder="Your title, profession or small biography"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  clearError("title");
                }}
                maxLength={50}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="biography">Biography</Label>
                <span className="text-xs text-muted-foreground">{biography.length}/500</span>
              </div>
              <Textarea
                id="biography"
                placeholder="Tell us about yourself (minimum 10 characters)"
                className={`min-h-[120px] ${errors.biography ? "border-red-500" : ""}`}
                value={biography}
                onChange={(e) => {
                  setBiography(e.target.value);
                  clearError("biography");
                }}
                maxLength={500}
              />
              {errors.biography && <p className="text-xs text-red-500">{errors.biography}</p>}
            </div>
          </div>

          <div>
            <ProfileUpload image={image} setImage={setImage} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating changes...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}