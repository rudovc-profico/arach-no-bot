import {
  GuildMember,
  Message,
  NewsChannel,
  TextChannel,
  ThreadChannel,
  User,
} from "discord.js";
import { GuildMemberUtils } from "../utils";

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
      member,
    } = message as {
      channel: TextChannel | NewsChannel | ThreadChannel;
      author: User;
      content: string;
      member: GuildMember;
    };

    const now = Date.now();

    console.log(
      `[${Intl.DateTimeFormat().format(now)}] ${
        channel.name
      } - ${tag}: ${content}`
    );

    if (keyword.test(content)) {
      channel.send(`${author}, stop posting r/dtg >:(`);
      if (member) {
        GuildMemberUtils.timeOut(member);
      } else {
        console.log(
          "\x1b[31m%s\x1b[0m",
          `[${Intl.DateTimeFormat().format(now)}] - Could not time out ${tag}`
        );
        console.error("Error - The user is no longer a member of the guild.");
      }
    }
  },
};
