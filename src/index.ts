import "dotenv/config";

import bot from "./bot";
import * as Events from "./events";

bot.on(Events.readyEvent.name, Events.readyEvent.handler);
bot.on(Events.messageCreateEvent.name, Events.messageCreateEvent.handler);

bot.login(process.env.TOKEN);
