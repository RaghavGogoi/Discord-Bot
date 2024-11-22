const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user for a specified duration.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user you want to timeout')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Duration of the timeout in minutes')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the timeout')),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(targetUser.id);
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        // Check if the user has the right permissions
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({ content: 'You do not have permission to timeout members.', ephemeral: true });
        }

        // Check if the member exists
        if (!member) {
            return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
        }

        // Convert minutes to milliseconds
        const timeoutDuration = duration * 60 * 1000;

        // Check if the duration is within Discord's limit (up to 28 days)
        if (timeoutDuration > 2419200000 || timeoutDuration < 60000) {
            return interaction.reply({ content: 'Duration must be between 1 minute and 28 days.', ephemeral: true });
        }

        try {
            // Timeout the member
            await member.timeout(timeoutDuration, reason);

            // Create an embed message
            const embed = new EmbedBuilder()
                .setTitle('User Timed Out')
                .setDescription(`${targetUser.tag} has been timed out.`)
                .setColor(0xff0000) // Red color for timeout
                .addFields(
                    { name: 'User', value: `${targetUser.tag}`, inline: true },
                    { name: 'Duration', value: `${duration} minutes`, inline: true },
                    { name: 'Reason', value: reason, inline: false }
                )
                .setFooter({ text: `Timed out by ${interaction.user.tag}` })
                .setTimestamp();

            // Send the embed message
            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Failed to timeout the user.', ephemeral: true });
        }
    }
};
