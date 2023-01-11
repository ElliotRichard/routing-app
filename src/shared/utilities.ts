// import { Time } from './types';

export const setTime = (date: Date, time: string): Date => {
    let hours = time.slice(0, 2);
    let minutes = time.slice(-2);
    date.setHours(+hours);
    date.setMinutes(+minutes);
    return date;
  }
  
//  export const getHours = (time: Time) => {
//     return time.slice(0, 2);
//   }
  
//  export const getMin = (time: Time) => {
//     return time.slice(-2);
//   }
