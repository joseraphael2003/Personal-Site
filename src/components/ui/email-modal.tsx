"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react";
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
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-150" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <Dialog.Popup className="relative w-full max-w-[min(90vw,780px)] min-w-[320px] min-h-[min(420px,92vh)] resize overflow-auto rounded-sm border border-neutral-700 bg-[#0c0e12] p-5 sm:p-7 shadow-2xl text-neutral-200 outline-none flex flex-col gap-5 max-h-[92vh] font-mono">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3.5">
              <div>
                <Dialog.Title className="font-pixel text-lg sm:text-xl text-neutral-100 uppercase tracking-wide">
                  Quick Email
                </Dialog.Title>
              </div>
              <Dialog.Close className="cursor-pointer rounded-sm border border-neutral-800 p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            {/* Content Body */}
            {status === "success" ? (
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-pixel text-lg text-neutral-100 uppercase tracking-wide">
                    Message Dispatched
                  </h3>
                  <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
                    Thank you. Your message has been routed to my personal inbox. I will get back to
                    you within 24 hours.
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="cursor-pointer rounded-sm border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    Send Another
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="cursor-pointer rounded-sm bg-emerald-500 px-4 py-2 text-sm font-bold text-black hover:bg-emerald-400 transition-colors"
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
                  <div className="p-3 rounded-sm border border-red-900/50 bg-red-950/30 text-red-400 flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                    <span className="leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-name" className="text-neutral-400 block font-medium">
                    Your Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    disabled={status === "submitting"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Santos"
                    className="w-full rounded-sm border border-neutral-800 bg-[#14171d] px-3 py-2 text-neutral-200 placeholder:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-email" className="text-neutral-400 block font-medium">
                    Your Email <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    disabled={status === "submitting"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className="w-full rounded-sm border border-neutral-800 bg-[#14171d] px-3 py-2 text-neutral-200 placeholder:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-message" className="text-neutral-400 block font-medium">
                    Project Scope / Inquiry <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    id="modal-message"
                    required
                    rows={4}
                    disabled={status === "submitting"}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your project, timeline, or question..."
                    className="w-full rounded-sm border border-neutral-800 bg-[#14171d] px-3 py-2 text-neutral-200 placeholder:text-neutral-600 focus:border-emerald-500 focus:outline-none transition-colors disabled:opacity-50 resize-y leading-relaxed"
                  />
                </div>

                {/* Action Bar */}
                <div className="pt-2 flex items-center justify-end border-t border-neutral-800">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="cursor-pointer rounded-sm bg-emerald-500 px-4 py-2 text-sm font-bold text-black hover:bg-emerald-400 transition-colors inline-flex items-center gap-1.5 disabled:opacity-60"
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
            {/* Bottom-Right Tactile Resize Grip Icon */}
            <div
              className="pointer-events-none absolute bottom-1 right-1 flex items-end justify-end p-0.5 opacity-40"
              aria-hidden="true"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-neutral-400"
              >
                <path
                  d="M9 1L1 9M9 5L5 9M9 9L9 9.01"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
