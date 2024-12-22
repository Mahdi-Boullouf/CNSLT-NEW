"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import DemandeConvention from "./DemandeConvention";
import { useCreateDevis } from "@/hooks/useFetchDevis";
import { useStateContext } from "@/contexts/ContextProvider";
export default function DemanderDevis() {
  const { Areas } = useStateContext();
  const { createDevis, isLoading } = useCreateDevis();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    areaId: "",
    serviceType: "",
    description: "",
    participantsNumber: "",
    needsConvention: "",
    patnership: false,
  });
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      patnership: prevState.needsConvention === "yes",
    }));
  }, [formData.needsConvention]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }
  };

  const handleSelectChange = (id, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }
  };
  const renderInputField = (id, label, type, placeholder) => (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id} className="text-gray-500 my-2 text-lg font-semibold">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={formData[id]}
        onChange={handleChange}
        className={`ring-0 [&>span]:line-clamp-0 ${
          errors[id] ? "border-red-500" : ""
        }`}
      />
      {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
    </div>
  );

  const renderSelectField = (id, label, options) => (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id} className="text-gray-500 my-2 text-lg font-semibold">
        {label}
      </Label>
      <Select
        className={`ring-0 [&>span]:line-clamp-0 ${
          errors[id] ? "border-red-500" : ""
        }`}
        value={formData[id]}
        onValueChange={(value) => handleSelectChange(id, value)}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent position="popper">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
    </div>
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.areaId) newErrors.areaId = "Area is required";
    if (!formData.serviceType)
      newErrors.serviceType = "Service type is required";
    if (!formData.participantsNumber)
      newErrors.participantsNumber = "Number of participants is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    // if (!formData.needsConvention) newErrors.needsConvention = "Please specify if you have a convention";
    // if (formData.needsConvention === "no") {
    //   if (!file) newErrors.file = toast.error("Please upload a file");
    //   if (!captchaValue) newErrors.captcha = toast.error("Please complete the CAPTCHA");
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await createDevis(formData);
        toast.success(res.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          areaId: "",
          serviceType: "",
          description: "",
          participantsNumber: "",
          needsConvention: "",
          patnership: false,
        });
        setIsOpen(false);
      } catch (error) {
        toast.error(error.message || "Failed to create devis");
      }
    }
  };

  return (
    <div className="font-raleway">
      <div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            {renderInputField(
              "fullName",
              "Nom de l'entreprise",
              "text",
              "Enter your full name"
            )}
            {renderInputField(
              "email",
              "Email",
              "email",
              "Enter your email address"
            )}
            {renderInputField(
              "phone",
              "numéro de telephone",
              "tel",
              "Enter your phone number"
            )}
            {renderSelectField(
              "areaId",
              "selectionnez l'hotel",
              Areas.map((area) => ({
                value: area.name,
                label: area.name,
              }))
            )}
            {renderSelectField("serviceType", "type de service", [
              { value: "enterprise", label: "Enterprise" },
              { value: "association", label: "Association" },
            ])}

            {renderInputField(
              "participantsNumber",
              "Numéro de Participants",
              "number",
              "Enter number of participants"
            )}
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="description"
                className="text-gray-500 my-2 text-lg font-semibold"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                className={`ring-0 [&>span]:line-clamp-0 ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            {renderSelectField("needsConvention", "Do you have Convention?", [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ])}
          </div>
          <div className="min-h-12 py-4">
            {formData.needsConvention === "no" && (
              <div>
                <motion.button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-pointer text-gray-500 hover:text-blue-500 hover:underline"
                >
                  Demander une Convention?
                </motion.button>
              </div>
            )}
          </div>

          <div className="flex justify-end my-6">
            <Button
              type="submit"
              className="text-white px-6 py-2 rounded-lg bg-primary1 font-semibold text-lg hover:bg-opacity-60"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
        <div>{isOpen && <DemandeConvention />}</div>
      </div>
    </div>
  );
}
