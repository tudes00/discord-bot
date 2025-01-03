const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "kick un membre",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false, 
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à kick",
            required: true
        }, {
            type: "String",
            name: "raison",
            description: "La raison du Kick",
            required: false
        }
    ],

    async run(bot, message, args) {
        let user = args.getUser("membre");
        if(!user) return message.reply("Pas de membre à Kick !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre à Kick !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie.";

        if(message.user.id === user.id) return message.reply("Essaie pas de te kick !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Essaie pas de kick le goat !")
        if(member && !member.kickable) return message.reply("Je ne peux pas kick ce membre !")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas kick ce membre !")

        try {await user.send(`Tu as été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison: \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} a kick ${user.tag} pour la raison: \`${reason}\``)

        await member.kick(reason)
    }
}