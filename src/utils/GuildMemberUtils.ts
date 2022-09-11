import { GuildMember } from 'discord.js';

export default class GuildMemberUtils {
  public static timeOut = async (
    member: GuildMember,
    now = Date.now()
  ): Promise<void> => {
    try {
      await member.timeout(69 * 1000, `${member.displayName} posted r/dtg`);
      console.log(
        '\x1b[32m%s\x1b[0m',
        `[${Intl.DateTimeFormat().format(now)}] - Succesfully timed out ${
          member.displayName
        } for posting r/dtg`
      );
    } catch (error) {
      console.log(
        '\x1b[31m%s\x1b[0m',
        `Error trying to time out ${
          member.displayName
        } at ${Intl.DateTimeFormat().format(now)}. Error log:`
      );
      console.log(error);
    }
  };
}
