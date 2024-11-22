// is typically a script used to register or deploy application commands (e.g., slash commands) to Discord. It allows you to programmatically inform Discord of the commands your bot can handle.

// Starting with Discord.js v13 and beyond, slash commands must be registered with Discord's API, either globally (available in all servers) or for specific guilds (servers). This script automates that registration process.

require("dotenv").config();
const { REST, Routes } = require("discord.js");
const {
    CLIENT_ID: clientId,
    GUILD_ID: guildId,
    DISCORD_TOKEN: token,
} = process.env;
const fs = require("node:fs");
 
const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
 
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}
 
// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(token);
 
// and deploy your commands!
(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`
        );
 
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        );
 
        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
