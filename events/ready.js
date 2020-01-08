const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const prefix = botconfig.prefix
const {ErelaClient, Utils} = require("erela.js")
const {nodes} = require("../botconfig.json")

module.exports = bot => {
  
  
  bot.music = new ErelaClient(bot, nodes)
  .on("nodeError", console.log)
  .on("nodeConnect", () => console.log("Successfully created a new node."))
  .on("queueEnd", player => {
    player.textChannel.send("Queue has ended.")
    return bot.music.players.destroy(player.guild.id)
  })
  .on("reackStart", ({textChannel}, {title, duration}) => textChannel.send(`Now Playing: **${title}**\`${Utils.formatTime(duration, true)}\``).then(m => m.delete(150000)))
  bot.levels = new Map()
    .set("none", 0.0)
    .set("low", 0.10)
    .set("medium", 0.15)
    .set("high", 0.25);
  
    console.log(`${bot.user.username} is online`)

    let statuses = [
        `Music`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "Playing", url: "https://twitch.tv/ElectronExcited"});
    }, 30000)
}
