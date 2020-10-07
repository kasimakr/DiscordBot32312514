const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "Resume",
    description: "Resumes paused music",
    usage: "",
    aliases: [],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let Embed = new MessageEmbed()
      .setDescription("Music Resumed")
      .setColor("GREEN")
      .setAuthor("Music Resumed", "https://raw.githubusercontent.com/kasimakr/DiscordBot32312514/master/assets/Akrr.png")
      .setFooter("Start a support ticket if you have any issues!")
      return message.channel.send(Embed);
    }
    return sendError("Nothing is playing in this server.", message.channel, message.channel, message.react('759498707774734407'));
  },
};
