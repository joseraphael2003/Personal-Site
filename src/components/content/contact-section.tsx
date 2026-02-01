"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykpkklr";

const SOCIAL_LINKS = [
    {
        name: "GitHub",
        href: "https://github.com/joseraphael2003",
        icon: Github,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/jdichoso2003",
        icon: Linkedin,
    },
];

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
    const [formState, setFormState] = useState<FormState>("idle");
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("submitting");

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormState("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setFormState("error");
            }
        } catch {
            setFormState("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <header className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-mono uppercase tracking-wider">
                    System Status: Available
                </div>
                <h2 className="text-2xl md:text-5xl font-bold text-white tracking-tight">
                    Contact
                </h2>
                <p className="text-xs md:text-xl text-muted-text leading-relaxed">
                    &gt; Initiate connection. Send a transmission.
                </p>
            </header>

            {/* Content Grid: Form + Links */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form (2/3 width on desktop) */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block font-mono text-sm text-primary">
                            &gt; name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            minLength={2}
                            placeholder="Your name"
                            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all font-mono"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block font-mono text-sm text-primary">
                            &gt; email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all font-mono"
                        />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="block font-mono text-sm text-primary">
                            &gt; message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            minLength={10}
                            rows={5}
                            placeholder="Your message..."
                            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all font-mono resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={formState === "submitting"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/50 rounded-lg text-primary font-mono uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {formState === "submitting" ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Transmitting...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Transmit
                            </>
                        )}
                    </motion.button>

                    {/* Success/Error Messages */}
                    {formState === "success" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-green-400 font-mono text-sm"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Message transmitted successfully.
                        </motion.div>
                    )}
                    {formState === "error" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-red-400 font-mono text-sm"
                        >
                            <AlertCircle className="w-4 h-4" />
                            Transmission failed. Please try again.
                        </motion.div>
                    )}
                </form>

                {/* Links Sidebar (1/3 width on desktop) */}
                <div className="space-y-6">
                    <h3 className="font-mono text-sm text-primary uppercase tracking-widest">
                        // External Channels
                    </h3>

                    {/* Social Links - Pills */}
                    <div className="flex flex-wrap gap-3">
                        {SOCIAL_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-surface/30 hover:bg-surface/50 border border-white/10 hover:border-primary/30 rounded-full text-white/80 hover:text-white transition-all"
                            >
                                <link.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{link.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Status Indicator */}
                    <div className="pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-muted-text font-mono">Open to opportunities</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
