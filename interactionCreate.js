// interactionCreate.js is typically a file used in Discord bot development to handle interactions, such as slash commands, button clicks, or select menus. It's part of a modular approach where the bot's code is separated into smaller, focused files to improve readability and maintainability.
// In the context of Discord bots using the discord.js library, the interactionCreate event is emitted whenever a user interacts with the bot through any of these mechanisms. This file listens to that event and executes the appropriate logic based on the type of interaction.

const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
const client = interaction.client;
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction, client);
      console.log(`Executed command ${interaction.commandName}`);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};
