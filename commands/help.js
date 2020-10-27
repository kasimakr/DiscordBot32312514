const { MessageEmbed } = require('discord.js')
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "Help",
        description: "Shows all commands bot can do",
        usage: "",
        aliases: ["commands", "help me", "hell", "cmds", "h"]
    },

    run: async function(client, message, args){
        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="``"+client.config.prefix+cmdinfo.name+""+cmdinfo.usage+"`` → "+cmdinfo.description+"\n"
})

        message.react('759498631069171742')
        let embed = new MessageEmbed()
        .setAuthor("Commands", "https://raw.githubusercontent.com/kasimakr/DiscordBot32312514/master/assets/Akrr.png")
        .setColor("BLUE")
        .setDescription(`**Music**
${allcmds}
**Moderation**
${"`Kick`"} → (Not Done)
${"`Warn`"} → Warns a user.

**Etcetera**
${"`Purge`"} → Purges messages in a specfic channel.
${"`Ping`"} → Checks latency between replies.

`)
        .setFooter("Version: 1.0.75")

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return sendError("Couldn't Find Command", message.channel, message.react('759498707774734407'), message.react)
            let commandinfo = new MessageEmbed()
            .setTitle("Command: "+command.info.name+"info")
            .setColor("BLUE")
            .setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
Aliases: ${command.info.aliases.join(", ")}
`)
            message.channel.send(commandinfo)
        }
    }
}
