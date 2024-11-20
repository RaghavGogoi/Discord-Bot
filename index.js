require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");
const mongoURL = process.env.MONGODB_SRV;
const loadshlashcommand = require("./deploy-commands.js");

const { DISCORD_TOKEN: token, MONGODB_SRV: database } = process.env;

// Requires necessary discord.js classes
const { Client, GatewayIntentBits, Collection } = require("discord.js");

// Create a new Discord client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

// Loads the event files on startup
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const pathFile = path.join(eventsPath, file);
  const event = require(pathFile);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Load the commands file on startup
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[⚠️ WARNING ⚠️]: The command at ${filePath} is missing a required "data" or "execute" properly.`
    );
  }
}


client.once('ready', () => {
    console.log
    (`Logged in as ${client.user.tag}`);
    
    // Set the custom status
    client.user.setPresence({
        activities: [
            {
                name: 'my bestie Amelia! >:3', // Change this to your desired status
                type: 2 // You can change this to different activity types (0: Playing, 1: Streaming, 2: Listening, 3: Watching)
            }
        ],
        status: 'online' // Change this to 'idle', 'dnd', or 'invisible' if desired
    });
});

client.login(token);
