import Events from "../../lib/events";
import Database from "./cl_db";
import MathsAdditional from "../../lib/math"
import CONFIG from "../shared/sh_main";

class Character implements CharacterType {
    phone: number;
    fullname: string;
    first_name: string; 
    last_name: string;
    dob: string; 
    cid: number;
    steamid: string; 
    job: string; 
    admin: boolean; 
    dev: boolean; 
    hunger: number;
    thirst: number;
    health: number;
    armor: number;
    money: number;
    bank: number;

    constructor() {
        this.cid = -1; // -1 means no character
    }

    public async fetchCharacter(cid: number): Promise<void> {
        const charData = await Database.query<CharacterType[]>(`SELECT * FROM characters WHERE cid = ${cid}`)[0];
        this.setCharacter(charData)
    }

    public AddPlayerMoney(amount: number): void {
        this.money += amount;
    }

    public RemovePlayerMoney(amount: number): void {
        this.money -= amount;
    }

    public AddPlayerBank(amount: number): void {
        this.bank += amount;
    }

    public RemovePlayerBank(amount: number): void {
        this.bank -= amount;
    }

    private setCharacter(charData: CharacterType): void {
        this.phone = charData.phone;
        this.fullname = charData.fullname;
        this.first_name = charData.first_name;
        this.last_name = charData.last_name;
        this.dob = charData.dob;
        this.cid = charData.cid;
        this.steamid = charData.steamid;
        this.job = charData.job;
        this.admin = charData.admin;
        this.dev = charData.dev;
        this.hunger = charData.hunger;
        this.thirst = charData.thirst;
        this.health = charData.health;
        this.armor = charData.armor;
        this.money = charData.money;
        this.bank = charData.bank;
    }


    public async updateCharacter(): Promise<void> {
        const query = `UPDATE characters SET hunger = ${this.hunger}, thirst = ${this.thirst}, health = ${this.health}, armor = ${this.armor}, money = ${this.money}, bank = ${this.bank} WHERE cid = ${this.cid}`;
        await Database.query(query);
    }


    public async createCharacter(first_name: string, last_name: string, dob: string): Promise<void> {
        const steamid: string = GetPlayerIdentifier(source.toString(), 0)
        const phone = MathsAdditional.generatePhoneNumber(); 
        const job = "unemployed";
        const admin = false;
        const dev = false;
        const hunger = 100;
        const thirst = 100;
        const health = 100;
        const armor = 0;
        const money = CONFIG.startingCash;
        const bank = CONFIG.startingBank;
        const fullname = `${first_name} ${last_name}`;
        const query = `INSERT INTO characters (phone, fullname, first_name, last_name, dob, steamid, job, admin, dev) VALUES ('${phone}', '${fullname}', '${first_name}', '${last_name}', '${dob}', '${steamid}', '${job}', '${admin}', '${dev}')`;
        await Database.query(query);
        const cid = await Database.query<number[][]>(`SELECT cid FROM characters WHERE steamid = '${steamid}' AND fullname = '${fullname}' AND phone = ${phone}`)[0][0];
        const Character_created: CharacterType = {
            phone,
            fullname,
            first_name,
            last_name,
            dob,
            cid,
            steamid,
            job,
            admin,
            dev,
            hunger,
            thirst,
            health,
            armor,
            money,
            bank
        }
        this.setCharacter(Character_created);
    }

    public setPlayerPower(power: 1 | 2): void {
        this.admin = power === 1;
        this.dev = power === 2;
        const reason = "You have been promoted to " + (power === 1 ? "admin" : "developer") + ". Please relogin to apply the changes.";
        Events.emitNet("base:sv:player:request:self:drop", reason)
    }

}


const CURRENT_CHARACTER = new Character(); 


Events.on("base:player:character:picked", (cid: number) => {
    CURRENT_CHARACTER.fetchCharacter(cid)
})

Events.on("base:player:character:picked", (first_name: string, last_name: string, dob: string) => {
    CURRENT_CHARACTER.createCharacter(first_name, last_name, dob); 
})

const IsCharacterInitialized = () => {
    return CURRENT_CHARACTER.cid !== -1
}

const AddCharacterMoney = (amount: number, type: "cash" | "bank"): void => {
    if (!IsCharacterInitialized()) return; 
    if (type === "cash") {
        CURRENT_CHARACTER.AddPlayerMoney(amount);
    } else if (type === "bank") {
        CURRENT_CHARACTER.AddPlayerBank(amount);
    }
}

const RemoveCharacterMoney = (amount: number, type: "cash" | "bank"): void => {
    if (!IsCharacterInitialized()) return; 
    if (type === "cash") {
        CURRENT_CHARACTER.RemovePlayerMoney(amount);
    } else if (type === "bank") {
        CURRENT_CHARACTER.RemovePlayerBank(amount);
    }
}

const GetCurrentCharacter = () => {
    if (CURRENT_CHARACTER.cid === -1) {
        return null;
    } else {
        return CURRENT_CHARACTER
    }
}

const GetCharacterName = (): { first_name: string, last_name: string, full_name: string } | null => {
    if (!IsCharacterInitialized()) return null; 
    return { first_name: CURRENT_CHARACTER.first_name, last_name: CURRENT_CHARACTER.last_name, full_name: CURRENT_CHARACTER.fullname };
}

const IsCharacterEmergency = (): boolean => {
    if (!IsCharacterInitialized()) return null; 
    return CURRENT_CHARACTER.job === "police" || CURRENT_CHARACTER.job === "ems" || CURRENT_CHARACTER.job === "fire";
}

const Player = {
    IsCharacterInitialized,
    GetCurrentCharacter,
    GetCharacterName,
    IsCharacterEmergency,
    AddCharacterMoney,
    RemoveCharacterMoney
}

export default Player;


Events.on("onResourceStop", (resource: string) => {
    if (resource !== GetCurrentResourceName() || !IsCharacterInitialized()) return 
    CURRENT_CHARACTER.updateCharacter();
})