const { MessageEmbed } = require("discord.js")

/**
 * Easy to send errors because im lazy to do the same things :p
 * @param {String} text - Message which is need to send
 * @param {TextChannel} channel - A Channel to send error
 */
module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setColor("RED")
    .setAuthor("Oh Snap", "https://raw.githubusercontent.com/kasimakr/DiscordBot32312514/master/assets/KasimAkrSad.png")
    .setDescription(text)
    .setFooter("Start a support ticket if you have any issues!")
    await channel.send(embed)
}
