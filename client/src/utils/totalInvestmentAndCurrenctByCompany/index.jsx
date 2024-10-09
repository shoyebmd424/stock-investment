import { getByCompanyIdDealService } from "../../service/deal/dealService";

export const getInvestmentsAndCurrent=async(id)=>{
  const data=await  getByCompanyIdDealService(id);
  try {
  const totalInvestment = data?.reduce((sum, val) => {
    const investmentSum = val?.investors?.reduce((investSum, investor) => {
      return investSum + (parseInt( investor?.amount||0) || 0);
    }, 0) || 0;
    return sum + investmentSum;
  }, 0);
return {totalInvestment};
  } catch (error) {
    console.log(error)
  }
  
}