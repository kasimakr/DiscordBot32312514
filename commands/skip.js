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
    if (!channel)return sendError("Please join a voice chat and try again.", message.channel, message.react('759498707774734407'));
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("No song to skip.:( ", message.channel, message.react('759498707774734407'));
    serverQueue.connection.dispatcher.end("Music Skipped.");
  },
};
