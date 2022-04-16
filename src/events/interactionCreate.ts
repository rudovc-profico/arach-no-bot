import { Interaction } from "discord.js";
import { startDirectMessageSignup } from "@functions";

export const interactionCreateEvent = {
  name: "interactionCreate",
  handler: (interaction: Interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    const { commandName } = interaction;

    if (commandName == "signup") {
      interaction.reply("I'll DM you to continue the signup process!");
      startDirectMessageSignup(interaction.member);
    }
  },
};
