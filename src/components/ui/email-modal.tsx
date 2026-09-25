"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react";
import { motion } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface EmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailModal({ open, onOpenChange }: EmailModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._gotcha) {
      // Spam honeypot triggered; silently succeed
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://formspree.io/f/mykpkklr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", _gotcha: "" });
      } else {
        const errorData = await response.json().catch(() => null);
        setStatus("error");
        setErrorMessage(
          errorData?.errors?.[0]?.message ||
            "Could not dispatch message. Please email directly at joseraphael2003@gmail.com"
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please email directly at joseraphael2003@gmail.com");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/80 light:bg-black/40 backdrop-blur-sm transition-opacity duration-150" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 pointer-events-none">
          <Dialog.Popup
            className="pointer-events-auto relative w-full max-w-[min(90vw,680px)] rounded-sm border border-edge-strong bg-raised p-5 sm:p-7 shadow-2xl text-body outline-none flex flex-col gap-5 max-h-[92vh] overflow-y-auto font-text"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.6 }}
              className="flex flex-col gap-5 w-full"
            >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-edge pb-3.5">
              <div>
                <Dialog.Title className="font-display text-lg sm:text-xl text-ink uppercase tracking-wide">
                  Quick Email
                </Dialog.Title>
              </div>
              <Dialog.Close className="cursor-pointer rounded-sm border border-edge p-1.5 text-muted hover:text-ink hover:bg-chip-hover transition-colors">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            {/* Content Body */}
            {status === "success" ? (
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent-hover">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-lg text-ink uppercase tracking-wide">
                    Message Dispatched
                  </h3>
                  <p className="text-sm text-muted max-w-sm leading-relaxed">
                    Thank you. Your message has been routed to my personal inbox. I will get back to
                    you within 24 hours.
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="cursor-pointer rounded-sm border border-edge-strong bg-chip px-4 py-2 text-sm text-copy hover:text-ink hover:bg-chip-hover transition-colors"
                  >
                    Send Another
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="cursor-pointer rounded-sm bg-accent px-4 py-2 text-sm font-bold text-on-accent hover:bg-accent-hover transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                {/* Honeypot for spam protection */}
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-3 rounded-sm border border-danger/30 bg-danger/10 text-danger flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-danger" />
                    <span className="leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-name" className="text-muted block font-medium">
                    Your Name <span className="text-accent-hover">*</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    disabled={status === "submitting"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Santos"
                    className="w-full rounded-sm border border-edge bg-field px-3 py-2 text-body placeholder:text-faint focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-email" className="text-muted block font-medium">
                    Your Email <span className="text-accent-hover">*</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    disabled={status === "submitting"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className="w-full rounded-sm border border-edge bg-field px-3 py-2 text-body placeholder:text-faint focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-message" className="text-muted block font-medium">
                    Project Scope / Inquiry <span className="text-accent-hover">*</span>
                  </label>
                  <textarea
                    id="modal-message"
                    required
                    rows={4}
                    disabled={status === "submitting"}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your project, timeline, or question..."
                    className="w-full rounded-sm border border-edge bg-field px-3 py-2 text-body placeholder:text-faint focus:border-accent focus:outline-none transition-colors disabled:opacity-50 resize-y leading-relaxed"
                  />
                </div>

                {/* Action Bar */}
                <div className="pt-2 flex items-center justify-end border-t border-edge">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="cursor-pointer rounded-sm bg-accent px-4 py-2 text-sm font-bold text-on-accent hover:bg-accent-hover transition-colors inline-flex items-center gap-1.5 disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
            </motion.div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
