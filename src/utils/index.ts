import { GuildMember } from "discord.js";

export const timeOut = async (
  { displayName, timeout }: GuildMember,
  now = Date.now()
) => {
  try {
    await timeout(69 * 1000, `${displayName} posted r/dtg`);
  } catch (error) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error trying to time out ${displayName} at ${Intl.DateTimeFormat().format(
        now
      )}. Error log:`
    );
    console.log(error);
  }
};
