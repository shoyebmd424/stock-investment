import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatTimeFromNow(dateTime) {
    return dayjs(dateTime).fromNow();
}


// export const currencyFormatter=(val)=>{
//     try {
//         const euroFormatter = new Intl.NumberFormat('de-DE', {
//             style: 'currency',
//             currency: 'EUR',
//           });
//          return euroFormatter.format(val);
        
//     } catch (error) {
//         console.log(error)
//       return  euroFormatter.format(0)
//     }
// }

export const currencyFormatter = (val, currency = 'EUR', style = 'currency') => {
    try {
      
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
      }).format(val);
    } catch (error) {
      return val !== undefined ? formatter.format(0) : '0'; 
    }
  };

  export const deformateCurrency = (formattedCurrency) => {
    console.log(formattedCurrency)
    // const numericString = formattedCurrency.replace(/[^\d-]/g, '');
    
    return parseInt(numericString, 10);
  };