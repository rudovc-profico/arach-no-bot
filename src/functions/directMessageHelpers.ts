import { bot } from '@bot';
import { Interaction } from 'discord.js';

export const startDirectMessageSignup = (
  member: Interaction['member']
): void => {
  if (!member?.user) {
    console.error("Error - GuildMember isn't defined.");

    return;
  }

  const user = bot.users.cache.get(member.user.id);

  if (!user) {
    console.error("Error - Can't get User via ID.");

    return;
  }

  user.send(
    "I'll need your Bungie name to check your mod collection. Please reply with your name."
  );
};
