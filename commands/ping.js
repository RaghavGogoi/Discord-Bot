// commands/ping.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with the bot's latency."),

    async execute(interaction) {
        // Calculate latency and initial reply
        const sent = await interaction.reply({ content: "Pinging...", fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;

        // Create an embed for the latency response
        const embed = new EmbedBuilder()
            .setColor(0x00AE86) // Set the embed color
            .setTitle("🏓 Pong!")
            .setDescription("Here’s the current latency status.")
            .addFields(
                { name: "Bot Latency", value: `${latency}ms`, inline: true },
                { name: "API Latency", value: `${Math.round(interaction.client.ws.ping)}ms`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: "Ping information" });

        // Edit the initial reply with the embed
        await interaction.editReply({ content: "", embeds: [embed] });
    },
};
