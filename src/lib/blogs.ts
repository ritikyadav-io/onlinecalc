export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  cluster: "loans" | "investments" | "tax" | "health" | "salary";
  keyword: string;
  related: string[];
  toolLinks: { label: string; to: string }[];
  content: string;
  faq: { q: string; a: string }[];
}

const TOOL = {
  emi: { label: "EMI Calculator", to: "/emi-calculator" },
  age: { label: "Age Calculator", to: "/age-calculator" },
  sip: { label: "SIP Calculator", to: "/sip-calculator" },
  bmi: { label: "BMI Calculator", to: "/bmi-calculator" },
  gratuity: { label: "Gratuity Calculator", to: "/gratuity-calculator" },
  gst: { label: "GST Calculator", to: "/gst-calculator" },
  pct: { label: "Percentage Calculator", to: "/percentage-calculator" },
  loan: { label: "Loan Calculator", to: "/loan-calculator" },
  rentbuy: { label: "Rent vs Buy Calculator", to: "/rent-vs-buy-calculator" },
  fd: { label: "FD Calculator", to: "/fd-calculator" },
  ppf: { label: "PPF Calculator", to: "/ppf-calculator" },
  calorie: { label: "Calorie Calculator", to: "/calorie-calculator" },
  ci: { label: "Compound Interest Calculator", to: "/compound-interest-calculator" },
  salary: { label: "Salary In-hand Calculator", to: "/salary-calculator" },
  ovul: { label: "Ovulation Calculator", to: "/ovulation-calculator" },
  incomeTax: { label: "Income Tax Calculator", to: "/income-tax-calculator" },
  tip: { label: "Tip Calculator", to: "/tip-calculator" },
  discount: { label: "Discount Calculator", to: "/discount-calculator" },
  hra: { label: "HRA Calculator", to: "/hra-calculator" },
};

