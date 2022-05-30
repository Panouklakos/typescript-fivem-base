import Events from "../../lib/events";
import RSC from "./sv_asyncCalls";
import Vector3 from "../../lib/vector3";

const Players: Players = []

Events.onNet("base:infinity:player:connected", () => {
    const src = source 
    Players.push(src)
})

Events.onNet("base:infinity:player:disconnected", () => {
    const src = source 
    const index = Players.indexOf(src)
    if (index !== -1) {
        Players.splice(index, 1)
    }
})

RSC.register("getPlayerNetworkCoords", (player: number): Vector3.Three | -1 => {
    if (Players[player]) {
        const coords = GetEntityCoords(Players[player])
        return new Vector3.Three(coords) 
    } else {
        return -1 
    }
})

RSC.register("isPlayerOnline", (player: number): boolean => {
    return Players[player] !== undefined
})