import {
  Collection,
  MessageAttachment,
  MessageEmbed,
  Snowflake,
} from "discord.js";

import { readImage } from "./Tesseract";

const keyword =
  /.*(?:https)?:(?:\/\/)??(?:([d,D]estiny[t,T]he[g,G]ame\.)|(?:np\.)|(?:www\.)|(?:old\.))?((?:redd\.it)|(?:re(?:ve)?ddit\.com))((?:\/r\/)|(?:\/v\/)?[d,D]estiny[t,T]he[g,G]ame)?.*/;

export default class MessageUtils {
  public static testMessage = async (
    content: string,
    embeds: MessageEmbed[],
    attachments: Collection<Snowflake, MessageAttachment>
  ): Promise<boolean> => {
    if (keyword.test(content)) {
      if (content.toLowerCase().includes("destinythegame")) {
        return true;
      }
    }

    if (embeds.length > 0 || attachments.size > 0) {
      const urls = embeds
        .map((embed) => embed.image?.url)
        .filter((image): image is string => !!image)
        .concat(
          attachments
            .filter(
              (attachment) => attachment.contentType?.includes("image") || false
            )
            .map((attachment) => attachment.url)
        );

      const results = await Promise.all(
        urls.map(async (url) => {
          return await readImage(url);
        })
      );

      return results.some((result) => result);
    }

    return false;
  };
}