export const blogs: BlogPost[] = [
  {
    slug: "how-to-calculate-emi-on-home-loan",
    title: "How to Calculate EMI on a Home Loan — The Complete 2026 Guide",
    description: "Master the EMI formula, slash your interest, and use our free EMI Calculator to plan home loans the smart way.",
    date: "May 6, 2026", readTime: "6 min", cluster: "loans",
    keyword: "how to calculate EMI on home loan",
    related: ["loan-vs-emi-calculator-difference", "how-to-reduce-loan-interest"],
    toolLinks: [TOOL.emi, TOOL.loan],
    content: `
## Stop Guessing — Start Calculating

Buying a home is the biggest financial decision most Indians ever make. **Don't trust a banker's word** — calculate your EMI yourself in 30 seconds using our free [EMI Calculator](/emi-calculator).

## The EMI Formula (Memorize This)

> **EMI = [P × R × (1+R)^N] / [(1+R)^N − 1]**

- **P** = Principal (loan amount)
- **R** = Monthly interest rate (annual rate ÷ 12 ÷ 100)
- **N** = Tenure in months

## Worked Example

Borrow ₹50 lakh at 9% for 20 years:

- P = 50,00,000
- R = 9 / 12 / 100 = 0.0075
- N = 240
- EMI ≈ **₹44,986/month**

Total payable: ₹1.07 crore. **Interest alone is ₹57 lakh** — more than the principal.

## 5 Power Moves to Slash Interest

1. **Increase tenure cautiously** — lowers EMI but balloons interest. Use our [Loan Calculator](/loan-calculator) to compare.
2. **Prepay early** — every rupee in years 1-5 saves multiples in interest.
3. **Negotiate the rate** — even 0.5% off saves lakhs.
4. **Pay one extra EMI per year** — knocks 4-5 years off the loan.
5. **Switch to a lower-rate lender** — balance transfer can pay for itself in 18 months.

## Conclusion

Run the numbers before you sign. Use the [EMI Calculator](/emi-calculator) to compare 3 banks side by side, then pick the one that minimises your total interest.
    `,
    faq: [
      { q: "What is a good EMI-to-income ratio?", a: "Keep total EMIs under 40% of monthly take-home. Above 50% is danger zone." },
      { q: "Can I calculate EMI without compounding?", a: "EMI uses reducing balance compounding by design. Simple-interest EMIs are extinct." },
      { q: "How does prepayment reduce EMI?", a: "It either lowers your EMI or shortens tenure — pick tenure reduction for max interest savings." },
    ],
  },

  {
    slug: "loan-vs-emi-calculator-difference",
    title: "Loan Calculator vs EMI Calculator — Which One Should You Use?",
    description: "Confused between Loan and EMI calculators? Here's the exact difference and when to use each one.",
    date: "May 5, 2026", readTime: "4 min", cluster: "loans",
    keyword: "difference between loan and EMI calculator",
    related: ["how-to-calculate-emi-on-home-loan", "how-to-reduce-loan-interest"],
    toolLinks: [TOOL.loan, TOOL.emi],
    content: `
## Same Math, Different Focus

Both tools use the same formula. The difference is **what they highlight**:

- The [EMI Calculator](/emi-calculator) zooms in on **monthly cash outflow** — perfect when budgeting.
- The [Loan Calculator](/loan-calculator) shows **total cost** — principal vs total interest — perfect for comparing 3 lenders.

## When to Use Which

- **Buying a car?** Run the [EMI Calculator](/emi-calculator) — you care about monthly affordability.
- **Comparing two banks?** Use the [Loan Calculator](/loan-calculator) — total payable wins.
- **Planning prepayment?** Both work; check the EMI tool's amortisation chart.

## Pro Tip

Pair either tool with our [SIP Calculator](/sip-calculator). If you can earn more in mutual funds than your loan rate, prepayment may not be the smartest move.
    `,
    faq: [
      { q: "Are the EMI numbers identical in both tools?", a: "Yes — same formula, same answer. Different presentation." },
      { q: "Which one is more accurate?", a: "Both are equally accurate to the rupee." },
    ],
  },

  {
    slug: "how-to-reduce-loan-interest",
    title: "How to Reduce Loan Interest — 7 Proven Tactics That Actually Work",
    description: "Slash your total interest by lakhs using these 7 proven loan strategies. Backed by math, not myth.",
    date: "May 4, 2026", readTime: "7 min", cluster: "loans",
    keyword: "how to reduce loan interest",
    related: ["how-to-calculate-emi-on-home-loan", "loan-vs-emi-calculator-difference"],
    toolLinks: [TOOL.loan, TOOL.emi, TOOL.sip],
    content: `
## Interest Is the Enemy

On a 20-year ₹50 L home loan at 9%, interest alone is **₹57 lakh**. Cut it. Here's how:

1. **Pay one extra EMI/year** — 5 years gone.
2. **Round up your EMI** — pay ₹46,000 instead of ₹44,986. Painless, powerful.
3. **Refinance at lower rate** — 0.5% drop = ₹3-5 L savings.
4. **Switch to MCLR/RLLR** — your loan should auto-track repo cuts.
5. **Use bonuses for prepayment** — every prepayment compounds savings.
6. **Choose monthly reducing balance** — never accept yearly rest.
7. **Avoid loan insurance bundling** — it's marked up; buy term insurance separately.

Always run the numbers in our [Loan Calculator](/loan-calculator) before deciding.

## Should You Prepay or Invest?

If your loan rate is 9% and your [SIP](/sip-calculator) earns 12% post-tax, investing may win. Use both tools to model your personal numbers.
    `,
    faq: [
      { q: "Is prepayment always best?", a: "Not always. Compare loan rate vs post-tax investment return." },
      { q: "Are there prepayment penalties?", a: "Floating-rate retail loans have zero prepayment charges per RBI rules." },
    ],
  },

  {
    slug: "sip-vs-lump-sum-investment",
    title: "SIP vs Lump Sum — Which Builds More Wealth in 2026?",
    description: "Discover when SIP beats lump sum, when it loses, and how to use a SIP Calculator to settle the debate.",
    date: "May 3, 2026", readTime: "6 min", cluster: "investments",
    keyword: "SIP vs lump sum",
    related: ["how-to-start-sip-investment", "compound-interest-power-of-time"],
    toolLinks: [TOOL.sip, TOOL.ci],
    content: `
## The Real Trade-off

- **SIP** = invest fixed amount monthly. Beats volatility via rupee-cost averaging.
- **Lump sum** = invest a one-time pot. Wins if markets only go up.

Plug both into our [SIP Calculator](/sip-calculator) and the [Compound Interest Calculator](/compound-interest-calculator) to see which fits your reality.

## Quick Math (12% return, 10 years)

- ₹10,000 SIP → ~₹23 lakh
- ₹12 lakh lump sum at start → ~₹37 lakh

Lump sum wins on paper — but only if you have ₹12 L lying around AND the discipline to deploy it.

## When SIP Wins

- You earn a salary (steady cashflow)
- You can't predict markets (no one can)
- You want to build the habit

Start with ₹500/month. Use the [SIP Calculator](/sip-calculator) to project a 25-year future you'll thank yourself for.
    `,
    faq: [
      { q: "Can I increase my SIP later?", a: "Yes — Step-up SIPs let you raise the amount yearly. Most apps support it." },
      { q: "Is SIP risk-free?", a: "No. SIPs invest in equities — short-term volatility is real, long-term it smooths out." },
    ],
  },

  {
    slug: "how-to-start-sip-investment",
    title: "How to Start a SIP Investment in 2026 — Step-by-Step",
    description: "From KYC to first auto-debit in 30 minutes. The complete beginner's guide to starting a SIP.",
    date: "May 2, 2026", readTime: "5 min", cluster: "investments",
    keyword: "how to start SIP investment",
    related: ["sip-vs-lump-sum-investment", "best-tax-saving-investments-india"],
    toolLinks: [TOOL.sip],
    content: `
## 5 Steps to Your First SIP

1. **Complete KYC online** — PAN + Aadhaar, takes 5 minutes.
2. **Pick a fund category** — Index funds for beginners (low cost, low drama).
3. **Use the [SIP Calculator](/sip-calculator)** to set a realistic monthly amount.
4. **Set up auto-debit** through any major app (Groww, Zerodha Coin, Kuvera).
5. **Don't stop on red days** — that's the entire point of SIP.

## Power Tip

Trigger your SIP **the day after salary credit**. You won't miss what you don't see.
    `,
    faq: [
      { q: "Minimum SIP amount?", a: "Most funds accept ₹500/month. Some allow ₹100." },
      { q: "Can I pause my SIP?", a: "Yes — most platforms allow 1-6 month pause without cancellation." },
    ],
  },

  {
    slug: "compound-interest-power-of-time",
    title: "Compound Interest — The 8th Wonder Explained with Numbers",
    description: "How ₹1,000/month becomes ₹1 crore. The power of compounding, modelled with a free calculator.",
    date: "May 1, 2026", readTime: "5 min", cluster: "investments",
    keyword: "power of compound interest",
    related: ["sip-vs-lump-sum-investment", "ppf-vs-fd-which-is-better"],
    toolLinks: [TOOL.ci, TOOL.sip],
    content: `
## Einstein Was Right

Compound interest doesn't grow linearly — it explodes. Test it in our [Compound Interest Calculator](/compound-interest-calculator).

## The Magic Numbers

₹1,000/month at 12% for:
- 10 years → ₹2.3 lakh
- 20 years → ₹10 lakh
- 30 years → ₹35 lakh
- 40 years → ₹1.18 **crore**

The last decade does **most** of the work. Start now.

## Rule of 72

Years to double = 72 / annual rate.

- 6% → 12 years
- 12% → 6 years
- 24% → 3 years (rare)

Pair the [Compound Interest Calculator](/compound-interest-calculator) with our [SIP Calculator](/sip-calculator) for monthly contributions instead of one-shot amounts.
    `,
    faq: [
      { q: "Daily vs monthly compounding?", a: "Daily wins by tiny margins. Effect compounds over decades." },
      { q: "Where do I get compound interest in real life?", a: "Mutual funds, PPF, FDs, EPF — anywhere returns are reinvested." },
    ],
  },

  {
    slug: "ppf-vs-fd-which-is-better",
    title: "PPF vs FD — Which One Wins for Long-Term Savings?",
    description: "PPF or fixed deposit? Compare returns, tax, lock-in, and liquidity with real 2026 numbers.",
    date: "Apr 30, 2026", readTime: "6 min", cluster: "investments",
    keyword: "PPF vs FD",
    related: ["compound-interest-power-of-time", "fd-interest-calculation-guide"],
    toolLinks: [TOOL.ppf, TOOL.fd],
    content: `
## PPF in 30 Seconds

- 15-year lock-in
- Current rate ~7.1% (govt-set, quarterly)
- **EEE** — fully tax-free
- Cap ₹1.5 L/year

Run the numbers in the [PPF Calculator](/ppf-calculator).

## FD in 30 Seconds

- Flexible 7 days to 10 years
- Rate 6-7.5% depending on bank
- Interest is **fully taxable** at slab
- Premature break = penalty

Run the numbers in the [FD Calculator](/fd-calculator).

## Verdict

If you're in the 30% tax bracket and can lock in 15 years → **PPF wins** comfortably. For under 5 years or as an emergency parking fund → **FD wins**.

Use the [Compound Interest Calculator](/compound-interest-calculator) to model both side by side.
    `,
    faq: [
      { q: "Can I open both PPF and FD?", a: "Absolutely. Use PPF for retirement, FD for short-term goals." },
      { q: "Is PPF interest guaranteed?", a: "Sovereign guarantee — backed by the Government of India." },
    ],
  },

  {
    slug: "fd-interest-calculation-guide",
    title: "How FD Interest Is Calculated — Quarterly Compounding Demystified",
    description: "The exact FD formula banks use, with worked examples. Use our FD Calculator to verify.",
    date: "Apr 29, 2026", readTime: "4 min", cluster: "investments",
    keyword: "FD interest calculation",
    related: ["ppf-vs-fd-which-is-better", "compound-interest-power-of-time"],
    toolLinks: [TOOL.fd],
    content: `
## The Formula Banks Use

> **A = P × (1 + r/4)^(4t)**

Quarterly compounding is standard. Most banks send you a "simple interest" rate but actually compound it — that's why your maturity is higher than naive math.

## Example

₹1 L at 7% for 5 years:
- A = 100000 × (1 + 0.0175)^20
- A ≈ **₹1,41,478**

Try your own numbers in the [FD Calculator](/fd-calculator).

## TDS Trap

If FD interest crosses ₹40,000/year (₹50,000 for seniors), banks deduct 10% TDS. Submit Form 15G/15H if your income is below taxable.
    `,
    faq: [
      { q: "Monthly payout vs cumulative FD?", a: "Cumulative wins because of compounding. Monthly only if you need cashflow." },
      { q: "Can I save tax on FD?", a: "Only via 5-year tax-saver FD under 80C. Interest is still taxed." },
    ],
  },

  {
    slug: "best-tax-saving-investments-india",
    title: "Best Tax-Saving Investments in India for 2026",
    description: "Compare PPF, ELSS, NPS, and 5-yr FD. Pick the right 80C combo with our calculators.",
    date: "Apr 28, 2026", readTime: "6 min", cluster: "tax",
    keyword: "best tax saving investments India",
    related: ["ppf-vs-fd-which-is-better", "old-vs-new-tax-regime-which-to-pick"],
    toolLinks: [TOOL.ppf, TOOL.sip, TOOL.fd],
    content: `
## The 80C Toolkit

- **PPF** — 7.1%, 15-yr lock, EEE → safest. Try the [PPF Calculator](/ppf-calculator).
- **ELSS** — equity, 3-yr lock, ~12-15% historic. Use the [SIP Calculator](/sip-calculator).
- **NPS** — extra ₹50K under 80CCD(1B), retirement-locked.
- **5-Yr Tax-saver FD** — capital safety, modest returns. Use the [FD Calculator](/fd-calculator).

## The Smart Combo (₹1.5 L/year)

- PPF: ₹70,000 (safe core)
- ELSS: ₹70,000 (growth engine)
- Term insurance + EPF: rest

Only the **new tax regime** removes 80C. Pick the regime first using our salary tool below.
    `,
    faq: [
      { q: "Does the new regime allow 80C?", a: "No. Old regime keeps 80C; new regime gives lower rates instead." },
      { q: "Best ELSS fund?", a: "Pick a low-expense index-based ELSS or a 5-star rated active ELSS with consistent returns." },
    ],
  },

  {
    slug: "old-vs-new-tax-regime-which-to-pick",
    title: "Old vs New Tax Regime — Which One Saves You More?",
    description: "Decide between old and new regime in 60 seconds. Use our Salary Calculator to verify.",
    date: "Apr 27, 2026", readTime: "5 min", cluster: "tax",
    keyword: "old vs new tax regime",
    related: ["how-salary-in-hand-is-calculated", "best-tax-saving-investments-india"],
    toolLinks: [TOOL.salary],
    content: `
## Quick Rule of Thumb

- Deductions > ₹3.75 L/year → **Old regime** wins
- Deductions < ₹2 L/year → **New regime** wins
- In between → run both in the [Salary Calculator](/salary-calculator)

## What You Lose in New Regime

- 80C (₹1.5 L)
- HRA, LTA
- Standard deduction stays (₹75K)
- 80D, 80E etc.

## What You Gain

- Lower slab rates
- ₹7 L tax-free bracket
- Zero filing complexity
    `,
    faq: [
      { q: "Can I switch every year?", a: "Salaried — yes. Business income — once." },
      { q: "Default regime in 2026?", a: "New regime is default. You must opt-out for old." },
    ],
  },

  {
    slug: "gst-calculation-explained",
    title: "GST Calculation Explained — Add, Remove, Reverse",
    description: "Master GST math: add GST, extract base price, calculate CGST + SGST. Free GST Calculator inside.",
    date: "Apr 26, 2026", readTime: "5 min", cluster: "tax",
    keyword: "how to calculate GST",
    related: ["old-vs-new-tax-regime-which-to-pick", "best-tax-saving-investments-india"],
    toolLinks: [TOOL.gst, TOOL.pct],
    content: `
## The 3 Most Common Calculations

### 1. Add GST to base price
> Final = Base × (1 + GST%/100)

### 2. Extract GST from final price
> Base = Final / (1 + GST%/100)

### 3. Find GST amount only
> GST = Final − Base

The [GST Calculator](/gst-calculator) does all three live.

## CGST + SGST Split

Intra-state: 18% GST = 9% CGST + 9% SGST. Inter-state: full 18% IGST.

## Pro Tip

For percentage-only math (discounts, markup), use the [Percentage Calculator](/percentage-calculator).
    `,
    faq: [
      { q: "Common GST slabs?", a: "0%, 5%, 12%, 18%, 28% — depending on category." },
      { q: "Is GST the same as VAT?", a: "GST replaced VAT, service tax, and 15+ other levies in 2017." },
    ],
  },

  {
    slug: "how-salary-in-hand-is-calculated",
    title: "How Salary In-hand Is Calculated from CTC — Full Breakdown",
    description: "From CTC to your bank: every deduction explained, with a free Salary Calculator to verify.",
    date: "Apr 25, 2026", readTime: "6 min", cluster: "salary",
    keyword: "how to calculate in-hand salary",
    related: ["old-vs-new-tax-regime-which-to-pick", "gratuity-calculator-india-2026"],
    toolLinks: [TOOL.salary, TOOL.gratuity],
    content: `
## CTC vs In-hand — They're Not the Same

**CTC = total cost to company**, including stuff you never see (employer PF, gratuity reserve, group insurance).

## The Deduction Stack

1. Employer PF (~12% of basic)
2. Gratuity reserve (~4.81% of basic)
3. Employee PF (~12% of basic)
4. Professional tax (~₹2,500/yr)
5. Income tax (per regime)

Crunch your own numbers in the [Salary Calculator](/salary-calculator).

## Reality Check

For ₹12 L CTC, expect roughly **₹78,000-85,000/month** in-hand under the new regime.

Pair with our [Gratuity Calculator](/gratuity-calculator) to see what you'll receive on exit.
    `,
    faq: [
      { q: "Why is basic only 40% of fixed?", a: "Companies cap basic to limit PF/gratuity outgo. Industry standard 40-50%." },
      { q: "Does HRA help in new regime?", a: "No. HRA exemption is removed in the new regime." },
    ],
  },

  {
    slug: "gratuity-calculator-india-2026",
    title: "Gratuity Rules in India 2026 — Eligibility, Formula, Tax",
    description: "Who gets gratuity, how it's calculated, and the latest 2026 tax-free limit. Use the free Gratuity Calculator.",
    date: "Apr 24, 2026", readTime: "5 min", cluster: "salary",
    keyword: "gratuity calculation India",
    related: ["how-salary-in-hand-is-calculated", "best-tax-saving-investments-india"],
    toolLinks: [TOOL.gratuity, TOOL.salary],
    content: `
## Are You Eligible?

Yes, if you:
- Worked **5+ continuous years** in an organisation with 10+ employees
- Have not been terminated for misconduct

## The Formula (Payment of Gratuity Act)

> **Gratuity = (Last Drawn Salary × 15 × Years of Service) / 26**

Salary = Basic + DA. Use the [Gratuity Calculator](/gratuity-calculator) for instant answers.

## Tax-Free Limit

Up to **₹20 lakh** is tax-exempt for non-government employees. Beyond that, slab rate applies.

## When Should You Quit?

If you're at year 4.7, **wait 3 months**. Five years unlocks lakhs.
    `,
    faq: [
      { q: "Is 4 years 240 days valid?", a: "Yes — courts have ruled it equivalent to 5 years for gratuity." },
      { q: "When is gratuity paid?", a: "Within 30 days of leaving. Delay attracts interest." },
    ],
  },

  {
    slug: "rent-vs-buy-house-which-is-smarter",
    title: "Rent vs Buy a House in India — The 2026 Reality Check",
    description: "Stop arguing. Run your city's numbers in our Rent vs Buy Calculator and decide with data.",
    date: "Apr 23, 2026", readTime: "7 min", cluster: "loans",
    keyword: "rent vs buy house India",
    related: ["how-to-calculate-emi-on-home-loan", "how-to-reduce-loan-interest"],
    toolLinks: [TOOL.rentbuy, TOOL.emi, TOOL.sip],
    content: `
## Why "Buying Is Always Better" Is a Lie

Buying is better **only when**:
- You'll stay 7+ years in the same city
- Rent yield in your area is below 3%
- You can put 20%+ as down payment without draining emergency funds

Run **your** scenario in the [Rent vs Buy Calculator](/rent-vs-buy-calculator).

## Hidden Costs of Buying

- Stamp duty (5-7%)
- Registration (~1%)
- Maintenance (~1%/year)
- Property tax
- Opportunity cost of down payment

## Hidden Costs of Renting

- Annual rent hikes (~7-10%)
- Brokerage every move
- No equity build-up

## The Smart Move

Compare total cost over your time horizon. If you're saving the difference into [SIPs](/sip-calculator), renting can quietly out-perform buying.
    `,
    faq: [
      { q: "What rent-to-EMI ratio favours renting?", a: "If rent < 50% of EMI for the same flat, renting usually wins short-term." },
      { q: "Does property always appreciate?", a: "No. Tier-2/3 cities have seen flat or declining prices for years." },
    ],
  },

  {
    slug: "bmi-calculator-explained",
    title: "BMI Calculator Explained — What Your Number Really Means",
    description: "BMI ranges, accuracy limits, and why athletes break the formula. Use our free BMI Calculator.",
    date: "Apr 22, 2026", readTime: "4 min", cluster: "health",
    keyword: "BMI calculator",
    related: ["calorie-calculator-bmr-tdee-explained", "how-to-lose-weight-with-calorie-deficit"],
    toolLinks: [TOOL.bmi, TOOL.calorie],
    content: `
## The Formula

> **BMI = Weight (kg) / Height (m)²**

Run yours in the [BMI Calculator](/bmi-calculator).

## Ranges (WHO standard)

- < 18.5 → Underweight
- 18.5–24.9 → Normal
- 25–29.9 → Overweight
- 30+ → Obese

## When BMI Lies

- Bodybuilders show as obese (muscle is heavier)
- Older adults with low muscle show as normal but are at risk
- Indian/Asian thresholds are 1-2 points lower

For action, pair BMI with the [Calorie Calculator](/calorie-calculator) and adjust intake.
    `,
    faq: [
      { q: "Best BMI for Indians?", a: "ICMR recommends 18-23 for South Asians (lower than WHO)." },
      { q: "Does BMI measure fat?", a: "No — only the ratio. Body fat % needs scales or calipers." },
    ],
  },

  {
    slug: "calorie-calculator-bmr-tdee-explained",
    title: "BMR vs TDEE — How Many Calories Do You Actually Need?",
    description: "Master BMR, TDEE, and activity multipliers. Pinpoint your daily calorie target using a free calculator.",
    date: "Apr 21, 2026", readTime: "5 min", cluster: "health",
    keyword: "BMR TDEE calorie calculator",
    related: ["bmi-calculator-explained", "how-to-lose-weight-with-calorie-deficit"],
    toolLinks: [TOOL.calorie, TOOL.bmi],
    content: `
## BMR — Your Engine at Idle

Calories burned doing **nothing**. We use Mifflin-St Jeor:

> Male BMR = 10W + 6.25H − 5A + 5
> Female BMR = 10W + 6.25H − 5A − 161

(W=kg, H=cm, A=years)

## TDEE — Your Real Burn

> TDEE = BMR × Activity Factor

| Lifestyle | Multiplier |
|---|---|
| Sedentary | 1.2 |
| Light | 1.375 |
| Moderate | 1.55 |
| Active | 1.725 |
| Very active | 1.9 |

Get yours in the [Calorie Calculator](/calorie-calculator), then check the [BMI Calculator](/bmi-calculator) for context.
    `,
    faq: [
      { q: "Does TDEE change with weight loss?", a: "Yes — recalculate every 5 kg." },
      { q: "Should I trust fitness tracker calorie burns?", a: "They overestimate by 20-40%. Use TDEE as ground truth." },
    ],
  },

  {
    slug: "how-to-lose-weight-with-calorie-deficit",
    title: "How to Lose Weight with a Calorie Deficit — The Only Method That Works",
    description: "Calculate your deficit, set a sustainable target, and lose 0.5-1 kg/week without crashing.",
    date: "Apr 20, 2026", readTime: "6 min", cluster: "health",
    keyword: "how to lose weight calorie deficit",
    related: ["calorie-calculator-bmr-tdee-explained", "bmi-calculator-explained"],
    toolLinks: [TOOL.calorie, TOOL.bmi],
    content: `
## The Only Rule

Burn more than you eat. Period.

## Step-by-Step

1. Find TDEE in the [Calorie Calculator](/calorie-calculator)
2. Subtract 300-500 kcal
3. Stay there for 12 weeks
4. Recheck weight + recalculate

## Don't Crash

A deficit > 25% of TDEE wrecks metabolism, mood, and muscle. Slow > fast.

## Pair Cardio + Strength

Cardio burns calories. Strength preserves muscle so you lose **fat**, not lean tissue.
    `,
    faq: [
      { q: "How much weight per week?", a: "0.5–1 kg. Faster usually means water/muscle loss." },
      { q: "Do macros matter?", a: "For weight loss, calories rule. For body composition, macros matter." },
    ],
  },

  {
    slug: "ovulation-calculator-fertile-window",
    title: "Ovulation Calculator — Find Your Fertile Window in Seconds",
    description: "Predict ovulation, fertile days, and possible due date with a free, private Ovulation Calculator.",
    date: "Apr 19, 2026", readTime: "5 min", cluster: "health",
    keyword: "ovulation calculator fertile window",
    related: ["bmi-calculator-explained", "calorie-calculator-bmr-tdee-explained"],
    toolLinks: [TOOL.ovul],
    content: `
## How Ovulation Prediction Works

For a regular cycle, ovulation = next period − 14 days. Sperm live ~5 days, the egg ~24 hours → **6-day fertile window**.

Try it in the [Ovulation Calculator](/ovulation-calculator).

## The Best Conception Days

**1-2 days before ovulation** has the highest pregnancy chance — sperm should be present when the egg arrives.

## What If My Cycle Is Irregular?

Combine the calculator with:
- Basal body temperature tracking
- Cervical mucus check
- Ovulation predictor strips

For age-related fertility planning, use our [Age Calculator](/age-calculator) to track key milestones.
    `,
    faq: [
      { q: "Is the calculator a contraceptive?", a: "No. It estimates fertile days only and is not a reliable birth control method." },
      { q: "Does cycle length matter?", a: "Yes — adjust the cycle length input for accurate ovulation date." },
    ],
  },

  {
    slug: "age-calculator-uses-beyond-birthday",
    title: "5 Smart Uses of an Age Calculator (Beyond Birthdays)",
    description: "From retirement planning to legal cutoffs — our Age Calculator solves more than birthday math.",
    date: "Apr 18, 2026", readTime: "4 min", cluster: "health",
    keyword: "age calculator uses",
    related: ["ovulation-calculator-fertile-window", "how-salary-in-hand-is-calculated"],
    toolLinks: [TOOL.age, TOOL.ovul],
    content: `
## More Than Years

Use the [Age Calculator](/age-calculator) for:

1. **Retirement planning** — exact months until 60
2. **Visa eligibility** — many countries cap age limits
3. **Loan eligibility** — banks use exact age, not rounded
4. **Insurance premiums** — premiums change at exact birthdays
5. **Government scheme cutoffs** — PMVVY, SCSS need precise age

## Pro Tip

Combine with the [Salary Calculator](/salary-calculator) to model retirement corpus needed by your exact retirement date.
    `,
    faq: [
      { q: "Does the calculator use Indian/Western age?", a: "It returns exact age in years/months/days — no cultural offset." },
      { q: "Can I use future dates?", a: "Yes — useful for 'how old will I be when X' planning." },
    ],
  },

  {
    slug: "percentage-calculator-everyday-uses",
    title: "Percentage Calculator — 10 Everyday Uses You Didn't Think Of",
    description: "Discounts, hikes, marks, GST — solve any percentage problem in seconds.",
    date: "Apr 17, 2026", readTime: "4 min", cluster: "tax",
    keyword: "percentage calculator uses",
    related: ["gst-calculation-explained", "how-salary-in-hand-is-calculated"],
    toolLinks: [TOOL.pct, TOOL.gst],
    content: `
## 10 Real-Life Wins

1. Discounts — "30% off ₹2,499"
2. Tip math at restaurants
3. Salary hikes ("12% appraisal")
4. Exam marks aggregation
5. GST add/remove (use the [GST Calculator](/gst-calculator))
6. SIP step-up rates
7. Loan interest checks
8. Property appreciation
9. Body-fat tracking
10. Investment returns

Run any of them in the [Percentage Calculator](/percentage-calculator).
    `,
    faq: [
      { q: "Difference between % change and % point?", a: "5% growing to 7% = 2 percentage point change, but 40% relative change." },
    ],
  },

  {
    slug: "ppf-account-rules-2026",
    title: "PPF Account Rules in 2026 — Limits, Interest, Withdrawals",
    description: "Everything about PPF: opening rules, deposit limits, partial withdrawals, extension. Use our PPF Calculator.",
    date: "Apr 16, 2026", readTime: "5 min", cluster: "investments",
    keyword: "PPF account rules",
    related: ["ppf-vs-fd-which-is-better", "best-tax-saving-investments-india"],
    toolLinks: [TOOL.ppf],
    content: `
## Quick Facts

- Open at any bank or post office
- 15-year lock-in (extendable in 5-yr blocks)
- Min ₹500/yr, max ₹1.5 L/yr
- Current rate ~7.1% (revised quarterly)
- **EEE** taxation

Project growth in the [PPF Calculator](/ppf-calculator).

## Partial Withdrawal Rules

- After year 7 — up to 50% of balance at end of year 4
- One withdrawal per year

## Extension Tip

After year 15, you can extend in 5-year blocks **with or without contribution**. Either way the interest keeps compounding.
    `,
    faq: [
      { q: "Can NRIs open PPF?", a: "No — NRIs cannot open new PPF accounts (existing ones can run till maturity)." },
      { q: "Premature closure?", a: "Allowed only after 5 years on medical/education grounds with 1% penalty." },
    ],
  },

  {
    slug: "fd-vs-sip-where-to-invest",
    title: "FD vs SIP — Where Should You Invest in 2026?",
    description: "Risk vs return, taxation, liquidity — compared head-to-head with real numbers.",
    date: "Apr 15, 2026", readTime: "6 min", cluster: "investments",
    keyword: "FD vs SIP",
    related: ["sip-vs-lump-sum-investment", "ppf-vs-fd-which-is-better"],
    toolLinks: [TOOL.fd, TOOL.sip],
    content: `
## Side-by-Side

| | FD | SIP (Equity) |
|---|---|---|
| Returns | 6-7.5% | ~12% historic |
| Risk | Near zero | Medium-high |
| Lock-in | Optional | None (ELSS: 3y) |
| Tax | Slab | LTCG 12.5% over ₹1.25 L |

## Pick FD When

- Goal < 3 years
- Capital safety = top priority
- You're a senior citizen

Run yours in the [FD Calculator](/fd-calculator).

## Pick SIP When

- Goal > 5 years
- You can stomach 20% short-term drops
- You want inflation-beating growth

Project corpus in the [SIP Calculator](/sip-calculator).

## The Smart Move

Do both. FD = emergency fund + short-term goals. SIP = long-term wealth.
    `,
    faq: [
      { q: "Are SIPs safer than direct stocks?", a: "Yes — diversification across 50-100 stocks reduces single-company risk." },
      { q: "FD interest taxable above ₹40K?", a: "Above ₹40K bank cuts 10% TDS, but full interest is taxable at slab anyway." },
    ],
  },
  {
    slug: "income-tax-calculator-fy-2025-26-new-vs-old-regime",
    title: "Income Tax Calculator FY 2025-26: New vs Old Regime — Which One Saves You More?",
    description: "Complete FY 2025-26 (AY 2026-27) income tax guide for India. Compare new and old tax regimes with worked examples, slab tables, and the tax-free ₹12 lakh rebate explained.",
    date: "Jun 3, 2026", readTime: "9 min", cluster: "tax",
    keyword: "income tax calculator FY 2025-26 new vs old regime",
    related: ["old-vs-new-tax-regime-which-to-pick", "best-tax-saving-investments-india"],
    toolLinks: [TOOL.incomeTax, TOOL.salary],
    content: `
## The 2025 Budget Rewrote the Tax Map

Finance Minister Nirmala Sitharaman's Budget 2025 made the new tax regime almost impossible to ignore: **annual income up to ₹12 lakh is now completely tax-free** for resident individuals. Add the ₹75,000 standard deduction and a **salaried person earning up to ₹12.75 lakh pays zero tax**. Use our [Income Tax Calculator](/income-tax-calculator) to see your exact liability in seconds.

But "zero tax up to ₹12 lakh" only tells half the story. The real question every taxpayer is asking in 2026 is the same one they asked in 2024: **new regime or old?** This guide answers it with worked examples, slab tables, and a clear decision framework.

## FY 2025-26 New Regime Slabs (Default)

| Annual income (₹) | Tax rate |
|---|---|
| Up to 4,00,000 | Nil |
| 4,00,001 – 8,00,000 | 5% |
| 8,00,001 – 12,00,000 | 10% |
| 12,00,001 – 16,00,000 | 15% |
| 16,00,001 – 20,00,000 | 20% |
| 20,00,001 – 24,00,000 | 25% |
| Above 24,00,000 | 30% |

**Plus:** ₹75,000 standard deduction (salaried/pensioners), Sec 87A rebate making income up to ₹12 lakh tax-free, and a 4% Health & Education Cess on the final tax.

## Old Regime Slabs (Unchanged)

| Annual income (₹) | Tax rate |
|---|---|
| Up to 2,50,000 | Nil |
| 2,50,001 – 5,00,000 | 5% |
| 5,00,001 – 10,00,000 | 20% |
| Above 10,00,000 | 30% |

**Plus:** ₹50,000 standard deduction, Sec 87A rebate up to ₹5 lakh, and the usual buffet of deductions — 80C (₹1.5L), 80D, HRA, home-loan interest (₹2L), 80CCD(1B) NPS (₹50K) and more.

## Worked Example: ₹15 Lakh Salary

Let's run the same income through both regimes — exactly what the calculator does:

### New Regime
- Gross income: ₹15,00,000
- Standard deduction: ₹75,000
- **Taxable**: ₹14,25,000
- Slab tax: ₹4L × 0% + ₹4L × 5% + ₹4L × 10% + ₹2.25L × 15% = ₹93,750
- Cess (4%): ₹3,750
- **Total tax: ₹97,500**

### Old Regime (assuming ₹2 lakh deductions)
- Gross income: ₹15,00,000
- Standard deduction + 80C + 80D: ₹2,50,000
- **Taxable**: ₹12,50,000
- Slab tax: ₹2.5L × 0% + ₹2.5L × 5% + ₹5L × 20% + ₹2.5L × 30% = ₹1,87,500
- Cess (4%): ₹7,500
- **Total tax: ₹1,95,000**

The new regime saves **₹97,500 a year** — almost exactly one month's salary. Want to test your own number? Plug it into the [Income Tax Calculator](/income-tax-calculator).

## The Break-even Math

The old regime only beats the new regime if your **total deductions cross roughly ₹4–4.5 lakh**. That's hard to hit unless you simultaneously:

- Max 80C (₹1.5L)
- Max 80D family medical (₹50K)
- Pay heavy HRA in a metro
- Have a home-loan interest of ₹2L
- Contribute ₹50K to NPS u/s 80CCD(1B)

For most salaried professionals under 35 — without a home loan — the new regime wins, often by ₹50,000 to ₹1.5 lakh per year.

## What Stays in the New Regime?

Don't assume the new regime kills *every* benefit. These still apply:

1. **Standard deduction** (₹75,000)
2. **Employer NPS contribution** under Sec 80CCD(2) — up to 14% of basic
3. **Gratuity exemption** (capped at ₹20L) — see the [Gratuity Calculator](/gratuity-calculator)
4. **Leave encashment** on retirement (capped at ₹25L)
5. **Death/disability insurance** payouts

## Surcharge: The Hidden Tax

Above ₹50 lakh income, surcharge kicks in:

- ₹50L – ₹1Cr: 10%
- ₹1Cr – ₹2Cr: 15%
- ₹2Cr – ₹5Cr: 25%
- Above ₹5Cr: **25% (new regime)** vs **37% (old regime)**

This is one of the strongest arguments for the new regime if you earn above ₹5 crore.

## How to Use the Calculator

1. Enter your annual gross income.
2. Pick a regime — try both to compare.
3. (Old regime only) Enter total deductions.
4. Read tax, monthly TDS, and effective rate.

The calculator also shows the **other regime's tax** side-by-side so you can switch with confidence.

## Related Reading

- [Old vs New Tax Regime — Which to Pick](/blog/old-vs-new-tax-regime-which-to-pick)
- [Best Tax-Saving Investments in India](/blog/best-tax-saving-investments-india)
- Run the numbers: [Salary In-hand Calculator](/salary-calculator)

## Final Word

The new regime won the 2025 Budget by a landslide for the average salaried Indian. But "average" isn't you — run your real numbers in the [Income Tax Calculator](/income-tax-calculator) before you submit Form 10-IEA to opt out. Two minutes today can save you a month's salary by March 31.
    `,
    faq: [
      { q: "Is income up to ₹12 lakh really tax-free in FY 2025-26?", a: "Yes, under the new regime — thanks to the expanded Sec 87A rebate. For salaried employees, the tax-free limit becomes ₹12.75 lakh after the ₹75,000 standard deduction." },
      { q: "Can I switch between old and new regime every year?", a: "Salaried individuals (no business income) can switch every financial year by filing Form 10-IEA. Business/professional income holders can switch only once back to the new regime after opting out." },
      { q: "What is the standard deduction in the new regime?", a: "₹75,000 for FY 2024-25 onwards, up from the earlier ₹50,000. It applies to salaried employees and pensioners by default — no separate claim needed." },
    ],
  },
  {
    slug: "how-to-save-income-tax-legally-in-india-2026",
    title: "How to Save Income Tax Legally in India (2026): 12 Proven Strategies",
    description: "12 legal, IT-Department-approved ways to reduce your income tax in 2026 — Section 80C, 80D, NPS, HRA, home-loan interest, and the new-regime hacks most people miss.",
    date: "Jun 3, 2026", readTime: "10 min", cluster: "tax",
    keyword: "how to save income tax legally India 2026",
    related: ["income-tax-calculator-fy-2025-26-new-vs-old-regime", "best-tax-saving-investments-india"],
    toolLinks: [TOOL.incomeTax, TOOL.ppf],
    content: `
## Saving Tax Isn't Optional — It's a Skill

Every March, millions of Indians scramble to buy ELSS, top up LIC, and submit rent receipts. Most of it is wasted effort. **Tax saving is a 12-month plan, not a 30-day panic.** Run your numbers first in the [Income Tax Calculator](/income-tax-calculator) — then use the strategies below to bring the bill down legally.

This guide gives you 12 IT-Department-approved strategies for FY 2025-26. We've split them by regime so you know what actually works for *you*.

---

## Old Regime — The Classic 7

### 1. Section 80C — The ₹1.5 Lakh Workhorse
The most-claimed deduction in India. Mix and match across:
- **EPF + VPF** (already deducted from your salary)
- **PPF** — risk-free, 7.1% tax-free. Use the [PPF Calculator](/ppf-calculator) to project 15-year maturity.
- **ELSS mutual funds** — 3-year lock-in, equity returns
- **Life insurance premium** (preferably term)
- **5-year tax-saver FD** — see the [FD Calculator](/fd-calculator)
- **Principal repayment on home loan**
- **Tuition fees** for up to 2 children

**Max benefit:** ₹46,800 saved at 30% slab.

### 2. Section 80CCD(1B) — Extra ₹50K via NPS
Above and beyond 80C, contribute ₹50,000 to NPS Tier-1 and deduct it. **Total 80C + 80CCD(1B) = ₹2 lakh.** Saves ₹15,600 at 30% slab.

### 3. Section 80D — Health Insurance
| Cover | Max deduction |
|---|---|
| Self + spouse + kids | ₹25,000 |
| Parents (< 60) | +₹25,000 |
| Parents (≥ 60, senior citizens) | +₹50,000 |

**Total possible:** ₹75,000/year.

### 4. HRA Exemption
Salaried renters living in a rented home get the **least of**:
- Actual HRA received
- 50% of basic (metro) / 40% (non-metro)
- Rent paid minus 10% of basic

Submit rent receipts + landlord PAN (if rent > ₹1 lakh/year) and this can easily knock ₹1–2 lakh off your taxable income.

### 5. Home Loan Interest — Sec 24(b)
Up to **₹2 lakh/year** deductible for a self-occupied house. Stack it with 80C principal repayment for a combined ₹3.5 lakh shield. Combine with the [EMI Calculator](/emi-calculator) to see your interest portion year by year.

### 6. Education Loan Interest — Sec 80E
**Unlimited deduction** on interest for up to 8 years from the year you start repayment. No cap.

### 7. Donations — Sec 80G
50% or 100% deduction depending on the registered NGO. Always demand a stamped 80G certificate.

---

## New Regime — The 5 Hacks Most People Miss

You can't claim 80C, 80D or HRA in the new regime — but these still work:

### 8. Employer NPS — Sec 80CCD(2)
Up to **14% of basic salary** contributed by your employer to NPS is fully deductible — even in the new regime. Negotiate this in your CTC restructuring.

### 9. Standard Deduction — ₹75,000
Automatic, no paperwork. Salaried only.

### 10. Conveyance & Reimbursements
Reimbursements for fuel, internet, phone, books and uniform — if structured as part of your salary perks — remain exempt under both regimes.

### 11. Gratuity, Leave Encashment, VRS
Tax-free on retirement up to specified caps (₹20L, ₹25L, ₹5L respectively). Use the [Gratuity Calculator](/gratuity-calculator) to estimate yours.

### 12. Capital Gains Indexation & Section 54
Reinvest long-term capital gains into a residential house (Sec 54) or NHAI/REC bonds (Sec 54EC, ₹50L cap) and pay zero LTCG tax.

---

## The Decision Tree

\`\`\`
Annual income ≤ ₹12 L?
   → Just pick the new regime. Tax = ₹0.

Annual income ₹12-15 L, deductions < ₹2 L?
   → New regime wins by ₹50K-₹1L/year.

Annual income ₹15 L+, deductions ≥ ₹4 L (HRA + home loan + 80C + 80D)?
   → Run both in the Income Tax Calculator. Old regime might still win.

Annual income > ₹5 Cr?
   → New regime — surcharge is 25% vs 37%.
\`\`\`

## Don't Forget Advance Tax

If your total tax liability exceeds **₹10,000 in a year**, you must pay advance tax in four instalments — **15 Jun (15%), 15 Sep (45%), 15 Dec (75%), 15 Mar (100%)**. Miss it and interest under Sec 234B/234C eats your savings.

## Related Reading

- [Income Tax Calculator FY 2025-26 — New vs Old Regime](/blog/income-tax-calculator-fy-2025-26-new-vs-old-regime)
- [Best Tax-Saving Investments in India](/blog/best-tax-saving-investments-india)
- Project your retirement corpus: [PPF Calculator](/ppf-calculator)

## Final Word

The biggest tax mistake Indians make isn't choosing the wrong section — it's **waiting until March**. Run your numbers in the [Income Tax Calculator](/income-tax-calculator) in April, lock in your strategy, and let SIPs, PPF and rent receipts do the heavy lifting through the year.
    `,
    faq: [
      { q: "What is the maximum tax-saving deduction available in India 2026?", a: "Under the old regime, you can stack 80C (₹1.5L) + 80CCD(1B) NPS (₹50K) + 80D health insurance (₹25K-75K) + HRA + home loan interest (₹2L) — easily ₹4–5 lakh in total. Under the new regime, the major lever is employer NPS u/s 80CCD(2)." },
      { q: "Is PPF still a good tax-saver in 2026?", a: "Yes — PPF stays EEE (exempt-exempt-exempt) and earns 7.1% tax-free. It's risk-free and counts in your 80C ₹1.5 lakh limit under the old regime." },
      { q: "Can I claim HRA and home loan benefit together?", a: "Yes, if you genuinely live in a rented home in one city and own a let-out or self-occupied home in another. Same-city dual claims attract IT-Department scrutiny — be ready to justify with rent agreement and utility bills." },
    ],
  },
  {
    slug: "hra-exemption-calculator-india-complete-guide",
    title: "HRA Exemption Explained — How to Calculate House Rent Allowance Tax-Free (2026)",
    description: "Master the HRA exemption formula under Sec 10(13A) of the Income Tax Act. Metro vs non-metro, rent receipts, parent-rent, and a live calculator walkthrough.",
    date: "Jun 1, 2026", readTime: "8 min", cluster: "tax",
    keyword: "HRA exemption calculator",
    related: ["income-tax-calculator-fy-2025-26-new-vs-old-regime", "how-to-save-income-tax-legally-in-india-2026"],
    toolLinks: [TOOL.hra, TOOL.incomeTax],
    content: `
## House Rent Allowance — Your Biggest Tax-Free Salary Component

If you live in a rented home and your employer pays you HRA, **Section 10(13A) of the Income Tax Act** lets you keep a huge chunk of it completely tax-free. For a Delhi-based employee earning ₹15 lakh, this single deduction can save **₹60,000–₹90,000 in tax every year** — more than most 80C investments combined.

Most salaried Indians under-claim HRA simply because the formula looks scary. It isn't. The [HRA Calculator](/hra-calculator) does it in one tap, but understanding the math helps you negotiate your salary structure.

## The 3-Rule HRA Formula

The exempt amount is the **least** of these three numbers:

1. **Actual HRA received** from your employer
2. **50% of basic salary** if you live in Delhi, Mumbai, Kolkata, or Chennai (metros). **40% of basic** for every other city.
3. **Rent paid minus 10% of basic salary**

Whichever rule gives the smallest number is your tax-free HRA. The rest is taxed as regular salary.

## Worked Example — Bangalore Software Engineer

- Annual Basic + DA: ₹6,00,000
- HRA received: ₹3,00,000
- Rent paid: ₹2,40,000/year (₹20,000/month)
- City: Bengaluru → **Non-metro**

Apply the formula:

- Rule 1: ₹3,00,000 (actual HRA)
- Rule 2: ₹6,00,000 × 40% = ₹2,40,000
- Rule 3: ₹2,40,000 − (10% × ₹6,00,000) = ₹2,40,000 − ₹60,000 = ₹1,80,000

**Exempt HRA = least = ₹1,80,000.** The remaining ₹1,20,000 of HRA is taxable.

At 20% slab, this saves ₹36,000 in tax. At 30% slab, ₹54,000. Free money you'd otherwise hand to the government.

## What Counts as a "Metro" for HRA?

Only four cities: **Delhi, Mumbai, Kolkata, Chennai**. That's it.

Bengaluru, Hyderabad, Pune, Ahmedabad, Gurgaon, Noida — all treated as **non-metro** for HRA, capped at 40% of basic. This is a quirk of the 1961 Income Tax Act that hasn't been updated despite Bengaluru becoming pricier than Mumbai for housing.

## Documentation You Need

- **Rent ≤ ₹3,000/month**: No proof required. Just declare it.
- **Rent > ₹3,000/month**: Submit rent receipts to your employer (one per month is overkill — quarterly is fine).
- **Rent > ₹1 lakh/year**: Mandatory disclosure of **landlord's PAN**. If the landlord doesn't have a PAN, get a self-declaration.
- **Bank transfer the rent** — cash payments above ₹2,000 attract Sec 269ST scrutiny.

## The "Rent to Parents" Hack (Legal, But Do It Right)

You CAN pay rent to your parents and claim HRA. The conditions:

1. There must be a **written rent agreement** (₹500 stamp paper is enough).
2. Rent must be transferred via **bank, not cash**.
3. Your parents must **declare it as rental income** in their ITR (they get a 30% standard deduction on rental income, so the family-level tax saving is real).
4. The amount must be reasonable for the area — don't try ₹50,000/month rent on a small flat.

## New Regime vs Old Regime — HRA Lives in Old

This is the killer caveat. **HRA exemption is only available under the OLD tax regime.** If you've opted into the new regime (default from FY 2023-24), you forfeit HRA along with 80C, 80D and most other deductions in exchange for lower slab rates.

Before opting for the new regime, run both options in the [Income Tax Calculator](/income-tax-calculator) — for renters in metro cities, the HRA exemption often makes the old regime ₹50,000-₹1L cheaper.

## Common HRA Mistakes That Cost You Money

1. **Wrong basic salary** — many use Gross / CTC instead of Basic + DA. Always check your salary slip.
2. **Forgetting to submit receipts on time** — TDS gets cut all year if you don't submit by January. You can still claim in ITR, but you wait 6+ months for the refund.
3. **Renting in your spouse's name** without an agreement — IT-Department rejects this routinely.
4. **Claiming HRA + 80GG together** — illegal. Pick one.

## Bonus — What If There's No HRA in Your CTC?

Freelancers, consultants and employees without HRA can claim **Sec 80GG** instead — up to ₹60,000/year deduction for rent paid. The catch: limited to ₹5,000/month or 25% of total income (whichever is less), and again only in the old regime.

## Related Reading

- [Income Tax Calculator FY 2025-26 — New vs Old Regime](/blog/income-tax-calculator-fy-2025-26-new-vs-old-regime)
- [How to Save Income Tax Legally in India 2026](/blog/how-to-save-income-tax-legally-in-india-2026)
- Run a quick projection: [HRA Calculator](/hra-calculator)

## Bottom Line

HRA is the single most valuable tax break for renting salaried Indians — and the easiest to claim. Open the [HRA Calculator](/hra-calculator) now, plug in your numbers, and submit those rent receipts before December 31 to slash next year's TDS.
    `,
    faq: [
      { q: "Is HRA exemption available if I'm self-employed?", a: "No. Sec 10(13A) HRA exemption is only for salaried employees who receive an HRA component in CTC. Self-employed / freelancers can claim Sec 80GG instead — up to ₹60,000/year, conditions apply." },
      { q: "Can I claim HRA if I own a house in the same city?", a: "Yes, IF you can prove you actually live in the rented home (different address, utility bills in your name, school records). Same-city dual claims invite scrutiny — keep evidence." },
      { q: "What is the maximum HRA exemption I can claim?", a: "No fixed cap. It depends on your basic salary, rent, and city. A senior executive in Mumbai with ₹20L basic and ₹50K/month rent can exempt ₹6L+ HRA tax-free." },
    ],
  },
  {
    slug: "how-to-split-restaurant-bills-tip-calculator-guide",
    title: "Splitting Restaurant Bills the Smart Way — Tip Etiquette, GST & Group Math (2026)",
    description: "Stop fighting over the bill. A practical guide to tipping in India and abroad, how GST and service charge stack, and how to split fairly across friends.",
    date: "Jun 2, 2026", readTime: "6 min", cluster: "salary",
    keyword: "tip calculator bill split",
    related: ["how-salary-in-hand-is-calculated", "percentage-calculator-everyday-uses"],
    toolLinks: [TOOL.tip, TOOL.pct],
    content: `
## The Bill Just Arrived — Now What?

You finish dinner with five friends, the waiter slides the bill across, and suddenly the table goes silent. Someone pulls out a phone calculator. Someone else does mental math. Someone insists on Venmo / GPay splits "later" (which never come).

There's a better way. The free [Tip Calculator](/tip-calculator) splits any bill — including tip, GST and even uneven shares — in one tap. But before you tap, here's the etiquette every adult should know.

## How Tipping Works in India

Restaurants in India usually show one of three line items at the bottom of the bill:

- **Service charge** — 5-10%, optional but added by default. This **IS the tip.** If it's on the bill, don't tip again.
- **GST** — mandatory tax. 5% (most restaurants) or 18% (alcohol, banquets, 5-star hotels). You cannot avoid it.
- **Service tax / Krishi Kalyan Cess** — legacy items; should not appear post-GST. If you see them, the bill is wrong.

**Rule of thumb**: If service charge is on the bill → 0% additional tip. If not → 5-10% for table service, 0% for fast food / takeaway.

## How Tipping Works Outside India

| Country     | Standard Tip | Notes |
|-------------|--------------|-------|
| USA         | 15–20%       | Mandatory in practice; servers earn below minimum wage. |
| UK          | 10–12.5%     | Often added as "optional service charge". |
| France      | 5–10%        | Service is usually included; round up the bill. |
| Japan       | 0%           | Tipping is considered rude. |
| UAE         | 10%          | Common in tourist areas. |

The [Tip Calculator](/tip-calculator) lets you slide the % to match local custom in seconds.

## The Math Behind a Fair Split

Bill of ₹4,800 + 10% tip + 5% GST, 4 people:

1. Tip = ₹480
2. GST is already in the printed total, so don't add it again.
3. Total = ₹5,280
4. Per person = ₹5,280 ÷ 4 = **₹1,320**

If one friend ordered a ₹2,000 steak and others split light pasta, the "fair" split is itemised, not equal. The Tip Calculator handles the equal case; for itemised splits, use the [Percentage Calculator](/percentage-calculator) to compute each person's share.

## The Hidden Cost of "I'll Get It Next Time"

Behavioural economists call this the **silent split asymmetry** — the loud friend who insists on paying first looks generous but usually loses money over a year because not everyone returns the favour. **Splitting bills equally at the table is fair, transparent, and prevents resentment.**

Apps like Splitwise and Google Pay's "Split Bill" feature handle the bookkeeping for trips and roommates. For a single dinner, the Tip Calculator is faster — no signup, no friction.

## Tip Brackets for Different Scenarios

| Scenario             | Tip % |
|----------------------|-------|
| Fine-dining (no SC)  | 10%   |
| Casual dining (no SC)| 5–7%  |
| Bar tab              | 10%   |
| Takeaway / delivery  | ₹30 to rider, 0 to restaurant |
| Buffet               | 5%    |
| Hotel valet          | ₹50–100 per car |
| Spa / salon          | 10%   |

## What About Service Charge — Is It Legal?

The Department of Consumer Affairs has clarified multiple times: **service charge is optional**. You have the right to refuse. In practice, most restaurants quietly remove it on request. If they refuse, you can file a complaint with the National Consumer Helpline (1915).

That said — many restaurants pay servers a pittance and rely on the service charge as a wage top-up. If service was good, paying the 5-10% is the kind thing to do.

## Related Reading

- [How Salary In-Hand Is Calculated](/blog/how-salary-in-hand-is-calculated)
- [Percentage Calculator Everyday Uses](/blog/percentage-calculator-everyday-uses)
- Save the [Tip Calculator](/tip-calculator) to your home screen for one-tap splits.

## Bottom Line

Don't let dessert turn into a math exam. Open the [Tip Calculator](/tip-calculator), enter the bill, slide the tip %, type the number of people, and hand your friends the per-person amount before the waiter brings the card machine.
    `,
    faq: [
      { q: "Is service charge mandatory in India?", a: "No. Per Department of Consumer Affairs guidelines, service charge is optional — you can ask the restaurant to remove it from the bill." },
      { q: "Should I tip on the pre-GST or post-GST amount?", a: "Global best practice is to tip on the pre-tax amount. The Tip Calculator lets you toggle this." },
      { q: "Is it rude to use a calculator at the table?", a: "Not at all — it's faster and fairer than guessing. Most people appreciate the transparency." },
    ],
  },
  {
    slug: "discount-calculator-shopping-sales-hacks",
    title: "Sale Math Decoded — How to Beat Flipkart, Amazon & EOSS Tricks with a Discount Calculator",
    description: "Stop falling for fake 70% off deals. Learn how stacked discounts, GST, and 'MRP-inflated' tags work — and use the Discount Calculator to spot real savings.",
    date: "Jun 3, 2026", readTime: "7 min", cluster: "salary",
    keyword: "discount calculator sale price",
    related: ["how-to-split-restaurant-bills-tip-calculator-guide", "percentage-calculator-everyday-uses"],
    toolLinks: [TOOL.discount, TOOL.gst],
    content: `
## "Flat 70% OFF!" — Are You Actually Saving?

Every Big Billion Day, Great Indian Sale and End-of-Season Sale (EOSS) is built on one cognitive bias: **percentage discounts feel bigger than they are**. A T-shirt with a printed MRP of ₹2,499 marked down to ₹999 feels like a steal — until you realise the same T-shirt sells for ₹899 on the brand's own website year-round.

The [Discount Calculator](/discount-calculator) shows you the true final price including GST in two seconds. But the bigger win is learning the **four tricks brands use** so you stop overpaying.

## Trick 1 — MRP Inflation

This is the oldest play in the book. Brand quietly bumps the MRP from ₹1,500 to ₹2,499, then runs a "60% off" sale. Final price is ₹999 — basically unchanged from before, but now it FEELS like a deal.

**Counter-move**: Use Google Shopping or Price History tools (PriceMonkey, GreenDealsApp) to see the 90-day low. If today's "sale" price isn't lower than that, it isn't a sale.

## Trick 2 — Stacked Discounts Aren't Additive

"10% off + extra 10% with bank offer + 5% cashback" doesn't equal 25% off. It equals:

₹1,000 → ₹900 (10% off) → ₹810 (another 10%) → ₹770 after 5% cashback = **23% effective**, not 25%.

Run any stacked offer through the [Discount Calculator](/discount-calculator) before tapping Buy. The 2% difference adds up over a year of online shopping.

## Trick 3 — "Free Shipping Above ₹X"

Hovering 5% below the free-shipping threshold? The site shows a banner: "Add ₹250 more for free delivery!". You add a ₹400 product to save ₹80 on shipping. Net: you spent ₹320 extra to avoid an ₹80 fee.

**Counter-move**: Cart-abandonment is your friend. Brands often email a 10% off code within 24 hours if you leave items in the cart.

## Trick 4 — GST Bait-and-Switch

Many sites show a low "list price" and tack on GST at checkout. The Discount Calculator has a GST toggle (0/5/12/18/28%) so you can compare apples-to-apples between sellers.

Worked example:

- Seller A: ₹999 + 18% GST = **₹1,179** delivered
- Seller B: ₹1,099 inclusive of GST = **₹1,099** delivered

Seller A's "discount" was a mirage.

## How to Use the Discount Calculator Like a Pro

1. **Before adding to cart**: enter the original price + advertised discount %. Note the final price.
2. **If GST is shown separately**: toggle the GST % and re-check the total.
3. **For stacked offers**: run the first discount, then plug the new price as 'Original' and apply the next %.
4. **Compare across sites**: keep the calculator open in a tab and bring everything to a GST-inclusive total.

## When the "₹X Flat Off" Coupon Wins

Flat-rupee coupons beat percentage coupons when the cart value is small.

Example: ₹500 off ₹2,500 = 20%. ₹500 off ₹5,000 = only 10%.

Quick rule: **flat coupons win below 2× the coupon value; percent coupons win above it.**

## EOSS Calendar — Plan Your Spending

Indian retail roughly follows this discount cycle:

- **Jan–Feb**: Winter EOSS (apparel, footwear). Discounts 40-70%.
- **Apr–May**: Summer EOSS + electronics. Discounts 15-40%.
- **Jul–Aug**: Mid-season + Independence Day sales.
- **Sep–Nov**: Big Billion Days, Great Indian Sale, Diwali. The biggest electronics discounts of the year.
- **Dec**: Christmas + Year-End clearance.

Buying outside these windows means full MRP. Use the [Discount Calculator](/discount-calculator) to confirm a "year-round" deal is actually one.

## Related Reading

- [Splitting Restaurant Bills the Smart Way](/blog/how-to-split-restaurant-bills-tip-calculator-guide)
- [Percentage Calculator Everyday Uses](/blog/percentage-calculator-everyday-uses)
- Compare GST-inclusive prices with the [GST Calculator](/gst-calculator).

## Bottom Line

Brands aren't evil — they're just optimising. So should you. Bookmark the [Discount Calculator](/discount-calculator), spot the fake sales, and let your savings compound into something useful — like an SIP.
    `,
    faq: [
      { q: "Does discount apply before or after GST?", a: "In India, discount is applied first on the MRP, and GST is then calculated on the discounted price. The Discount Calculator follows this order." },
      { q: "Are 'flat ₹X off' coupons better than % coupons?", a: "Flat coupons beat percentage coupons when your cart value is small. As a rule of thumb, flat wins below 2× the coupon value." },
      { q: "What's the maximum discount allowed on MRP in India?", a: "There's no legal cap, but selling above MRP is illegal under the Legal Metrology Act. Selling below MRP is always allowed — that's why sales work." },
    ],
  },
  {
    slug: "income-tax-calculator-vs-payslip-tds-decoded",
    title: "Why Your Salary Slip TDS Doesn't Match the Income Tax Calculator — Decoded",
    description: "Confused why your payslip TDS is different from what the Income Tax Calculator shows? Understand the projection vs actuals gap and avoid March refunds.",
    date: "Jun 3, 2026", readTime: "7 min", cluster: "tax",
    keyword: "TDS calculation salary income tax",
    related: ["income-tax-calculator-fy-2025-26-new-vs-old-regime", "how-salary-in-hand-is-calculated"],
    toolLinks: [TOOL.incomeTax, TOOL.salary],
    content: `
## The Mismatch That Confuses Every Salaried Person

You run your CTC through the [Income Tax Calculator](/income-tax-calculator), get a clean number — say ₹1,20,000 annual tax. You open your March payslip and your year-to-date TDS shows ₹1,68,000. **Where did the extra ₹48,000 come from?**

You're not being cheated. You're seeing the difference between **projected tax** (what the calculator computes from your CTC) and **deducted tax** (what your employer actually subtracted via TDS each month). Once you understand the four reasons they diverge, you'll stop chasing March refunds.

## Reason 1 — Employer Doesn't Know Your Deductions Until You Declare

In April, HR projects your annual tax assuming **zero deductions**: no 80C, no HRA, no home-loan interest. They withhold TDS each month based on this worst-case projection.

You're supposed to submit Investment Proofs and Rent Receipts by **December–January**. If you submit late or skip them, TDS stays inflated — and you wait 6+ months for the refund after filing your ITR.

**Fix**: Submit Form 12BB to your HR by December 31 with all 80C/80D/HRA declarations and proofs.

## Reason 2 — Bonus and Variable Pay Move Your Slab

Suppose your fixed CTC is ₹15L → projected tax ₹1.4L. In Q3 you get a ₹3L bonus. Your annual income now jumps to ₹18L → tax becomes ₹2.4L.

Your employer recalculates the projection and **deducts the entire bonus's marginal tax in that single month** to catch up. Your November payslip looks ugly. That's not a bug; that's your slab math.

The [Income Tax Calculator](/income-tax-calculator) lets you add expected variables to see the all-in tax upfront.

## Reason 3 — Multiple Employers in the Same Year

Changed jobs in October? Each employer calculates TDS assuming **you only worked for them all year** — which means both apply the ₹3 lakh / ₹4 lakh exemption slab twice. The aggregate TDS is too low by 5-10% of your earnings during the gap year.

Come March, the bill is due. You either pay self-assessment tax before July 31 or accept a refund-reduced settlement.

**Fix**: Submit your previous Form 16 to the new employer in October. They'll recompute TDS using your true year-to-date income.

## Reason 4 — Standard Deduction & Rebate Surprises

In FY 2024-25, the standard deduction in the new regime jumped from ₹50,000 to ₹75,000. The Sec 87A rebate ceiling shifted from ₹7L to ₹12L. Many salary software systems were still on old rates well into Q2 — meaning early-year payslips over-deducted, late-year payslips refunded.

The [Income Tax Calculator](/income-tax-calculator) is updated to FY 2025-26 (Budget 2025) slabs so your projection matches the latest law.

## How TDS Actually Gets Computed Each Month

1. Annual tax = (your projected annual taxable income) → slabs → surcharge → 4% cess
2. Monthly TDS = Annual tax ÷ months remaining in financial year (Apr-Mar)
3. Each month, recalculated if income/declarations change

So if your annual tax = ₹1,20,000 and we're in July (9 months remaining), this month's TDS = ₹1,20,000 ÷ 9 = ₹13,333. Next month: re-divide by 8 months remaining. This is why **November-March TDS amounts are usually larger** than April-October — there are fewer months left to amortise.

## A Practical Roadmap to Avoid TDS Surprises

| Month | Action |
|-------|--------|
| April | Submit anticipated investment declaration (Form 12BB) |
| September | Mid-year tax review using [Income Tax Calculator](/income-tax-calculator) |
| December | Submit actual investment proofs + rent receipts |
| January | Confirm TDS is on track via Form 16 preview |
| March 15 | Pay self-assessment tax if any shortfall |
| July 31 | File ITR — any over-deduction comes back as refund |

## Old vs New Regime — TDS Implications

Your employer asks you in April: **which regime?** You can switch between regimes year-on-year, but **once chosen for the year, they project TDS accordingly**. Switching mid-year is messy — possible but creates refund-or-pay scenarios in March.

Before declaring, compare both regimes side-by-side in the [Income Tax Calculator](/income-tax-calculator). For salaried renters with home loans and ₹4L+ deductions, old regime usually wins. For everyone else, new regime + ₹12L rebate is hard to beat.

## Related Reading

- [Income Tax Calculator FY 2025-26 — New vs Old Regime](/blog/income-tax-calculator-fy-2025-26-new-vs-old-regime)
- [How Salary In-Hand Is Calculated](/blog/how-salary-in-hand-is-calculated)
- Quick projection: [Salary In-Hand Calculator](/salary-calculator)

## Bottom Line

TDS isn't your final tax — it's your employer's best monthly guess. Run the [Income Tax Calculator](/income-tax-calculator) every quarter, submit proofs early, and your March payslip will stop being a surprise.
    `,
    faq: [
      { q: "Why is my March TDS so much higher than other months?", a: "Because employers recalculate projected tax mid-year. If bonuses arrived or you submitted proofs late, the shortfall is recovered from your final paychecks." },
      { q: "Can I claim a TDS refund?", a: "Yes — if total TDS exceeds your actual tax liability, file ITR by July 31 and the Income Tax Department refunds the difference (usually within 30-60 days)." },
      { q: "Is the Income Tax Calculator accurate for TDS planning?", a: "Yes. It uses FY 2025-26 slabs, 87A rebate, surcharge, and 4% cess — the same rules your employer's payroll software uses." },
    ],
  },
  {
    slug: "hra-vs-80gg-which-tax-deduction-to-claim",
    title: "HRA vs Section 80GG — Which Rent Deduction Should You Claim?",
    description: "Confused between HRA (Sec 10(13A)) and Section 80GG? Compare both rent-related tax deductions, eligibility, limits, and pick the one that saves you more.",
    date: "Jun 4, 2026", readTime: "6 min", cluster: "tax",
    keyword: "HRA vs 80GG deduction",
    related: ["hra-exemption-calculator-india-complete-guide", "how-to-save-income-tax-legally-in-india-2026"],
    toolLinks: [TOOL.hra, TOOL.incomeTax],
    content: `
## Two Rent Deductions, One Choice

The Indian Income Tax Act gives renters two ways to reduce their taxable income:

1. **Section 10(13A) — HRA exemption** — for salaried employees who receive HRA in their CTC.
2. **Section 80GG — rent deduction** — for those who DON'T receive HRA (self-employed, contractors, salaried without HRA).

You **cannot claim both** in the same year. Choosing wrong can cost you ₹20,000-₹40,000 in extra tax. Here's how to pick.

## Quick Eligibility Filter

| Situation | Claim |
|-----------|-------|
| Salaried + HRA in CTC | **HRA (Sec 10(13A))** — always |
| Salaried, no HRA in CTC | **80GG** |
| Self-employed / freelancer | **80GG** |
| Salaried + HRA + own a house in same city | Usually HRA, but check rules |
| Spouse owns the house you live in | Neither — disallowed |

If you have HRA, you don't get to choose — you claim HRA. 80GG is a fallback for people without HRA.

## How HRA Wins on Magnitude

HRA exemption has **no fixed cap** — it's whichever of three formulas (actual HRA / 50% or 40% of basic / rent − 10% of basic) is lowest. For a Mumbai-based employee with ₹15L basic and ₹40K/month rent, the exempt amount easily crosses **₹3.5L**.

Compare that with 80GG's hard cap: **₹5,000/month = ₹60,000/year maximum**. Even in the best case, 80GG saves at most ₹18,750 in tax (at 30% slab) — versus ₹1L+ from HRA.

Use the [HRA Calculator](/hra-calculator) to project your specific exemption.

## Section 80GG — The Detailed Math

Available deduction is the **least** of:

1. **₹5,000/month** = ₹60,000/year
2. **25% of total income** (after other deductions, before 80GG)
3. **Rent paid − 10% of total income**

Eligibility conditions:

- You (or your spouse / minor child) must **not own a residential house** in the city where you work.
- You must **not be receiving HRA**.
- You must file **Form 10BA** with your ITR declaring the rent paid.

## Worked Example — Freelancer in Bengaluru

- Total income: ₹10,00,000
- Rent paid: ₹2,40,000/year (₹20K/month)
- No HRA, no house in city

80GG deduction = least of:
- ₹60,000
- 25% × ₹10L = ₹2,50,000
- ₹2,40,000 − ₹1,00,000 (10% of income) = ₹1,40,000

**Deduction = ₹60,000.** Tax saving at 20% slab = ₹12,000.

If the same person had HRA of ₹3L in their CTC instead, HRA exemption would be **~₹1.4L** and tax saving **~₹28,000** — more than double.

## The New Regime Catch — Both Are Disallowed

**Neither HRA nor 80GG is available under the new tax regime.** If you've opted into the new regime (default from FY 2023-24), both deductions vanish.

Always compare regimes in the [Income Tax Calculator](/income-tax-calculator) before locking in for the year. For renters, the old regime + HRA / 80GG usually wins by ₹30K-₹80K/year.

## Switching Mid-Year — Don't

You declare your tax regime to your employer at the start of the year. They project TDS based on that choice. Mid-year switches create payroll chaos — possible but messy. Decide in April after running both regimes through the [Income Tax Calculator](/income-tax-calculator).

## Common Mistakes

1. **Claiming HRA without rent receipts** — fine for rent ≤ ₹3,000/month, illegal above it.
2. **Claiming 80GG while spouse owns a house in same city** — disallowed.
3. **Not filing Form 10BA** with ITR when claiming 80GG — claim gets disallowed in processing.
4. **Forgetting landlord PAN for rent > ₹1L/year** — TDS @ 5% may apply on rent under Sec 194-IB.

## Related Reading

- [HRA Exemption Calculator — Complete Guide](/blog/hra-exemption-calculator-india-complete-guide)
- [How to Save Income Tax Legally in India 2026](/blog/how-to-save-income-tax-legally-in-india-2026)
- Run both regimes: [Income Tax Calculator](/income-tax-calculator)

## Bottom Line

If your CTC includes HRA → claim it via the [HRA Calculator](/hra-calculator). If it doesn't and you don't own a home in your work city → claim 80GG. Both vanish under the new regime, so verify your regime first.
    `,
    faq: [
      { q: "Can I claim HRA and 80GG together?", a: "No. You can claim one or the other, never both in the same financial year." },
      { q: "What is the maximum deduction under Section 80GG?", a: "₹5,000/month = ₹60,000/year, capped further if your rent or income is low. Use the formula in this article to compute exactly." },
      { q: "Do I need to submit Form 10BA for 80GG?", a: "Yes — Form 10BA is a self-declaration filed with your ITR confirming rent paid and no owned property in the city. Without it, the claim is disallowed." },
    ],
  },
];

export const getBlogBySlug = (slug: string) => blogs.find((b) => b.slug === slug);
export const getRelatedBlogs = (slugs: string[]) => slugs.map((s) => getBlogBySlug(s)).filter(Boolean) as BlogPost[];
