export const portfolioIrrParameter = (data, userId) => {
    try {
      let totalCurrentValue = 0;  
      console.log(data)
      const investments = [];
      data.forEach(item => {
        item?.deals?.forEach(deal => {
          totalCurrentValue += parseInt(deal?.currentValue || 0);
          const investor = deal?.investors?.find(v => v?.investerId === userId);
          if (investor) {
            investments.push([parseInt(investor?.amount || 0), new Date(deal?.investedDate)]);
          }
        });
      });
      const currentDate = new Date(); 
      return { totalCurrentValue, currentDate, investments };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  