import "dotenv/config";

import * as Events from "../events";

import { bot } from "../bot";

bot.on(Events.readyEvent.name, Events.readyEvent.handler);
bot.on(Events.messageCreateEvent.name, Events.messageCreateEvent.handler);

bot.login(process.env.TOKEN);
