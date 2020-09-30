const sendError = require("../util/error");

module.exports = {
  info: {
    name: "Loop",
    description: "Loops current song",
    usage: "",
    aliases: ["s"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    const serverQueue = message.client.queue.get(message.guild.id);
  },
};
