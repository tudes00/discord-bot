const Discord = require('discord.js')
const ms = require('ms')

module.exports = {

  name: "mute",
  description: "Mute un membre",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  options: [
    {
      type: "user",
      name: "membre",
      description: "Le membre a mute",
      required: true
    }, {

      type: "String",
      name: "temps",
      description: "Le temps du mute",
      required: true
    }, {

      type: "String",
      name: "raison",
      description: "La raison du mute",
      required: false
    }
  ],

  async run(bot, message, args) {
    let user = args.getUser("membre");
    if (!user) return message.reply("Pas de membre !")
    let member = message.guild.members.cache.get(user.id)
    if (!member) return message.reply("Pas de membre !")

    let time = args.getString("temps")
    if (!time) return message.reply("Pas de temps !")
    if(isNaN(ms(time))) return message.reply("Pas le bon format !")
    if(ms(time) > 2419200000) return message.reply("Le mute ne mute ne peut durer plus de 28 jours !")

    let reason = args.getString("raison")
    if(!reason) reason  = "Pas de raison fournie."

    if(message.user.id === user.id) return message.reply("Essaie pas de te mute !")
    if((await message.guild.fetchOwner()).id === user.id) return message.reply("Essaie pas de mute le goat !")
    if(!member.moderatable) return message.reply("Je ne peux pas mute ce membre !")
    if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas mute ce membre !")

    if(member.isCommunicationDisabled()) return message.reply("Ce membre est déjà mute !")

    try {await user.send(`Tu as été mute du serveur ${message.guild.name} par ${message.user.tag} pendant ${time} pour la raison: \`${reason}\``)} catch(err) {}

    await message.reply(`${message.user} a mute  ${user.tag} pendant ${time} pour la raison: \`${reason}\``)

    await member.timeout(ms(time), reason)
  }
}