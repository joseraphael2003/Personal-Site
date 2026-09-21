"use client";

import React, { createContext, useContext, useState } from "react";
import { EmailModal } from "@/components/ui/email-modal";

interface EmailModalContextType {
  openEmailModal: () => void;
  closeEmailModal: () => void;
  isEmailModalOpen: boolean;
}

const EmailModalContext = createContext<EmailModalContextType | undefined>(undefined);

export function EmailModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openEmailModal = () => setIsOpen(true);
  const closeEmailModal = () => setIsOpen(false);

  return (
    <EmailModalContext.Provider value={{ openEmailModal, closeEmailModal, isEmailModalOpen: isOpen }}>
      {children}
      <EmailModal open={isOpen} onOpenChange={setIsOpen} />
    </EmailModalContext.Provider>
  );
}

export function useEmailModal() {
  const context = useContext(EmailModalContext);
  if (!context) {
    throw new Error("useEmailModal must be used within an EmailModalProvider");
  }
  return context;
}
