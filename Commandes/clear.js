const Discord = require('discord.js')
const ms = require('ms')

module.exports = {

    name: "clear",
    description: "Efface un certain nombre de messages",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    options: [
    {
        type: "number",
        name: "nombre",
        description: "Le nombre de messages à supprimer",
        required:true
    }, {
        type: "channel",
        name: "salon",
        description: "Le salon où effacer les messages",
        required: false
    }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if(!channel) channel = message.channel
        if(channel.id !== message.channel.id && !message.guild.channel.cache.get(channel.id)) return message.reply("Pas de salon !")
    
        let number = args.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 100 ) return message.reply("IL faut un nombre entre `0` est `10` inclus !")

        await message.deferReply({ephemeral: true})
        
        try {

            let messages = await channel.bulkDelete(parseInt(number))

            await message.followUp({content: `\`${messages.size}\` message(s) supprimé dans le salon ${channel} !`, ephemeral: true})

        } catch(err) {

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if(messages.length <= 0) return message.reply("Aucun message à supprimé car ils datent tous plus de 14 jours !")
            await channel.bulkDelete(messages)


            await message.followUp({content: `\`${messages.length}\` message(s) supprimé  dans le salon ${channel} car les autres dataient de plus de 14 jours !`, ephemeral: true})
        }
    }
}