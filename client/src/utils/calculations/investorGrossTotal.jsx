import axios from "axios";

export const netProfit = async(
  paid,
  shareholding,
  currentValuation,
  currency,
  carried
) => {
  console.log(paid,
    shareholding,
    currentValuation,
    currency,
    carried)
  const rate=await exchange(currency);
  const profit = (shareholding * parseInt(currentValuation||0) * rate/100)-paid ;
  if (profit < 0) return profit;
  return (profit * (1 - carried));
};

export const netMoic =async (
  paid,
  shareholding,
  currentValuation,
  currency,
  carried
) => {

  const moic =
    (await netProfit(paid, shareholding, currentValuation, currency, carried) + paid) /
    paid;
    return moic;
};


export  const exchange=async(currency)=>{
  const {data}=await axios.get(`https://api.frankfurter.app/latest?from=${currency||'EUR'}`);
  return data?.rates?.EUR||1;
}

export const exChangeByDate=async(currency,date)=>{
  const {data}=await axios.get(`https://api.frankfurter.app/${date||new Date().toISOString().split('T')[0]}?from=${currency||'EUR'}`);
  return data?.rates?.EUR||1;
}


export const netTotalProfit=()=>{
  return 0;
}