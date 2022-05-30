const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
}

const uuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const generatePhoneNumber = (): number => {
  return random(1000000000, 9999999999);
}

const MathsAdditional = {
  random, uuid, generatePhoneNumber
}

export default MathsAdditional; 

// export default class MathPanouklakos {
  
//     public random(min: number, max: number): number {
//       return Math.floor(Math.random() * (max - min) + min);
//     }
  
//     public uuid(): string {
//       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//      });
//     }
  
// }