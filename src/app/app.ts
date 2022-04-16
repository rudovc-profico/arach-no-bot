import "dotenv/config";

import * as Events from "@events";

import { bot } from "@bot";
import { registerApplicationCommands } from "@commands";

bot.on(Events.readyEvent.name, Events.readyEvent.handler);
bot.on(Events.messageCreateEvent.name, Events.messageCreateEvent.handler);
bot.on(
  Events.interactionCreateEvent.name,
  Events.interactionCreateEvent.handler
);

if (!process.env.TOKEN) {
  console.error("Error - Missing API Token.");
  process.exit(1);
}

bot.login(process.env.TOKEN);

registerApplicationCommands();
