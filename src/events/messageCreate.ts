import {
  GuildMember,
  Message,
  MessageEmbed,
  NewsChannel,
  TextChannel,
  ThreadChannel,
  User,
} from "discord.js";
import { GuildMemberUtils, readImage } from "../utils";

const keyword =
  /.*(?:https)?:(?:\/\/)??(?:([d,D]estiny[t,T]he[g,G]ame\.)|(?:np\.)|(?:www\.)|(?:old\.))?((?:redd\.it)|(?:re(?:ve)?ddit\.com))((?:\/r\/)|(?:\/v\/)?[d,D]estiny[t,T]he[g,G]ame)?.*/;

export const messageCreateEvent = {
  name: "messageCreate",
  handler(message: Message) {
    const {
      channel,
      content,
      author: { tag },
      author,
      member,
      embeds,
    } = message as {
      channel: TextChannel | NewsChannel | ThreadChannel;
      author: User;
      content: string;
      member: GuildMember;
      embeds: MessageEmbed[];
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

    if (embeds) {
      const images = embeds
        .filter((embed) => embed.image)
        .map((embed) => embed.image);

      images.find((image) => {
        if (image) {
          return readImage(image?.url);
        }

        return false;
      });
    }
  },
};
