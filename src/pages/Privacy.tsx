import SEOHead from "@/components/SEOHead";

const Privacy = () => (
  <div className="page-container max-w-2xl mx-auto animate-fade-up">
    <SEOHead
      title="Privacy Policy - Online Calculators"
      description="Online Calculators privacy policy. Learn what data we collect, how cookies and Google AdSense work, and how we protect your information."
      path="/privacy"
    />
    <h1 className="text-2xl font-bold text-foreground mb-4">Privacy Policy</h1>
    <div className="bg-card rounded-2xl p-5 sm:p-6 border border-border space-y-4 text-[14px] text-muted-foreground leading-relaxed">
      <p><strong>Last updated:</strong> May 2026</p>

      <p>
        We at <strong>Online Calculators</strong> respect your privacy. This Privacy Policy explains what information we collect, how it is used, and the choices you have.
      </p>

      <h2 className="text-base font-semibold text-foreground">1. Information We Collect</h2>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>We do <strong>not collect personal sensitive data</strong> like name, phone number, or government ID.</li>
        <li>Tool data (attendance, marks, expenses, notes) is stored <strong>locally in your browser</strong> using localStorage. We do not upload it.</li>
        <li>We may collect anonymous analytics (page views, device type, country) to improve the website.</li>
      </ul>

      <h2 className="text-base font-semibold text-foreground">2. Cookies</h2>
      <p>
        We use cookies to remember your preferences and improve your experience. You can accept or decline non-essential cookies via the cookie banner shown on your first visit.
      </p>

      <h2 className="text-base font-semibold text-foreground">3. Google AdSense &amp; Third Parties</h2>
      <p>
        We use Google AdSense to display ads. Google and its partners may use cookies to serve ads based on your visits to this site and other sites on the Internet. You can opt out of personalized advertising by visiting <a className="text-primary underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
      </p>
      <p>
        We may also use other third-party services (analytics, hosting). They have their own privacy policies governing how they handle data.
      </p>

      <h2 className="text-base font-semibold text-foreground">4. Children’s Privacy</h2>
      <p>Online Calculators is intended for college and university students. We do not knowingly collect data from children under 13.</p>

      <h2 className="text-base font-semibold text-foreground">5. Your Rights</h2>
      <p>You can clear all locally stored tool data at any time by clearing your browser storage. You can disable cookies in your browser settings.</p>

      <h2 className="text-base font-semibold text-foreground">6. Changes</h2>
      <p>We may update this policy from time to time. The “Last updated” date at the top will reflect any changes.</p>

      <h2 className="text-base font-semibold text-foreground">7. Contact</h2>
      <p>
        For privacy questions, email us at <a className="text-primary underline" href="mailto:primehrithik@gmail.com">primehrithik@gmail.com</a>.
      </p>

      <p>By using this website, you agree to our privacy practices.</p>
    </div>
  </div>
);

export default Privacy;
