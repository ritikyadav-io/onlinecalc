/**
 * Shared finance primitives used by EMI, SIP, Loan, and Rent-vs-Buy
 * calculators. Pure functions, easy to unit test.
 *
 * All rates are passed as annual percentages (e.g. 8.5 for 8.5%).
 */

export interface EmiResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  months: number;
}

/** Standard reducing-balance EMI with a zero-rate fallback. */
export function calcEmi(principal: number, annualRatePct: number, years: number): EmiResult | null {
  if (!isFinite(principal) || !isFinite(annualRatePct) || !isFinite(years)) return null;
  if (principal <= 0 || years <= 0 || annualRatePct < 0) return null;
  const months = Math.round(years * 12);
  if (months <= 0) return null;

  const r = annualRatePct / 12 / 100;
  const emi = r === 0
    ? principal / months
    : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);

  if (!isFinite(emi) || emi <= 0) return null;
  const totalPayment = emi * months;
  return {
    emi,
    totalPayment,
    totalInterest: totalPayment - principal,
    months,
  };
}

/** Outstanding loan balance after `monthsPaid` months. Handles zero rate. */
export function outstandingBalance(
  principal: number,
  annualRatePct: number,
  totalYears: number,
  monthsPaid: number
): number {
  const e = calcEmi(principal, annualRatePct, totalYears);
  if (!e) return 0;
  if (monthsPaid <= 0) return principal;
  if (monthsPaid >= e.months) return 0;

  const r = annualRatePct / 12 / 100;
  if (r === 0) {
    return Math.max(0, principal - e.emi * monthsPaid);
  }
  const balance =
    principal * Math.pow(1 + r, monthsPaid) -
    e.emi * ((Math.pow(1 + r, monthsPaid) - 1) / r);
  return Math.max(0, balance);
}

export interface SipResult {
  invested: number;
  futureValue: number;
  gain: number;
  months: number;
}

/** SIP future value with monthly compounding. Zero-rate returns plain sum. */
export function calcSip(monthly: number, annualRatePct: number, years: number): SipResult | null {
  if (!isFinite(monthly) || !isFinite(annualRatePct) || !isFinite(years)) return null;
  if (monthly <= 0 || years <= 0 || annualRatePct < 0) return null;
  const months = Math.round(years * 12);
  if (months <= 0) return null;

  const r = annualRatePct / 12 / 100;
  const invested = monthly * months;
  const futureValue = r === 0
    ? invested
    : monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

  if (!isFinite(futureValue)) return null;
  return { invested, futureValue, gain: futureValue - invested, months };
}

export interface RentVsBuyInput {
  propertyPrice: number;
  downPaymentPct: number;     // 0–100
  loanRatePct: number;        // annual %
  loanYears: number;          // loan tenure
  horizonYears: number;       // how long you'll hold the property
  monthlyRent: number;
  rentHikePct: number;        // annual %
  appreciationPct: number;    // annual %
  maintenancePctYearly?: number; // default 1% of price
}

export interface RentVsBuyResult {
  downPayment: number;
  loanAmount: number;
  emi: number;
  monthsPaid: number;
  emiPaidTotal: number;
  outstandingAtHorizon: number;
  maintenance: number;
  totalOutOfPocket: number;
  propertyFutureValue: number;
  equityAtHorizon: number;      // FV - outstanding
  netBuyCost: number;           // outOfPocket - equity
  totalRent: number;
  difference: number;           // negative = buying cheaper
  better: "BUY" | "RENT" | "EVEN";
}

/**
 * Rent vs Buy comparison with correct separate loan tenure / horizon.
 *
 * Edge cases handled:
 *  - 100% down payment (loanAmount = 0, no EMI)
 *  - 0% interest rate (linear EMI)
 *  - horizon shorter than loan tenure (outstanding balance counted as cost)
 *  - horizon longer than loan tenure (EMI only paid for loan months)
 */
export function calcRentVsBuy(input: RentVsBuyInput): RentVsBuyResult | null {
  const {
    propertyPrice, downPaymentPct, loanRatePct, loanYears,
    horizonYears, monthlyRent, rentHikePct, appreciationPct,
    maintenancePctYearly = 1,
  } = input;

  if (propertyPrice <= 0 || monthlyRent <= 0 || horizonYears <= 0) return null;
  if (downPaymentPct < 0 || downPaymentPct > 100) return null;
  if (loanRatePct < 0 || rentHikePct < 0 || appreciationPct < 0) return null;

  const downPayment = (propertyPrice * downPaymentPct) / 100;
  const loanAmount = Math.max(0, propertyPrice - downPayment);

  let emi = 0;
  let monthsPaid = 0;
  let outstandingAtHorizon = 0;
  let emiPaidTotal = 0;

  if (loanAmount > 0 && loanYears > 0) {
    const e = calcEmi(loanAmount, loanRatePct, loanYears);
    if (!e) return null;
    emi = e.emi;
    monthsPaid = Math.min(e.months, Math.round(horizonYears * 12));
    emiPaidTotal = emi * monthsPaid;
    outstandingAtHorizon = outstandingBalance(loanAmount, loanRatePct, loanYears, monthsPaid);
  }

  const maintenance = propertyPrice * (maintenancePctYearly / 100) * horizonYears;
  const totalOutOfPocket = downPayment + emiPaidTotal + maintenance;
  const propertyFutureValue = propertyPrice * Math.pow(1 + appreciationPct / 100, horizonYears);
  const equityAtHorizon = Math.max(0, propertyFutureValue - outstandingAtHorizon);
  const netBuyCost = totalOutOfPocket - equityAtHorizon;

  let totalRent = 0;
  let yearRent = monthlyRent * 12;
  for (let i = 0; i < horizonYears; i++) {
    totalRent += yearRent;
    yearRent *= 1 + rentHikePct / 100;
  }

  const difference = netBuyCost - totalRent;
  const better: RentVsBuyResult["better"] =
    Math.abs(difference) < 1 ? "EVEN" : difference < 0 ? "BUY" : "RENT";

  return {
    downPayment, loanAmount, emi, monthsPaid, emiPaidTotal,
    outstandingAtHorizon, maintenance, totalOutOfPocket,
    propertyFutureValue, equityAtHorizon, netBuyCost,
    totalRent, difference, better,
  };
}
