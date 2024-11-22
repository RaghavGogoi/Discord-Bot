// It  is an event handler in Discord.js that triggers when the bot successfully logs in and becomes ready, often used for initialization tasks like logging a startup message.

const { Events, Discord } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(
      `I'm ready, Master 🥰. I have logged in as ${client.user.tag}. ❤️`
    );
  },
};
