const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "Pause",
    description: "Pauses any playing music",
    usage: "",
    aliases: ["PauseMusic"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      let xd = new MessageEmbed()
      .setDescription("Paused Music")
      .setColor("YELLOW")
      .setAuthor("Music has been paused!", "https://raw.githubusercontent.com/kasimakr/DiscordBot32312514/master/assets/Akrr.png")
      return message.channel.send(xd);
    }
    return sendError("There is nothing playing in this server.", message.channel, message.react('759498707774734407'));
  },
};
