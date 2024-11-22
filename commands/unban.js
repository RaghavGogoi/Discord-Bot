const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a member from the server.')
        .addStringOption(option => 
            option.setName('user_id')
                .setDescription('The ID of the user to unban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the unban')),

    async execute(interaction) {
        const userId = interaction.options.getString('user_id');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        // Check if the user has the right permissions
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: 'You do not have permission to unban members.', ephemeral: true });
        }

        try {
            // Unban the member
            await interaction.guild.members.unban(userId, reason);

            // Create an embed message
            const embed = new EmbedBuilder()
                .setTitle('Member Unbanned')
                .setDescription(`User with ID ${userId} has been unbanned from the server.`)
                .setColor(0x00ff00) // Green color for success
                .addFields(
                    { name: 'User ID', value: userId, inline: true },
                    { name: 'Reason', value: reason, inline: false }
                )
                .setFooter({ text: `Unbanned by ${interaction.user.tag}` })
                .setTimestamp();

            // Send the embed message
            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            if (error.code === 10026) { // Unknown Member error
                return interaction.reply({ content: 'User not found or not banned.', ephemeral: true });
            }
            interaction.reply({ content: 'Failed to unban the user.', ephemeral: true });
        }
    }
};
