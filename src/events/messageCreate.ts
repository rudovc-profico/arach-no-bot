import { Message, NewsChannel, TextChannel, ThreadChannel } from "discord.js";

const keyword =
  /.*https?:\/\/(?:www\.)?(?:reddit\.com\/)?r\/[d,D]estiny[t,T]he[g,G]ame.*/;

export const messageCreateEvent = {
  name: "messageCreate",
  handler(message: Message) {
    const channelName = (
      message.channel as TextChannel | NewsChannel | ThreadChannel
    ).name;

    console.log(`${channelName} - ${message.author.tag}: ${message}`);
    if (keyword.test(message.toString())) {
      console.log("=== TIMEOUT ALERT ===");
    }
  },
};
