import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Calculators", to: "/more" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
];

const Footer = () => (
  <footer className="border-t border-border bg-card mt-12 py-6">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {footerLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <p className="text-[12px] text-muted-foreground text-center sm:text-right">
        © 2026 Online Calculators. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
