import "./sv_asyncCalls"
import "./sv_infinity"
import "./sv_db"
import Events from "../../lib/events"

Events.onNet("base:sv:player:request:self:drop", (reason: string) => {
    DropPlayer(GetPlayerServerId(source).toString(), reason)
})