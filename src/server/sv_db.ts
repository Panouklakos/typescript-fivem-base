import RSC from "./sv_asyncCalls";
import * as mysql from "mysql"; 

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ts-base"
})

conn.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Connected to database!");
});


RSC.register("base:sv:async:query", (query: string) => {
    return new Promise((resolve, reject) => {
        conn.query(query, (err, res) => {
            setImmediate(() => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    })
})

console.log("Connecting to database ...")