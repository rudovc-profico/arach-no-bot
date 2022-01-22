import {
  Message,
  MessageEmbed,
  NewsChannel,
  TextChannel,
  ThreadChannel,
  User,
} from "discord.js";

const keyword =
  /.*https?:\/\/(?:(?:np)|(?:www)|(?:old))?\.(?:(?:redd\.it)|(?:reddit\.com))?\/r\/[d,D]estiny[t,T]he[g,G]ame.*/;

export const messageCreateEvent = {
  name: "messageCreate",
  handler(message: Message) {
    const {
      channel,
      content,
      author: { tag },
      author,
      // embeds,
    } = message as {
      channel: TextChannel | NewsChannel | ThreadChannel;
      content: string;
      author: User;
      embeds: Array<MessageEmbed>;
    };

    console.log(`${channel} - ${tag}: ${content}`);

    if (keyword.test(content)) {
      channel.send(`${author}, stop posting r/dtg >:(`);
    }
  },
};
