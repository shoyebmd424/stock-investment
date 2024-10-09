 export function calculateIrrSingleInvestment(
  initialInvestment,
  investmentDate,
  currentValue,
  currentDate
) {
 
  const timeInYears =
    (currentDate - investmentDate) / (365.0 * 24 * 60 * 60 * 1000);

  const irr = (currentValue / initialInvestment) ** (1 / timeInYears) - 1;

  return (irr * 100).toPrecision(2);
}

// // Example usage for a single investment
// const initialInvestment = 500000; // £500K initial investment (cash out)
// const investmentDate = new Date(2020, 0, 1); // Investment date (January 1, 2020)
// const currentValue = 800000; // £800K current net value (cash in)
// const currentDate = new Date(2024, 7, 29); // Current date (August 29, 2024)

// const irrSingle = calculateIrrSingleInvestment(
//   initialInvestment,
//   investmentDate,
//   currentValue,
//   currentDate
// );

// console.log(`IRR for the investment: ${(irrSingle * 100).toFixed(4)}%`);
