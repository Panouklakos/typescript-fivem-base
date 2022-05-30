import Events from "../../lib/events"
import Vector3 from "../../lib/vector3"
import RSC from "./cl_asyncCalls"

Events.on("onClientResourceStart", (resource: string) => {
    const current_resource = GetCurrentResourceName()
    if (resource === current_resource) {
        Events.emitNet("base:infinity:player:connected")
    }
})

Events.on("onClientResourceStop", (resource: string) => {
    const current_resource = GetCurrentResourceName()
    if (resource === current_resource) {
        Events.emitNet("base:infinity:player:disconnected")
    }
})

const GetPlayerNetworkCoords = async (player: number): Promise<Vector3.Three | -1> => {
    const coords = await RSC.execute<Vector3.Three | -1>("getPlayerNetworkCoords", player)
    return coords
}

const NetworkIsPlayerOnline = async (player: number): Promise<boolean> => {
    const isOnline = await RSC.execute<boolean>("isPlayerOnline", player)
    return isOnline
}

const Infinity = {
    GetPlayerNetworkCoords, NetworkIsPlayerOnline
}

export default Infinity; 