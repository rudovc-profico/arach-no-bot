"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
client.once("ready", () => {
    console.log("Ready!");
});
client.login(process.env.TOKEN);
//# sourceMappingURL=index.js.map