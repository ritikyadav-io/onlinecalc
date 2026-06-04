import { describe, it, expect } from "vitest";
import { calcEmi, calcSip, outstandingBalance, calcRentVsBuy } from "@/lib/finance";

describe("calcEmi", () => {
  it("matches the textbook EMI formula for a standard home loan", () => {
    // 50L at 8.5% for 20 years ⇒ EMI ≈ ₹43,391
    const r = calcEmi(5_000_000, 8.5, 20)!;
    expect(r).not.toBeNull();
    expect(Math.round(r.emi)).toBe(43391);
    expect(r.months).toBe(240);
    expect(Math.round(r.totalInterest)).toBe(Math.round(r.totalPayment - 5_000_000));
  });

  it("handles 0% interest as linear repayment (no NaN)", () => {
    const r = calcEmi(120_000, 0, 1)!;
    expect(r.emi).toBe(10_000);
    expect(r.totalInterest).toBe(0);
    expect(r.totalPayment).toBe(120_000);
  });

  it("rejects invalid inputs", () => {
    expect(calcEmi(0, 8, 10)).toBeNull();
    expect(calcEmi(-100, 8, 10)).toBeNull();
    expect(calcEmi(100, -1, 10)).toBeNull();
    expect(calcEmi(100, 8, 0)).toBeNull();
    expect(calcEmi(NaN, 8, 10)).toBeNull();
  });

  it("rounds tenure to whole months", () => {
    const r = calcEmi(100_000, 10, 1)!;
    expect(r.months).toBe(12);
  });
});

describe("outstandingBalance", () => {
  it("equals principal before any payment", () => {
    expect(outstandingBalance(1_000_000, 9, 10, 0)).toBe(1_000_000);
  });

  it("equals 0 after full tenure", () => {
    expect(outstandingBalance(1_000_000, 9, 10, 120)).toBe(0);
  });

  it("decreases monotonically and stays positive mid-tenure", () => {
    const a = outstandingBalance(1_000_000, 9, 10, 24);
    const b = outstandingBalance(1_000_000, 9, 10, 60);
    const c = outstandingBalance(1_000_000, 9, 10, 100);
    expect(a).toBeGreaterThan(b);
    expect(b).toBeGreaterThan(c);
    expect(c).toBeGreaterThan(0);
    expect(a).toBeLessThan(1_000_000);
  });

  it("handles 0% rate linearly", () => {
    // 10L over 10y zero-rate ⇒ EMI = 8333.33, after 5y owe 5L
    const b = outstandingBalance(1_000_000, 0, 10, 60);
    expect(Math.round(b)).toBe(500_000);
  });
});

describe("calcSip", () => {
  it("computes future value with compounding", () => {
    // 10k / mo at 12% for 10y ⇒ ≈ ₹23.23L
    const r = calcSip(10_000, 12, 10)!;
    expect(r.invested).toBe(1_200_000);
    expect(Math.round(r.futureValue)).toBeGreaterThan(2_300_000);
    expect(Math.round(r.futureValue)).toBeLessThan(2_400_000);
    expect(r.gain).toBeCloseTo(r.futureValue - r.invested, 5);
  });

  it("returns invested amount when rate is 0", () => {
    const r = calcSip(5_000, 0, 5)!;
    expect(r.futureValue).toBe(r.invested);
    expect(r.gain).toBe(0);
  });

  it("rejects bad inputs", () => {
    expect(calcSip(0, 12, 10)).toBeNull();
    expect(calcSip(1000, -5, 10)).toBeNull();
    expect(calcSip(1000, 12, 0)).toBeNull();
  });
});

describe("calcRentVsBuy", () => {
  const base = {
    propertyPrice: 5_000_000,
    downPaymentPct: 20,
    loanRatePct: 8.5,
    loanYears: 20,
    horizonYears: 10,
    monthlyRent: 20_000,
    rentHikePct: 7,
    appreciationPct: 5,
  };

  it("uses separate loan tenure and horizon (outstanding balance counted)", () => {
    const r = calcRentVsBuy(base)!;
    // Horizon 10y < loan 20y ⇒ outstanding > 0
    expect(r.outstandingAtHorizon).toBeGreaterThan(0);
    expect(r.monthsPaid).toBe(120);
    expect(r.emiPaidTotal).toBeCloseTo(r.emi * 120, 2);
    // Equity = appreciated value minus outstanding
    expect(Math.round(r.equityAtHorizon)).toBe(
      Math.round(r.propertyFutureValue - r.outstandingAtHorizon)
    );
  });

  it("handles 100% down payment (no EMI, no outstanding)", () => {
    const r = calcRentVsBuy({ ...base, downPaymentPct: 100 })!;
    expect(r.loanAmount).toBe(0);
    expect(r.emi).toBe(0);
    expect(r.emiPaidTotal).toBe(0);
    expect(r.outstandingAtHorizon).toBe(0);
    expect(r.downPayment).toBe(base.propertyPrice);
  });

  it("handles 0% loan rate without NaN", () => {
    const r = calcRentVsBuy({ ...base, loanRatePct: 0 })!;
    expect(Number.isFinite(r.emi)).toBe(true);
    expect(Number.isFinite(r.outstandingAtHorizon)).toBe(true);
    expect(r.outstandingAtHorizon).toBeGreaterThan(0);
  });

  it("zero down payment uses full price as loan", () => {
    const r = calcRentVsBuy({ ...base, downPaymentPct: 0 })!;
    expect(r.downPayment).toBe(0);
    expect(r.loanAmount).toBe(base.propertyPrice);
    expect(r.emi).toBeGreaterThan(0);
  });

  it("horizon longer than loan tenure caps months paid at loan months", () => {
    const r = calcRentVsBuy({ ...base, horizonYears: 25, loanYears: 20 })!;
    expect(r.monthsPaid).toBe(240);
    expect(r.outstandingAtHorizon).toBe(0);
  });

  it("rejects invalid inputs", () => {
    expect(calcRentVsBuy({ ...base, propertyPrice: 0 })).toBeNull();
    expect(calcRentVsBuy({ ...base, monthlyRent: 0 })).toBeNull();
    expect(calcRentVsBuy({ ...base, downPaymentPct: 150 })).toBeNull();
    expect(calcRentVsBuy({ ...base, loanRatePct: -2 })).toBeNull();
  });

  it("totalRent compounds with annual hike", () => {
    const r = calcRentVsBuy({ ...base, rentHikePct: 0 })!;
    expect(r.totalRent).toBe(base.monthlyRent * 12 * base.horizonYears);
    const r2 = calcRentVsBuy({ ...base, rentHikePct: 10 })!;
    expect(r2.totalRent).toBeGreaterThan(r.totalRent);
  });

  it("decides better correctly when buying clearly wins", () => {
    // Aggressive appreciation + low rent ⇒ BUY wins
    const r = calcRentVsBuy({ ...base, appreciationPct: 12, monthlyRent: 5_000 })!;
    expect(r.better).toBe("BUY");
  });
});
