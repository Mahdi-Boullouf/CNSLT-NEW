import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useUploadFile } from "@/hooks/useUpload";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function DemandeConvention() {
  const { uploadFile } = useUploadFile();
  const urlDoawnlodFile = "@/";

  const [file, setFile] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleUploadFile = async () => {
    if (file) {
      if (captchaValue) {
        try {
          await uploadFile(file, captchaValue);
          toast.success("File uploaded successfully");
        } catch (error) {
          toast.error("Error uploading file");
        }
      } else {
        toast.error("Please complete the CAPTCHA");
      }
    } else {
      toast.error("Please select a file");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full mt-4 overflow-hidden"
    >
      <h1 className="text-primary1 text-7xl sm:text-3xl font-body text-center">
        Demander une convention de partenariat comité d'entreprise
      </h1>
      <p className="my-12 text-black font-raleway text-2xl font-medium sm:text-lg">
        Si vous avez besoin de nos services, n'hésitez pas à nous contacter pour
        obtenir un devis personnalisé, sans aucun engagement de votre part. Nous
        sommes là pour répondre à vos besoins et vous fournir toutes les
        informations nécessaires.
      </p>
      <div className="flex sm:flex-col items-center justify-between">
        <Button className="bg-green-500 mt-4">
          <Link
            target="_blank"
            href="https://docs.google.com/document/d/1tWP7gqARdPw5keGKQRenQTaCVP8uh70z/edit"
          >
            Télécharger Convention De Partenariat
          </Link>
        </Button>
        <div className="w-1/2 sm:w-full bg-gray-100 flex items-center justify-between mt-12 p-12 rounded-lg">
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="text-blue-500"
          />
        </div>
      </div>
      <div className=" flex justify-end items-end mt-4 sm:flex-col">
        {file && (
          <ReCAPTCHA
            sitekey="6Lc6cigqAAAAAFHseH-hnJCXHzjny_QeULFRb7Bc"
            onChange={handleCaptchaChange}
            className="mt-4 "
          />
        )}

        <Button
          onClick={handleUploadFile}
          className="bg-primary1  font-semibold  px-4 mt-4"
        >
          Upload
        </Button>
      </div>
    </motion.div>
  );
}
