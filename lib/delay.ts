/**
 * A function that time suspends actions, used like Citizen.Wait(ms) in lua
 * @param ms The amount of time for the script to be suspended. *
 * @example
 * async function foo() {
 *  while true {
 *     await Delay(10)
 *  }
 * }
 *
 **/
 const Delay = (ms: number) => {
    return new Promise((res) => setTimeout(res, ms));
};
  
export default Delay