const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removetimeout')
        .setDescription('Remove timeout from a user.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user you want to remove the timeout from')
                .setRequired(true)),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(targetUser.id);

        // Check if the user has the right permissions
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({ content: 'You do not have permission to manage timeouts.', ephemeral: true });
        }

        // Check if the member exists
        if (!member) {
            return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
        }

        // Check if the member is currently timed out
        if (!member.communicationDisabledUntilTimestamp) {
            return interaction.reply({ content: `${targetUser.tag} is not currently timed out.`, ephemeral: true });
        }

        try {
            // Remove the timeout
            await member.timeout(null);

            // Create an embed message
            const embed = new EmbedBuilder()
                .setTitle('Timeout Removed')
                .setDescription(`${targetUser.tag}'s timeout has been removed.`)
                .setColor(0x00ff00) // Green color to indicate success
                .addFields(
                    { name: 'User', value: `${targetUser.tag}`, inline: true },
                    { name: 'Action', value: 'Timeout removed', inline: true }
                )
                .setFooter({ text: `Timeout removed by ${interaction.user.tag}` })
                .setTimestamp();

            // Send the embed message
            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Failed to remove the timeout from the user.', ephemeral: true });
        }
    }
};
