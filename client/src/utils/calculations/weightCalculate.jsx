import { getAllDealByUserAndCompanyService } from "../../service/deal/dealService";

export const getWeight=async(userId,amount)=>{
try {
    const data = await getAllDealByUserAndCompanyService(userId);
    let invest=0;
    for (const it of data) {
      for (const item of it?.deals) {
        const investor = item?.investors?.find(v => v.investerId === userId);
        if (investor) {
        const paid = parseFloat(investor?.amount || 0);
        invest+=paid;
      }
    }
  };
  console.log(amount,invest)
  return ((amount/invest)*100).toFixed(2);
} catch (error) {
    console.log(error);
    return 0;
}
}