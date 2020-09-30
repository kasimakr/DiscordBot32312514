const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "Resume",
    description: "Resumes any paused music",
    usage: "",
    aliases: [],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("YELLOW")
      .setAuthor("Music has been Resumed!", "https://raw.githubusercontent.com/kasimakr/DiscordBot32312514/master/assets/Akrr.png")
      return message.channel.send(xd);
    }
    return sendError("There is nothing playing in this server.", message.channel, message.channel, message.react('759498707774734407'));
  },
};
