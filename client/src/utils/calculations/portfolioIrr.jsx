
export function calculatePortfolioIrr(investments, currentDate, totalCurrentValue) {
    let totalInitialInvestment = 0;
    let weightedTime = 0;
  
    investments.forEach(([initialInvestment, investmentDate]) => {
      totalInitialInvestment += initialInvestment;
      const timeInYears = (currentDate - investmentDate) / (365.0 * 24 * 60 * 60 * 1000);
      weightedTime += (initialInvestment / totalInitialInvestment) * timeInYears;
    });
    const portfolioIrr = (totalCurrentValue / totalInitialInvestment) ** (1 / weightedTime) - 1;
    
    return (portfolioIrr * 100).toFixed(1);
  }