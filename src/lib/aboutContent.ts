import type { AboutCalculatorProps } from "@/components/AboutCalculator";

export const aboutContent: Record<string, AboutCalculatorProps> = {
  gratuity: {
    intro: "Gratuity is a lump-sum your employer pays after 5+ years of continuous service under the Payment of Gratuity Act, 1972. This calculator gives an instant, accurate payout estimate.",
    formula: { label: "Statutory formula", expression: "Gratuity = (Last Salary × 15 × Years) / 26", explanation: "Uses Basic + DA as the salary input; ₹20 lakh is the lifetime tax-free cap." },
    howToUse: ["Enter your last drawn Basic + DA.", "Enter total years of service (min 5).", "Read your payout and tax-free portion instantly."],
    whatItMeans: ["Up to ₹20 lakh is tax-exempt for non-government employees.", "Anything above ₹20 lakh is added to your taxable income."],
    tips: ["Negotiate Basic salary higher — gratuity is based only on Basic + DA, not CTC.", "5 years of continuous service is the minimum; check exits, sabbaticals carefully."],
    alsoAsk: [
      { q: "Is gratuity paid monthly?", a: "No — it's a one-time payout when you leave after 5+ years." },
      { q: "Can I claim gratuity before 5 years?", a: "Only if service ends due to death or permanent disability." },
    ],
  },
  ovulation: {
    intro: "Predict your fertile window, ovulation day, and possible due date based on your last period and average cycle length. Private, instant, no sign-up.",
    formula: { label: "Estimation method", expression: "Ovulation Day = Last Period + (Cycle Length − 14)", explanation: "Fertile window = 5 days before ovulation through ovulation day +1." },
    howToUse: ["Enter the first day of your last period.", "Enter your average cycle length (28 default).", "See ovulation, fertile window, next period, and due date."],
    whatItMeans: ["The fertile window is when conception odds are highest.", "Due date is ~266 days from estimated ovulation."],
    tips: ["For irregular cycles, also use ovulation strips or basal body temperature.", "Stress, travel, and illness can shift ovulation by several days."],
    alsoAsk: [
      { q: "What's the best day to conceive?", a: "1–2 days before ovulation gives the highest probability." },
      { q: "Can I ovulate during my period?", a: "Rare, but possible with very short cycles." },
    ],
  },
  calorie: {
    intro: "Find your daily calorie needs (TDEE) for maintaining, losing, or gaining weight — based on the proven Mifflin-St Jeor BMR formula.",
    formula: { label: "Mifflin-St Jeor BMR", expression: "Men: 10×kg + 6.25×cm − 5×age + 5; Women: 10×kg + 6.25×cm − 5×age − 161", explanation: "TDEE = BMR × activity factor (1.2 sedentary → 1.9 very active)." },
    howToUse: ["Enter age, sex, height, and weight.", "Choose your activity level.", "Get BMR, TDEE, and recommended calories for your goal."],
    whatItMeans: ["A 500 kcal/day deficit ≈ 0.5 kg fat loss per week.", "Eating below BMR long-term can slow your metabolism."],
    tips: ["Recalculate every 4–6 kg of weight change.", "Track honestly for 2 weeks before judging the number."],
    alsoAsk: [
      { q: "Should I eat below my BMR to lose fat?", a: "No — stay between BMR and TDEE for sustainable, healthy loss." },
      { q: "How accurate is TDEE?", a: "±10% — adjust based on real-world results after 2–3 weeks." },
    ],
  },
  ppf: {
    intro: "Project the maturity value of a 15-year Public Provident Fund (PPF) account at the current interest rate, with tax-free returns under Section 80C.",
    formula: { label: "PPF maturity", expression: "M = Σ Cₜ × (1 + r)^(15 − t)", explanation: "Annual deposit compounds yearly at the PPF rate for 15 years." },
    howToUse: ["Enter your annual deposit (max ₹1.5 L).", "Confirm tenure (15 years default).", "View total invested, interest earned, and maturity value."],
    whatItMeans: ["PPF is EEE: contributions, interest, and maturity are all tax-free.", "Lock-in is 15 years with partial withdrawal allowed from year 7."],
    tips: ["Deposit before the 5th of each month to maximise interest.", "Extend in 5-year blocks after maturity to keep compounding."],
    alsoAsk: [
      { q: "What's the PPF interest rate?", a: "Reviewed quarterly by the Government of India; currently 7.1% p.a." },
      { q: "Can I withdraw early?", a: "Partial withdrawal allowed from year 7; full closure only after 15 years (except specific cases)." },
    ],
  },
  rentbuy: {
    intro: "Compare the true 10-year cost of renting vs buying a home — including EMI, interest, opportunity cost of down payment, and rent inflation.",
    formula: { label: "Net cost (buy)", expression: "EMI×N + DownPayment − ResaleValue", explanation: "Rent total uses compounded annual rent hikes (typically 5–8%)." },
    howToUse: ["Enter home price, down payment, loan rate, and tenure.", "Enter monthly rent and expected annual rent hike.", "See which option is cheaper over your time horizon."],
    whatItMeans: ["Buying wins long-term if you stay 7+ years.", "Renting wins if you might relocate or invest the down payment at higher returns."],
    tips: ["Factor maintenance (~1% of home value/year) and property tax.", "Compare loan interest with your investment portfolio's expected return."],
    alsoAsk: [
      { q: "Is buying always better than renting?", a: "No — only if you stay long enough and rental yields are low (<3%)." },
      { q: "What's a safe down payment?", a: "20–25% to keep EMI under 40% of take-home pay." },
    ],
  },
  percentage: {
    intro: "Solve any percentage problem instantly — find X% of Y, percentage change, marks-to-percentage, or what percent A is of B.",
    formula: { label: "Core formulas", expression: "X% of Y = (X/100)×Y · % change = ((New−Old)/Old)×100", explanation: "Works for marks, discounts, hikes, GST shares, and statistical change." },
    howToUse: ["Pick the mode (of value, change, or A-of-B).", "Enter the two known numbers.", "Read your answer instantly."],
    whatItMeans: ["Negative % change = decrease; positive = growth.", "A score of 450/600 = 75% — same formula for any total."],
    tips: ["For salary hikes, compare in-hand, not CTC.", "Double-check base value — % of revenue ≠ % of profit."],
    alsoAsk: [
      { q: "How do I increase a number by X%?", a: "Multiply by (1 + X/100). e.g. ₹1000 + 12% = 1000 × 1.12 = ₹1120." },
      { q: "What's the difference between percentage and percentile?", a: "Percentage = raw score share; percentile = rank vs others." },
    ],
  },
  age: {
    intro: "Calculate exact age in years, months, days, hours — plus days until your next birthday — from any date of birth.",
    formula: { label: "Age in years", expression: "Age = floor((Today − DOB) / 365.25)", explanation: "Accounts for leap years; further broken down to months and days." },
    howToUse: ["Pick your date of birth.", "Optionally pick a comparison date.", "See age in every unit + next birthday countdown."],
    whatItMeans: ["Use for visa, PAN, retirement, and competitive-exam eligibility checks.", "Total days lived helps personal milestones (e.g., 10,000 days)."],
    tips: ["Indian retirement age = 60; gratuity eligibility = 5 years service.", "PAN and Aadhaar use exact age per DOB on document."],
    alsoAsk: [
      { q: "Is my age in years rounded?", a: "Yes — it's floored to your last completed birthday." },
      { q: "How many days have I lived?", a: "Use the date-difference output for the exact day count." },
    ],
  },
  cgpa: {
    intro: "Convert your CGPA to percentage or vice versa using the universal 9.5 multiplier (CBSE/AICTE) and other university-specific scales.",
    formula: { label: "CGPA ↔ %", expression: "Percentage = CGPA × 9.5", explanation: "Most Indian universities use 9.5; some (VTU, AKTU) use slightly different multipliers." },
    howToUse: ["Enter your CGPA (or percentage).", "Select your university/board.", "Get the converted score plus class/division."],
    whatItMeans: ["CGPA ≥ 8.0 = First Class with Distinction (usually).", "Always confirm with your university's official handbook."],
    tips: ["For placements, both CGPA and % are accepted — quote whichever is higher.", "Re-evaluate after each semester to track upward trend."],
    alsoAsk: [
      { q: "Is CGPA = SGPA?", a: "No — SGPA is one semester; CGPA averages all completed semesters." },
      { q: "How do I improve my CGPA fast?", a: "Score 8.5+ in remaining semesters and re-take low-credit failed courses." },
    ],
  },
  attendance: {
    intro: "Track current attendance, see how many classes you can safely skip, and calculate exactly how many you must attend to hit 75%.",
    formula: { label: "Attendance %", expression: "% = (Attended / Total) × 100", explanation: "To find safe bunks: solve (A)/(A+B+x) ≥ 0.75 for x." },
    howToUse: ["Enter classes attended and total held.", "See current % and safe-bunk count.", "Use the planner to project end-of-semester %."],
    whatItMeans: ["75% is the standard cutoff in most Indian universities.", "Below 65% usually means a debarment from exams."],
    tips: ["Skip Friday/Saturday classes — they hurt less if assignments don't overlap.", "Use medical leave with documentation for genuine absences."],
    alsoAsk: [
      { q: "How many classes can I miss?", a: "If you're at 80% with 50 done, you can safely skip ~3 more before hitting 75%." },
      { q: "What if I'm below 75%?", a: "Most universities allow a condonation form once per program with a fine." },
    ],
  },
};
