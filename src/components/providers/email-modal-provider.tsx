"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { EmailModal } from "@/components/ui/email-modal";

interface EmailModalContextType {
  openEmailModal: () => void;
}

const EmailModalContext = createContext<EmailModalContextType | undefined>(undefined);

export function EmailModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openEmailModal = () => setIsOpen(true);

  return (
    <EmailModalContext.Provider value={{ openEmailModal }}>
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