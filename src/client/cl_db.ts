import RSC from "./cl_asyncCalls";

const query = async <T = any>(query: string): Promise<T> => {
    try {
        const data = await RSC.execute("base:sv:async:query", query);
        return data
    } catch (err) {
        throw err;
    }
}

const Database = {
    query
}

export default Database;