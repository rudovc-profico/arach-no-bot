import { createClient } from "redis";

const database = createClient();

database.on("error", (error) => console.error("Redis Client Error", error));
database.connect();

export default database;
