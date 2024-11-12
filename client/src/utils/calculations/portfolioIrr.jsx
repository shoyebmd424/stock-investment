// new irr
export function calculateXIRRPortfolio(investments) {
console.log(investments)
  let cashFlows = investments.map((investment) => investment[0]);
  let dates = investments.map((investment) => new Date(investment[1]));

  return xirr(cashFlows, dates);
}

function xirr(cashFlows, dates) {
  function npv(rate) {
    return cashFlows.reduce((totalValue, cashFlow, index) => {
      const daysDiff = (dates[index] - dates[0]) / (1000 * 60 * 60 * 24);
      const yearFraction = daysDiff / 365.0;
      return totalValue + cashFlow / Math.pow(1 + rate, yearFraction);
    }, 0);
  }

  let guess = 0.1;
  for (let i = 0; i < 100; i++) {
    const npvValue = npv(guess);
    if (Math.abs(npvValue) < 1e-6) {
      return guess;
    }

    const dNpv = cashFlows.reduce((sum, cashFlow, index) => {
      const daysDiff = (dates[index] - dates[0]) / (1000 * 60 * 60 * 24);
      const yearFraction = daysDiff / 365.0;
      return (
        sum - (cashFlow * yearFraction) / Math.pow(1 + guess, yearFraction + 1)
      );
    }, 0);

    guess -= npvValue / dNpv; 
  }
  return guess||0 ; 
}

// Example usage
// const investments = [
//   [-143891.91, '2022-12-22'], 
//   [-165240.00, '2023-12-26'], 
//   [330208.79, '2024-11-05'] 
// ];

// const irrPortfolio = calculateXIRRPortfolio(investments);
// console.log(
//   `IRR for the portfolio of investments: ${(irrPortfolio * 100).toFixed(4)}%`
// );
