const Discord = require('discord.js')
const ms = require('ms')

module.exports = {

  name: "unban",
  description: "Unban un membre",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  options: [
    {
      type: "user",
      name: "membre",
      description: "Le membre a unban",
      required: true
    }, {

      type: "String",
      name: "raison",
      description: "La raison du unban",
      required: false
    }
  ],

    async run(bot, message, args) {

        try {
                
            let user = args.getUser("membre");
            if (!user) return message.reply("Pas de membre !")


            let reason = args.getString("raison")
            if(!reason) reason  = "Pas de raison fournie."

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Cet utilisateur n'est pas banni !")
            
            try {await user.send(`Tu as été unban du serveur ${message.guild.name} par ${message.user.tag} pour la raison: \`${reason}\``)} catch(err) {}

            await message.guild.members.unban(user, reason)

            await message.reply(`${message.user} a unban ${user.tag} pour la raison: \`${reason}\``)

        } catch(err) {

            return message.reply("Pas'utilisateur !")
        }
    }
}