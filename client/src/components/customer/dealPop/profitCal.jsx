import React, { useEffect, useState } from 'react';
import { getAllDealByInvestorService } from '../../../service/deal/dealService';
import { netMoic, netProfit } from '../../../utils/calculations/investorGrossTotal';

const NetProfit = ({ deal, sector, currentValuation, userId }) => {
  const [profit, setProfit] = useState(0);
  const [moic, setMoic] = useState(0);
  const [totalAmountInvested, setTotalInvestment] = useState(0);

  useEffect(() => {
    const getAllProfit = async () => {
      const data = await getAllDealByInvestorService(userId);
      const totalDeals = data.reduce((sum, item) => {
        const investor = item?.investors?.find((v) => v.investerId === userId);
        return sum + parseInt(investor?.amount || 0, 10);
      }, 0);
      setTotalInvestment(totalDeals);
    };

    getAllProfit();
  }, [userId]);

  useEffect(() => {
    const calculateProfitAndMoic = async () => {
      const investor = deal?.investors?.find((v) => v.investerId === userId);
      
      if (investor) {
        const paid = parseFloat(investor?.amount || 0) + parseFloat(investor?.fees || 0);
        const carried = parseFloat(investor?.carried || 0); 
        const shareholding = parseFloat(investor?.shareholding || 0);
        const profitResult = await netProfit(paid, shareholding, currentValuation, deal.currency, carried/100);
        const moicResult = await netMoic(paid, shareholding, currentValuation, deal.currency, carried/100);
        setProfit(profitResult.toFixed(2));
        setMoic(moicResult);
      }
    };

    if (deal && currentValuation) {
      calculateProfitAndMoic();
    }
  }, [currentValuation, userId, deal, totalAmountInvested]);

  return (
    <>
      <td>{profit}</td>
      <td>{sector}</td>
      <td>{moic&&moic?.toString()?.substring(0,4)+'x'}</td>
    </>
  );
};

export default NetProfit;
