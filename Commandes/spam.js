const Discord = require("discord.js")

module.exports = {

  name: "spam",
  description: "Envoyez le message que vous souhaitez un certain nombre de fois !",
  permission: Discord.PermissionFlagsBits.Administrator,
  dm: false,
  options: [
    {
      type: "String",
      name: "message",
      description: "Le message que je dois spammer !",
      required: true
    }, {
      type: "Number",
      name: "nombre",
      description: "Le nombre de message que je dois spammer !",
      required: true,
    }
  ],

  async run(bot, message, args) {
    const channel = bot.channels.cache.find(channel => channel.id === message.channel.id)
    let i = 0
    let number = args._hoistedOptions[1].value
    if (number > 10) number = 10;
    while (i < number) {
      channel.send(args._hoistedOptions[0].value);
      i++;
    }
  }
}
