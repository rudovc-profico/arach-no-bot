import "dotenv/config";

import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const slashCommands = [
  new SlashCommandBuilder()
    .setName("signup")
    .setDescription("Signup for the mod reminder"),
].map((command) => command.toJSON());

export const rest = process.env.TOKEN
  ? new REST().setToken(process.env.TOKEN)
  : undefined;

export const registerApplicationCommands = async () => {
  if (!rest || !process.env.CLIENT_ID) {
    console.error("Error - Missing Application ID.");
    process.exit(1);
  }
  try {
    const response = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      {
        body: slashCommands,
      }
    );
    console.log(response);
    console.log("Successfully registered application commands.");
  } catch (e) {
    console.error(e);
  }
};
