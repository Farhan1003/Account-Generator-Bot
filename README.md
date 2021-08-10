# Account Generator bot for discord.js

## About
This CODE allows you to host a Discord.js bot with functionality such as -> Lettings your server users generate accounts Via a secure & easy to use method.

## How it works

**Adding Accounts**

Server Administrators can add accounts using `.add (Category) (email:pass)` "Example Usage:`.add Spotify cheeseKei@gmail.com:57984612!#`"

**Receiving accounts**

Users can type `.gen (Category)` "Example Usage:`.gen Spotify` And the bot will DM that User with an account information (IF its available).
& There is a 30Min Cooldown by default, you can change it in `settings.json`.

## Extra Features

**Abillity to Set a Generation channel**

Users can run the `.gen` command ONLY in that channel (Instructions to set it is in the SETUP section).

**Abillity to Set a LOG channel**

You can set a log channel where it will Log the account Genorations Example: `@User has generated SPOTIFY cheeseKei@gmail.com:57984612!`#

**.Gen Cooldown**

You can change the cooldown in `settings.json` or Via `.change` command.
Keep in mind that the cooldown Value is in *MS* aka Miliseconds.

**Change prefix**

You can change prefix via `.change` command or in `settings.json`

**Statuses**

Bot Cycles thru 4 different statuses each in 15seconds. You can change it via modifying 1 line of code in index.js (Instructions down below).

## Requirements
**1. Node.js v12.22.1 or UP**

**2. Access to Console/Shell**

**3. Permission to write & delete files in that folder**

## Setup

**MAKE SURE YOU MEET THE REQUIREMENTS**

**1. Download or clone this repository.**

**2. Extract the files in a folder.**

**3. Open a terminal/CMD in that folder.**

**4. Type `npm i` and it will install all the dependencies.**

**5. Get a TOKEN & Invite it to your Server. To do that Follow this article.** https://www.writebots.com/discord-bot-token/ 

**6. IF you don't know what permissions to give your bot just CHECK the Administrator box.**

**7. After inviting copy your bot's token & OPEN settings.json... You will see something like this "token":"YourTokenHere".**

**8. Edit it and put Your Token in there Example: "token":"ODcu.jukKiisjnpo-UFopslm".**

**9. Get the ID for a channel that you want to use as Genoration channel. To do that follow this Video Made by "How to Digital".** https://www.youtube.com/watch?v=GuO4TswMZho&ab_channel=HowtoDigital

**10. Once you have copied the id of your chanel go to settings.json again... You will see something like this "generationchannelid":"URGenorationChannelID".**

**11. Paste your id there Example: "generationchannelid":"871652011844722689".**

**12. Do the same with the "logchannel":"URLogChannelID".**

**13. Make sure you save the file now start the bot via oppening a Terminal/CMD in that foler where your `index.js` file is in.**

**14. Run the command `node .` or node `index.js`.**

**15. If no errors pop up in console ITS DONE! As long as your CMD is running your bot will run don't close the CMD.**

**16. If you get a error when running a command or starting up make sure you followed all of the steps and the Requirements.** 

## Images
https://media.discordapp.net/attachments/831933957296619570/874544102685966376/unknown.png)
https://media.discordapp.net/attachments/873088176514818098/874545213782233088/unknown.png)
https://media.discordapp.net/attachments/873088176514818098/874545431005257768/unknown.png)
https://media.discordapp.net/attachments/873088176514818098/874545681656848394/unknown.png)
https://media.discordapp.net/attachments/873088176514818098/874546417857871882/unknown.png)
https://media.discordapp.net/attachments/831933957296619570/874544715754770442/unknown.png)

## Issues

- Sometimes you can't delete a Category/Service and it shows error "File not found"
- To fix that only use small letters in `.add`

- To Submit an issue follow this link https://github.com/Farhan1003/Account-Genorator-discord.js/issues
- Or Contact Naomi#1234 on discord

## Disclaimer

- This is my first ever Discord.js bot/project, Sorry for any code erros ill try to fix them.
- You can Share, Modify, Redistribute, Use this code but don't claim as it was made by you. Give credit where it's needed. Thanks!

