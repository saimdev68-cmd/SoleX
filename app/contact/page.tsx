"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast("Please fill out all required contact fields", "error");
      return;
    }

    setIsSubmitted(true);
    showToast("Thank you! Your message has been received.", "success");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
      <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
          Customer Care
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          Connect with SoleX
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          Have an inquiry regarding footwear sizing, Cash on Delivery orders, or warranty? Our customer concierge is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 pb-2 border-b border-zinc-100">
              Support Channels
            </h3>

            <div className="flex items-start gap-3.5 text-xs text-zinc-600">
              <Mail className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 font-semibold">Email Concierge</strong>
                <p>support@solex.shoes</p>
                <p className="text-zinc-400 text-[11px] mt-0.5">Average response within 2 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-xs text-zinc-600">
              <Phone className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 font-semibold">Toll-Free Helpline</strong>
                <p>+1 (800) 555-SOLEX</p>
                <p className="text-zinc-400 text-[11px] mt-0.5">Mon–Fri, 9am–7pm EST</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-xs text-zinc-600">
              <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 font-semibold">Design Studio</strong>
                <p>SoleX Kinetics Lab</p>
                <p>742 Evergreen Way, Suite 400</p>
                <p>Seattle, WA 98101</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-zinc-200/80 shadow-card">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950">Thank you! Your message has been received.</h3>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
                Our team has received your message and will review it shortly. You can also contact us via email at any time.
              </p>
              <div className="pt-2">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  Send Another Inquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  required
                />
              </div>

              <Input
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Sizing inquiry on SoleX Air One"
                required
              />

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-700"
                >
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with your footwear?"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full rounded-xl text-xs uppercase tracking-wider font-bold mt-2"
              >
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
