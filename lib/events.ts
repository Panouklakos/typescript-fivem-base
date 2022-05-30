

/**
 * A function that creates an event that can be called from every script. 
 * @param eventName The name of the event. 
 * @param callback A function that gets called when the event fires
 * @example
 *  Events.on("playerKilled", (player: id) => {
 *   dosmth(player)
 *  })
 **/
 const onEvent = (eventName: string, cb: (...args) => void) => {
    on(eventName, cb)
}

/**
 * A function that calls an event. 
 * @param eventName The name of the event.
 * @param args The arguments you want to send to the event.  
 * @example
 *  Events.emit("playerKilled", GetPlayerServerId(PlayerId()))
 **/
const emitEvent = (eventName: string, ...args: any) => {
    emit(eventName, ...args)
}

/**
 * A function that creates a server event to be called by the client or a client event to be called by the server. 
 * @param eventName The name of the event. 
 * @param callback A function that gets called when the event fires
 * @example
 *  Events.onNet("playerKilled", (player: id) => {
 *   dosmth(player)
 *  })
 **/
const onNetEvent = (eventName, cb: (...args: any) => void) => {
    onNet(eventName, cb)
}


/**
 * A function that calls a server event from the client or a client event from the server. 
 * @param eventName The name of the event.
 * @param args The arguments you want to send to the event.  
 * @example
 *  Events.emitNet("playerKilled", GetPlayerServerId(PlayerId()))
 **/
const emitNetEvent = (eventName: string, ...args: any) => {
    emitNet(eventName, ...args)
}

const Events: {
    on: (eventName: string, cb: (...args) => void) => void
    emit: (eventName: string, ...args: any) => void
    onNet: (eventName: string, cb: (...args: any) => void) => void
    emitNet: (eventName: string, ...args: any) => void
} = {
    on: onEvent,
    emit: emitEvent,
    onNet: onNetEvent,
    emitNet: emitNetEvent
}

export default Events