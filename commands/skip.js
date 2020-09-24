const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "stop",
    description: "Stops All Music",
    usage: "",
    aliases: [],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("Join A God Dam Music Channel Then Try Again.", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("When Life Give You Lemons, You Make Guacomole. Your Not Listening To Music", message.channel);
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Stop the music");
  },
};
