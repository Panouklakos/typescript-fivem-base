interface Calls {
    [id: number]: {
        res: (args: any) => void; 
        rej: (args: any) => void;
    }
}

interface CharacterType {
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
    
}

type Players = number[]

interface CallCallbacks {
    [key: string]: (...args: any) => void;
}