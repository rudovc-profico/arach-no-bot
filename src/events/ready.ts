import { Client } from "discord.js";

export const readyEvent = {
  name: "ready",
  once: "true",
  handler(bot: Client) {
    console.log(`Ready! Logged in as ${bot.user?.tag}`);
  },
};
