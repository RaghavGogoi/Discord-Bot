const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a member from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to kick.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for kicking the user.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const memberr = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        // Check if the command user has the necessary permission
        if (
            !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers) ||
            interaction.member.roles.highest.position < memberr.roles.highest.position
        ) {
            return interaction.reply({
                content: 'You do not have permission to kick this member.',
                ephemeral: true,
            });
        }

        // Check if the bot has the necessary permission
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({
                content: 'I do not have permission to kick members.',
                ephemeral: true,
            });
        }

        // Attempt to kick the member
        try {
            await memberr.kick(reason);
            return interaction.reply({
                content: `Successfully kicked ${memberr.user.tag}. Reason: ${reason}`,
                ephemeral: false,
            });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'An error occurred while trying to kick this member.',
                ephemeral: true,
            });
        }
    },
};
