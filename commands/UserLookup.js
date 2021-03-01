const { CustomEmbed, setCooldown } = require('../../utils/utils');
const moment = require("moment");

const DEVICES = {
    web: "🌐",
    desktop: "💻",
    mobile: "📱"
};

const BADGES = {
    "DISCORD_EMPLOYEE": "<:B_DiscordStaff:724998896975216741>",
	"DISCORD_PARTNER": "<:B_DiscordPartner:785508307451772959>",
	"BUGHUNTER_LEVEL_1": "<:B_BugHunter:785509602112045156>",
	"HYPESQUAD_EVENTS": "<:B_HypesquadEvents:785509602359509053>",
	"HOUSE_BRAVERY": "<:B_Bravery:785509029794414624>",
	"HOUSE_BRILLIANCE": "<:B_Brilliance:785509030134677545>",
	"HOUSE_BALANCE": "<:B_Balance:785509029732417576>",
	"EARLY_SUPPORTER": "<:B_Supporter:785509602925346816>",
	"VERIFIED_BOT": "<:B_BotTag:785508306303189034>",
    "VERIFIED_DEVELOPER": "<:B_DiscordDev:724998896966959195>"
};

const STATUSES = {
    "online": "<:B_Online:724998994278875198>",
    "idle": "<:B_Idle:724999127116808342>",
    "dnd": "<:B_DND:724998896975347823>",
    "streaming": "<:B_Streaming:724998995256148009>",
    "offline": "<:B_Offline:724998994094194688>"
}

/**
 * @type {import("../../typings.d").Command}
 */
module.exports = {
    name: "userinfo",

    
    execute: async function({ client, message, args }) {
        setCooldown(client, this, message)

        const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;

        const trimArray = (arr, maxLen = 10) => {
            if (arr.length > maxLen) {
                const len = arr.length - maxLen;
                arr = arr.slice(0, maxLen);
                arr.push(` and ${len} more roles...`);
            }
            return arr;
        }

        const upperCase = str => {
            return str.toUpperCase().replace(/_/g, " ").split(" ")
                      .join(" ")
        }

        const titleCase = str => {
            return str.toLowerCase().split(" ")
                      .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
                      .join(" ")
        }

        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);

        let userFlags;
        if (member.user.flags === null) {
            userFlags = ''
        } else {
            userFlags = member.user.flags.toArray();
        }
        if(member.user.presence.status == "offline") { userDevice = "" } else if (!member.user.bot) { userDevice = DEVICES[Object.keys(member.user.presence.clientStatus)[0]] } else if (member.user.bot) { userDevice = "" }
        if(!member.user.bot) { userInfo = "No" } else if (member.user.bot) { userInfo = "Yes" }
        if(member.user.presence.status == "dnd") { status = "DND"} else status = titleCase(member.user.presence.status)

        const embed = new CustomEmbed({ client: client })
            .setAuthor(`${member.user.tag} ${userDevice}`, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(member.user.displayAvatarURL({dynamic:true, size:512}))
            .addFields(
                { name: "User Badges", value: `${userFlags.length ? userFlags.map(flag => BADGES[flag]).join("") : "None"}`, inline:false },
                { name: "Joined Discord", value: `${moment(member.user.createdTimestamp).format("DD MMM YYYY")}`, inline:true },
                { name: "Joined Server", value: `${moment(member.joinedAt).format("DD MMM YYYY")}`, inline: true },
                { name: "Nickname", value: `${member.displayName}` || "None", inline: true },
                { name: "Discriminator", value: `${member.user.discriminator}`, inline: true },
                { name: "Bot", value: `${userInfo}`, inline:true },
                { name: "Status", value: `${status}${STATUSES[member.user.presence.status]}`, inline:true },
                { name: "User Colour", value: `${upperCase(member.displayHexColor)}`, inline: true },
                { name: "User ID", value: `${member.user.id}`, inline:true },
                { name: "Highest Role", value: `${member.roles.highest.id === message.guild.id ? "None" : member.roles.highest}`, inline:true },
                { name: "Roles", value: `${roles.length < 10 ? roles.join(", ") : roles.length > 10 ? trimArray(roles).join(", ") : "None"}`, inline:false }
            )
            .setColor(`${member.displayHexColor || RANDOM}`)
        message.channel.send(embed)
    }
}
