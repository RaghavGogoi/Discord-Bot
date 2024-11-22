const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a member from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to ban.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for banning the user.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const memberr = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        // Check permissions
        if (
            !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers) ||
            interaction.member.roles.highest.position < memberr.roles.highest.position
        ) {
            return interaction.reply({
                content: 'You do not have permission to ban this member.',
                ephemeral: true,
            });
        }

        // Check if the bot has sufficient permissions
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({
                content: 'I do not have permission to ban members.',
                ephemeral: true,
            });
        }

        // Attempt to ban the member
        try {
            await memberr.ban({ reason });
            return interaction.reply({
                content: `Successfully banned ${memberr.user.tag}. Reason: ${reason}`,
                ephemeral: false,
            });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'An error occurred while trying to ban this member.',
                ephemeral: true,
            });
        }
    },
};
