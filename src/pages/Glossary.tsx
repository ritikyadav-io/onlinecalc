import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const groups: { title: string; terms: { term: string; def: string }[] }[] = [
  {
    title: "Finance & Loans",
    terms: [
      { term: "EMI (Equated Monthly Installment)", def: "A fixed monthly payment that covers both principal and interest on a loan over a chosen tenure." },
      { term: "Principal", def: "The original loan amount borrowed before any interest is applied." },
      { term: "Interest Rate", def: "The annual percentage charged by a lender on the outstanding principal of a loan." },
      { term: "Tenure", def: "The total duration of a loan or deposit, usually expressed in months or years." },
      { term: "Amortization", def: "The gradual repayment of a loan through scheduled installments of principal and interest." },
      { term: "Prepayment", def: "Paying off part or all of a loan before its scheduled end date to reduce interest cost or tenure." },
      { term: "Foreclosure", def: "Full early closure of a loan by paying the entire outstanding balance in one lump sum." },
      { term: "Floating Rate", def: "An interest rate that changes over time based on a benchmark such as the repo rate." },
      { term: "Fixed Rate", def: "An interest rate that stays the same for the entire loan tenure." },
    ],
  },
  {
    title: "Investments & Savings",
    terms: [
      { term: "SIP (Systematic Investment Plan)", def: "A method of investing a fixed amount in mutual funds at regular intervals, typically monthly." },
      { term: "Lump Sum", def: "A one-time investment made in a single transaction instead of periodic contributions." },
      { term: "Maturity Value", def: "The total amount payable at the end of an investment's tenure, including principal and returns." },
      { term: "Compound Interest", def: "Interest calculated on both the principal and the previously accumulated interest." },
      { term: "FD (Fixed Deposit)", def: "A bank deposit that locks money for a fixed period at a guaranteed interest rate." },
      { term: "PPF (Public Provident Fund)", def: "A long-term government-backed savings scheme in India with tax benefits and a 15-year lock-in." },
      { term: "CAGR", def: "Compound Annual Growth Rate — the smoothed annual return of an investment over a period." },
      { term: "Rupee-Cost Averaging", def: "Buying more units when prices are low and fewer when high, automatically through regular SIPs." },
    ],
  },
  {
    title: "Tax & GST",
    terms: [
      { term: "GST (Goods and Services Tax)", def: "An indirect tax levied on the supply of goods and services in India." },
      { term: "CGST / SGST / IGST", def: "Central, State, and Integrated GST — the three components depending on whether the supply is intra-state or inter-state." },
      { term: "Input Tax Credit", def: "Credit for GST paid on purchases that businesses can offset against their output GST liability." },
      { term: "TDS", def: "Tax Deducted at Source — tax withheld by the payer and deposited with the government on behalf of the recipient." },
      { term: "Standard Deduction", def: "A flat deduction available to salaried taxpayers from gross salary before computing tax." },
    ],
  },
  {
    title: "Salary & HR",
    terms: [
      { term: "CTC (Cost to Company)", def: "The total annual cost a company spends on an employee, including salary, benefits and contributions." },
      { term: "Gross Salary", def: "Salary before deductions like tax, PF and professional tax." },
      { term: "In-hand Salary", def: "The actual amount credited to an employee's bank account after all deductions." },
      { term: "HRA", def: "House Rent Allowance — a salary component meant to cover rented housing, with partial tax exemption." },
      { term: "EPF", def: "Employees' Provident Fund — a retirement savings scheme with contributions from both employer and employee." },
      { term: "Gratuity", def: "A lump sum paid by employers to employees who complete five or more years of continuous service." },
    ],
  },
  {
    title: "Health & General",
    terms: [
      { term: "BMI (Body Mass Index)", def: "A ratio of weight to height² used as a general indicator of healthy body weight." },
      { term: "BMR (Basal Metabolic Rate)", def: "The number of calories the body burns at rest to maintain basic functions." },
      { term: "TDEE", def: "Total Daily Energy Expenditure — calories burned per day including activity." },
      { term: "Ovulation", def: "The release of a mature egg from the ovary, typically mid-way through the menstrual cycle." },
      { term: "Attendance Percentage", def: "The ratio of classes attended to total classes held, expressed as a percentage." },
    ],
  },
];

const Glossary = () => {
  const faq = groups.flatMap((g) =>
    g.terms.slice(0, 2).map((t) => ({ q: `What is ${t.term}?`, a: t.def })),
  );

  return (
    <div className="page-container">
      <SEOHead
        title="Glossary of Calculator Terms"
        description="Plain-English definitions for every term used in our finance, tax, salary, HR and health calculators — EMI, SIP, GST, CTC, BMI and more."
        path="/glossary"
        faq={faq}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Glossary", path: "/glossary" },
        ]}
        noApp
      />

      <header className="mb-6">
        <h1 className="tool-title">Glossary</h1>
        <p className="tool-desc">
          Quick definitions for terms used across our calculators — finance, tax, salary, HR and health.
        </p>
      </header>

      <nav aria-label="Glossary sections" className="flex flex-wrap gap-2 mb-6">
        {groups.map((g) => (
          <a
            key={g.title}
            href={`#${g.title.replace(/\s+/g, "-").toLowerCase()}`}
            className="insight-pill hover:bg-primary/10 hover:text-foreground transition-colors"
          >
            {g.title}
          </a>
        ))}
      </nav>

      <div className="space-y-8">
        {groups.map((g) => (
          <section
            key={g.title}
            id={g.title.replace(/\s+/g, "-").toLowerCase()}
            aria-labelledby={`${g.title.replace(/\s+/g, "-").toLowerCase()}-h`}
            className="bg-card rounded-2xl border border-border p-4 sm:p-6"
          >
            <h2
              id={`${g.title.replace(/\s+/g, "-").toLowerCase()}-h`}
              className="section-heading mb-4"
            >
              {g.title}
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {g.terms.map((t) => (
                <div key={t.term}>
                  <dt className="text-[14px] font-semibold text-foreground">{t.term}</dt>
                  <dd className="text-[14px] text-muted-foreground mt-1 leading-relaxed">{t.def}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/more" className="btn-primary inline-block">Browse all calculators</Link>
      </div>
    </div>
  );
};

export default Glossary;
