import { getByCompanyIdDealService } from "../../service/deal/dealService";

export const companyProfit = async (companyId, currentValuation) => {
    let profit = 0;
  
    const getDealByCompanyId = await getByCompanyIdDealService(companyId);
  
    const investorTotals = {};
  
    Array.isArray(getDealByCompanyId) && getDealByCompanyId.forEach(deal => {
      deal?.investors?.forEach(investor => {
        const investorId = investor?.investerId;
        const amount = parseInt(investor?.amount || 0);
        const fees = parseInt(investor?.fees || 0);
  
        if (investorId) {
          if (!investorTotals[investorId]) {
            investorTotals[investorId] = 0;
          }
          investorTotals[investorId] += amount + fees;
        }
      });
    });
    profit = Object.values(investorTotals).reduce((sum, total) =>sum + (parseInt(currentValuation||0)-total||0), 0);
    // profit = Object.values(investorTotals).reduce((sum, total) =>sum + total, 0);
    return profit===0?currentValuation:profit;
  };
  