// new
export function calculateXIRRSingleInvestment(initialInvestment, investmentDate, currentValue, currentDate) {
  console.log(initialInvestment, investmentDate, currentValue, currentDate)
  const cashFlows = [initialInvestment, currentValue];
  const dates = [new Date(investmentDate), new Date(currentDate)];
console.log(dates)
  return xirr(cashFlows, dates)*100;
}

function xirr(cashFlows, dates) {
  const npv = (rate) => {
      return cashFlows.reduce((totalValue, cashFlow, index) => {
          return totalValue + cashFlow / Math.pow(1 + rate, (dates[index] - dates[0]) / (1000 * 60 * 60 * 24 * 365));
      }, 0);
  };

  let guess = 0.1; 
  for (let i = 0; i < 100; i++) {
      const npvValue = npv(guess);
      if (Math.abs(npvValue) < 1e-6) {
          return guess;
      }
      const dNpv = cashFlows.reduce((sum, cashFlow, index) => {
          return sum - cashFlow * (dates[index] - dates[0]) / (1000 * 60 * 60 * 24 * 365) / Math.pow(1 + guess, (dates[index] - dates[0]) / (1000 * 60 * 60 * 24 * 365) + 1);
      }, 0);
      guess -= npvValue / dNpv;
  }
  return guess;
}

// // Example usage
// const initialInvestment = -143891.91;
// const investmentDate = '2022-12-12'; 
// const currentValue = 149868.76;
// const currentDate = '2024-11-05'; 

// const irrSingle = calculateXIRRSingleInvestment(initialInvestment, investmentDate, currentValue, currentDate);
// console.log(`IRR for the single investment: ${(irrSingle * 100).toFixed(4)}%`);


