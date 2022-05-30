

/**
 * A function that creates a global export (can be used in lua). 
 * @param exportName The name of the exports.
 * @param cb The function that will be fired when the export is called.  
 * @example
 *  Exports.create("is:player:dead", () => {
 *      ...code
 * })
 **/
 const CreateExport = (exportName: string, cb: (...args: any) => any) => {
    exports(exportName, cb)
}

/**
 * A function that calls a global export (even from lua). 
 * @param exportName {string} The name of the exports.
 * @param resourceName The resource that it originates.  
 * @param args Arguments that are ment to be passed through.  
 * @example
 *  Exports.call<string[]>("dead:players", "deathsystem", PlayerPedId())
 **/
const CallExports = <T = any>(exportName: string, resourceName: string, ...args: any): T => {
    return exports[resourceName][exportName]
}

const Exports: {
    create: (exportName: string, cb: (...args: any) => any) => void
    call: <T = any>(exportName: string, resource: string, ...args: any) => T
} = {
    create: CreateExport,
    call: CallExports
}

export default Exports