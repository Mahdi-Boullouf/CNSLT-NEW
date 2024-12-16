"use client";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useChangePassword } from "@/hooks/useFetchProfile";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications

export default function Profile() {
  const { changePassword } = useChangePassword();
  const { user } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const profile = Object.fromEntries(formData);

    // Basic validation
    if (!profile.email || !profile.currentPassword || !profile.newPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password strength check (example: at least 8 characters)
    if (profile.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    try {
      await changePassword(profile);
      toast.success("Password changed successfully");
      // Reset form fields
      e.target.reset();
    } catch (error) {
      toast.error(error.message || "Failed to change password");
    }
  };

  return (
    <div className="w-full pt-6">
      <section className="px-12 sm:px-2 mb-6">
        <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
        <div className="space-y-4">
          <InputField label="Full Name" id="fullname" value={user?.fullname} disabled />
          <InputField label="Phone" id="phone" value={user?.phone} disabled />
        </div>
      </section>
      
      <section className="px-12 sm:px-2 border-t border-gray-300">
        <h2 className="my-4 text-lg font-semibold">Security</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <InputField label="Email" id="email" type="email" required />
          <InputField label="Current Password" id="currentPassword" type="password" required />
          <InputField label="New Password" id="newPassword" type="password" required />
          <Button type="submit" className="bg-primary1 my-2 w-36">Save</Button>
        </form>
      </section>
    </div>
  );
}

const InputField = ({ label, id, type = "text", ...props }) => (
  <div className="grid w-full items-center gap-1.5">
    <Label htmlFor={id} className="my-2">{label}</Label>
    <Input type={type} id={id} name={id} placeholder={label} {...props} />
  </div>
);