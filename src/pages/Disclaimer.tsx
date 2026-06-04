import SEOHead from "@/components/SEOHead";

const Disclaimer = () => (
  <div className="page-container max-w-2xl mx-auto animate-fade-up">
    <SEOHead
      title="Disclaimer - Online Calculators"
      description="General informational disclaimer for tools, calculators and content available on Online Calculators."
      path="/disclaimer"
    />
    <h1 className="text-2xl font-bold text-foreground mb-4">Disclaimer</h1>
    <div className="bg-card rounded-2xl p-5 sm:p-6 border border-border space-y-4 text-[14px] text-muted-foreground leading-relaxed">
      <p><strong>Last updated:</strong> May 2026</p>

      <h2 className="text-base font-semibold text-foreground">General Information</h2>
      <p>All tools, calculators, blog articles and content provided on Online Calculators are for general informational purposes only. While we work hard to keep the information up-to-date and correct, we make no warranties of any kind, express or implied, about the completeness, accuracy, reliability or availability of the website or the information.</p>

      <h2 className="text-base font-semibold text-foreground">Academic Tools</h2>
      <p>Tools like the Attendance Tracker, CGPA Calculator, Required Marks Calculator and Marks Analyzer are based on standard formulas. Your college or university grading rules may differ. Always confirm with your official academic department before relying on the results.</p>

      <h2 className="text-base font-semibold text-foreground">Financial Tools</h2>
      <p>Tools like the EMI Calculator, GST Calculator and Expense Tracker are for educational purposes only and are not financial advice. Consult a qualified financial advisor before making decisions involving money.</p>

      <h2 className="text-base font-semibold text-foreground">Health Tools</h2>
      <p>Tools like the BMI Calculator are for general awareness only and are not medical advice. Consult a qualified doctor for any medical concerns.</p>

      <h2 className="text-base font-semibold text-foreground">External Links</h2>
      <p>Our website may contain links to third-party websites. We have no control over their content or practices and are not responsible for them.</p>

      <h2 className="text-base font-semibold text-foreground">Use at Your Own Risk</h2>
      <p>Any action you take based on the information on Online Calculators is strictly at your own risk. We will not be liable for any losses or damages.</p>

      <p>By using Online Calculators you agree to this disclaimer. For questions, contact <a className="text-primary underline" href="mailto:primehrithik@gmail.com">primehrithik@gmail.com</a>.</p>
    </div>
  </div>
);

export default Disclaimer;
