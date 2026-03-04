"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Truck, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "pixel-speaker",
    quantity: "30-199",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if Supabase is configured
      if (!supabase) {
        console.log("Supabase not configured, logging form data:", formData);
        throw new Error("Database not configured");
      }

      // Insert enquiry into Supabase
      const { error: insertError } = await supabase
        .from("product_enquiries")
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || null,
            product_interest: formData.interest,
            quantity: formData.quantity,
            message: formData.message.trim() || null,
            source_page: "/products/pixel-speaker",
          },
        ]);

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        throw insertError;
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "pixel-speaker",
        quantity: "30-199",
        message: "",
      });
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Something went wrong. Please try again or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-gradient-to-br from-[#0B1F33] to-[#1F3A5F] section-padding scroll-mt-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Import This <span className="text-[#C56A2D]">Trending Gadget</span>?
          </h2>
          <p className="text-lg text-[#C9D4E0] max-w-2xl mx-auto">
            Start your brand journey today. Our team is ready to help you source,
            customize, and import this 6-in-1 wonder directly from China to India.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button
            size="lg"
            className="bg-[#C56A2D] hover:bg-[#B85A25] text-white"
            asChild
          >
            <a href="https://wa.me/919989724320" target="_blank" rel="noopener noreferrer">
              <Mail className="h-5 w-5 mr-2" />
              Enquire Now
            </a>
          </Button>
          <Button
            size="lg"
            className="bg-white text-[#0B1F33] hover:bg-[#F5F7FA]"
            asChild
          >
            <a href="https://wa.me/919989724320?text=I%20want%20to%20order%20bulk" target="_blank" rel="noopener noreferrer">
              <Truck className="h-5 w-5 mr-2" />
              Order Bulk
            </a>
          </Button>
        </div>

        {/* Contact Form */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 rounded-full bg-[#2E7F7A]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-[#2E7F7A]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1F2933] mb-2">
                  Thank You!
                </h3>
                <p className="text-[#666666] mb-6">
                  Your enquiry has been submitted. We&apos;ll contact you within 24 hours.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Enquiry
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[#1F2933] text-center mb-6">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#1F2933] mb-1"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#1F2933] mb-1"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[#1F2933] mb-1"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-sm font-medium text-[#1F2933] mb-1"
                    >
                      Product Interest
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E1E6ED] bg-white text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#0B1F33] focus:border-transparent transition-all"
                    >
                      <option value="pixel-speaker">
                        6-in-1 Pixel Animation BT Speaker
                      </option>
                      <option value="other">Other Products</option>
                      <option value="multiple">Multiple Products</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-[#1F2933] mb-1"
                    >
                      Estimated Quantity
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E1E6ED] bg-white text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#0B1F33] focus:border-transparent transition-all"
                    >
                      <option value="30-199">30 - 199 pieces</option>
                      <option value="200-499">200 - 499 pieces</option>
                      <option value="500-999">500 - 999 pieces</option>
                      <option value="1000+">1000+ pieces</option>
                      <option value="undecided">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#1F2933] mb-1"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your branding needs, timeline, or any questions..."
                      rows={4}
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Enquiry
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-[#666666]">
                    We&apos;ll respond within 24 hours. MOQ starts at 30 pieces
                    (negotiable).
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
