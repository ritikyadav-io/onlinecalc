import { useState } from "react";
import { Mail, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = () => {
    // Open mailto with prefilled content — no backend required.
    const subject = encodeURIComponent(`Online Calculators – Message from ${form.name || "user"}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:primehrithik@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="page-container max-w-2xl mx-auto animate-fade-up space-y-4">
      <SEOHead
        title="Contact Online Calculators - Feedback, Suggestions, Support"
        description="Get in touch with the Online Calculators team. Send feedback, ideas or report issues. We usually respond within 24-48 hours."
        path="/contact"
      />
      <h1 className="text-2xl font-bold text-foreground">Contact Us</h1>

      <div className="bg-card rounded-2xl p-5 sm:p-6 border border-border space-y-3 text-[14px] text-muted-foreground leading-relaxed">
        <p>
          If you have any questions, suggestions or feedback, feel free to reach out. We’re always happy to help and improve your experience.
        </p>
        <div className="flex flex-col gap-2 pt-1">
          <a
            href="mailto:primehrithik@gmail.com"
            className="inline-flex items-center gap-2 text-foreground font-semibold"
          >
            <Mail size={16} className="text-primary" /> primehrithik@gmail.com
          </a>
          <p className="inline-flex items-center gap-2 text-[13px]">
            <Clock size={14} className="text-primary" /> We usually respond within 24–48 hours.
          </p>
        </div>
      </div>

      {!sent ? (
        <div className="bg-card rounded-2xl p-5 sm:p-6 border border-border space-y-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name"
            className="compact-input w-full"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Your Email"
            className="compact-input w-full"
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Your message..."
            className="compact-input w-full h-28 py-2 resize-none"
          />
          <button
            onClick={submit}
            disabled={!form.name || !form.email || !form.message}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50"
          >
            Send Message
          </button>
        </div>
      ) : (
        <div className="bg-safe/10 rounded-2xl p-5 text-center border border-safe/30">
          <p className="text-sm font-semibold text-safe">Email opened in your mail app!</p>
          <p className="text-xs text-muted-foreground mt-1">If nothing happened, write to primehrithik@gmail.com directly.</p>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground pt-2">Thank you for using Online Calculators.</p>
    </div>
  );
};

export default Contact;
