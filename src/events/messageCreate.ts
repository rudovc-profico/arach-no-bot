import {
  Collection,
  GuildMember,
  Message,
  MessageAttachment,
  MessageEmbed,
  NewsChannel,
  Snowflake,
  TextChannel,
  ThreadChannel,
  User,
} from "discord.js";

import { GuildMemberUtils, MessageUtils } from "../utils";

export const messageCreateEvent = {
  name: "messageCreate",
  async handler(message: Message) {
    const {
      channel,
      content,
      author: { tag },
      author,
      member,
      embeds,
      attachments,
    } = message as {
      channel: TextChannel | NewsChannel | ThreadChannel;
      author: User;
      content: string;
      member: GuildMember;
      embeds: MessageEmbed[];
      attachments: Collection<Snowflake, MessageAttachment>;
    };

    const now = Date.now();

    console.log(
      `[${Intl.DateTimeFormat().format(now)}] ${
        channel.name
      } - ${tag}: ${content}`
    );

    if (
      channel.id !== "750395575257792604" &&
      channel.id !== "934114177952383006"
    ) {
      return;
    }

    if (await MessageUtils.testMessage(content, embeds, attachments)) {
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
