import Events from "../../lib/events"

const CallCallbacks: CallCallbacks = {}

const registerCall = <T = any>(name: string, cb: (...args: any) => T) => {
    CallCallbacks[name] = cb
}

Events.onNet("base:async:call:sv", (id: number, event: string, ...args: any) => {
    const src = source
    const result = CallCallbacks[event](...args)
    Events.emitNet("base:async:calls:cl:resolve", src, id, result)
})

const RSC = {
    register: registerCall
};

export default RSC; 