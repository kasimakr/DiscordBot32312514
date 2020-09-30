const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "Volume",
    description: "Changes the volume",
    usage: "",
    aliases: ["v", "vol"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel, message.react('759498707774734407'));
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("There is nothing playing in this server.", message.channel, message.react('759498707774734407'));
    if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] /1);
    let xd = new MessageEmbed()
    .setDescription(`I set the volume to: ${args[0]/1}`)
    .setAuthor("Server Volume Manager", "https://raw.githubusercontent.com/kasimakr/DiscordBot32312514/master/assets/Akrr.png")
    .setColor("BLUE")
    .setFooter("Start a support ticket if you have any issues!")
    return message.channel.send(xd);
  },
};
