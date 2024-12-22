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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const bankDetails = {
    name: "CENTRE NAT DES SPO ET LOIS",
    branch: "TIKIDJDA CME EL ASSNAM",
    code: "10022 BOUIRA",
    accountNumber: "00100601030005297625",
  };

  const handleChargilyPayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Use the environment variable for the API URL
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/create-chargily`;
      
      const paymentData = {
        amount: 1000, // 10 DZD (in cents)
        customer_email: "customer@example.com", // Replace with actual email
        customer_name: "John Doe", // Replace with actual name
        client_reference_id: `order_${Date.now()}`,
        webhook_url: process.env.NEXT_PUBLIC_CHARGILY_WEBHOOK_URL,
        back_url: `${window.location.origin}/payment-complete`
      };

      console.log('Sending payment request to:', apiUrl);
      console.log('Payment data:', paymentData);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
        credentials: 'include' // Include if you're using cookies for authentication
      });

      const data = await response.json();
      console.log('Payment response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Payment creation failed');
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error('No checkout URL received from payment service');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Une erreur est survenue lors du paiement.');
    } finally {
      setIsLoading(false);
    }
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
        
        {error && (
          <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={handleChargilyPayment}
            disabled={isLoading}
            className="w-full py-3 text-white bg-green-600 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : null}
            {isLoading ? 'Traitement en cours...' : 'Payer en ligne avec Chargily'}
          </button>
          <p className="mt-2 text-xs text-center text-gray-500">
            Paiement sécurisé par carte bancaire, CCP, et EDAHABIA
          </p>
        </div>

        <div className="my-4 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OU</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Existing Bank Transfer Section */}
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
          <p>
            لم يتبقّ لك سوى خطوة واحدة لتفعيل طلبك وهي دفع مستحقات الخدمة، إذا كنت
            مقيماً في الجزائر فيمكنك دفع تكاليف الخدمة إلى الحساب البنكي التالي:
          </p>
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

        <div className="flex gap-4 mt-4">
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