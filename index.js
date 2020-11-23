// Constants
const Discord = require('discord.js');
const Keyv    = require('keyv');
const fs      = require('fs');
const client  = new Discord.Client();
const db      = new Keyv('sqlite://db.sqlite');
const prefix  = ".";

// Databases
var quotes = [];
var cards = [];
var noshot = 0;

// Init
client.on('ready', async() => {
    // Quotes
    quotes = await db.get("quotes");
    if (!(quotes))
    {
        await db.set("quotes", []);
        quotes = [];
    }

    // Cards
    cards = await db.get("cards");
    if (!(cards))
    {
        await db.set("cards", []);
        quotes = [];
    }
	
	// No Shot
	noshot = await db.get("noshot");
	if (!(noshot))
	{
		await db.set("noshot", 0);
		noshot = 0;
	}
    console.log("Door Bot is ready!")
});

client.on('message', async(message) => {
    // I don't talk to bots, they disappoint me.
    if (message.author.bot)
        return;

    // Basic Interaction
    if (!message.content.startsWith(prefix)) {
        var content = message.content.toUpperCase();
		
		if (content.includes("NO SHOT") && message.author.id == "277454620870180864")
		{
			noshot++;
			db.set("noshot", noshot);
		}

        switch (content) {
            case "F":
                message.channel.send("F");
                break;

            case "SOON":
                message.channel.send("soon:tm:");
                break;

            case "DO A BARREL ROLL":
                message.channel.send("no");
                break;

            case "POGGERS":
                message.channel.send("stop it...STOP IT!!!");
                break;
        }

        return;
    }

    // Commands
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (message.guild) {
        switch (command) {

            case "quote":
                message.channel.send("```" + quotes[Math.floor(Math.random() * quotes.length)] + "```")
                break;
				
			case "noshot":
				message.channel.send("Eric has said 'No Shot' exactly **" + noshot + "** times.");
				break;

            default:
                const responses = [
                    "NIbiBIbibIUBiu wat???",
                    "I have no idea what that is...",
                    "What do you want?",
                    "I don't know what that is."
                ]
                message.channel.send(responses[Math.floor(Math.random() * responses.length)]);
                break;
        }
    }
});

// Login
client.login('SECRET HERE');