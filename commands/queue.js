const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "Queue",
    description: "Shows surrent and upcoming songs",
    usage: "",
    aliases: ["q", "list", "songlist", "song-list"],
  },

  
  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("There is nothing playing in this server.", message.channel, message.react('759498707774734407'));
    
    message.react('759498631069171742')
    let embed = new MessageEmbed()
    .setAuthor("Queue", "https://raw.githubusercontent.com/kasimakr/DiscordBot32312514/master/assets/Akrr.png")
    .setColor("BLUE")
    .addField("Current Song", serverQueue.songs[0].title, true)
    .setThumbnail(serverQueue.songs[0].img, true)
    .addField("Upcoming Songs")
    .setDescription(serverQueue.songs.map((song) => {
      if(song === serverQueue.songs[0])return
      return `${song.title}`
    }).join("\n"))
    .setFooter("Version: 1.0.25")
    message.channel.send(embed)
  },
};
