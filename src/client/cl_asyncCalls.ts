import Events from "../../lib/events"
let id = 0 
const CachedCalls: Calls = {};

function execute <T = any>(name: string, ...data: any): Promise<T> {
    return new Promise((res, rej) => {
        id += 1
        CachedCalls[id] = {
            res,
            rej
        }
        Events.emitNet("base:async:call:sv", id, name, ...data)
    })
}

Events.onNet("base:async:calls:cl:resolve", (id: number, result: any) => {
    const call = CachedCalls[id]
    if (call) {
        call.res(result)
        delete CachedCalls[id]
    }
})

const RSC = {
    execute
}

export default RSC; 