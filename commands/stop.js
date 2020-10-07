const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "Stop",
    description: "Stops all current music",
    usage: "",
    aliases: [],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("Join A God Dam Music Channel Then Try Again.", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("When Life Give You Lemons, You Make Guacomole. Your Not Listening To Music", message.channel, message.react('759498707774734407'));
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Stop the music");
      let Embed = new MessageEmbed()
      .setDescription("Music Stopped")
      .setColor("RED")
      .setAuthor("Music Stopped", "https://raw.githubusercontent.com/kasimakr/DiscordBot32312514/master/assets/KasimAkrSad.png")
      .setFooter("Start a support ticket if you have any issues!")
      return message.channel.send(Embed);

  },
};
