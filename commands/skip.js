const sendError = require("../util/error");

module.exports = {
  info: {
    name: "Skip",
    description: "Skips current song to next in queue",
    usage: "",
    aliases: ["s"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel, message.react('759498707774734407'));
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("There is nothing playing that I could skip for you.", message.channel, message.react('759498707774734407'));
    serverQueue.connection.dispatcher.end("Skiped the music");
  },
};
