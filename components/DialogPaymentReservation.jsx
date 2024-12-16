"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const DialogPaymentReservation = ({ isOpen, setIsOpen }) => {
  const [isCopied, setIsCopied] = useState(false);

  const bankDetails = {
    name: "CENTRE NAT DES SPO ET LOIS",
    branch: "TIKIDJDA CME EL ASSNAM",
    code: "10022 BOUIRA",
    accountNumber: "00100601030005297625",
  };

  const handleCopyDetails = () => {
    navigator.clipboard.writeText(
      `Name: ${bankDetails.name}\nBranch: ${bankDetails.branch}\nCode: ${bankDetails.code}\nAccount Number: ${bankDetails.accountNumber}`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md p-6 rounded-xl shadow-lg bg-white">
        <DialogTitle className="text-xl font-bold text-gray-800 text-center">
          Paiement pour confirmer la réservation
        </DialogTitle>
        <DialogDescription className="mt-2 text-sm text-gray-600 text-center">
          Il ne vous reste qu’une seule étape pour valider votre demande :
          régler les frais du service.
        </DialogDescription>
        <div className="mt-2 bg-gray-100 p-4 rounded-lg text-sm space-y-2">
          <p>
            <strong>Nom :</strong> {bankDetails.name}
          </p>
          <p>
            <strong>Agence :</strong> {bankDetails.branch}
          </p>
          <p>
            <strong>Code :</strong> {bankDetails.code}
          </p>
          <p>
            <strong>Numéro de Compte :</strong> {bankDetails.accountNumber}
          </p>
        </div>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Pour activer votre demande, veuillez envoyer une photo du reçu de
          paiement en réponse à cet e-mail.
        </p>
        <div className="mt-2 text-sm text-right rtl">
          <p>الدفع لتأكيد الحجز:</p>
          <p>لم يتبقّ لك سوى خطوة واحدة لتفعيل طلبك وهي دفع مستحقات الخدمة، إذا كنت مقيماً في الجزائر فيمكنك دفع تكاليف الخدمة إلى الحساب البنكي التالي:</p>
          <div className="mt-2 bg-gray-100 p-3 rounded-lg space-y-2">
            <p>
              <strong>الاسم:</strong> {bankDetails.name}
            </p>
            <p>
              <strong>الفرع:</strong> {bankDetails.branch}
            </p>
            <p>
              <strong>الرمز:</strong> {bankDetails.code}
            </p>
            <p>
              <strong>رقم الحساب:</strong> {bankDetails.accountNumber}
            </p>
          </div>
          <p className="mt-2">
            لتفعيل طلبك يرجى إرسال صورة لوصل الدفع رداً على هذا الايميل.
          </p>
        </div>
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleCopyDetails}
            className="flex-1 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            {isCopied ? "Détails copiés!" : "Copier les détails"}
          </button>
          <DialogClose asChild>
            <button className="flex-1 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition text-gray-800">
              Fermer
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPaymentReservation;
