// commands/dashboard.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dashboard")
        .setDescription("Displays a list of all available commands."),

    async execute(interaction,client) {
        try {
            // Defer the reply while loading command information
            await interaction.deferReply();

            // Create an embed for the list of commands
            const embed = new EmbedBuilder()
                .setColor(0x00AE86)
                .setTitle("Available Commands")
                .setDescription("Here is a list of all commands you can use:")
                .setTimestamp();

            // Loop through all commands and add them to the embed
            client.commands.forEach(command => {
                if (command.data && command.data.name && command.data.description) {
                    embed.addFields({ 
                        name: `/${command.data.name}`, 
                        value: command.data.description, 
                        inline: false 
                    });
                }
            });

            // Edit the initial deferred reply with the embed (visible to everyone)
            await interaction.editReply({ embeds: [embed] });
            

        } catch (error) {
            console.error("Error executing dashboard command:", error);

            // If there's an error, notify the user
            if (interaction.deferred || interaction.replied) {
                await interaction.followUp({ content: "There was an error displaying the dashboard." });
            } else {
                await interaction.reply({ content: "There was an error displaying the dashboard." });
            }
        }
    },
};
