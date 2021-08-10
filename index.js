const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs')
const path = require('path');
let settings = JSON.parse(fs.readFileSync(__dirname + "/settings.json"));
let prefix = settings['prefix'];
let cooldown = settings['cooldown']
const generated = new Set();
const activities_list = [
  ".help | .gen | .stock",
  "100 Accounts in stock",
  "Join https://discord.gg/tE5CgGUcza Takeaway Gen",
  "Made possible with other 3rd party Services"
];
const TOKEN = settings['token'];
const logchannel = settings['logchannel'];
const generationchannel = settings['generationchannelid'];


bot.on("ready", () => {
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
    bot.user.setActivity(activities_list[index], { type: 'WATCHING' }); // sets bot's activities to one of the phrases in the arraylist.
  }, 15000);
  bot.user.setStatus('dnd')
  console.log(`Logged in as ${bot.user.tag}!`);
  console.log("prefix is", prefix, "\nCooldown is", cooldown)
});

bot.on("message", async message => {
  prefix = settings['prefix'];
  cooldown = settings['cooldown']
  if (message.author.bot) return;
  var command = message.content
    .toLowerCase()
    .slice(prefix.length)
    .split(" ")[0];

  if (command === "gen") {
    if (message.content.indexOf(prefix) !== 0) return;

    if (message.channel.id !== generationchannel) return message.channel.send(`This command can only be runned in <#${generationchannel}> channel`)

    if (generated.has(message.author.id)) {
      message.channel.send("You can Generate 1 Account per 30minutes! - " + message.author);
    } else {

      let messageArray = message.content.split(" ");
      let args = messageArray.slice(1);
      if (!args[0]) return message.reply("Please, specify the service you want!");
      let data;
      try {
        data = fs.readFileSync(__dirname + "/" + args[0].toLowerCase() + ".json")

      } catch{
        return message.reply(args[0].toLowerCase() + ' service do not exists')
      }
      let account = JSON.parse(data)
      if (account.length <= 0) return message.reply("There isn't any account available for that service")
      const embed = {
        title: "Account Generated!",
        description: "Check your DM's for the account's information!",
        color: 8519796,
        timestamp: (Date.now()),
        footer: {
          icon_url:
            "https://cdn.discordapp.com/avatars/530778425540083723/7a05e4dd16825d47b6cdfb02b92d26a5.png",
          text: "A bot made by Naomi#123"
        },
        thumbnail: {
          url:
            "http://www.compartosanita.it/wp-content/uploads/2019/02/right.png"
        },
        author: {
          name: "Account Generator",
          url: "https://discordapp.com",
          icon_url: bot.displayAvatarURL
        },
        fields: []
      };

      await message.channel.send({ embed });
      await generated.add(message.author.id);
      await message.author.send({
        embed: {
          "title": "Account information",
          "color": 1127848,
          "fields": [
            {
              "name": "Username/Email",
              "value": account[0].email
            },
            {
              "name": "Password",
              "value": account[0].password
            }
          ]
        }
      })
      await message.author.send("copy-paste: " + account[0].email + ":" + account[0].password)
      bot.channels.get(logchannel).send(`<@!${message.author.id}> has generated` + " " + args[0].toUpperCase() + " " + "**" + account[0].email + ":" + account[0].password + "**")
      console.log(+account[0].email + ":" + account[0].password + " was generated in the section " + args[0].toUpperCase())
      account.splice(0, 1)
      console.log(account)
      fs.writeFileSync(__dirname + "/" + args[0] + ".json", JSON.stringify(account));
      setTimeout(() => {
        generated.delete(message.author.id);
      }, cooldown);
    }
  }

  if (command === "check") {
    if (message.content.indexOf(prefix) !== 0) return;
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let data;
    if (!args[0])
      return message.reply("Please, specify the service you want!");
    try {
      data = JSON.parse(fs.readFileSync(__dirname + "/" + args[0] + ".json"))
      message.channel.send("There are " + data.length + " accounts in " + args[0])

    } catch {
      return message.reply('That service do not exists')
    }
  }

  if (command === "change") {
    if (message.content.indexOf(prefix) !== 0) return;
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do it, you are not an admin!");
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    try {
      settings[args[0].toLowerCase()] = args[1].toLowerCase()
      fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings));
      message.reply(args[0] + " changed to " + args[1])

    } catch{
      message.reply("An error occured")
    }
  }

  if (command === "stock") {
    if (message.content.indexOf(prefix) !== 0) return;
    let stock = []
    const stockacc = stock

    fs.readdir(__dirname, function(err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }

      files.forEach(function(file) {
        if (!file.includes(".json")) return
        if (file.includes('package-lock') || file.includes('package.json') || file.includes('settings.json')) return
        stock.push(file)
      });
      console.log(stock)

      stock.forEach(async function(data) {
        let acc = await fs.readFileSync(__dirname + "/" + data)
        message.channel.send(data.replace(".json", "") + " has " + JSON.parse(acc).length + " accounts\n")

      })

    });
  }

  if (command === "add") {
    if (message.content.indexOf(prefix) !== 0) return;
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do it, you are not an admin!");
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    var acc = args[1].split(":");

    fs.readFile(__dirname + "/" + args[0].toLowerCase() + ".json", function(err, data) {
      if (err) {
        let newnewData =
          [{
            "email": acc[0],
            "password": acc[1]
          }]
        try {
          fs.writeFileSync(__dirname + "/" + args[0].toLowerCase() + ".json", JSON.stringify(newnewData))
          message.reply("Service Created and account added!")
        } catch {
          message.channel.send('**Error** Cannot create service and add that account!')

        }
      }

      else {
        let newData = { "email": acc[0], "password": acc[1] }
        data = JSON.parse(data)
        try {
          data.push(newData)
          fs.writeFileSync(__dirname + "/" + args[0].toLowerCase() + ".json", JSON.stringify(data))
          message.reply("Account added!")
          console.log(+acc[0] + " " + acc[1] + " Was added to " + args[0])
        } catch {
          message.channel.send('**Error** Cannot add that account!')
        }
      }
    });
  }
  if (command === "delete") {
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    if (message.content.indexOf(prefix) !== 0) return;
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do it, you are not an admin!");
    if (!args[0])
      return message.reply("Please, specify the service you want to Remove");
    if (args[0].includes('settings') || args[0].includes('package-lock') || args[0].includes('package')) return message.reply("Sorry you can not delete that file!")
    try {
      await fs.unlinkSync(path.join(__dirname + "/" + args[0].toLowerCase() + ".json"));
      message.reply('Succesfully Deleted that Service! 🎉');
    } catch (error) {
      console.log(error);
      message.channel.send('⚠️ Oops, there was an error. File is not deleted.');
    }
  }

  if (command === "help") {
    if (message.content.indexOf(prefix) !== 0) return;
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.send({
        embed: {
          "title": "Available Commands",
          "color": 1127848,
          "fields": [
            {
              "name": prefix + "gen (Category)",
              "value": "generate an account from that category."
            },
            {
              "name": prefix + "check (Category)",
              "value": "check how many accounts are in that server/category."
            },
            {
              "name": prefix + "stock",
              "value": "Lists all accounts in the specific categories"
            },
            {
              "name": prefix + "ping",
              "value": "Shows the Latency of the bot"
            },
            {
              "name": prefix + "uptime",
              "value": "Shows the bots uptime"
            }
          ]
        }

      })
    } else {
      message.channel.send({
        embed: {
          "title": "Commands",
          "color": 9539985,
          "fields": [
            {
              "name": prefix + "gen (Category)",
              "value": "generate an account from that category."
            },
            {
              "name": prefix + "check (Category)",
              "value": "check how many accounts are in that server/category."
            },
            {
              "name": prefix + "stock",
              "value": "Lists all accounts in the specific categories"
            },
            {
              "name": prefix + "add (Category) (Email:pass)",
              "value": "add that account to the category, command usage -> username:password"
            },
            {
              "name": prefix + "change (prefix/cooldown) (value)",
              "value": "change prefix or cooldown to a value, for the cooldown remember that the value must be in ms"
            },
            {
              "name": prefix + "delete (Category)",
              "value": "Deletes all the accounts in that Category and then deletes the file"
            },
            {
              "name": prefix + "ping",
              "value": "Shows the Latency of the bot"
            },
            {
              "name": prefix + "uptime",
              "value": "Shows the bots uptime"
            }
          ]
        }

      })
    }
  }
})
bot.on('message', message => {
  if (message.content === '.ping') {
    message.channel.send(`🏓Pong! Latency is ${Date.now() - message.createdTimestamp}ms.`);
  }
  if (message.content === '.uptime') {
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    const uptimeembed = new Discord.RichEmbed()
      .addField("Uptime", `${days}d ${hours}h ${minutes}m ${seconds}s`)
    message.channel.send(uptimeembed);
  }
});
bot.login(TOKEN);	
